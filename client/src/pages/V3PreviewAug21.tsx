/**
 * BIT Market Intelligence — independent V3 research edition, 21 Aug 2026.
 * Style contract: original report remains the canonical full record; V3 exhibits add
 * inspectable cross-market evidence, never replace or rewrite audited market content.
 */
import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download, FileDown, Network } from "lucide-react";
import FullReportAug21, { type ReportLanguage } from "./FullReportAug21";

type Horizon = "oneDay" | "fiveDay" | "twentyDay";
type Sector = { symbol: string; label: Record<ReportLanguage, string>; oneDay: number; fiveDay: number; twentyDay: number };

const breadthTrend = [
  { date: "08/07", five: 63.6, twenty: null, spy: 4.26 }, { date: "08/10", five: 81.8, twenty: null, spy: 2.03 },
  { date: "08/11", five: 36.4, twenty: null, spy: -0.1 }, { date: "08/12", five: 36.4, twenty: null, spy: 0.35 },
  { date: "08/13", five: 100, twenty: null, spy: 1.21 }, { date: "08/14", five: 81.8, twenty: 81.8, spy: 0.4 },
  { date: "08/17", five: 45.5, twenty: 54.5, spy: -0.05 }, { date: "08/18", five: 54.5, twenty: 72.7, spy: -0.4 },
  { date: "08/19", five: 63.6, twenty: 81.8, spy: -0.44 }, { date: "08/20", five: 27.3, twenty: 90.9, spy: -1.96 },
];

const sectors: Sector[] = [
  { symbol: "XLE", label: { CN: "能源", TW: "能源", EN: "Energy" }, oneDay: 0.27, fiveDay: 4.41, twentyDay: 7.36 },
  { symbol: "XLRE", label: { CN: "房地产", TW: "房地產", EN: "Real estate" }, oneDay: 0.2, fiveDay: -0.09, twentyDay: 0.29 },
  { symbol: "XLB", label: { CN: "材料", TW: "材料", EN: "Materials" }, oneDay: -0.19, fiveDay: 0.21, twentyDay: 3.15 },
  { symbol: "XLK", label: { CN: "信息技术", TW: "資訊科技", EN: "Information technology" }, oneDay: -0.29, fiveDay: -4.02, twentyDay: 2.61 },
  { symbol: "XLC", label: { CN: "通信服务", TW: "通訊服務", EN: "Communication services" }, oneDay: -0.57, fiveDay: -1.66, twentyDay: 1.36 },
  { symbol: "XLU", label: { CN: "公用事业", TW: "公用事業", EN: "Utilities" }, oneDay: -0.57, fiveDay: -0.61, twentyDay: -5.24 },
  { symbol: "XLF", label: { CN: "金融", TW: "金融", EN: "Financials" }, oneDay: -0.92, fiveDay: -2.25, twentyDay: 2.01 },
  { symbol: "XLI", label: { CN: "工业", TW: "工業", EN: "Industrials" }, oneDay: -1.2, fiveDay: -3.24, twentyDay: 0.93 },
  { symbol: "XLP", label: { CN: "必选消费", TW: "必需消費", EN: "Consumer staples" }, oneDay: -1.41, fiveDay: -0.79, twentyDay: 2.54 },
  { symbol: "XLY", label: { CN: "可选消费", TW: "非必需消費", EN: "Consumer discretionary" }, oneDay: -1.61, fiveDay: -1.49, twentyDay: 1.58 },
  { symbol: "XLV", label: { CN: "医疗保健", TW: "醫療保健", EN: "Health care" }, oneDay: -1.87, fiveDay: 2.38, twentyDay: 6.78 },
];

