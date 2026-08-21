import fs from "node:fs";

const root = "/home/ubuntu/equity-insight-hub";
const home = fs.readFileSync(`${root}/client/src/pages/Home.tsx`, "utf8");
const data = fs.readFileSync(`${root}/client/src/lib/marketData.ts`, "utf8");
const mode = process.argv[2] || "structural";

const fail = (message) => {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
};
const pass = (message) => console.log(`PASS: ${message}`);
const between = (source, start, end) => {
  const a = source.indexOf(start);
  const b = source.indexOf(end, a + start.length);
  return a >= 0 && b >= 0 ? source.slice(a, b) : "";
};

if (mode === "structural") {
  const legacyVisibleCopy = [
    "Research edition", "Market thesis", "Signal desk", "Pre-market", "Sources", "SOURCE-AWARE",
    "Open today", "Pre-market scenario map", "Today’s thesis", "Market snapshot", "Breadth check",
    "Why this matters", "The questions that move", "Learning lens", "Analyst lens", "Teaching note",
    "Research drawer", "What to observe", "Positive confirmation", "Every claim needs a trail",
    "Research and education only", "No matching signal",
  ];
  const residual = legacyVisibleCopy.filter((text) => home.includes(`>${text}<`) || home.includes(`>${text}`));
  if (residual.length) fail(`found residual hard-coded visible copy: ${residual.join(" | ")}`);
  else pass("No old hard-coded visible copy remains in Home.tsx; text is driven by the active language pack.");
  const required = ["getMarketContent(language)", "copy.nav", "copy.heroTitleA", "copy.sourcesTitle", "copy.footerRight", "signals", "premarketRows"];
  const missing = required.filter((token) => !home.includes(token));
  if (missing.length) fail(`missing active-language bindings: ${missing.join(", ")}`);
  else pass("Navigation, hero, signals, pre-market table, sources and footer all bind to active-language content.");
}

if (mode === "lexical") {
  const uiTw = between(data, "  TW: {", "  CN: {");
  const uiCn = between(data, "  CN: {", "  EN: {");
  const uiEn = between(data, "  EN: {", "};\n\nconst signalSets");
  const signalsTw = between(data, "  TW: [", "  CN: [");
  const signalsCn = between(data, "  CN: [", "  EN: [");
  const signalsEn = between(data, "  EN: [", "  ].map((row, index)");
  const twBanned = /[这们简盘后网导开价间际与么为里给并关区业资场动应经华体]/g;
  const cnBanned = /[這們繁盤後網導開價間際與麼為裡給並關區業資場動應經華體]/g;
  const cjk = /[\u3400-\u9fff]/g;
  const twHits = [...(uiTw + signalsTw).matchAll(twBanned)].map((m) => m[0]);
  const cnHits = [...(uiCn + signalsCn).matchAll(cnBanned)].map((m) => m[0]);
  const enHits = [...(uiEn + signalsEn).matchAll(cjk)].map((m) => m[0]);
  if (twHits.length) fail(`Traditional Chinese includes simplified-only characters: ${[...new Set(twHits)].join(", ")}`); else pass("Traditional Chinese pack contains no flagged simplified-only characters.");
  if (cnHits.length) fail(`Simplified Chinese includes traditional-only characters: ${[...new Set(cnHits)].join(", ")}`); else pass("Simplified Chinese pack contains no flagged traditional-only characters.");
  if (enHits.length) fail(`English pack includes Chinese characters: ${[...new Set(enHits)].join(", ")}`); else pass("English pack contains no Chinese characters.");
}

if (mode === "coverage") {
  const signalTw = between(data, "const signalSets: Record<Language, MarketSignal[]> = {\n  TW: [", "  CN: [");
  const signalCn = between(data, "  CN: [", "  EN: [");
  const signalEn = between(data, "  EN: [", "  ].map((row, index)");
  const signalCount = (section) => (section.match(/\["(?:宏觀|宏观|Macro|AI 硬件|AI hardware|消費|消费|Consumer|跨資產|跨资产|Cross-asset)"/g) || []).length;
  const expected = [["TW", signalTw], ["CN", signalCn], ["EN", signalEn]];
  for (const [language, section] of expected) {
    const count = signalCount(section);
    if (count !== 10) fail(`${language} signal set has ${count} entries; expected 10.`); else pass(`${language} signal set has all 10 translated signal entries.`);
  }
  const premarket = between(data, "const premarketSets", "const statNotes");
  for (const language of ["TW", "CN", "EN"]) {
    const section = between(premarket, `  ${language}: [`, language === "TW" ? "  CN: [" : language === "CN" ? "  EN: [" : "  ].map");
    const count = (section.match(/^\s*\[/gm) || []).length;
    if (count !== 4) fail(`${language} pre-market set has ${count} rows; expected 4.`); else pass(`${language} pre-market table has all 4 translated rows.`);
  }
  const allKeys = ["locale", "heroTitleA", "snapshotTitle", "signalsTitle", "premarketKicker", "sourcesTitle", "footerRight"];
  for (const language of ["TW", "CN", "EN"]) {
    const section = between(data, `  ${language}: {`, language === "TW" ? "  CN: {" : language === "CN" ? "  EN: {" : "};\n\nconst signalSets");
    const missing = allKeys.filter((key) => !section.includes(`${key}:`));
    if (missing.length) fail(`${language} UI pack missing: ${missing.join(", ")}`); else pass(`${language} UI pack covers all major page sections.`);
  }
}
