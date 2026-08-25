import fs from "node:fs";
import path from "node:path";

const directory = "data/2026-08-25";
const errors = [];
const read = (name) => {
  const file = path.join(directory, name);
  if (!fs.existsSync(file)) { errors.push(`Missing ${file}`); return null; }
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (error) { errors.push(`Invalid JSON ${file}: ${error.message}`); return null; }
};
const require = (condition, message) => { if (!condition) errors.push(message); };

const us = read("us_market.json");
const hk = read("hk_market.json");
const thesis = read("thesis.json");
const sources = read("sources.json");
const analytics = read("market_analytics.json");
const raw = read("market_breadth_raw.json");
const detail = read("market_analytics_detail.json");

if (us) {
  require(us.as_of === "2026-08-25", "U.S. report as_of must be 2026-08-25");
  require(us.session_type === "completed_us_regular_session", "U.S. session must be explicitly completed");
  require(us.completed_session_date === "2026-08-24", "U.S. session date must be 2026-08-24");
  for (const [name, row] of Object.entries(us.index_close || {})) require(Number.isFinite(row.value) && Number.isFinite(row.change_pct), `Invalid U.S. index row: ${name}`);
  require(Array.isArray(us.drivers) && us.drivers.length >= 3, "U.S. report needs three evidence-bounded drivers");
  require(Array.isArray(us.companies) && us.companies.length >= 3, "U.S. report needs three stock/sector evidence rows");
  require(!JSON.stringify(us).includes("nearly $1 trillion"), "Unannounced TGA allocation claim must not appear as fact");
}
if (hk) {
  require(hk.session_type === "hk_morning_intraday_snapshot", "HK data must be explicitly intraday");
  require(hk.completed_session === null, "HK intraday report must not fabricate a completed close");
  require(hk.intraday_snapshot?.timestamp_hkt === "2026-08-25 10:36 HKT", "HK snapshot needs its exact HKT timestamp");
  require(Number.isFinite(hk.intraday_snapshot?.HSI), "HK snapshot requires numeric HSI");
  require(/not a Hong Kong completed close/i.test(hk.boundary || ""), "HK boundary must prohibit close labelling");
}
if (thesis) {
  require(thesis.as_of === "2026-08-25", "Thesis as_of must be 2026-08-25");
  require(Array.isArray(thesis.this_week) && thesis.this_week.length === 4, "Weekly agenda must contain four bounded events");
  for (const row of thesis.this_week || []) require(row.id && row.event && row.when && row.official_boundary && row.positive && row.negative, `Incomplete weekly event: ${row.id || "unknown"}`);
}
if (sources) {
  require(sources.as_of === "2026-08-25", "Source ledger as_of must be 2026-08-25");
  require(Array.isArray(sources.sources) && sources.sources.length >= 10, "Source ledger must retain all verified evidence entries");
  for (const row of sources.sources || []) {
    require(row.id && row.market && row.tier && row.url, `Incomplete source audit row ${row.id || "unknown"}`);
    for (const lang of ["TW", "CN", "EN"]) require(Boolean(row.label?.[lang]), `Source ${row.id} missing ${lang} label`);
  }
  require(sources.sources?.some((row) => row.id === 9 && /unconfirmed/i.test(row.tier)), "NVIDIA price report must remain explicitly unconfirmed");
}
if (analytics) {
  require(analytics.as_of === "2026-08-24" && analytics.report_date === "2026-08-25", "Breadth must distinguish completed session from report date");
  require(analytics.files?.raw_input === "data/2026-08-25/market_breadth_raw.json", "Breadth raw input must use dated repository-relative path");
  require(analytics.files?.calculation_output === "data/2026-08-25/market_analytics_detail.json", "Breadth detail must use dated repository-relative path");
}
if (raw) require(raw.as_of === "2026-08-24" && raw.dataset?.length === 12, "Breadth raw data must contain completed-session 11 sectors plus SPY");
if (detail) require(detail.sector_heatmap?.length === 11, "Heatmap must contain 11 sector ETF entries");

if (errors.length) {
  console.error(`AUG25 DATA VALIDATION FAIL (${errors.length})`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log("AUG25 DATA VALIDATION PASS: completed U.S. session, HK intraday boundary, source audit and breadth provenance verified");
