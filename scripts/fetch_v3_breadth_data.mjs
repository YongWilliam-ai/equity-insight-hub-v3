import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const symbols = [
  ["XLB", "Materials"], ["XLC", "Communication Services"], ["XLE", "Energy"],
  ["XLF", "Financials"], ["XLI", "Industrials"], ["XLK", "Technology"],
  ["XLP", "Consumer Staples"], ["XLRE", "Real Estate"], ["XLU", "Utilities"],
  ["XLV", "Health Care"], ["XLY", "Consumer Discretionary"], ["SPY", "S&P 500"],
];

const args = process.argv.slice(2);
const asOfIndex = args.indexOf("--as-of");
const asOf = asOfIndex >= 0 ? args[asOfIndex + 1] : null;
if (!asOf || !/^\d{4}-\d{2}-\d{2}$/.test(asOf)) {
  console.error("Usage: node scripts/fetch_v3_breadth_data.mjs --as-of YYYY-MM-DD");
  console.error("Pass the latest completed U.S. session date; do not pass an in-progress session.");
  process.exit(1);
}

const asOfDate = new Date(`${asOf}T00:00:00Z`);
const period1 = Math.floor((asOfDate.getTime() - 60 * 24 * 60 * 60 * 1000) / 1000);
const period2 = Math.floor((asOfDate.getTime() + 2 * 24 * 60 * 60 * 1000) / 1000);
const outputDirectory = path.join("data", asOf);

async function fetchChart(symbol, label) {
  const url = new URL(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`);
  url.searchParams.set("period1", String(period1));
  url.searchParams.set("period2", String(period2));
  url.searchParams.set("interval", "1d");
  url.searchParams.set("includeAdjustedClose", "true");
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`${symbol}: HTTP ${response.status}`);
  const json = await response.json();
  const result = json?.chart?.result?.[0];
  if (!result) throw new Error(`${symbol}: missing chart result`);
  const closes = result.indicators?.adjclose?.[0]?.adjclose ?? result.indicators?.quote?.[0]?.close;
  const rows = result.timestamp.map((timestamp, index) => ({
    date: new Date(timestamp * 1000).toISOString().slice(0, 10),
    close: closes?.[index] ?? null,
  })).filter((row) => Number.isFinite(row.close) && row.date <= asOf);
  return { symbol, label, rows };
}

const dataset = [];
for (const [symbol, label] of symbols) dataset.push(await fetchChart(symbol, label));
await mkdir(outputDirectory, { recursive: true });
const outputPath = path.join(outputDirectory, "market_breadth_raw.json");
const output = {
  as_of: asOf,
  retrieved_at: new Date().toISOString(),
  source: "Yahoo Finance chart endpoint; adjusted daily close; public market-data fallback",
  universe_note: "Sector breadth proxy: 11 Select Sector SPDR ETFs. This is not NYSE advance-decline breadth.",
  dataset,
};
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Saved ${dataset.length} symbols to ${outputPath}`);
