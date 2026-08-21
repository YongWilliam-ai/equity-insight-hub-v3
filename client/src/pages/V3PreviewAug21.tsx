/**
 * EQUITY / INSIGHT — independent research edition, 21 Aug 2026.
 * Style contract: retain the Market Ledger's ink-green research spine and paper rhythm.
 * V3 prioritises separated market reading areas and analytical evidence over dashboard density.
 */
import { useMemo, useState } from "react";
import {
  AreaChart, Area, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import {
  ArrowRight, ArrowUpRight, BarChart3, ChevronRight, Download, FileArchive,
  Landmark, Layers3, MousePointer2, ShieldCheck, TrendingDown, TrendingUp,
} from "lucide-react";

const heroImage = "/manus-storage/equity-insight-hero_91085892.jpg";

type Sector = { symbol: string; label: string; oneDay: number; fiveDay: number; twentyDay: number };

const breadthTrend = [
  { date: "08/07", five: 63.6, twenty: null, spy: 4.26 },
  { date: "08/10", five: 81.8, twenty: null, spy: 2.03 },
  { date: "08/11", five: 36.4, twenty: null, spy: -0.10 },
  { date: "08/12", five: 36.4, twenty: null, spy: 0.35 },
  { date: "08/13", five: 100.0, twenty: null, spy: 1.21 },
  { date: "08/14", five: 81.8, twenty: 81.8, spy: 0.40 },
  { date: "08/17", five: 45.5, twenty: 54.5, spy: -0.05 },
  { date: "08/18", five: 54.5, twenty: 72.7, spy: -0.40 },
  { date: "08/19", five: 63.6, twenty: 81.8, spy: -0.44 },
  { date: "08/20", five: 27.3, twenty: 90.9, spy: -1.96 },
];

const sectorHeatmap: Sector[] = [
  { symbol: "XLE", label: "能源", oneDay: 0.27, fiveDay: 4.41, twentyDay: 7.36 },
  { symbol: "XLRE", label: "房地产", oneDay: 0.20, fiveDay: -0.09, twentyDay: 0.29 },
  { symbol: "XLB", label: "材料", oneDay: -0.19, fiveDay: 0.21, twentyDay: 3.15 },
  { symbol: "XLK", label: "信息技术", oneDay: -0.29, fiveDay: -4.02, twentyDay: 2.61 },
  { symbol: "XLC", label: "通信服务", oneDay: -0.57, fiveDay: -1.66, twentyDay: 1.36 },
  { symbol: "XLU", label: "公用事业", oneDay: -0.57, fiveDay: -0.61, twentyDay: -5.24 },
  { symbol: "XLF", label: "金融", oneDay: -0.92, fiveDay: -2.25, twentyDay: 2.01 },
  { symbol: "XLI", label: "工业", oneDay: -1.20, fiveDay: -3.24, twentyDay: 0.93 },
  { symbol: "XLP", label: "必选消费", oneDay: -1.41, fiveDay: -0.79, twentyDay: 2.54 },
  { symbol: "XLY", label: "可选消费", oneDay: -1.61, fiveDay: -1.49, twentyDay: 1.58 },
  { symbol: "XLV", label: "医疗保健", oneDay: -1.87, fiveDay: 2.38, twentyDay: 6.78 },
];

function ResearchMark({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`research-mark ${className}`}><i /><i /><b /></span>;
}

function jump(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function formatPct(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function heatColor(value: number) {
  if (value >= 1.5) return "#2e6a54";
  if (value > 0) return "#9bbb94";
  if (value > -0.75) return "#d9cdb8";
  if (value > -1.5) return "#c78973";
  return "#9f5048";
}

function exportSvg(elementId: string, filename: string) {
  const target = document.getElementById(elementId);
  const svg = target?.querySelector("svg");
  if (!svg) return;
  const rect = svg.getBoundingClientRect();
  const width = Math.max(Math.round(rect.width), 900);
  const height = Math.max(Math.round(rect.height), 500);
  const copy = svg.cloneNode(true) as SVGSVGElement;
  copy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  copy.setAttribute("width", String(width));
  copy.setAttribute("height", String(height));
  const source = new XMLSerializer().serializeToString(copy);
  const image = new Image();
  const url = URL.createObjectURL(new Blob([source], { type: "image/svg+xml;charset=utf-8" }));
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width * 2;
    canvas.height = height * 2;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(2, 2);
    context.fillStyle = "#F7F1E6";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);
    const anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  image.src = url;
}

function SignalTab({ label }: { label: string }) {
  return <span className="absolute bottom-4 left-0 top-4 flex w-6 items-center justify-center border-r border-[#C99A48] bg-[#EDE5D8] px-1 text-center font-mono text-[8px] font-bold tracking-[0.08em] text-[#557067]" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>{label}</span>;
}

export default function V3PreviewAug21() {
  const [selectedSector, setSelectedSector] = useState<Sector>(sectorHeatmap[0]);
  const [heatmapHorizon, setHeatmapHorizon] = useState<"oneDay" | "fiveDay" | "twentyDay">("oneDay");
  const latestBreadth = breadthTrend.at(-1)!;
  const orderedSectors = useMemo(() => [...sectorHeatmap].sort((a, b) => b[heatmapHorizon] - a[heatmapHorizon]), [heatmapHorizon]);

  return <div className="v3-preview min-h-screen bg-[#F3EFE6] text-[#16352F] lg:flex">
    <aside className="ledger-spine sticky top-0 z-30 hidden h-screen w-[236px] flex-col border-r border-[#E4DBC9] bg-[#10332D] px-6 py-7 text-[#F6F0E3] lg:flex">
      <button onClick={() => jump("overview")} className="flex items-center gap-3 text-left"><ResearchMark className="h-11 w-11" /><span><span className="block font-display text-lg leading-none">EQUITY</span><span className="mt-1 block font-mono text-[10px] tracking-[0.22em] text-[#C99A48]">INSIGHT</span></span></button>
      <div className="mt-14 border-l border-[#C99A48]/60 pl-4"><p className="font-mono text-[10px] tracking-[0.2em] text-[#C99A48]">RESEARCH EDITION / 2026.08.21</p><p className="mt-3 font-display text-[22px] leading-tight">先分市场，
再做传导验证。</p></div>
      <nav className="mt-12 space-y-2" aria-label="V3 preview sections">
        {[["01", "概览", "overview"], ["02", "美股市场", "us-market"], ["03", "香港市场", "hk-market"], ["04", "跨市场", "cross-market"], ["05", "来源账本", "sources"]].map(([num, label, id]) => <button key={id} onClick={() => jump(id)} className="group flex w-full items-center gap-3 border-b border-white/10 py-3 text-left text-sm text-[#EAE3D5] transition hover:border-[#C99A48] hover:text-white"><span className="font-mono text-[10px] text-[#C99A48]">{num}</span><span>{label}</span><ChevronRight size={14} className="ml-auto opacity-0 transition group-hover:opacity-100" /></button>)}
      </nav>
      <div className="mt-auto border border-white/15 bg-white/[0.04] p-4"><div className="flex items-center gap-2 text-[#C99A48]"><ShieldCheck size={15} /><span className="font-mono text-[10px] tracking-[0.16em]">SOURCE-AWARE RESEARCH</span></div><p className="mt-2 text-xs leading-relaxed text-[#D5CEBF]">独立研究版本。完成收市、延迟盘中与观点分层呈现。</p></div>
    </aside>

    <div className="min-w-0 flex-1">
      <header className="sticky top-0 z-20 border-b border-[#E4DBC9] bg-[#F3EFE6]/95 px-5 py-3 backdrop-blur sm:px-10"><div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3"><button onClick={() => jump("overview")} className="flex items-center gap-2 lg:hidden"><ResearchMark className="h-7 w-7" /><span className="font-display text-sm">EQUITY / INSIGHT</span></button><div className="hidden items-center gap-3 text-[11px] font-medium tracking-[0.14em] text-[#50615B] sm:flex"><span className="status-dot" /><span>简体中文研究版</span><span className="text-[#B6A997]">•</span><span>2026.08.21</span></div><button onClick={() => jump("overview")} className="ml-auto inline-flex items-center gap-2 border border-[#D4C5AE] px-3 py-2 text-xs font-bold text-[#34544B] transition hover:border-[#A8782F] hover:text-[#9A7230]"><FileArchive size={14} /> 回到摘要</button></div></header>

      <main>
        <section id="overview" className="relative min-h-[570px] overflow-hidden bg-[#102D28]"><img src={heroImage} alt="Research desk" className="absolute inset-0 h-full w-full object-cover opacity-50" /><div className="absolute inset-0 bg-[#10332D]/72" /><div className="relative mx-auto flex min-h-[570px] max-w-[1500px] flex-col justify-end px-5 py-14 sm:px-10 lg:px-14"><div className="max-w-4xl"><div className="mb-6 flex flex-wrap items-center gap-3"><span className="ledger-rule" /><span className="font-mono text-[10px] tracking-[0.24em] text-[#E0C27B]">THE MARKET LEDGER / V3 COPY / 21 AUG 2026</span><span className="border border-[#E0C27B]/45 px-2 py-1 font-mono text-[9px] tracking-[0.14em] text-[#F4E4B8]">DATA CUT · 11:11 HKT</span></div><p className="font-mono text-[11px] tracking-[0.11em] text-[#D7D1C1]">US CLOSE 08.20 · HK CLOSE 08.20 + HK INTRADAY 08.21</p><h1 className="mt-5 max-w-5xl font-display text-[46px] leading-[0.93] tracking-[-0.045em] text-[#FFF9ED] sm:text-[68px] lg:text-[80px]">利率与消费的<br /><em className="font-normal text-[#E0C27B]">双重去风险，</em>先拆开再验证。</h1><p className="mt-7 max-w-3xl text-[15px] leading-7 text-[#E6DFD1] sm:text-[17px]">这是8月21日既有内容的独立V3复制版：美股、港股和真正有证据的跨市场传导各自展开，让读者先定位市场，再判断同一条逻辑是否成立。</p><div className="mt-9 flex flex-wrap gap-3"><button onClick={() => jump("us-market")} className="inline-flex items-center gap-2 border border-[#E0C27B] px-5 py-3 text-xs font-bold text-[#E0C27B] transition hover:bg-white/10 active:scale-[0.97]"><Landmark size={15} /> 美股市场 <ArrowRight size={14} /></button><button onClick={() => jump("hk-market")} className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-xs font-bold text-white transition hover:border-white hover:bg-white/10 active:scale-[0.97]"><Layers3 size={15} /> 香港市场 <ArrowRight size={14} /></button></div></div></div></section>

        <section className="border-b border-[#E4DBC9] bg-[#FAF7F0] px-5 py-8 sm:px-10 lg:px-14"><div className="mx-auto grid max-w-[1500px] gap-5 xl:grid-cols-[1.2fr_1fr_1fr]"><div className="border-l-2 border-[#C99A48] pl-4"><p className="font-mono text-[10px] tracking-[0.2em] text-[#897A67]">CROSS-MARKET THESIS</p><p className="mt-2 font-display text-[25px] leading-tight">买回带来的 rate-relief 只持续一天；收益率、油价和Walmart的消费读数令美股重回宏观／消费去风险。</p></div><div className="border-l border-[#DED4C2] pl-4"><p className="font-mono text-[10px] tracking-[0.14em] text-[#9B7739]">THESIS LEDGER</p><p className="mt-2 text-sm font-bold text-[#A65349]">INVALIDATED · 长端收益率未续降</p><p className="mt-1 text-xs leading-5 text-[#68756F]">10Y与30Y均上行4bp，前一天的估值减压未能延续。</p></div><div className="border-l border-[#DED4C2] pl-4"><p className="font-mono text-[10px] tracking-[0.14em] text-[#9B7739]">WILLIAM’S VIEW</p><p className="mt-2 text-sm leading-6 text-[#405A51]">我更倾向把周四理解为反弹条件被反向验证，而不是全面 risk-off 的终点。收益率和油价回落前，反弹仍需要由科技／消费相对表现来证明。</p></div></div></section>

        <section id="us-market" className="px-5 py-16 sm:px-10 lg:px-14"><div className="mx-auto max-w-[1500px]"><div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"><div><p className="section-kicker">02 / U.S. MARKET</p><h2 className="section-title mt-3">美股：同一条宏观链，<br />压估值也压消费。</h2></div><p className="max-w-2xl text-sm leading-7 text-[#68756F]">8月20日，10Y升至4.69%、30Y升至5.24%，WTI升破US$87；S&P 500、Nasdaq和Dow分别收跌0.87%、1.00%和1.32%。焦点不是单一指数，而是利率、能源、消费者与板块广度是否互相确认。</p></div>
          <div className="mt-10 grid border-y border-[#DCD1BE] sm:grid-cols-4"><article className="py-5 sm:pr-5"><p className="font-mono text-[10px] tracking-[0.12em] text-[#5D7169]">S&P 500</p><p className="mt-3 font-mono text-[30px] font-semibold tracking-[-0.06em]">7,641.16</p><p className="mt-1 font-mono text-[11px] font-bold text-[#B85B4E]">−0.87%</p></article><article className="border-t border-[#DCD1BE] py-5 sm:border-l sm:border-t-0 sm:px-5"><p className="font-mono text-[10px] tracking-[0.12em] text-[#5D7169]">NASDAQ</p><p className="mt-3 font-mono text-[30px] font-semibold tracking-[-0.06em]">26,067.17</p><p className="mt-1 font-mono text-[11px] font-bold text-[#B85B4E]">−1.00%</p></article><article className="border-t border-[#DCD1BE] py-5 sm:border-l sm:border-t-0 sm:px-5"><p className="font-mono text-[10px] tracking-[0.12em] text-[#5D7169]">DOW</p><p className="mt-3 font-mono text-[30px] font-semibold tracking-[-0.06em]">52,759.21</p><p className="mt-1 font-mono text-[11px] font-bold text-[#B85B4E]">−1.32%</p></article><article className="border-t border-[#DCD1BE] py-5 sm:border-l sm:border-t-0 sm:pl-5"><p className="font-mono text-[10px] tracking-[0.12em] text-[#5D7169]">SECTOR BREADTH</p><p className="mt-3 font-mono text-[30px] font-semibold tracking-[-0.06em]">18.2%</p><p className="mt-1 text-[11px] text-[#7A827E]">11个板块ETF中2个上涨</p></article></div>
        </div></section>

        <section className="border-y border-[#E2D8C6] bg-[#EAE4D8] px-5 py-16 sm:px-10 lg:px-14"><div className="mx-auto grid max-w-[1500px] gap-8 xl:grid-cols-[1.12fr_.88fr]"><div><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="section-kicker">U.S. / BREADTH TREND</p><h2 className="section-title mt-3">5／20日广度分叉，<br />一天的回撤更值得追问。</h2></div><button onClick={() => exportSvg("breadth-export", "equity-insight-v3-breadth-2026-08-20.png")} className="inline-flex items-center gap-2 border border-[#B79045] px-3 py-2 font-mono text-[10px] font-bold tracking-[0.1em] text-[#775D2B] transition hover:bg-[#F6F0E3] active:scale-[0.97]"><Download size={14} /> 导出PNG</button></div><p className="mt-4 max-w-2xl text-sm leading-7 text-[#68756F]">广度定义为11个Select Sector SPDR ETF在指定交易日窗口内录得正回报的比例。它是可交易板块广度代理，不是NYSE／Nasdaq advance-decline广度。</p><div id="breadth-export" className="mt-6 bg-[#F9F4EA] p-4 sm:p-6"><ResponsiveContainer width="100%" height={310}><LineChart data={breadthTrend} margin={{ top: 12, right: 12, bottom: 6, left: -14 }}><CartesianGrid stroke="#DED3C2" strokeDasharray="2 5" /><XAxis dataKey="date" tick={{ fill: "#68756F", fontFamily: "IBM Plex Mono", fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis yAxisId="breadth" domain={[0, 100]} tickFormatter={(value) => `${value}%`} tick={{ fill: "#68756F", fontFamily: "IBM Plex Mono", fontSize: 10 }} axisLine={false} tickLine={false} /><YAxis yAxisId="spy" orientation="right" tickFormatter={(value) => `${value}%`} tick={{ fill: "#8B7A64", fontFamily: "IBM Plex Mono", fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "#10342D", border: "1px solid #C99A48", borderRadius: 0, color: "#F7F0E3", fontSize: 12 }} labelStyle={{ color: "#E0C27B", fontFamily: "IBM Plex Mono" }} formatter={(value: number, name: string) => [`${value.toFixed(name === "S&P 500 · 5D" ? 2 : 1)}%`, name]} /><Legend wrapperStyle={{ fontSize: 11, fontFamily: "IBM Plex Mono", paddingTop: 10 }} /><Line yAxisId="breadth" type="monotone" dataKey="five" name="5日正回报板块" stroke="#B58A42" strokeWidth={2.4} dot={false} activeDot={{ r: 5 }} /><Line yAxisId="breadth" type="monotone" dataKey="twenty" name="20日正回报板块" stroke="#2F735C" strokeWidth={2.4} connectNulls dot={false} activeDot={{ r: 5 }} /><Line yAxisId="spy" type="monotone" dataKey="spy" name="S&P 500 · 5D" stroke="#B85B4E" strokeWidth={1.5} strokeDasharray="4 5" dot={false} /></LineChart></ResponsiveContainer></div><p className="mt-3 font-mono text-[10px] text-[#7A6B57]">08/20：5日广度 {latestBreadth.five}% · 20日广度 {latestBreadth.twenty}% · S&P 500五日 {latestBreadth.spy}%</p></div>
          <div className="border-l border-[#C99A48] bg-[#153A32] p-7 text-[#F7F0E3] sm:p-9"><div className="flex items-center gap-2 text-[#E0C27B]"><BarChart3 size={16} /><span className="font-mono text-[10px] tracking-[0.16em]">HOW TO READ THE GAP</span></div><p className="mt-5 font-display text-[30px] leading-tight">长期参与仍广，<br />短期参与已迅速收窄。</p><div className="mt-7 space-y-5"><div className="border-l border-[#C99A48] pl-4"><p className="font-mono text-[10px] tracking-[0.12em] text-[#E0C27B]">WHAT CHANGED</p><p className="mt-2 text-sm leading-6 text-[#D2DDD5]">8月20日仅2／11个板块录得单日正回报，5日广度降至27.3%，但20日仍为90.9%。这描述的是短期回撤发生在较广的20日背景内。</p></div><div className="border-l border-[#C99A48] pl-4"><p className="font-mono text-[10px] tracking-[0.12em] text-[#E0C27B]">WHAT CONFIRMS</p><p className="mt-2 text-sm leading-6 text-[#D2DDD5]">若5日广度、科技与可选消费在收益率／油价回落后修复，短期去风险不必升级为趋势反转。</p></div><div className="border-l border-[#C99A48] pl-4"><p className="font-mono text-[10px] tracking-[0.12em] text-[#E0C27B]">WHAT INVALIDATES</p><p className="mt-2 text-sm leading-6 text-[#D2DDD5]">若20日广度开始同步下行、能源继续独立走强且消费链扩散走弱，风险会由单日扰动升级。</p></div></div></div></div></section>

        <section className="px-5 py-16 sm:px-10 lg:px-14"><div className="mx-auto max-w-[1500px]"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="section-kicker">U.S. / SECTOR HEATMAP</p><h2 className="section-title mt-3">板块不是注脚，<br />是传导是否成立的横向证据。</h2></div><div className="flex items-center gap-2 border border-[#D8CCB7] p-1" role="group" aria-label="Heatmap return horizon">{(["oneDay", "fiveDay", "twentyDay"] as const).map((horizon) => <button key={horizon} onClick={() => setHeatmapHorizon(horizon)} className={`px-3 py-2 font-mono text-[10px] font-bold transition ${heatmapHorizon === horizon ? "bg-[#16382F] text-white" : "text-[#6A756F] hover:text-[#16382F]"}`}>{horizon === "oneDay" ? "1D" : horizon === "fiveDay" ? "5D" : "20D"}</button>)}</div></div><div className="mt-7 grid gap-8 xl:grid-cols-[1.22fr_.78fr]"><div id="heatmap-export" className="bg-[#F9F4EA] p-5 sm:p-7"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><p className="font-mono text-[10px] tracking-[0.16em] text-[#8B7451]">SELECT SECTOR SPDR ETF · {heatmapHorizon === "oneDay" ? "1D" : heatmapHorizon === "fiveDay" ? "5D" : "20D"} ADJUSTED-CLOSE RETURN</p><button onClick={() => exportSvg("heatmap-export", `equity-insight-v3-sector-heatmap-${heatmapHorizon}.png`)} className="inline-flex items-center gap-2 border border-[#B79045] px-3 py-2 font-mono text-[10px] font-bold tracking-[0.1em] text-[#775D2B] transition hover:bg-white active:scale-[0.97]"><Download size={14} /> 导出PNG</button></div><svg viewBox="0 0 660 330" className="w-full" role="img" aria-label="Sector return heatmap"><text x="0" y="18" fill="#173D35" fontFamily="IBM Plex Mono" fontSize="10">悬停任意板块查看 1D / 5D / 20D 比较</text>{orderedSectors.map((sector, index) => { const column = index % 3; const row = Math.floor(index / 3); const x = column * 218; const y = 38 + row * 66; const value = sector[heatmapHorizon]; return <g key={sector.symbol} onMouseEnter={() => setSelectedSector(sector)} onFocus={() => setSelectedSector(sector)} tabIndex={0} role="button" aria-label={`${sector.label} ${formatPct(value)}`} className="cursor-pointer outline-none"><rect x={x} y={y} width="204" height="52" fill={heatColor(value)} stroke={selectedSector.symbol === sector.symbol ? "#B58A42" : "#F9F4EA"} strokeWidth={selectedSector.symbol === sector.symbol ? "3" : "1"} /><text x={x + 12} y={y + 21} fill={value > 0 ? "#F9F4EA" : "#173D35"} fontFamily="IBM Plex Mono" fontSize="10" fontWeight="700">{sector.symbol} · {sector.label}</text><text x={x + 12} y={y + 40} fill={value > 0 ? "#F9F4EA" : "#173D35"} fontFamily="DM Serif Display, serif" fontSize="19">{formatPct(value)}</text></g>; })}</svg></div><div className="relative border-l border-[#C99A48] pl-7"><SignalTab label="SECTOR EVIDENCE" /><div className="pl-2"><div className="flex items-center gap-2 text-[#9A7230]"><MousePointer2 size={15} /><span className="font-mono text-[10px] tracking-[0.16em]">HOVER COMPARISON</span></div><h3 className="mt-4 font-display text-[32px] leading-tight">{selectedSector.symbol} / {selectedSector.label}</h3><div className="mt-5 grid grid-cols-3 gap-2 border-y border-[#DED3C2] py-5"><div><p className="font-mono text-[9px] text-[#7C7162]">1D</p><p className={`mt-1 font-mono text-lg font-bold ${selectedSector.oneDay > 0 ? "text-[#39785F]" : "text-[#B85B4E]"}`}>{formatPct(selectedSector.oneDay)}</p></div><div><p className="font-mono text-[9px] text-[#7C7162]">5D</p><p className={`mt-1 font-mono text-lg font-bold ${selectedSector.fiveDay > 0 ? "text-[#39785F]" : "text-[#B85B4E]"}`}>{formatPct(selectedSector.fiveDay)}</p></div><div><p className="font-mono text-[9px] text-[#7C7162]">20D</p><p className={`mt-1 font-mono text-lg font-bold ${selectedSector.twentyDay > 0 ? "text-[#39785F]" : "text-[#B85B4E]"}`}>{formatPct(selectedSector.twentyDay)}</p></div></div><p className="mt-5 text-sm leading-7 text-[#68756F]">8月20日，能源是唯一连续受油价变量支持的正向板块；可选消费、必选消费和医疗在当天走弱。热力图用于比较不同持有期的横向表现，不替代指数成分股层面的广度。</p></div></div></div></div></section>

        <section className="border-y border-[#E2D8C6] bg-[#EAE4D8] px-5 py-16 sm:px-10 lg:px-14"><div className="mx-auto max-w-[1500px]"><div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="section-kicker">U.S. / SELECTED EVIDENCE</p><h2 className="section-title mt-3">个股用于证明，<br />不是每日覆盖清单。</h2></div><p className="max-w-2xl text-sm leading-7 text-[#68756F]">Walmart、Deere和Moderna分别测试消费韧性、可验证的盈利修正与事件型价格回吐。它们服务于主线，不构成推荐或交易指令。</p></div><div className="mt-8 grid border-l border-t border-[#D7C6A7] lg:grid-cols-3"><article className="relative -ml-px -mt-px border border-[#D7C6A7] p-6 pl-12"><SignalTab label="CONSUMER" /><p className="font-mono text-[10px] tracking-[0.14em] text-[#9A7230]">01 / EXPECTATION GAP</p><h3 className="mt-4 font-display text-[27px]">Walmart</h3><p className="mt-2 font-mono text-[11px] font-bold text-[#B85B4E]">WMT −9.2%</p><p className="mt-4 text-sm leading-6 text-[#68756F]"><strong>Actual：</strong>可比销售+2.6%；<strong>Consensus：</strong>+3.8%；全年销售指引上调至4–5%。市场重新定价的是高油价下的消费取舍与Q3 EPS压力，而非只看全年销售上调。</p></article><article className="relative -ml-px -mt-px border border-[#D7C6A7] p-6 pl-12"><SignalTab label="EARNINGS" /><p className="font-mono text-[10px] tracking-[0.14em] text-[#9A7230]">02 / COMPANY EVIDENCE</p><h3 className="mt-4 font-display text-[27px]">Deere</h3><p className="mt-2 font-mono text-[11px] font-bold text-[#39785F]">DE +6.9%</p><p className="mt-4 text-sm leading-6 text-[#68756F]">上调全年净利润预测后仍获奖励，说明在宏观去风险中，可验证的盈利改善并未失效。下一步是分辨这种公司级改善能否扩展，或只是一家公司特例。</p></article><article className="relative -ml-px -mt-px border border-[#D7C6A7] p-6 pl-12"><SignalTab label="EVENT RISK" /><p className="font-mono text-[10px] tracking-[0.14em] text-[#9A7230]">03 / PRICE DISCIPLINE</p><h3 className="mt-4 font-display text-[27px]">Moderna</h3><p className="mt-2 font-mono text-[11px] font-bold text-[#B85B4E]">MRNA −23.5%</p><p className="mt-4 text-sm leading-6 text-[#68756F]">前日临床数据驱动的强势迅速回吐，提醒读者区分事件型跳升与持续盈利变化。它不应被外推成医疗行业的整体结论。</p></article></div></div></section>

        <section id="hk-market" className="px-5 py-16 sm:px-10 lg:px-14"><div className="mx-auto max-w-[1500px]"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="section-kicker">03 / HONG KONG MARKET</p><h2 className="section-title mt-3">港股独立阅读，<br />不做美股附录。</h2></div><p className="max-w-2xl text-sm leading-7 text-[#68756F]">港股在8月20日完成收市较强，8月21日上午延续上行；但这不是对隔夜美股风险的否定。香港中期业绩是否提供基本面承接，才是港股自身需要验证的问题。</p></div><div className="mt-9 grid gap-5 xl:grid-cols-[.9fr_1.1fr]"><div className="bg-[#153A32] p-7 text-[#F7F0E3]"><p className="font-mono text-[10px] tracking-[0.16em] text-[#E0C27B]">HK COMPLETED CLOSE / INTRADAY</p><div className="mt-7 grid grid-cols-2 gap-5"><div><p className="font-mono text-[10px] text-[#AFC0B7]">08/20 · COMPLETED CLOSE</p><p className="mt-2 font-mono text-[32px] font-semibold tracking-[-0.06em]">25,698.49</p><p className="mt-1 font-mono text-[11px] font-bold text-[#98C4AD]">+0.80%</p></div><div className="border-l border-white/15 pl-5"><p className="font-mono text-[10px] text-[#E0C27B]">08/21 · INTRADAY</p><p className="mt-2 font-mono text-[32px] font-semibold tracking-[-0.06em]">25,863.73</p><p className="mt-1 font-mono text-[11px] font-bold text-[#98C4AD]">+0.64%</p></div></div><p className="mt-7 border-t border-white/15 pt-4 text-xs leading-5 text-[#C3D0C8]">盘中数据截点：10:56:52 HKT；延迟报价，不可当作收市。</p></div><div className="relative border-l border-[#C99A48] pl-10"><SignalTab label="HK VALIDATION" /><p className="font-mono text-[10px] tracking-[0.16em] text-[#9A7230]">WHAT MATTERS IN HONG KONG</p><h3 className="mt-4 font-display text-[30px]">业绩能否提供宏观之外的基本面承接？</h3><div className="mt-5 space-y-4 text-sm leading-6 text-[#68756F]"><p><strong className="text-[#173D35]">Event：</strong>中国宏桥、中海油、紫金矿业、中兴通讯、贝壳、东方甄选等列于HKEX业绩／董事会日程。</p><p><strong className="text-[#173D35]">Positive confirmation：</strong>已披露的盈利、现金流或指引改善，令港股上涨不只依赖早盘情绪。</p><p><strong className="text-[#173D35]">Negative confirmation：</strong>业绩分化或指引转弱，令港股对隔夜美股的短线背离难以维持。</p></div></div></div></div></section>

        <section id="cross-market" className="border-y border-[#E2D8C6] bg-[#EAE4D8] px-5 py-16 sm:px-10 lg:px-14"><div className="mx-auto grid max-w-[1500px] gap-8 xl:grid-cols-[1fr_1fr]"><div><p className="section-kicker">04 / CROSS-MARKET</p><h2 className="section-title mt-3">短线背离存在，<br />但传导尚未消失。</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-[#68756F]">隔夜美股由收益率、油价与消费压力主导，港股早盘仍偏强。V3不把两者强行拼成同一条时间线，而是把它们置于同一验证问题：HK业绩基本面能否抵消或至少缓冲外部估值与消费压力？</p></div><div className="grid gap-3"><div className="border-l border-[#C99A48] bg-[#F9F4EA] p-5"><p className="font-mono text-[10px] tracking-[0.14em] text-[#9A7230]">U.S. RATES → HK VALUATION</p><p className="mt-2 text-sm leading-6 text-[#405A51]">若美债长端和油价续升，港股早盘强势需要更强的公司业绩与流动性证据来维持；单靠指数方向不足以确认趋势。</p></div><div className="border-l border-[#C99A48] bg-[#F9F4EA] p-5"><p className="font-mono text-[10px] tracking-[0.14em] text-[#9A7230]">HK EARNINGS → ADR / SUPPLY CHAIN</p><p className="mt-2 text-sm leading-6 text-[#405A51]">仅当已披露的香港公司业绩对中国ADR、能源／金属链或相关供应链具备可验证影响时，才升级为跨市场read-through。</p></div><div className="border-l border-[#C99A48] bg-[#F9F4EA] p-5"><p className="font-mono text-[10px] tracking-[0.14em] text-[#9A7230]">STATUS</p><p className="mt-2 text-sm leading-6 text-[#405A51]">当前为 <strong>UNRESOLVED</strong>：港股早盘偏强提供短线反证，但不足以推翻美股的宏观／消费主线。</p></div></div></div></section>

        <section id="sources" className="relative overflow-hidden bg-[#10342D] px-5 py-14 text-[#F7F0E3] sm:px-10 lg:px-14"><div className="absolute left-0 top-0 h-full w-1 bg-[#C99A48]" /><div className="mx-auto grid max-w-[1500px] gap-9 xl:grid-cols-[.9fr_1.1fr]"><div><p className="font-mono text-[10px] tracking-[0.16em] text-[#E0C27B]">05 / SOURCE LEDGER</p><h2 className="mt-4 font-display text-[38px] leading-tight">主页面保持快，<br />证据保持可追溯。</h2><p className="mt-5 max-w-lg text-sm leading-7 text-[#D0DBD4]">价格和行业数据清楚区分完成收市、延迟盘中与板块代理。5／20日图表使用11个Select Sector SPDR ETF的Yahoo Finance adjusted close；它不代表NYSE／Nasdaq成分股广度。</p><p className="mt-5 font-mono text-[10px] tracking-[0.12em] text-[#AFC0B7]">DATA RETRIEVED 2026-08-21T03:42:54Z · US CLOSE AS OF 2026-08-20</p></div><div className="grid border-t border-white/15 sm:grid-cols-2">{[["Reuters · U.S. close", "https://www.reuters.com/business/us-stock-futures-muted-bond-yields-resume-uptrend-ahead-walmarts-earnings-2026-08-20/"], ["Reuters · Walmart Q2", "https://www.reuters.com/business/walmart-reports-rare-comparable-sales-miss-consumers-pare-back-spending-2026-08-20/"], ["Yahoo Finance · sector ETF charts", "https://finance.yahoo.com/quote/XLE/history/"], ["Yahoo Finance · HSI delayed quote", "https://finance.yahoo.com/quote/%5EHSI/"], ["HKEX · board-meeting diary", "https://www3.hkexnews.hk/reports/bmn/ebmn_c.htm"], ["Schwab · market calendar", "https://www.schwab.com/learn/story/stock-market-update-open"]].map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-white/15 py-4 text-sm text-[#E4E0D6] transition hover:text-[#E0C27B] sm:odd:pr-6 sm:even:pl-6"><span>{label}</span><ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>)}</div></div></section>
      </main>
      <footer className="border-t border-[#E0D5C3] bg-[#F3EFE6] px-5 py-7 text-xs text-[#6D7871] sm:px-10 lg:px-14"><div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-3 sm:flex-row"><p>EQUITY / INSIGHT · RESEARCH EDITION · 2026.08.21</p><p>AI辅助内部市场研究；不构成个性化投资建议、证券推荐、买卖／沽空指令或任何回报保证。</p></div></footer>
    </div>
  </div>;
}
