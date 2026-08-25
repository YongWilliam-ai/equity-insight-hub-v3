/**
 * BIT Daily Hub enhancement — preserves the approved white / black / BIT Blue editorial system.
 * Product motif: a restrained fixed archive control plus evidence-led appendices; no speculative market calls.
 */
import { Archive, ArrowUpRight, CalendarDays, Clock3, Layers3, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import DailyAug25Full from "./DailyAug25Full";

type Language = "TW" | "CN" | "EN";
const base = import.meta.env.BASE_URL;

const copy: Record<Language, any> = {
  TW: {
    archive: "版本庫", archiveTitle: "每日版本庫", latest: "最新定稿", open: "開啟版本", canonical: "固定每日入口", canonicalBody: "此根網址永遠顯示最新已批准版本；歷史版本以日期保存，不會被新報告覆蓋。",
    signalKicker: "研究深度／訊號池", signalTitle: "由政策、價格與事件組成的訊號棧，而不是新聞清單。", signalBody: "本層沿用每日晨報的資訊密度，但只保留可回到來源、可被下一個數據點驗證的訊號。",
    labels: ["已核實政策", "完成市場價格", "已排期基本面測試"],
    signals: [["對伊經濟行動", "美國財政部的Operation Economic Outcast屬已核實政策背景；只有油價、運費、通脹或公司證據出現時，才升格為價格傳導。", "Tier 1 · Treasury"], ["科技／金融分化", "8月24日完成美股時段由科技和晶片承壓、金融支撐道指構成；它建立板塊分化事實，未證明單一因果。", "Tier 2 · Reuters / CNBC"], ["NVIDIA財報", "FY27 Q2已排期於8月26日14:00 PT；資料中心需求、交付節奏與前瞻指引才是AI鏈的下一個直接證據。", "Tier 1 · NVIDIA IR"]],
    hkKicker: "香港／雙時鐘研究", hkTitle: "把09:00–16:00 HKT市場窗口、盤中快照與完成收市放在不同證據層。", hkBody: "港股不是美股完成收市的附註。它需要自己的交易節奏、資料服務狀態與收市後歸檔邏輯。",
    phases: [["09:00–09:30", "開市前集合時段", "只可標示競價／開市前背景；不得把它視為連續交易價格或收市。"], ["09:30–12:00", "上午連續交易", "可發布有來源、時間戳與服務狀態的盤中快照；不可代替完成收市。"], ["12:00–13:00", "午間休市", "凍結上午資料；若沒有新官方資料，維持『等待下午交易』，不延伸盤中推論。"], ["13:00–16:00+", "下午交易與收市競價", "只有官方完成收市、成交和公司／板塊證據到位後，才建立當日HK結論並存入版本庫。"]],
    stateTitle: "本版港股資料狀態", stateBody: "8月25日10:36 HKT官方HSI快照為25,478.38、-0.15%；供應商披露系統故障及有限15分鐘更新。它維持為『盤中／受限』，不是港股收市。",
    handoffTitle: "跨時鐘交接", handoffBody: "上一個美股完成時段 → 港股上午／下午條件 → 下一美股盤前催化劑。三者按時間排列，避免把不同市場日混成同一條價格敘事。",
    dates: [["2026-08-25", "25 Aug · Daily", "最新：美股8月24日完成時段／港股盤中快照"], ["2026-08-24", "24 Aug · Weekend", "週末研究、This Week驗證層及完整來源審計"], ["2026-08-21", "21 Aug · Historical", "完整歷史研究與雙閱讀模式"]]
  },
  CN: {
    archive: "版本库", archiveTitle: "每日版本库", latest: "最新定稿", open: "打开版本", canonical: "固定每日入口", canonicalBody: "此根网址永远显示最新已批准版本；历史版本以日期保存，不会被新报告覆盖。",
    signalKicker: "研究深度／信号池", signalTitle: "由政策、价格与事件组成的信号栈，而不是新闻清单。", signalBody: "本层沿用每日晨报的信息密度，但只保留可回到来源、可被下一个数据点验证的信号。",
    labels: ["已核实政策", "完成市场价格", "已排期基本面测试"],
    signals: [["对伊经济行动", "美国财政部的Operation Economic Outcast属已核实政策背景；只有油价、运费、通胀或公司证据出现时，才升级为价格传导。", "Tier 1 · Treasury"], ["科技／金融分化", "8月24日完成美股时段由科技和芯片承压、金融支撑道指构成；它建立板块分化事实，未证明单一因果。", "Tier 2 · Reuters / CNBC"], ["NVIDIA财报", "FY27 Q2已排期于8月26日14:00 PT；数据中心需求、交付节奏与前瞻指引才是AI链的下一个直接证据。", "Tier 1 · NVIDIA IR"]],
    hkKicker: "香港／双时钟研究", hkTitle: "把09:00–16:00 HKT市场窗口、盘中快照与完成收市放在不同证据层。", hkBody: "港股不是美股完成收市的附注。它需要自己的交易节奏、数据服务状态与收市后归档逻辑。",
    phases: [["09:00–09:30", "开市前集合时段", "只可标示竞价／开市前背景；不得把它视为连续交易价格或收市。"], ["09:30–12:00", "上午连续交易", "可发布有来源、时间戳与服务状态的盘中快照；不可代替完成收市。"], ["12:00–13:00", "午间休市", "冻结上午资料；若没有新官方资料，维持“等待下午交易”，不延伸盘中推论。"], ["13:00–16:00+", "下午交易与收市竞价", "只有官方完成收市、成交和公司／板块证据到位后，才建立当日HK结论并存入版本库。"]],
    stateTitle: "本版港股数据状态", stateBody: "8月25日10:36 HKT官方HSI快照为25,478.38、-0.15%；供应商披露系统故障及有限15分钟更新。它维持为“盘中／受限”，不是港股收市。",
    handoffTitle: "跨时钟交接", handoffBody: "上一个美股完成时段 → 港股上午／下午条件 → 下一美股盘前催化剂。三者按时间排列，避免把不同市场日混成同一条价格叙事。",
    dates: [["2026-08-25", "25 Aug · Daily", "最新：美股8月24日完成时段／港股盘中快照"], ["2026-08-24", "24 Aug · Weekend", "周末研究、This Week验证层及完整来源审计"], ["2026-08-21", "21 Aug · Historical", "完整历史研究与双阅读模式"]]
  },
  EN: {
    archive: "Edition archive", archiveTitle: "Daily edition archive", latest: "Latest approved", open: "Open edition", canonical: "Stable daily entry", canonicalBody: "This root URL always opens the latest approved edition. Previous editions remain date-addressable and are not overwritten by a new report.",
    signalKicker: "RESEARCH DEPTH / SIGNAL POOL", signalTitle: "A signal stack built from policy, price and events—not a list of headlines.", signalBody: "This layer adopts the density of a morning brief while retaining only signals that can be traced to a source and tested by the next data point.",
    labels: ["Verified policy", "Completed market price", "Scheduled fundamental test"],
    signals: [["Iran economic action", "Treasury’s Operation Economic Outcast is verified policy context. It becomes price transmission only if oil, freight, inflation or company evidence appears.", "Tier 1 · Treasury"], ["Technology / financial split", "The completed 24 August U.S. session established technology and chip pressure alongside financial support for the Dow; it did not prove a single cause.", "Tier 2 · Reuters / CNBC"], ["NVIDIA results", "FY27 Q2 is scheduled for 26 Aug 14:00 PT. Data-centre demand, deliveries and outlook are the next direct AI-chain evidence.", "Tier 1 · NVIDIA IR"]],
    hkKicker: "HONG KONG / DUAL-CLOCK RESEARCH", hkTitle: "Keep the 09:00–16:00 HKT market window, intraday snapshots and completed closes on separate evidence layers.", hkBody: "Hong Kong is not a footnote to the completed U.S. close. It needs its own trading cadence, data-service state and post-close archive logic.",
    phases: [["09:00–09:30", "Pre-opening", "Label auction / pre-open context only; never present it as continuous trading or a close."], ["09:30–12:00", "Morning continuous trading", "An intraday snapshot may be shown only with its source, timestamp and service-status boundary; it never replaces a completed close."], ["12:00–13:00", "Midday break", "Freeze the morning evidence. If no new official data exists, retain a waiting-for-afternoon state rather than extend intraday inference."], ["13:00–16:00+", "Afternoon trading and closing auction", "Create a Hong Kong conclusion and archive edition only after official completed-close, turnover and company / sector evidence are available."]],
    stateTitle: "Current Hong Kong data state", stateBody: "The 25 Aug 10:36 HKT official HSI snapshot was 25,478.38, -0.15%; the provider disclosed a systems outage and limited 15-minute updates. It remains intraday / constrained—not a Hong Kong close.",
    handoffTitle: "Cross-clock handoff", handoffBody: "Last completed U.S. session → Hong Kong morning / afternoon conditions → next U.S. pre-market catalysts. The sequence avoids presenting different market days as one price narrative.",
    dates: [["2026-08-25", "25 Aug · Daily", "Latest: U.S. 24 Aug completed session / Hong Kong intraday snapshot"], ["2026-08-24", "24 Aug · Weekend", "Weekend research, This Week verification layer and full source audit"], ["2026-08-21", "21 Aug · Historical", "Full historical research and both reading modes"]]
  }
};

export default function DailyHubAug25() {
  const [locationVersion, setLocationVersion] = useState(0);
  useEffect(() => { const sync = () => setLocationVersion(v => v + 1); window.addEventListener("bit-location", sync); window.addEventListener("popstate", sync); return () => { window.removeEventListener("bit-location", sync); window.removeEventListener("popstate", sync); }; }, []);
  const query = new URLSearchParams(window.location.search);
  const language = (["TW", "CN", "EN"].includes(query.get("lang") || "") ? query.get("lang") : "CN") as Language;
  const market = query.get("market") || "overview";
  const [archiveOpen, setArchiveOpen] = useState(false);
  const t = copy[language];
  void locationVersion;

  return <div className="bit-v3 relative bg-white text-[#0A0D14]">
    <DailyAug25Full />
    {market === "overview" && <SignalStack t={t}/>} 
    {market === "hk" && <HongKongDualClock t={t}/>} 
    <button onClick={() => setArchiveOpen(true)} className="bit-action fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-[10px] border border-[#0040FF] bg-white px-4 py-3 text-xs font-bold text-[#0040FF] shadow-[0_12px_34px_rgba(10,13,20,.16)]" aria-label={t.archive}><Archive size={16}/><span className="hidden sm:inline">{t.archive}</span></button>
    {archiveOpen && <div className="fixed inset-0 z-50 flex justify-end bg-[#0A0D14]/25 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={t.archiveTitle}>
      <aside className="h-full w-full max-w-[440px] overflow-y-auto rounded-[14px] bg-white p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="section-kicker">BIT DAILY HUB</p><h2 className="mt-3 font-display text-3xl">{t.archiveTitle}</h2></div><button onClick={() => setArchiveOpen(false)} className="bit-action rounded-[8px] border border-[#E4E6EA] p-2 text-[#59657A]" aria-label="Close"><X size={18}/></button></div><div className="mt-7 rounded-[10px] border-l-2 border-[#0040FF] bg-[#F5F7FA] p-5"><p className="font-mono text-[10px] font-bold tracking-[.14em] text-[#0040FF]">{t.canonical.toUpperCase()}</p><p className="mt-3 text-sm leading-6 text-[#59657A]">{t.canonicalBody}</p><a href={`${base}?lang=${language}`} className="bit-action mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#0040FF]"><ArrowUpRight size={14}/>{t.latest}</a></div><div className="mt-7 space-y-3">{t.dates.map((row: string[], i: number) => <a key={row[0]} href={`${base}?${row[0] === "2026-08-25" ? "" : `date=${row[0]}&`}lang=${language}`} className="group block rounded-[10px] border border-[#E4E6EA] p-5 transition hover:border-[#0040FF]"><div className="flex items-center justify-between gap-4"><p className="font-mono text-[11px] font-bold tracking-[.13em] text-[#0040FF]">{row[1]}</p>{i === 0 && <span className="rounded-full bg-[#E8F0FF] px-2 py-1 font-mono text-[9px] font-bold text-[#0040FF]">{t.latest}</span>}</div><p className="mt-3 text-sm leading-6 text-[#59657A]">{row[2]}</p><p className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#0A0D14]">{t.open}<ArrowUpRight size={13}/></p></a>)}</div></aside>
    </div>}
  </div>;
}

function SignalStack({ t }: { t: any }) {
  return <section className="border-t border-[#E4E6EA] bg-[#F5F7FA] px-5 py-14 sm:px-10 lg:px-[var(--layout-padding)]"><div className="mx-auto max-w-[1200px]"><div className="max-w-4xl"><p className="section-kicker">{t.signalKicker}</p><h2 className="mt-3 font-display text-4xl leading-tight text-[#0A0D14] sm:text-5xl">{t.signalTitle}</h2><p className="mt-5 text-[16px] leading-8 text-[#59657A]">{t.signalBody}</p></div><div className="mt-8 grid gap-5 lg:grid-cols-3">{t.signals.map((row: string[], i: number) => <article key={row[0]} className="rounded-[12px] border border-[#E4E6EA] bg-white p-6"><div className="flex items-center justify-between gap-4"><p className="font-mono text-[10px] font-bold tracking-[.14em] text-[#0040FF]">0{i + 1} · {t.labels[i]}</p><ShieldCheck size={16} className="text-[#0040FF]"/></div><h3 className="mt-5 font-display text-2xl">{row[0]}</h3><p className="mt-5 text-sm leading-7 text-[#59657A]">{row[1]}</p><p className="mt-5 border-t border-[#E4E6EA] pt-4 font-mono text-[10px] font-bold tracking-[.1em] text-[#59657A]">{row[2]}</p></article>)}</div></div></section>;
}

function HongKongDualClock({ t }: { t: any }) {
  return <section className="border-t border-[#E4E6EA] bg-[#F5F7FA] px-5 py-14 sm:px-10 lg:px-[var(--layout-padding)]"><div className="mx-auto max-w-[1200px]"><div className="max-w-4xl"><p className="section-kicker">{t.hkKicker}</p><h2 className="mt-3 font-display text-4xl leading-tight text-[#0A0D14] sm:text-5xl">{t.hkTitle}</h2><p className="mt-5 text-[16px] leading-8 text-[#59657A]">{t.hkBody}</p></div><div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{t.phases.map((row: string[], i: number) => <article key={row[0]} className="rounded-[12px] border border-[#E4E6EA] bg-white p-5"><div className="flex items-center justify-between"><p className="font-mono text-[10px] font-bold tracking-[.14em] text-[#0040FF]">0{i + 1}</p><Clock3 size={16} className="text-[#0040FF]"/></div><p className="mt-5 font-mono text-lg font-bold">{row[0]} HKT</p><h3 className="mt-3 font-display text-xl">{row[1]}</h3><p className="mt-4 text-sm leading-6 text-[#59657A]">{row[2]}</p></article>)}</div><div className="mt-8 grid gap-5 lg:grid-cols-2"><article className="rounded-[12px] border-l-2 border-[#F6C82A] bg-white p-6"><p className="font-mono text-[10px] font-bold tracking-[.14em] text-[#765D00]">{t.stateTitle.toUpperCase()}</p><p className="mt-4 text-[15px] leading-7 text-[#0A0D14]">{t.stateBody}</p></article><article className="rounded-[12px] bg-[#0A0D14] p-6 text-white"><p className="font-mono text-[10px] font-bold tracking-[.14em] text-[#478DFF]">{t.handoffTitle.toUpperCase()}</p><p className="mt-4 text-[15px] leading-7 text-[#EDF1F7]">{t.handoffBody}</p></article></div><p className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] tracking-[.12em] text-[#59657A]"><Layers3 size={14}/>{t.hkKicker}</p></div></section>;
}
