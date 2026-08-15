import { useState, useEffect, useRef, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Legend, AreaChart, Area,
  ComposedChart, Scatter
} from "recharts";

// ── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#080c12",
  panel: "#0f1520",
  panelHover: "#131c2b",
  border: "#1e2d42",
  borderBright: "#2a3f5a",
  green: "#b5f333",
  greenDim: "#7aaa1a",
  cyan: "#00d8ff",
  cyanDim: "#0095b3",
  purple: "#a78bfa",
  purpleDim: "#6d5cbf",
  orange: "#fb923c",
  pink: "#f472b6",
  text: "#e6edf3",
  textSoft: "#94a3b8",
  muted: "#4a5c72",
  card: "#111926",
  cardHover: "#162030",
  glass: "rgba(15,21,32,0.85)",
};
const ACCENTS = [C.green, C.cyan, C.purple, C.orange, C.pink, "#34d399", "#fbbf24", "#60a5fa"];

// ── DATASETS ─────────────────────────────────────────────────────────────────
const RAW_TECH = [
  { name:"Python", cat:"Programming Language", year:1991, license:"Open-source", community:"High, very active community", jobs:"Data Scientist, Developer" },
  { name:"Java", cat:"Programming Language", year:1995, license:"Open-source", community:"High, large community", jobs:"Software Engineer, Backend Developer" },
  { name:"JavaScript", cat:"Programming Language", year:1995, license:"Open-source", community:"Very high, global community", jobs:"Frontend Developer, Full-stack Developer" },
  { name:"C++", cat:"Programming Language", year:1985, license:"Open-source", community:"High, active community", jobs:"Game Developer, Systems Engineer" },
  { name:"C#", cat:"Programming Language", year:2000, license:"Proprietary", community:"High, strong .NET community", jobs:"Backend Developer, Software Engineer" },
  { name:"Ruby", cat:"Programming Language", year:1995, license:"Open-source", community:"Medium, growing community", jobs:"Full-stack Developer, Web Developer" },
  { name:"PHP", cat:"Programming Language", year:1995, license:"Open-source", community:"Large, active community", jobs:"Web Developer, Backend Developer" },
  { name:"Swift", cat:"Programming Language", year:2014, license:"Open-source", community:"High, active community", jobs:"iOS Developer, Mobile App Developer" },
  { name:"Go", cat:"Programming Language", year:2009, license:"Open-source", community:"High, growing community", jobs:"Backend Developer, Cloud Engineer" },
  { name:"Rust", cat:"Programming Language", year:2010, license:"Open-source", community:"High, rapidly growing community", jobs:"Systems Engineer, Embedded Developer" },
  { name:"TypeScript", cat:"Programming Language", year:2012, license:"Open-source", community:"High, active community", jobs:"Frontend Developer, Full-stack Developer" },
  { name:"Node.js", cat:"Runtime Environment", year:2009, license:"Open-source", community:"Very high, global community", jobs:"Backend Developer, Full-stack Developer" },
  { name:"React", cat:"Library", year:2013, license:"Open-source", community:"Very high, active community", jobs:"Frontend Developer, Full-stack Developer" },
  { name:"Angular", cat:"Framework", year:2010, license:"Open-source", community:"High, large community", jobs:"Frontend Developer, Full-stack Developer" },
  { name:"Vue.js", cat:"Framework", year:2014, license:"Open-source", community:"High, growing community", jobs:"Frontend Developer, Full-stack Developer" },
  { name:"Django", cat:"Framework", year:2005, license:"Open-source", community:"High, very active community", jobs:"Backend Developer, Python Developer" },
  { name:"Flask", cat:"Framework", year:2010, license:"Open-source", community:"High, growing community", jobs:"Backend Developer, Python Developer" },
  { name:"Spring Boot", cat:"Framework", year:2018, license:"Open-source", community:"High, large community", jobs:"Backend Developer, Java Developer" },
  { name:"TensorFlow", cat:"Library", year:2015, license:"Open-source", community:"High, rapidly growing community", jobs:"ML Engineer, AI Researcher" },
  { name:"PyTorch", cat:"Library", year:2016, license:"Open-source", community:"High, rapidly growing community", jobs:"AI Researcher, ML Engineer" },
  { name:"Scikit-learn", cat:"Library", year:2007, license:"Open-source", community:"High, stable community", jobs:"Data Scientist, ML Engineer" },
  { name:"Docker", cat:"Platform", year:2013, license:"Open-source", community:"Very high, active community", jobs:"DevOps Engineer, Cloud Engineer" },
  { name:"Kubernetes", cat:"Platform", year:2014, license:"Open-source", community:"Very high, growing community", jobs:"Cloud Engineer, DevOps Engineer" },
  { name:"AWS", cat:"Cloud Platform", year:2006, license:"Proprietary", community:"Very high, massive community", jobs:"Cloud Engineer, DevOps Engineer" },
  { name:"Google Cloud", cat:"Cloud Platform", year:2008, license:"Proprietary", community:"Very high, growing community", jobs:"Cloud Engineer, DevOps Engineer" },
  { name:"Microsoft Azure", cat:"Cloud Platform", year:2010, license:"Proprietary", community:"Very high, growing community", jobs:"Cloud Engineer, DevOps Engineer" },
  { name:"Blockchain", cat:"Technology", year:2008, license:"Open-source", community:"Very high, growing community", jobs:"Blockchain Developer, Crypto Developer" },
  { name:"Machine Learning", cat:"Technology", year:1959, license:"Open-source, Proprietary", community:"Very high, growing community", jobs:"Data Scientist, ML Engineer" },
  { name:"5G", cat:"Technology", year:2019, license:"Proprietary", community:"Very high, growing community", jobs:"Telecom Engineer, Network Engineer" },
  { name:"AR", cat:"Technology", year:1990, license:"Proprietary, Open-source", community:"High, growing community", jobs:"AR Developer, Game Developer" },
];