const copy: Record<ReportLanguage, any> = {
  CN: {
    edition: "V3 分析展品 · 在完整研究报告之后", kicker: "V3 / ANALYTICAL EXHIBITS", title: "完整研究保留，\n让证据更容易被检验。", intro: "以下模块不替代上方的完整日报；它们把同一组已核实事实整理成可比较的广度、板块、传导和情景展品。", full: "完整8月21日研究记录", exhibit: "分析展品", export: "导出PNG", breadthKicker: "EXHIBIT 01 / U.S. BREADTH", breadthTitle: "5／20日广度的分叉，\n解释短期去风险的位置。", breadthBody: "广度定义为11个Select Sector SPDR ETF在各自5／20个交易日窗口内录得正回报的比例。它是可交易板块代理，不是NYSE／Nasdaq advance-decline广度。", five: "5日正回报板块", twenty: "20日正回报板块", spy: "S&P 500 · 5日", latest: "8月20日：5日广度27.3% · 20日广度90.9% · S&P 500五日−1.96%。", heatKicker: "EXHIBIT 02 / SECTOR EVIDENCE", heatTitle: "板块横向表现，\n把传导链变成可比较证据。", heatBody: "悬停任一板块可比较1日、5日和20日回报。热力图补足指数及个股，不替代成分股层面的广度。", selected: "当前比较", driverKicker: "EXHIBIT 03 / DRIVER CHAIN", driverTitle: "催化剂不是结论，\n传导和验证才是。", catalyst: "催化剂", transmission: "传导", reaction: "市场反应", validation: "下一验证", driver: ["长端收益率与油价上行", "估值贴现率与家庭支出压力同时上升", "指数下跌；能源相对较强，消费与医疗承压", "收益率／油价能否回落，同业是否停止走弱"], scenarioKicker: "EXHIBIT 04 / SCENARIO FRAME", scenarioTitle: "情景是验证框架，\n不是交易指令。", positive: "正面情景", base: "基准情景", negative: "负面情景", scenarios: [["收益率与油价同步回落", "科技与消费停止扩大落后", "重新测试估值减压是否可持续"], ["变量高位波动、板块继续分化", "公司级盈利证据仍获奖励", "保持事件与基本面分层"], ["收益率、油价续升且消费弱势扩散", "20日广度也开始收窄", "风险由单日冲击升级为趋势问题"]], source: "资料边界", sourceBody: "图表截点为美股2026年8月20日完成收市。11个Select Sector SPDR ETF adjusted close取自Yahoo Finance；上方完整研究页保留Reuters、Yahoo Finance、HKEX和Schwab的原始来源与时间戳。", disclaimer: "分析展品仅用于市场研究与教育，不构成任何个性化建议、买卖／沽空指令或回报保证。",
  },
  TW: {
    edition: "V3 分析展品 · 緊接完整研究記錄", kicker: "V3 / ANALYTICAL EXHIBITS", title: "完整研究保留，\n讓證據更容易被檢驗。", intro: "以下模組不取代上方的完整日報；它們把同一組已核實事實整理成可比較的廣度、板塊、傳導和情景展品。", full: "完整8月21日研究記錄", exhibit: "分析展品", export: "匯出PNG", breadthKicker: "EXHIBIT 01 / U.S. BREADTH", breadthTitle: "5／20日廣度的分叉，\n解釋短期去風險的位置。", breadthBody: "廣度定義為11個Select Sector SPDR ETF在各自5／20個交易日窗口內錄得正回報的比例。它是可交易板塊代理，不是NYSE／Nasdaq advance-decline廣度。", five: "5日正回報板塊", twenty: "20日正回報板塊", spy: "S&P 500 · 5日", latest: "8月20日：5日廣度27.3% · 20日廣度90.9% · S&P 500五日−1.96%。", heatKicker: "EXHIBIT 02 / SECTOR EVIDENCE", heatTitle: "板塊橫向表現，\n把傳導鏈變成可比較證據。", heatBody: "懸停任一板塊可比較1日、5日和20日回報。熱力圖補足指數及個股，不取代成分股層面的廣度。", selected: "目前比較", driverKicker: "EXHIBIT 03 / DRIVER CHAIN", driverTitle: "催化劑不是結論，\n傳導和驗證才是。", catalyst: "催化劑", transmission: "傳導", reaction: "市場反應", validation: "下一驗證", driver: ["長端收益率與油價上行", "估值貼現率與家庭支出壓力同時上升", "指數下跌；能源相對較強，消費與醫療承壓", "收益率／油價能否回落，同業是否停止走弱"], scenarioKicker: "EXHIBIT 04 / SCENARIO FRAME", scenarioTitle: "情景是驗證框架，\n不是交易指令。", positive: "正面情景", base: "基準情景", negative: "負面情景", scenarios: [["收益率與油價同步回落", "科技與消費停止擴大落後", "重新測試估值減壓是否可持續"], ["變數高位波動、板塊繼續分化", "公司級盈利證據仍獲獎勵", "保持事件與基本面分層"], ["收益率、油價續升且消費弱勢擴散", "20日廣度也開始收窄", "風險由單日衝擊升級為趨勢問題"]], source: "資料邊界", sourceBody: "圖表截點為美股2026年8月20日完成收市。11個Select Sector SPDR ETF adjusted close取自Yahoo Finance；上方完整研究頁保留Reuters、Yahoo Finance、HKEX和Schwab的原始來源與時間戳。", disclaimer: "分析展品僅用於市場研究與教育，不構成任何個人化建議、買賣／沽空指令或回報保證。",
  },
  EN: {
    edition: "V3 analytical exhibits · after the complete research record", kicker: "V3 / ANALYTICAL EXHIBITS", title: "Keep the full research.\nMake the evidence easier to test.", intro: "These modules do not replace the complete daily record above. They organise the same verified facts into inspectable breadth, sector, transmission and scenario exhibits.", full: "Complete 21 Aug research record", exhibit: "Analytical exhibits", export: "Export PNG", breadthKicker: "EXHIBIT 01 / U.S. BREADTH", breadthTitle: "The 5/20-day split\nlocates the short-term de-risking move.", breadthBody: "Breadth is the share of 11 Select Sector SPDR ETFs with positive returns across each 5/20-trading-day window. It is a tradable sector proxy—not NYSE/Nasdaq advance-decline breadth.", five: "5D positive-return sectors", twenty: "20D positive-return sectors", spy: "S&P 500 · 5D", latest: "20 Aug: 5D breadth 27.3% · 20D breadth 90.9% · S&P 500 5D −1.96%.", heatKicker: "EXHIBIT 02 / SECTOR EVIDENCE", heatTitle: "Cross-sector performance\nturns the transmission chain into comparable evidence.", heatBody: "Hover any sector to compare 1D, 5D and 20D returns. The heatmap complements index and stock evidence; it does not replace constituent-level breadth.", selected: "Current comparison", driverKicker: "EXHIBIT 03 / DRIVER CHAIN", driverTitle: "A catalyst is not a conclusion.\nTransmission and testing matter.", catalyst: "Catalyst", transmission: "Transmission", reaction: "Market reaction", validation: "Next validation", driver: ["Long-end yields and oil moved higher", "Discount rates and household-spending pressure rose together", "Indexes fell; energy held up while consumer and health care weakened", "Can yields/oil retreat, and can peers stop deteriorating?"], scenarioKicker: "EXHIBIT 04 / SCENARIO FRAME", scenarioTitle: "Scenarios are a validation frame,\nnot trade instructions.", positive: "Positive case", base: "Base case", negative: "Negative case", scenarios: [["Yields and oil retreat together", "Tech and consumer stop widening their lag", "Retest whether valuation relief can persist"], ["Inputs remain elevated and sectors stay dispersed", "Company-level earnings evidence is still rewarded", "Keep event and fundamental evidence separated"], ["Yields and oil rise while consumer weakness broadens", "20D breadth begins to narrow as well", "Risk shifts from a one-day shock to a trend question"]], source: "Data boundary", sourceBody: "Charts cut off at the completed U.S. close on 20 Aug 2026. Adjusted closes for 11 Select Sector SPDR ETFs come from Yahoo Finance; the complete report above preserves the original Reuters, Yahoo Finance, HKEX and Schwab references and timestamps.", disclaimer: "Analytical exhibits are for market research and education only, not personalised advice, a buy/sell/short instruction or a return guarantee.",
  },
};

