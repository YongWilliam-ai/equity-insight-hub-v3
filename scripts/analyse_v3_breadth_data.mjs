import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const asOfIndex = args.indexOf("--as-of");
const requestedAsOf = asOfIndex >= 0 ? args[asOfIndex + 1] : null;
if (!requestedAsOf || !/^\d{4}-\d{2}-\d{2}$/.test(requestedAsOf)) {
  console.error("Usage: node scripts/analyse_v3_breadth_data.mjs --as-of YYYY-MM-DD");
  process.exit(1);
}

const directory = path.join("data", requestedAsOf);
const sourcePath = path.join(directory, "market_breadth_raw.json");
const raw = JSON.parse(await readFile(sourcePath, "utf8"));
const sectorSeries = raw.dataset.filter((item) => item.symbol !== "SPY");
const spySeries = raw.dataset.find((item) => item.symbol === "SPY");
const dates = sectorSeries[0]?.rows.map((row) => row.date).filter((date) => date <= requestedAsOf) ?? [];
if (sectorSeries.length !== 11 || !spySeries || !dates.length) throw new Error("Raw sector dataset is incomplete; require 11 sector ETFs and SPY through requested as-of date.");

const percentChange = (now, before) => ((now / before) - 1) * 100;
function returnFor(series, date, observations) {
  const index = series.rows.findIndex((row) => row.date === date);
  if (index < observations) return null;
  const current = series.rows[index]?.close;
  const previous = series.rows[index - observations]?.close;
  return current && previous ? percentChange(current, previous) : null;
}
function breadthFor(date, key, observations) {
  const returns = sectorSeries.map((sector) => returnFor(sector, date, observations)).filter((value) => value !== null);
  return returns.length ? +(returns.filter((value) => value > 0).length / returns.length * 100).toFixed(1) : null;
}

const trend = dates.map((date) => ({
  date,
  dailyBreadth: breadthFor(date, "daily", 1),
  fiveDayBreadth: breadthFor(date, "five", 5),
  twentyDayBreadth: breadthFor(date, "twenty", 20),
  spyOneDay: returnFor(spySeries, date, 1) === null ? null : +returnFor(spySeries, date, 1).toFixed(2),
  spyFiveDay: returnFor(spySeries, date, 5) === null ? null : +returnFor(spySeries, date, 5).toFixed(2),
  spyTwentyDay: returnFor(spySeries, date, 20) === null ? null : +returnFor(spySeries, date, 20).toFixed(2),
}));

const asOf = dates.at(-1);
const latest = trend.at(-1);
if (latest?.twentyDayBreadth === null) throw new Error("Need at least 20 trading observations before calculating the 20-day breadth exhibit.");
const sectorHeatmap = sectorSeries.map((sector) => ({
  symbol: sector.symbol,
  label: sector.label,
  oneDay: +returnFor(sector, asOf, 1).toFixed(2),
  fiveDay: +returnFor(sector, asOf, 5).toFixed(2),
  twentyDay: +returnFor(sector, asOf, 20).toFixed(2),
})).sort((a, b) => b.oneDay - a.oneDay);

const source = raw.source || "Yahoo Finance chart endpoint; adjusted daily close; public market-data fallback";
const limitation = "Tradable sector-breadth proxy; not NYSE/Nasdaq advance-decline breadth and not constituent-level participation.";
const detail = {
  as_of: asOf,
  retrieved_at: raw.retrieved_at || raw.retrievedAt,
  source,
  methodology: {
    breadth_definition: "Percentage of the 11 Select Sector SPDR ETFs with a positive total return over the stated trailing trading-day window.",
    heatmap_definition: "Adjusted-close percentage return for the 11 Select Sector SPDR ETFs as of the stated U.S. close.",
    limitation,
    heatmap_color_semantics: "Positive green/teal, near-zero neutral grey, negative red; BIT Blue is reserved for UI/brand structure.",
  },
  trend,
  sector_heatmap: sectorHeatmap,
};
const summary = {
  as_of: asOf,
  source,
  breadth_definition: detail.methodology.breadth_definition,
  limitation,
  latest: {
    daily_breadth_pct: latest.dailyBreadth,
    five_day_breadth_pct: latest.fiveDayBreadth,
    twenty_day_breadth_pct: latest.twentyDayBreadth,
    spy_five_day_return_pct: latest.spyFiveDay,
  },
  files: {
    raw_input: path.join(directory, "market_breadth_raw.json"),
    calculation_output: path.join(directory, "market_analytics_detail.json"),
  },
};
await writeFile(path.join(directory, "market_analytics_detail.json"), `${JSON.stringify(detail, null, 2)}\n`);
await writeFile(path.join(directory, "market_analytics.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(`Saved market analytics through ${asOf}; ${sectorHeatmap.length} sectors.`);