const FUNDING_RECS = [
  { agency:"NSF — National Science Foundation", domain:"AI & Machine Learning", eligibility:"PhD researchers, postdocs", matchScore:94, deadline:"2025-09-15", amount:"$450K", priority:"High", status:"Open" },
  { agency:"NIH — National Institutes of Health", domain:"Biomedical Engineering", eligibility:"US institutions", matchScore:87, deadline:"2025-08-30", amount:"$1.2M", priority:"High", status:"Open" },
  { agency:"DARPA — Defense Advanced Research", domain:"Cybersecurity", eligibility:"Security clearance required", matchScore:72, deadline:"2025-10-01", amount:"$800K", priority:"Medium", status:"Open" },
  { agency:"EU Horizon Europe", domain:"Sustainability & Climate", eligibility:"EU member state institutions", matchScore:68, deadline:"2025-11-20", amount:"€2.1M", priority:"Medium", status:"Open" },
  { agency:"Gates Foundation", domain:"Global Health & Dev", eligibility:"NGOs and research bodies", matchScore:61, deadline:"2026-01-15", amount:"$500K", priority:"Low", status:"Review" },
  { agency:"DOE — Dept. of Energy", domain:"Renewable Energy", eligibility:"US universities & labs", matchScore:55, deadline:"2026-02-28", amount:"$900K", priority:"Low", status:"Open" },
];

const PUB_TREND = [
  { month:"Jan", publications:12, citations:89, hIndex:14 },
  { month:"Feb", publications:18, citations:112, hIndex:15 },
  { month:"Mar", publications:14, citations:134, hIndex:15 },
  { month:"Apr", publications:22, citations:198, hIndex:17 },
  { month:"May", publications:28, citations:245, hIndex:18 },
  { month:"Jun", publications:19, citations:210, hIndex:18 },
  { month:"Jul", publications:31, citations:289, hIndex:20 },
  { month:"Aug", publications:25, citations:312, hIndex:21 },
  { month:"Sep", publications:34, citations:380, hIndex:22 },
  { month:"Oct", publications:29, citations:344, hIndex:22 },
  { month:"Nov", publications:38, citations:420, hIndex:24 },
  { month:"Dec", publications:42, citations:467, hIndex:25 },
];

const PATENT_DATA = [
  { month:"Q1 23", filed:4, approved:2, pending:3, commercialized:1 },
  { month:"Q2 23", filed:6, approved:3, pending:4, commercialized:1 },
  { month:"Q3 23", filed:5, approved:4, pending:5, commercialized:2 },
  { month:"Q4 23", filed:9, approved:5, pending:6, commercialized:2 },
  { month:"Q1 24", filed:11, approved:7, pending:8, commercialized:3 },
  { month:"Q2 24", filed:13, approved:9, pending:7, commercialized:4 },
  { month:"Q3 24", filed:16, approved:11, pending:9, commercialized:5 },
  { month:"Q4 24", filed:18, approved:13, pending:10, commercialized:6 },
];

const GEO_DATA = [
  { country:"United States", funding:4.2, publications:1840, patents:320, flag:"🇺🇸" },
  { country:"China", funding:3.8, publications:2100, patents:410, flag:"🇨🇳" },
  { country:"Germany", funding:2.1, publications:980, patents:180, flag:"🇩🇪" },
  { country:"United Kingdom", funding:1.9, publications:870, patents:150, flag:"🇬🇧" },
  { country:"Japan", funding:1.7, publications:760, patents:290, flag:"🇯🇵" },
  { country:"India", funding:0.9, publications:640, patents:95, flag:"🇮🇳" },
  { country:"Canada", funding:1.1, publications:520, patents:88, flag:"🇨🇦" },
  { country:"South Korea", funding:1.4, publications:680, patents:210, flag:"🇰🇷" },
];

const TRENDING_DOMAINS = [
  { domain:"Generative AI", growth:"+142%", score:96, color:C.green },
  { domain:"Quantum Computing", growth:"+89%", score:83, color:C.cyan },
  { domain:"Federated Learning", growth:"+76%", score:78, color:C.purple },
  { domain:"Brain-Computer Interfaces", growth:"+65%", score:72, color:C.orange },
  { domain:"Green Hydrogen", growth:"+58%", score:68, color:"#34d399" },
  { domain:"Edge AI Inference", growth:"+54%", score:65, color:C.pink },
];

const FORECAST = [
  { year:"2024", actual:312, forecast:312 },
  { year:"2025", actual:null, forecast:389 },
  { year:"2026", actual:null, forecast:468 },
  { year:"2027", actual:null, forecast:562 },
];