function heatColor(value: number) {
  if (value >= 1.5) return "#0040FF";
  if (value > 0) return "#478DFF";
  if (value > -0.75) return "#EDF1F7";
  if (value > -1.5) return "#FFB0B0";
  return "#F73636";
}

function pct(value: number) { return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`; }

function exportSvg(elementId: string, filename: string) {
  const svg = document.getElementById(elementId)?.querySelector("svg");
  if (!svg) return;
  const rect = svg.getBoundingClientRect();
  const width = Math.max(Math.round(rect.width), 900);
  const height = Math.max(Math.round(rect.height), 480);
  const cloned = svg.cloneNode(true) as SVGSVGElement;
  cloned.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  cloned.setAttribute("width", String(width)); cloned.setAttribute("height", String(height));
  const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(cloned)], { type: "image/svg+xml" }));
  const image = new Image();
  image.onload = () => { const canvas = document.createElement("canvas"); canvas.width = width * 2; canvas.height = height * 2; const context = canvas.getContext("2d"); if (!context) return; context.scale(2, 2); context.fillStyle = "#FFFFFF"; context.fillRect(0, 0, width, height); context.drawImage(image, 0, 0, width, height); const link = document.createElement("a"); link.href = canvas.toDataURL("image/png"); link.download = filename; link.click(); URL.revokeObjectURL(url); };
  image.src = url;
}

export default function V3PreviewAug21() {
  const [language, setLanguage] = useState<ReportLanguage>(() => {
    const value = new URLSearchParams(window.location.search).get("lang");
    return value === "TW" || value === "EN" ? value : "CN";
  });
  const [horizon, setHorizon] = useState<Horizon>("oneDay");
  const [sector, setSector] = useState<Sector>(sectors[0]);
  const text = copy[language];
  const orderedSectors = useMemo(() => [...sectors].sort((a, b) => b[horizon] - a[horizon]), [horizon]);

  function setLocale(next: ReportLanguage) {
    setLanguage(next);
    const url = new URL(window.location.href); url.searchParams.set("lang", next); window.history.replaceState({}, "", url);
  }
  function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }

  return <div className="bit-v3 bg-[#f3efe6] text-[#16352f]">
    <div className="sticky top-0 z-50 border-b border-[#B0B9C9] bg-[#FFFFFF]/95 px-5 py-3 backdrop-blur sm:px-10"><div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3"><button onClick={() => scrollTo("overview")} className="font-mono text-[10px] font-bold tracking-[.14em] text-[#0A0D14]">BIT / MARKET INTELLIGENCE</button><div className="hidden font-mono text-[10px] tracking-[0.16em] text-[#526173] sm:block">{text.edition.toUpperCase()}</div><button onClick={() => scrollTo("v3-exhibits")} className="ml-auto border border-[#0040FF] px-3 py-2 font-mono text-[10px] font-bold tracking-[.08em] text-[#0040FF]">{text.exhibit}</button></div></div>
    <FullReportAug21 language={language} onLanguageChange={setLocale} />
    <main id="v3-exhibits" className="border-t-[10px] border-[#16382f] bg-[#f3efe6]">
      <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-10 lg:px-14"><div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr]"><div><p className="section-kicker">{text.kicker}</p><h1 className="section-title mt-3 whitespace-pre-line">{text.title}</h1></div><div className="border-l-2 border-[#c99a48] pl-5"><p className="max-w-2xl text-[15px] leading-7 text-[#53645d]">{text.intro}</p><button onClick={() => scrollTo("overview")} className="mt-5 inline-flex items-center gap-2 border border-[#c99a48] px-4 py-2 text-xs font-bold text-[#745a2d]"><FileDown size={14} /> {text.full}</button></div></div></section>

      <section className="border-y border-[#B0B9C9] bg-[#EDF1F7] px-5 py-16 sm:px-10 lg:px-14"><div className="mx-auto grid max-w-[1500px] gap-8 xl:grid-cols-[1.1fr_.9fr]"><div><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="section-kicker">{text.breadthKicker}</p><h2 className="section-title mt-3 whitespace-pre-line">{text.breadthTitle}</h2></div><button onClick={() => exportSvg("v3-breadth-chart", "bit-market-intelligence-breadth-2026-08-20.png")} className="inline-flex items-center gap-2 border border-[#0040FF] px-3 py-2 font-mono text-[10px] font-bold tracking-[.1em] text-[#0040FF]"><Download size={14} /> {text.export}</button></div><p className="mt-5 max-w-2xl text-sm leading-7 text-[#526173]">{text.breadthBody}</p><div id="v3-breadth-chart" className="exhibit mt-6 bg-[#FFFFFF] p-4 sm:p-6"><ResponsiveContainer width="100%" height={310}><LineChart data={breadthTrend} margin={{ top: 12, right: 12, bottom: 6, left: -14 }}><CartesianGrid stroke="#B0B9C9" strokeDasharray="2 5" /><XAxis dataKey="date" tick={{ fill: "#526173", fontFamily: "monospace", fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis yAxisId="breadth" domain={[0, 100]} tickFormatter={(value) => `${value}%`} tick={{ fill: "#526173", fontFamily: "monospace", fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis yAxisId="spy" orientation="right" tickFormatter={(value) => `${value}%`} tick={{ fill: "#526173", fontFamily: "monospace", fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "#0A0D14", border: "1px solid #0040FF", borderRadius: 0, color: "#FFFFFF" }} labelStyle={{ color: "#478DFF" }} /><Line yAxisId="breadth" dataKey="five" name={text.five} stroke="#0040FF" strokeWidth={2.4} dot={false} activeDot={{ r: 5 }} /><Line yAxisId="breadth" dataKey="twenty" name={text.twenty} stroke="#478DFF" strokeWidth={2.4} connectNulls dot={false} activeDot={{ r: 5 }} /><Line yAxisId="spy" dataKey="spy" name={text.spy} stroke="#F73636" strokeWidth={1.5} strokeDasharray="4 4" dot={false} /></LineChart></ResponsiveContainer></div><p className="mt-3 font-mono text-[10px] tracking-[.08em] text-[#526173]">{text.latest}</p></div><aside className="bg-[#0A0D14] p-7 text-[#FFFFFF] sm:p-9"><p className="font-mono text-[10px] tracking-[.18em] text-[#478DFF]">{text.source.toUpperCase()}</p><p className="mt-5 text-sm leading-7 text-[#EDF1F7]">{text.sourceBody}</p><p className="mt-7 border-t border-white/15 pt-4 text-xs leading-5 text-[#B0B9C9]">{text.disclaimer}</p></aside></div></section>

      <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-10 lg:px-14"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="section-kicker">{text.heatKicker}</p><h2 className="section-title mt-3 whitespace-pre-line">{text.heatTitle}</h2></div><div className="inline-flex border border-[#d8ccb7] p-1">{(["oneDay", "fiveDay", "twentyDay"] as Horizon[]).map((value) => <button key={value} onClick={() => setHorizon(value)} className={`px-4 py-2 font-mono text-[10px] font-bold ${horizon === value ? "bg-[#16382f] text-white" : "text-[#6a756f]"}`}>{value === "oneDay" ? "1D" : value === "fiveDay" ? "5D" : "20D"}</button>)}</div></div><p className="mt-5 max-w-2xl text-sm leading-7 text-[#68756f]">{text.heatBody}</p><div id="v3-heatmap-chart" className="exhibit mt-7 bg-[#f9f4ea] p-4 sm:p-6"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{orderedSectors.map((item) => <button key={item.symbol} onMouseEnter={() => setSector(item)} onFocus={() => setSector(item)} onClick={() => setSector(item)} className="min-h-24 p-4 text-left transition hover:scale-[1.01]" style={{ background: heatColor(item[horizon]) }}><p className="font-mono text-[10px] font-bold tracking-[.12em]">{item.symbol}</p><p className="mt-2 text-sm font-bold">{item.label[language]}</p><p className="mt-3 font-mono text-lg font-semibold">{pct(item[horizon])}</p></button>)}</div></div><div className="mt-5 grid gap-4 border-l-2 border-[#c99a48] pl-5 sm:grid-cols-[180px_1fr]"><p className="font-mono text-[10px] tracking-[.14em] text-[#9b7739]">{text.selected.toUpperCase()}</p><div><p className="font-display text-2xl">{sector.symbol} / {sector.label[language]}</p><p className="mt-2 font-mono text-sm text-[#39785f]">1D {pct(sector.oneDay)} · 5D {pct(sector.fiveDay)} · 20D {pct(sector.twentyDay)}</p></div></div></section>

      <section className="border-y border-[#e1d7c5] bg-[#f9f5eb] px-5 py-16 sm:px-10 lg:px-14"><div className="mx-auto max-w-[1500px]"><p className="section-kicker">{text.driverKicker}</p><h2 className="section-title mt-3 whitespace-pre-line">{text.driverTitle}</h2><div className="mt-9 grid border-l border-t border-[#d7c6a7] md:grid-cols-4">{([text.catalyst, text.transmission, text.reaction, text.validation] as string[]).map((label, index) => <article key={label} className="relative -ml-px -mt-px min-h-48 border border-[#d7c6a7] bg-[#f7f1e6] p-6"><span className="font-mono text-[10px] tracking-[.14em] text-[#9b7739]">0{index + 1} / {label.toUpperCase()}</span><p className="mt-6 text-sm leading-7 text-[#405a51]">{text.driver[index]}</p>{index < 3 && <Network className="absolute -right-3 top-1/2 hidden -translate-y-1/2 bg-[#f7f1e6] p-1 text-[#b79045] md:block" size={26} />}</article>)}</div></div></section>

      <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-10 lg:px-14"><p className="section-kicker">{text.scenarioKicker}</p><h2 className="section-title mt-3 whitespace-pre-line">{text.scenarioTitle}</h2><div className="mt-9 grid border-l border-t border-[#d7c6a7] lg:grid-cols-3">{([text.positive, text.base, text.negative] as string[]).map((label, index) => <article key={label} className="relative -ml-px -mt-px border border-[#d7c6a7] bg-[#faf7f0] p-7"><span className={`font-mono text-[10px] font-bold tracking-[.16em] ${index === 0 ? "text-[#39785f]" : index === 1 ? "text-[#9b7739]" : "text-[#ad5e52]"}`}>{label.toUpperCase()}</span><p className="mt-6 font-display text-2xl">{text.scenarios[index][0]}</p><p className="mt-4 border-l border-[#c99a48] pl-4 text-sm leading-6 text-[#53645d]">{text.scenarios[index][1]}</p><p className="mt-5 font-mono text-[10px] leading-5 text-[#7a827e]">{text.scenarios[index][2]}</p></article>)}</div></section>
    </main>
  </div>;
}
