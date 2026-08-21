import { readFile, writeFile } from "node:fs/promises";

const sourcePath = "/home/ubuntu/v3_market_breadth_raw_2026-08-21.json";
const raw = JSON.parse(await readFile(sourcePath, "utf8"));
const sectorSeries = raw.dataset.filter((item) => item.symbol !== "SPY");
const spySeries = raw.dataset.find((item) => item.symbol === "SPY");
const dates = sectorSeries[0].rows.map((row) => row.date);

function percentChange(now, before) {
  return ((now / before) - 1) * 100;
}

function valueAt(series, date) {
  return series.rows.find((row) => row.date === date)?.close ?? null;
}

function returnFor(series, date, observations) {
  const index = series.rows.findIndex((row) => row.date === date);
  if (index < observations) return null;
  const current = series.rows[index]?.close;
  const previous = series.rows[index - observations]?.close;
  return current && previous ? percentChange(current, previous) : null;
}

const trend = dates.map((date, index) => {
  const daily = sectorSeries.map((sector) => ({
    oneDay: returnFor(sector, date, 1),
    fiveDay: returnFor(sector, date, 5),
    twentyDay: returnFor(sector, date, 20),
  }));
  const countPositive = (key) => daily.filter((item) => item[key] !== null && item[key] > 0).length;
  const countAvailable = (key) => daily.filter((item) => item[key] !== null).length;
  return {
    date,
    dailyBreadth: countAvailable("oneDay") ? +(countPositive("oneDay") / countAvailable("oneDay") * 100).toFixed(1) : null,
    fiveDayBreadth: countAvailable("fiveDay") ? +(countPositive("fiveDay") / countAvailable("fiveDay") * 100).toFixed(1) : null,
    twentyDayBreadth: countAvailable("twentyDay") ? +(countPositive("twentyDay") / countAvailable("twentyDay") * 100).toFixed(1) : null,
    spyOneDay: returnFor(spySeries, date, 1) === null ? null : +returnFor(spySeries, date, 1).toFixed(2),
    spyFiveDay: returnFor(spySeries, date, 5) === null ? null : +returnFor(spySeries, date, 5).toFixed(2),
    spyTwentyDay: returnFor(spySeries, date, 20) === null ? null : +returnFor(spySeries, date, 20).toFixed(2),
  };
});

const asOf = dates.at(-1);
const sectorHeatmap = sectorSeries.map((sector) => {
  return {
    symbol: sector.symbol,
    label: sector.label,
    oneDay: +returnFor(sector, asOf, 1).toFixed(2),
    fiveDay: +returnFor(sector, asOf, 5).toFixed(2),
    twentyDay: +returnFor(sector, asOf, 20).toFixed(2),
  };
}).sort((a, b) => b.oneDay - a.oneDay);

const output = {
  asOf,
  retrievedAt: raw.retrievedAt,
  source: raw.source,
  methodology: {
    breadthDefinition: "Percentage of the 11 Select Sector SPDR ETFs with a positive total return over the stated trailing trading-day window.",
    heatmapDefinition: "Adjusted-close percentage return for the 11 Select Sector SPDR ETFs as of the stated U.S. close.",
    limitation: "This is a tradable sector-breadth proxy; it is not NYSE/Nasdaq advance-decline breadth and should not be read as constituent-level participation.",
  },
  trend,
  sectorHeatmap,
};

await writeFile("/home/ubuntu/v3_market_analytics_2026-08-21.json", `${JSON.stringify(output, null, 2)}\n`);
console.log(`Saved analysis through ${asOf}; ${sectorHeatmap.length} sectors.`);