const AI_GRANTS = [
  { title:"NSF AI Institute for Future Edge Networks", amount:"$20M", fit:97, deadline:"Sep 2025", type:"Federal" },
  { title:"Microsoft Research Collaboration Grant", amount:"$150K", fit:91, deadline:"Aug 2025", type:"Industry" },
  { title:"Google Research Scholar Program", amount:"$60K", fit:88, deadline:"Oct 2025", type:"Industry" },
  { title:"Sloan Foundation Research Grant", amount:"$400K", fit:84, deadline:"Nov 2025", type:"Foundation" },
];
const AI_JOURNALS = [
  { name:"Nature Machine Intelligence", impactFactor:25.9, openAccess:true, acceptRate:"8%" },
  { name:"IEEE Transactions on Neural Networks", impactFactor:14.3, openAccess:false, acceptRate:"15%" },
  { name:"Journal of Artificial Intelligence Research", impactFactor:7.1, openAccess:true, acceptRate:"22%" },
  { name:"ACM Computing Surveys", impactFactor:16.6, openAccess:false, acceptRate:"12%" },
];
const AI_PATENT_OPP = [
  { title:"Adaptive Federated Learning for Edge Devices", relevance:94, org:"Your research area" },
  { title:"Privacy-Preserving Neural Architecture Search", relevance:87, org:"Adjacent domain" },
  { title:"Lightweight Transformer Compression Pipeline", relevance:81, org:"Publication match" },
];
const AI_EMERGING = [
  { tech:"Multimodal Foundation Models", maturity:"Early", opportunity:"High" },
  { tech:"Neuromorphic Computing", maturity:"Research", opportunity:"High" },
  { tech:"Synthetic Data Generation", maturity:"Growing", opportunity:"Medium" },
  { tech:"AI-Driven Drug Discovery", maturity:"Early", opportunity:"Very High" },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────
const communityScore = c => c.includes("Very high") ? 4 : c.includes("Large") ? 3 : c.includes("High") ? 2 : 1;

const catCount = {};
RAW_TECH.forEach(d => { catCount[d.cat] = (catCount[d.cat] || 0) + 1; });
const categoryData = Object.entries(catCount)
  .map(([cat, count]) => ({ cat: cat.length > 14 ? cat.slice(0, 13) + "…" : cat, count }))
  .sort((a, b) => b.count - a.count).slice(0, 8);

const licenseData = [
  { name: "Open-source", value: RAW_TECH.filter(d => d.license.includes("Open-source")).length },
  { name: "Proprietary", value: RAW_TECH.filter(d => d.license.includes("Proprietary")).length },
];

const radarData = [
  { subject: "Libraries", A: RAW_TECH.filter(d => d.cat === "Library").length * 8 },
  { subject: "Frameworks", A: RAW_TECH.filter(d => d.cat === "Framework").length * 8 },
  { subject: "Platforms", A: RAW_TECH.filter(d => d.cat === "Platform").length * 10 },
  { subject: "Languages", A: RAW_TECH.filter(d => d.cat === "Programming Language").length * 5 },
  { subject: "Cloud", A: RAW_TECH.filter(d => d.cat === "Cloud Platform").length * 15 },
  { subject: "Tools", A: RAW_TECH.filter(d => ["Tool", "Version Control", "Architecture"].includes(d.cat)).length * 12 },
];

const exportCSV = (data, filename) => {
  if (!data.length) return;
  const keys = Object.keys(data[0]);
  const csv = [keys.join(","), ...data.map(row => keys.map(k => JSON.stringify(row[k] ?? "")).join(","))].join("\n");
  const a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  a.download = filename + ".csv";
  a.click();
};

// ── REUSABLE COMPONENTS ───────────────────────────────────────────────────────
const Panel = ({ children, style = {}, glow = false }) => (
  <div style={{
    background: C.panel,
    border: `1px solid ${glow ? C.borderBright : C.border}`,
    borderRadius: 14,
    padding: "18px 20px",
    boxShadow: glow ? `0 0 24px rgba(181,243,51,0.04)` : "none",
    transition: "border-color 0.2s",
    ...style
  }}>{children}</div>
);

const SectionTitle = ({ children, accent = C.muted }) => (
  <div style={{ fontSize: 10, fontWeight: 800, color: accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
    <span style={{ width: 3, height: 14, borderRadius: 2, background: accent, display: "inline-block", flexShrink: 0 }} />
    {children}
  </div>
);

const Badge = ({ children, color = C.green, size = "sm" }) => (
  <span style={{
    background: `${color}18`,
    border: `1px solid ${color}35`,
    color,
    fontSize: size === "sm" ? 10 : 12,
    fontWeight: 700,
    borderRadius: 20,
    padding: size === "sm" ? "2px 9px" : "4px 12px",
    whiteSpace: "nowrap",
    letterSpacing: 0.3,
  }}>{children}</span>
);

const KPICard = ({ label, value, sub, accent = C.green, delta, icon }) => (
  <div style={{
    background: C.panel,
    border: `1px solid ${C.border}`,
    borderRadius: 14,
    padding: "16px 18px",
    flex: 1,
    minWidth: 140,
    position: "relative",
    overflow: "hidden",
    transition: "border-color 0.2s, transform 0.15s",
    cursor: "default",
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderBright; e.currentTarget.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}
  >
    <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, borderRadius: "0 14px 0 60px", background: `${accent}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{icon}</div>
    <div style={{ fontSize: 28, fontWeight: 800, color: accent, letterSpacing: -1.5, lineHeight: 1, fontFamily: "'Space Grotesk',sans-serif" }}>{value}</div>
    <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginTop: 6 }}>{label}</div>
    {sub && <div style={{ fontSize: 10, color: C.textSoft, marginTop: 3 }}>{sub}</div>}
    {delta && (
      <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ fontSize: 10, color: delta.startsWith("+") ? C.green : C.orange, fontWeight: 700, background: delta.startsWith("+") ? `${C.green}15` : `${C.orange}15`, borderRadius: 10, padding: "2px 7px" }}>
          {delta.startsWith("+") ? "▲" : "▼"} {delta}
        </span>
        <span style={{ fontSize: 10, color: C.muted }}>vs last year</span>
      </div>
    )}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.borderBright}`, borderRadius: 10, padding: "10px 14px", fontSize: 11, color: C.text, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
      <div style={{ fontWeight: 800, marginBottom: 6, color: C.green, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color, display: "inline-block" }} />
          <span style={{ color: C.textSoft }}>{p.name || "Value"}</span>
          <span style={{ color: C.text, fontWeight: 700, marginLeft: "auto" }}>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  );
};

const GaugeChart = ({ score, size = 160 }) => {
  const r = size * 0.35, cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const arc = circ * 0.75;
  const dash = (score / 100) * arc;
  const color = score >= 80 ? C.green : score >= 60 ? C.orange : "#ef4444";
  return (
    <svg width={size} height={size * 0.8} viewBox={`0 0 ${size} ${size * 0.8}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.border} strokeWidth={10}
        strokeDasharray={`${arc} ${circ}`} strokeDashoffset={-circ * 0.125} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={10}
        strokeDasharray={`${dash} ${circ}`} strokeDashoffset={-circ * 0.125} strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 10px ${color}80)`, transition: "stroke-dasharray 1s ease" }} />
      <text x={cx} y={cy - 4} textAnchor="middle" fill={color} fontSize={size * 0.18} fontWeight={800} fontFamily="Space Grotesk">{score}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill={C.muted} fontSize={10}>/ 100</text>
    </svg>
  );
};

const ProgressBar = ({ value, color = C.green, label, max = 100 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
    <span style={{ width: 80, fontSize: 10, color: C.textSoft, textAlign: "right", flexShrink: 0 }}>{label}</span>
    <div style={{ flex: 1, height: 5, background: C.border, borderRadius: 10, overflow: "hidden" }}>
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 10, boxShadow: `0 0 8px ${color}60`, transition: "width 1s ease" }} />
    </div>
    <span style={{ fontSize: 11, fontWeight: 700, color, width: 28, textAlign: "right" }}>{value}</span>
  </div>
);

const SearchBar = ({ value, onChange, placeholder = "Search…" }) => (
  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
    <span style={{ position: "absolute", left: 10, color: C.muted, fontSize: 12, pointerEvents: "none" }}>🔍</span>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px 6px 28px", color: C.text, fontSize: 11, outline: "none", width: 200, transition: "border-color 0.2s" }}
      onFocus={e => e.target.style.borderColor = C.borderBright}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  </div>
);

const Pill = ({ children, active, onClick, accent = C.green }) => (
  <button onClick={onClick} style={{
    background: active ? `${accent}18` : "transparent",
    border: `1px solid ${active ? accent + "40" : C.border}`,
    color: active ? accent : C.textSoft,
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 10,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: 0.5,
    transition: "all 0.15s",
  }}>{children}</button>
);

const Divider = () => <div style={{ height: 1, background: C.border, margin: "16px 0" }} />;

// ── SECTION VIEWS ─────────────────────────────────────────────────────────────

function OverviewView() {
  const totalPubs = PUB_TREND.reduce((s, d) => s + d.publications, 0);
  const totalCitations = PUB_TREND.reduce((s, d) => s + d.citations, 0);
  const totalPatentFiled = PATENT_DATA.reduce((s, d) => s + d.filed, 0);
  const totalApproved = PATENT_DATA.reduce((s, d) => s + d.approved, 0);
  const scoreBreakdown = [
    { label: "Novelty", score: 82, color: C.purple },
    { label: "Impact", score: 74, color: C.cyan },
    { label: "Feasibility", score: 88, color: C.green },
    { label: "Market Fit", score: 61, color: C.orange },
    { label: "Collaboration", score: 79, color: C.pink },
  ];

  return (
    <div>
      {/* KPI Row */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <KPICard label="Total Funding" value="$8.4M" sub="Active grants portfolio" accent={C.green} delta="+22%" icon="💰" />
        <KPICard label="Active Grants" value="14" sub="Across 6 agencies" accent={C.cyan} delta="+5" icon="📋" />
        <KPICard label="Publications" value={totalPubs} sub="This year" accent={C.purple} delta="+31%" icon="📄" />
        <KPICard label="Patents" value={totalPatentFiled} sub={`${totalApproved} approved`} accent={C.orange} delta="+18%" icon="🔒" />
        <KPICard label="Citations" value={totalCitations.toLocaleString()} sub="Total citations" accent={C.pink} delta="+44%" icon="🔗" />
        <KPICard label="Innovation Score" value="78" sub="Top 12% globally" accent={C.green} delta="+6pts" icon="⚡" />
      </div>

      {/* Row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, marginBottom: 14 }}>
        <Panel>
          <SectionTitle accent={C.cyan}>Publication & Citation Trends</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={PUB_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="publications" name="Publications" fill={C.purple} fillOpacity={0.7} radius={[3, 3, 0, 0]} barSize={18} />
              <Line yAxisId="right" type="monotone" dataKey="citations" name="Citations" stroke={C.cyan} strokeWidth={2.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </Panel>
        <Panel>
          <SectionTitle accent={C.green}>Innovation Score Engine</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <GaugeChart score={78} size={140} />
            <div style={{ width: "100%", marginTop: 4 }}>
              {scoreBreakdown.map(s => <ProgressBar key={s.label} label={s.label} value={s.score} color={s.color} />)}
            </div>
          </div>
        </Panel>
      </div>

      {/* Row 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
        <Panel>
          <SectionTitle accent={C.orange}>Patent Activity</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={PATENT_DATA.slice(-4)}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="filed" name="Filed" fill={C.orange} radius={[3, 3, 0, 0]} barSize={10} />
              <Bar dataKey="approved" name="Approved" fill={C.green} radius={[3, 3, 0, 0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel>
          <SectionTitle accent={C.purple}>Ecosystem Radar</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={60}>
              <PolarGrid stroke={C.border} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: C.muted, fontSize: 9 }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar dataKey="A" name="Score" stroke={C.purple} fill={C.purple} fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel>
          <SectionTitle accent={C.pink}>Trending Domains</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TRENDING_DOMAINS.slice(0, 5).map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 9, fontWeight: 800, color: C.muted, width: 14 }}>{i + 1}</span>
                <span style={{ fontSize: 10, color: C.text, flex: 1, fontWeight: 600 }}>{d.domain}</span>
                <Badge color={d.color}>{d.growth}</Badge>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Funding Recommendations mini */}
      <Panel>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <SectionTitle accent={C.green}>Top Funding Matches</SectionTitle>
          <button onClick={() => exportCSV(FUNDING_RECS, "funding_recommendations")} style={{ background: `${C.green}18`, border: `1px solid ${C.green}35`, color: C.green, borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5 }}>⬇ Export CSV</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Agency", "Domain", "Amount", "Match", "Deadline", "Priority"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "6px 12px", color: C.muted, fontWeight: 800, fontSize: 9, letterSpacing: 1, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FUNDING_RECS.slice(0, 4).map((r, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}20`, transition: "background 0.1s", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.card}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "9px 12px", fontWeight: 700, color: C.text }}>{r.agency.split("—")[0].trim()}</td>
                  <td style={{ padding: "9px 12px", color: C.textSoft }}>{r.domain}</td>
                  <td style={{ padding: "9px 12px", color: C.green, fontWeight: 700 }}>{r.amount}</td>
                  <td style={{ padding: "9px 12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ flex: 1, height: 4, background: C.border, borderRadius: 10, minWidth: 50 }}>
                        <div style={{ width: `${r.matchScore}%`, height: "100%", background: r.matchScore >= 85 ? C.green : r.matchScore >= 70 ? C.orange : C.muted, borderRadius: 10 }} />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: C.text }}>{r.matchScore}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "9px 12px", color: C.muted }}>{r.deadline}</td>
                  <td style={{ padding: "9px 12px" }}>
                    <Badge color={r.priority === "High" ? C.green : r.priority === "Medium" ? C.orange : C.muted}>{r.priority}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function FundingView() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = FUNDING_RECS.filter(r =>
    (filter === "All" || r.priority === filter) &&
    (r.agency.toLowerCase().includes(search.toLowerCase()) || r.domain.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <KPICard label="Total Opportunities" value={FUNDING_RECS.length} sub="Matched to your profile" accent={C.cyan} icon="🎯" />
        <KPICard label="High Priority" value={FUNDING_RECS.filter(r => r.priority === "High").length} sub="Act soon" accent={C.green} icon="🔥" />
        <KPICard label="Avg Match Score" value={Math.round(FUNDING_RECS.reduce((s, r) => s + r.matchScore, 0) / FUNDING_RECS.length) + "%"} sub="Profile alignment" accent={C.purple} icon="📊" />
        <KPICard label="Upcoming Deadlines" value="3" sub="Next 60 days" accent={C.orange} icon="⏰" />
      </div>

      <Panel style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
          <SectionTitle accent={C.cyan}>Funding Recommendations</SectionTitle>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search agencies…" />
            {["All", "High", "Medium", "Low"].map(p => (
              <Pill key={p} active={filter === p} onClick={() => setFilter(p)} accent={p === "High" ? C.green : p === "Medium" ? C.orange : C.muted}>{p}</Pill>
            ))}
            <button onClick={() => exportCSV(filtered, "funding_matches")} style={{ background: `${C.green}18`, border: `1px solid ${C.green}35`, color: C.green, borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>⬇ Export</button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((r, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", transition: "border-color 0.2s, transform 0.15s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderBright; e.currentTarget.style.transform = "translateX(3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateX(0)"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: C.text, marginBottom: 4 }}>{r.agency}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <Badge color={C.cyan}>{r.domain}</Badge>
                    <Badge color={C.muted}>{r.eligibility}</Badge>
                    <Badge color={r.status === "Open" ? C.green : C.orange}>{r.status}</Badge>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>Amount</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: C.green }}>{r.amount}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>Deadline</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{r.deadline}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>Match Score</div>
                    <div style={{ position: "relative", width: 44, height: 44 }}>
                      <svg width={44} height={44} viewBox="0 0 44 44">
                        <circle cx={22} cy={22} r={18} fill="none" stroke={C.border} strokeWidth={4} />
                        <circle cx={22} cy={22} r={18} fill="none"
                          stroke={r.matchScore >= 85 ? C.green : r.matchScore >= 70 ? C.orange : C.muted}
                          strokeWidth={4} strokeLinecap="round"
                          strokeDasharray={`${(r.matchScore / 100) * 113} 113`}
                          strokeDashoffset={28} />
                        <text x={22} y={26} textAnchor="middle" fill={C.text} fontSize={10} fontWeight={800}>{r.matchScore}</text>
                      </svg>
                    </div>
                  </div>
                  <Badge color={r.priority === "High" ? C.green : r.priority === "Medium" ? C.orange : C.muted} size="md">{r.priority} Priority</Badge>
                </div>
              </div>
            </div>
          ))}
          {!filtered.length && <div style={{ textAlign: "center", color: C.muted, padding: "30px 0", fontSize: 12 }}>No matches for current filters.</div>}
        </div>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Panel>
          <SectionTitle accent={C.green}>Match Score Distribution</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={FUNDING_RECS}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="agency" tick={false} axisLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="matchScore" name="Match %" radius={[4, 4, 0, 0]} barSize={28}>
                {FUNDING_RECS.map((r, i) => <Cell key={i} fill={r.matchScore >= 85 ? C.green : r.matchScore >= 70 ? C.orange : C.muted} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel>
          <SectionTitle accent={C.purple}>Funding by Domain</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={FUNDING_RECS} dataKey="matchScore" nameKey="domain" cx="50%" cy="50%" outerRadius={70} innerRadius={35} stroke="none" paddingAngle={3}>
                {FUNDING_RECS.map((_, i) => <Cell key={i} fill={ACCENTS[i % ACCENTS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </div>
  );
}

function ResearchTrendsView() {
  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <KPICard label="Research Growth" value="+31%" sub="Year over year" accent={C.green} icon="📈" />
        <KPICard label="Trending Domains" value="6" sub="High-growth areas" accent={C.cyan} icon="🔬" />
        <KPICard label="Forecast 2027" value="562" sub="Projected publications" accent={C.purple} icon="🔭" />
        <KPICard label="Active Domains" value="12" sub="Research areas" accent={C.orange} icon="🌐" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, marginBottom: 14 }}>
        <Panel>
          <SectionTitle accent={C.green}>Publication Growth & Forecast</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={[...PUB_TREND.map(d => ({ ...d, label: d.month })), ...FORECAST.slice(1).map(d => ({ label: d.year, publications: d.forecast, forecast: true }))]}>
              <defs>
                <linearGradient id="pubGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.green} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={C.green} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="label" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="publications" name="Publications" stroke={C.green} fill="url(#pubGrad)" strokeWidth={2.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
        <Panel>
          <SectionTitle accent={C.cyan}>Trending Research Domains</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TRENDING_DOMAINS.map((d, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{d.domain}</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <Badge color={d.color}>{d.growth}</Badge>
                  </div>
                </div>
                <div style={{ height: 5, background: C.border, borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ width: `${d.score}%`, height: "100%", background: d.color, borderRadius: 10, boxShadow: `0 0 8px ${d.color}60` }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Panel>
          <SectionTitle accent={C.purple}>Research by Category (Tech Ecosystem)</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData} layout="vertical" barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
              <XAxis type="number" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="cat" type="category" width={90} tick={{ fill: C.text, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Count" radius={[0, 4, 4, 0]}>
                {categoryData.map((_, i) => <Cell key={i} fill={ACCENTS[i % ACCENTS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel>
          <SectionTitle accent={C.orange}>H-Index Progression</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={PUB_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="hIndex" name="H-Index" stroke={C.orange} strokeWidth={2.5} dot={{ fill: C.orange, r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </div>
  );
}

function PublicationsView() {
  const [search, setSearch] = useState("");
  const total = PUB_TREND.reduce((s, d) => s + d.publications, 0);
  const totalCite = PUB_TREND.reduce((s, d) => s + d.citations, 0);
  const hIdx = PUB_TREND[PUB_TREND.length - 1].hIndex;

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <KPICard label="Total Publications" value={total} sub="This year" accent={C.purple} icon="📄" />
        <KPICard label="Total Citations" value={totalCite.toLocaleString()} sub="Across all papers" accent={C.cyan} icon="🔗" />
        <KPICard label="H-Index" value={hIdx} sub="Current" accent={C.green} delta="+11 pts YoY" icon="📊" />
        <KPICard label="Avg Citations/Paper" value={Math.round(totalCite / total)} sub="Per publication" accent={C.orange} icon="⭐" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14, marginBottom: 14 }}>
        <Panel>
          <SectionTitle accent={C.purple}>Monthly Publication Trends</SectionTitle>
          <ResponsiveContainer width="100%" height={210}>
            <ComposedChart data={PUB_TREND}>
              <defs>
                <linearGradient id="citeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.cyan} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={C.cyan} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="left" dataKey="publications" name="Publications" fill={C.purple} fillOpacity={0.8} radius={[3, 3, 0, 0]} barSize={20} />
              <Area yAxisId="right" type="monotone" dataKey="citations" name="Citations" stroke={C.cyan} fill="url(#citeGrad)" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </Panel>
        <Panel>
          <SectionTitle accent={C.green}>H-Index Growth</SectionTitle>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={PUB_TREND}>
              <defs>
                <linearGradient id="hGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.green} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={C.green} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="hIndex" name="H-Index" stroke={C.green} fill="url(#hGrad)" strokeWidth={2.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
          <SectionTitle accent={C.cyan}>Monthly Breakdown Table</SectionTitle>
          <div style={{ display: "flex", gap: 8 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Filter months…" />
            <button onClick={() => exportCSV(PUB_TREND, "publications")} style={{ background: `${C.cyan}18`, border: `1px solid ${C.cyan}35`, color: C.cyan, borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>⬇ Export CSV</button>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Month", "Publications", "Citations", "H-Index", "Avg Citations/Paper"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "6px 14px", color: C.muted, fontWeight: 800, fontSize: 9, letterSpacing: 1, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PUB_TREND.filter(d => d.month.toLowerCase().includes(search.toLowerCase())).map((d, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}15`, transition: "background 0.1s", cursor: "default" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.card}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "8px 14px", fontWeight: 700, color: C.text }}>{d.month}</td>
                  <td style={{ padding: "8px 14px", color: C.purple, fontWeight: 700 }}>{d.publications}</td>
                  <td style={{ padding: "8px 14px", color: C.cyan, fontWeight: 700 }}>{d.citations}</td>
                  <td style={{ padding: "8px 14px", color: C.green, fontWeight: 700 }}>{d.hIndex}</td>
                  <td style={{ padding: "8px 14px", color: C.textSoft }}>{(d.citations / d.publications).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function PatentsView() {
  const totals = PATENT_DATA.reduce((acc, d) => ({
    filed: acc.filed + d.filed,
    approved: acc.approved + d.approved,
    pending: acc.pending + d.pending,
    commercialized: acc.commercialized + d.commercialized,
  }), { filed: 0, approved: 0, pending: 0, commercialized: 0 });

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <KPICard label="Total Filed" value={totals.filed} sub="All quarters" accent={C.cyan} icon="📝" />
        <KPICard label="Approved" value={totals.approved} sub="Granted patents" accent={C.green} icon="✅" />
        <KPICard label="Pending Review" value={totals.pending} sub="Under examination" accent={C.orange} icon="⏳" />
        <KPICard label="Commercialized" value={totals.commercialized} sub="Revenue generating" accent={C.pink} icon="💼" />
        <KPICard label="Success Rate" value={Math.round((totals.approved / totals.filed) * 100) + "%"} sub="Approval rate" accent={C.purple} icon="🎯" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14, marginBottom: 14 }}>
        <Panel>
          <SectionTitle accent={C.orange}>Patent Activity Over Time</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={PATENT_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: C.muted, paddingTop: 8 }} />
              <Bar dataKey="filed" name="Filed" fill={C.cyan} radius={[3, 3, 0, 0]} barSize={12} />
              <Bar dataKey="approved" name="Approved" fill={C.green} radius={[3, 3, 0, 0]} barSize={12} />
              <Bar dataKey="commercialized" name="Commercialized" fill={C.pink} radius={[3, 3, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel>
          <SectionTitle accent={C.green}>Patent Status Breakdown</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={[
                  { name: "Approved", value: totals.approved },
                  { name: "Pending", value: totals.pending },
                  { name: "Commercialized", value: totals.commercialized },
                ]}
                cx="50%" cy="50%" outerRadius={80} innerRadius={45} stroke="none" paddingAngle={4} dataKey="value">
                {[C.green, C.orange, C.pink].map((c, i) => <Cell key={i} fill={c} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, color: C.muted }} />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel>
        <SectionTitle accent={C.purple}>Patent Growth Trend</SectionTitle>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={PATENT_DATA}>
            <defs>
              <linearGradient id="patGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.purple} stopOpacity={0.4} />
                <stop offset="95%" stopColor={C.purple} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="filed" name="Filed" stroke={C.purple} fill="url(#patGrad)" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="approved" name="Approved" stroke={C.green} strokeWidth={2} strokeDasharray="4 4" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={() => exportCSV(PATENT_DATA, "patent_data")} style={{ background: `${C.orange}18`, border: `1px solid ${C.orange}35`, color: C.orange, borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>⬇ Export CSV</button>
        </div>
      </Panel>
    </div>
  );
}

function InnovationScoreView() {
  const [weights, setWeights] = useState({ novelty: 25, impact: 25, feasibility: 25, market: 25 });
  const scoreBreakdown = [
    { label: "Novelty", score: 82, color: C.purple, key: "novelty" },
    { label: "Impact", score: 74, color: C.cyan, key: "impact" },
    { label: "Feasibility", score: 88, color: C.green, key: "feasibility" },
    { label: "Market Fit", score: 61, color: C.orange, key: "market" },
  ];
  const computedScore = Math.round(
    scoreBreakdown.reduce((s, d) => s + (d.score * weights[d.key]) / 100, 0)
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <KPICard label="Overall Score" value={computedScore} sub="Weighted composite" accent={C.green} icon="⚡" />
        <KPICard label="Percentile" value="Top 12%" sub="Among tracked researchers" accent={C.cyan} icon="🏆" />
        <KPICard label="Strongest Dimension" value="Feasibility" sub="Score: 88/100" accent={C.purple} icon="🔬" />
        <KPICard label="Growth Opportunity" value="Market Fit" sub="Score: 61/100" accent={C.orange} icon="📈" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 14, marginBottom: 14 }}>
        <Panel glow>
          <SectionTitle accent={C.green}>Innovation Gauge</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 8 }}>
            <GaugeChart score={computedScore} size={180} />
            <div style={{ fontSize: 11, color: C.textSoft, marginTop: 4, textAlign: "center" }}>
              Adjust weights below to recalculate
            </div>
          </div>
          <Divider />
          <div style={{ fontSize: 10, fontWeight: 800, color: C.muted, letterSpacing: 1.5, marginBottom: 10 }}>WEIGHT CONTROLS</div>
          {scoreBreakdown.map(d => (
            <div key={d.key} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: C.text, fontWeight: 600 }}>{d.label}</span>
                <span style={{ fontSize: 10, color: d.color, fontWeight: 700 }}>{weights[d.key]}%</span>
              </div>
              <input type="range" min={0} max={100} value={weights[d.key]}
                onChange={e => setWeights(w => ({ ...w, [d.key]: Number(e.target.value) }))}
                style={{ width: "100%", accentColor: d.color, cursor: "pointer" }} />
            </div>
          ))}
        </Panel>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Panel>
            <SectionTitle accent={C.purple}>Score Breakdown</SectionTitle>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={scoreBreakdown.map(d => ({ subject: d.label, score: d.score }))} cx="50%" cy="50%" outerRadius={75}>
                <PolarGrid stroke={C.border} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: C.muted, fontSize: 10 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="score" name="Score" stroke={C.purple} fill={C.purple} fillOpacity={0.25} strokeWidth={2} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </Panel>
          <Panel>
            <SectionTitle accent={C.cyan}>Score Components</SectionTitle>
            {scoreBreakdown.map(d => (
              <ProgressBar key={d.label} label={d.label} value={d.score} color={d.color} />
            ))}
            <Divider />
            <div style={{ fontSize: 10, color: C.muted }}>
              💡 <strong style={{ color: C.text }}>Recommendation:</strong> Focus on Market Fit strategies — partnering with industry stakeholders and filing IP earlier can boost this score by 15–20 points.
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function AIRecommendationsView() {
  const [activeTab, setActiveTab] = useState("grants");
  const tabs = [
    { id: "grants", label: "Suggested Grants", icon: "💰" },
    { id: "journals", label: "Suggested Journals", icon: "📖" },
    { id: "patents", label: "Patent Opportunities", icon: "🔒" },
    { id: "emerging", label: "Emerging Technologies", icon: "🚀" },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <KPICard label="AI Match Confidence" value="94%" sub="Profile alignment" accent={C.green} icon="🤖" />
        <KPICard label="Grant Suggestions" value={AI_GRANTS.length} sub="High-fit matches" accent={C.cyan} icon="💰" />
        <KPICard label="Journal Matches" value={AI_JOURNALS.length} sub="Recommended venues" accent={C.purple} icon="📖" />
        <KPICard label="Patent Gaps" value={AI_PATENT_OPP.length} sub="Opportunities detected" accent={C.orange} icon="🔓" />
      </div>

      <Panel style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, borderBottom: `1px solid ${C.border}`, paddingBottom: 12 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              background: activeTab === t.id ? `${C.green}15` : "transparent",
              border: `1px solid ${activeTab === t.id ? C.green + "40" : "transparent"}`,
              color: activeTab === t.id ? C.green : C.textSoft,
              borderRadius: 8, padding: "7px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
              display: "flex", alignItems: "center", gap: 5
            }}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        {activeTab === "grants" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {AI_GRANTS.map((g, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13, color: C.text, marginBottom: 4 }}>{g.title}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Badge color={C.cyan}>{g.type}</Badge>
                    <Badge color={C.muted}>Deadline: {g.deadline}</Badge>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: C.muted }}>Amount</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: C.green }}>{g.amount}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: C.muted }}>AI Fit</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: g.fit >= 90 ? C.green : C.orange }}>{g.fit}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "journals" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {AI_JOURNALS.map((j, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13, color: C.text, marginBottom: 4 }}>{j.name}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Badge color={j.openAccess ? C.green : C.muted}>{j.openAccess ? "Open Access" : "Subscription"}</Badge>
                    <Badge color={C.textSoft}>Accept Rate: {j.acceptRate}</Badge>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: C.muted }}>Impact Factor</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.cyan }}>{j.impactFactor}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "patents" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {AI_PATENT_OPP.map((p, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13, color: C.text, marginBottom: 4 }}>{p.title}</div>
                  <Badge color={C.cyan}>{p.org}</Badge>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: C.muted }}>Relevance</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.orange }}>{p.relevance}%</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "emerging" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {AI_EMERGING.map((e, i) => (
              <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ fontWeight: 800, fontSize: 13, color: C.text, marginBottom: 8 }}>{e.tech}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Badge color={C.purple}>Maturity: {e.maturity}</Badge>
                  <Badge color={e.opportunity === "Very High" ? C.green : e.opportunity === "High" ? C.cyan : C.orange}>Opportunity: {e.opportunity}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}

function GeoView() {
  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <KPICard label="Countries Tracked" value={GEO_DATA.length} sub="Global research hubs" accent={C.cyan} icon="🌍" />
        <KPICard label="Top Funder" value="USA" sub="$4.2B invested" accent={C.green} icon="🇺🇸" />
        <KPICard label="Top Publisher" value="China" sub="2,100 publications" accent={C.purple} icon="🇨🇳" />
        <KPICard label="Top Patentor" value="China" sub="410 patents" accent={C.orange} icon="🔒" />
      </div>

      <Panel style={{ marginBottom: 14 }}>
        <SectionTitle accent={C.cyan}>Country-wise Funding (Billion USD)</SectionTitle>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={GEO_DATA.sort((a, b) => b.funding - a.funding)}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
            <XAxis dataKey="country" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="funding" name="Funding ($B)" radius={[4, 4, 0, 0]} barSize={26}>
              {GEO_DATA.map((_, i) => <Cell key={i} fill={ACCENTS[i % ACCENTS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <Panel>
          <SectionTitle accent={C.purple}>Publication Distribution</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={GEO_DATA} dataKey="publications" nameKey="country" cx="50%" cy="50%" outerRadius={80} innerRadius={35} stroke="none" paddingAngle={2}>
                {GEO_DATA.map((_, i) => <Cell key={i} fill={ACCENTS[i % ACCENTS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
        <Panel>
          <SectionTitle accent={C.orange}>Patent Activity by Country</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={GEO_DATA.sort((a, b) => b.patents - a.patents)} layout="vertical" barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
              <XAxis type="number" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="country" type="category" width={90} tick={{ fill: C.text, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="patents" name="Patents" radius={[0, 4, 4, 0]}>
                {GEO_DATA.map((_, i) => <Cell key={i} fill={ACCENTS[i % ACCENTS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <SectionTitle accent={C.green}>Global Innovation Leaderboard</SectionTitle>
          <button onClick={() => exportCSV(GEO_DATA, "geo_innovation_data")} style={{ background: `${C.green}18`, border: `1px solid ${C.green}35`, color: C.green, borderRadius: 8, padding: "5px 12px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>⬇ Export CSV</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Rank", "Country", "Funding ($B)", "Publications", "Patents", "Innovation Index"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "6px 14px", color: C.muted, fontWeight: 800, fontSize: 9, letterSpacing: 1, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GEO_DATA.sort((a, b) => (b.funding + b.publications / 100 + b.patents / 10) - (a.funding + a.publications / 100 + a.patents / 10)).map((d, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}15`, transition: "background 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.card}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "9px 14px" }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: i === 0 ? C.green : i === 1 ? C.cyan : i === 2 ? C.orange : C.muted }}>
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                    </span>
                  </td>
                  <td style={{ padding: "9px 14px", fontWeight: 700, color: C.text }}>{d.flag} {d.country}</td>
                  <td style={{ padding: "9px 14px", color: C.green, fontWeight: 700 }}>${d.funding}B</td>
                  <td style={{ padding: "9px 14px", color: C.purple }}>{d.publications.toLocaleString()}</td>
                  <td style={{ padding: "9px 14px", color: C.orange }}>{d.patents}</td>
                  <td style={{ padding: "9px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 4, background: C.border, borderRadius: 10, minWidth: 60 }}>
                        <div style={{ width: `${Math.min(100, (d.funding * 10 + d.publications / 30 + d.patents / 5))}%`, height: "100%", background: ACCENTS[i % ACCENTS.length], borderRadius: 10 }} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function InnovationPlatform() {
  const [activeSection, setActiveSection] = useState("overview");
  const [globalSearch, setGlobalSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const NAV = [
    { id: "overview", label: "Executive Overview", icon: "📊", sub: "KPIs & summary" },
    { id: "funding", label: "Funding", icon: "💰", sub: "Grants & recommendations" },
    { id: "trends", label: "Research Trends", icon: "📈", sub: "Publications & growth" },
    { id: "publications", label: "Publications", icon: "📄", sub: "Analytics & H-Index" },
    { id: "patents", label: "Patent Insights", icon: "🔒", sub: "Filed, approved, pipeline" },
    { id: "score", label: "Innovation Score", icon: "⚡", sub: "Dynamic score engine" },
    { id: "ai", label: "AI Panel", icon: "🤖", sub: "Grants, journals, IP" },
    { id: "geo", label: "Geographic Analytics", icon: "🌍", sub: "Country-wise intelligence" },
  ];

  const VIEW = {
    overview: <OverviewView />,
    funding: <FundingView />,
    trends: <ResearchTrendsView />,
    publications: <PublicationsView />,
    patents: <PatentsView />,
    score: <InnovationScoreView />,
    ai: <AIRecommendationsView />,
    geo: <GeoView />,
  };

  const currentNav = NAV.find(n => n.id === activeSection);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', 'Space Grotesk', sans-serif", color: C.text, display: "flex", fontSize: 13 }}>
      {/* SIDEBAR */}
      <div style={{
        width: sidebarCollapsed ? 56 : 228,
        background: C.panel,
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        flexShrink: 0,
        transition: "width 0.2s",
        overflow: "hidden",
        zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{ padding: "18px 14px 14px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${C.green},${C.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>🔬</div>
          {!sidebarCollapsed && (
            <div>
              <div style={{ fontWeight: 800, fontSize: 12, color: C.text, lineHeight: 1.2 }}>Innovation<br />Intelligence</div>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1.5, marginTop: 2 }}>RESEARCH · FUNDING · IP</div>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(c => !c)} style={{ marginLeft: "auto", background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 14, flexShrink: 0, padding: 0 }}>
            {sidebarCollapsed ? "▶" : "◀"}
          </button>
        </div>

        {/* Nav */}
        <div style={{ padding: "10px 8px", flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {NAV.map(n => (
            <div key={n.id} onClick={() => setActiveSection(n.id)}
              title={sidebarCollapsed ? n.label : ""}
              style={{
                padding: sidebarCollapsed ? "10px 0" : "9px 10px",
                borderRadius: 8,
                marginBottom: 3,
                cursor: "pointer",
                background: activeSection === n.id ? `rgba(181,243,51,0.08)` : "transparent",
                border: activeSection === n.id ? `1px solid rgba(181,243,51,0.2)` : "1px solid transparent",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 10,
                justifyContent: sidebarCollapsed ? "center" : "flex-start",
              }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>{n.icon}</span>
              {!sidebarCollapsed && (
                <div>
                  <div style={{ fontWeight: 700, fontSize: 11, color: activeSection === n.id ? C.green : C.text }}>{n.label}</div>
                  <div style={{ fontSize: 9, color: C.muted }}>{n.sub}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User */}
        {!sidebarCollapsed && (
          <div style={{ padding: "12px 14px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${C.green},${C.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, color: "#000", flexShrink: 0 }}>MN</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 11, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>M Nishandhi</div>
              <div style={{ fontSize: 9, color: C.muted }}>Senior Researcher</div>
            </div>
            <span style={{ fontSize: 14, color: C.muted, cursor: "pointer" }}>⚙</span>
          </div>
        )}
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Bar */}
        <div style={{
          position: "sticky",
          top: 0,
          zIndex: 9,
          background: `${C.glass}`,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.border}`,
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>
              Innovation Intelligence › <span style={{ color: C.textSoft }}>{currentNav?.label}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: C.text, letterSpacing: -0.5, lineHeight: 1 }}>Research Funding & Innovation Intelligence</h1>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.muted, fontSize: 11, pointerEvents: "none" }}>🔍</span>
              <input
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                placeholder="Global search…"
                style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 10px 6px 28px", color: C.text, fontSize: 11, outline: "none", width: 180 }}
              />
            </div>
            <div style={{ fontSize: 10, color: C.muted, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 10px", fontVariantNumeric: "tabular-nums" }}>
              {time.toLocaleTimeString()}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(181,243,51,0.08)", border: `1px solid rgba(181,243,51,0.25)`, borderRadius: 20, padding: "5px 12px", fontSize: 10, fontWeight: 700, color: C.green }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, display: "inline-block", boxShadow: `0 0 6px ${C.green}` }} />
              Live
            </div>
            <button onClick={() => exportCSV(RAW_TECH, "technology_dataset")} style={{ background: `${C.green}15`, border: `1px solid ${C.green}30`, color: C.green, borderRadius: 8, padding: "6px 12px", fontSize: 10, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5 }}>⬇ Export All</button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "22px 24px 32px" }}>
          {VIEW[activeSection]}
        </div>

        <div style={{ textAlign: "center", color: C.muted, fontSize: 9, padding: "12px 0 20px", letterSpacing: 1, textTransform: "uppercase" }}>
          Innovation Intelligence Platform · M Nishandhi · {RAW_TECH.length} Technologies · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
