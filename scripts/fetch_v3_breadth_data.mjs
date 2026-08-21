import { writeFile } from "node:fs/promises";

const symbols = [
  ["XLB", "Materials"], ["XLC", "Communication Services"], ["XLE", "Energy"],
  ["XLF", "Financials"], ["XLI", "Industrials"], ["XLK", "Technology"],
  ["XLP", "Consumer Staples"], ["XLRE", "Real Estate"], ["XLU", "Utilities"],
  ["XLV", "Health Care"], ["XLY", "Consumer Discretionary"], ["SPY", "S&P 500"],
];

const period1 = Math.floor(Date.UTC(2026, 6, 15) / 1000);
const period2 = Math.floor(Date.UTC(2026, 7, 22) / 1000);

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
  })).filter((row) => Number.isFinite(row.close));
  return { symbol, label, rows };
}

const dataset = [];
for (const [symbol, label] of symbols) dataset.push(await fetchChart(symbol, label));

const output = {
  retrievedAt: new Date().toISOString(),
  source: "Yahoo Finance chart endpoint; adjusted daily close; public market-data fallback",
  universeNote: "Sector breadth proxy: 11 Select Sector SPDR ETFs. This is not NYSE advance-decline breadth.",
  dataset,
};

await writeFile("/home/ubuntu/v3_market_breadth_raw_2026-08-21.json", `${JSON.stringify(output, null, 2)}\n`);
console.log(`Saved ${dataset.length} symbols to /home/ubuntu/v3_market_breadth_raw_2026-08-21.json`);
