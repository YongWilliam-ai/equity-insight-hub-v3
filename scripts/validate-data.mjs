import fs from "node:fs";
import path from "node:path";

const requiredFiles = ["us_market.json", "hk_market.json", "thesis.json", "sources.json", "market_analytics.json"];
const fail = (errors, message) => errors.push(message);
const readJson = (directory, name, errors) => {
  const file = path.join(directory, name);
  if (!fs.existsSync(file)) { fail(errors, `Missing ${file}`); return null; }
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch (error) { fail(errors, `Invalid JSON in ${file}: ${error.message}`); return null; }
};

export function validateDirectory(directory) {
  const errors = [];
  for (const name of requiredFiles) if (!fs.existsSync(path.join(directory, name))) fail(errors, `Required file is absent: ${name}`);
  const us = readJson(directory, "us_market.json", errors);
  const hk = readJson(directory, "hk_market.json", errors);
  const thesis = readJson(directory, "thesis.json", errors);
  const sources = readJson(directory, "sources.json", errors);
  const analytics = readJson(directory, "market_analytics.json", errors);
  if (us) {
    if (us.market !== "US") fail(errors, "us_market.market must equal US");
    if (!us.completed_session) fail(errors, "us_market.completed_session must be true");
    if (!us.session_date || !us.index_returns_pct || !us.macro || !Array.isArray(us.stock_evidence) || !Array.isArray(us.next_validation)) fail(errors, "us_market missing required session, market, or validation fields");
  }
  if (hk) {
    if (hk.market !== "HK") fail(errors, "hk_market.market must equal HK");
    if (!hk.completed_session?.date || typeof hk.completed_session?.HSI !== "number") fail(errors, "hk_market.completed_session must contain date and numeric HSI");
    if (hk.intraday_snapshot && hk.intraday_snapshot.must_not_be_called_close !== true) fail(errors, "HK intraday snapshot must explicitly prohibit close labelling");
  }
  if (thesis) {
    const valid = new Set(["CONFIRMED", "PARTIALLY_CONFIRMED", "INVALIDATED", "UNRESOLVED"]);
    if (!thesis.as_of_hkt || !thesis.market_thesis || !Array.isArray(thesis.previous_thesis_ledger) || !thesis.william_view) fail(errors, "thesis missing required fields");
    for (const entry of thesis.previous_thesis_ledger || []) if (!valid.has(entry.status)) fail(errors, `Invalid thesis status: ${entry.status}`);
  }
  if (sources) {
    if (!sources.as_of_hkt || !Array.isArray(sources.sources) || typeof sources.bloomberg_status !== "string") fail(errors, "sources missing required fields");
    for (const source of sources.sources || []) if (!source.source_name || !source.market || !source.url || !source.confidence || !source.access_type) fail(errors, `Incomplete source entry: ${JSON.stringify(source)}`);
  }
  if (analytics) {
    if (!analytics.as_of || !analytics.source || !analytics.breadth_definition || !analytics.limitation || !analytics.latest) fail(errors, "market_analytics missing required fields");
    if (!/proxy/i.test(analytics.limitation)) fail(errors, "market_analytics limitation must preserve proxy statement");
  }
  return errors;
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isDirectRun) {
  const directory = process.argv[2] || "data/2026-08-21";
  const errors = validateDirectory(directory);
  if (errors.length) { console.error(`DATA VALIDATION FAIL (${errors.length})`); errors.forEach((error) => console.error(`- ${error}`)); process.exit(1); }
  console.log(`DATA VALIDATION PASS: ${directory}`);
}
