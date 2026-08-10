import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Legend
} from "recharts";

// ── DATA (parsed from technology_dataset.xlsx) ────────────────────────────────
const RAW = [
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
  { name:"Kotlin", cat:"Programming Language", year:2011, license:"Open-source", community:"High, growing community", jobs:"Android Developer, Full-stack Developer" },
  { name:"TypeScript", cat:"Programming Language", year:2012, license:"Open-source", community:"High, active community", jobs:"Frontend Developer, Full-stack Developer" },
  { name:"Node.js", cat:"Runtime Environment", year:2009, license:"Open-source", community:"Very high, global community", jobs:"Backend Developer, Full-stack Developer" },
  { name:"React", cat:"Library", year:2013, license:"Open-source", community:"Very high, active community", jobs:"Frontend Developer, Full-stack Developer" },
  { name:"Angular", cat:"Framework", year:2010, license:"Open-source", community:"High, large community", jobs:"Frontend Developer, Full-stack Developer" },
  { name:"Vue.js", cat:"Framework", year:2014, license:"Open-source", community:"High, growing community", jobs:"Frontend Developer, Full-stack Developer" },
  { name:"Django", cat:"Framework", year:2005, license:"Open-source", community:"High, very active community", jobs:"Backend Developer, Python Developer" },
  { name:"Flask", cat:"Framework", year:2010, license:"Open-source", community:"High, growing community", jobs:"Backend Developer, Python Developer" },
  { name:"Spring Boot", cat:"Framework", year:2018, license:"Open-source", community:"High, large community", jobs:"Backend Developer, Java Developer" },
  { name:"Ruby on Rails", cat:"Framework", year:2005, license:"Open-source", community:"High, active community", jobs:"Web Developer, Ruby Developer" },
  { name:"TensorFlow", cat:"Library", year:2015, license:"Open-source", community:"High, rapidly growing community", jobs:"ML Engineer, AI Researcher" },
  { name:"PyTorch", cat:"Library", year:2016, license:"Open-source", community:"High, rapidly growing community", jobs:"AI Researcher, ML Engineer" },
  { name:"Keras", cat:"Library", year:2015, license:"Open-source", community:"High, established community", jobs:"ML Engineer, AI Researcher" },
  { name:"Scikit-learn", cat:"Library", year:2007, license:"Open-source", community:"High, stable community", jobs:"Data Scientist, ML Engineer" },
  { name:"OpenCV", cat:"Library", year:2000, license:"Open-source", community:"High, active community", jobs:"Computer Vision Engineer, Data Scientist" },
  { name:"Apache Hadoop", cat:"Framework", year:2006, license:"Open-source", community:"High, large community", jobs:"Big Data Engineer, Data Engineer" },
  { name:"Spark", cat:"Framework", year:2014, license:"Open-source", community:"High, large community", jobs:"Data Engineer, Big Data Architect" },
  { name:"Docker", cat:"Platform", year:2013, license:"Open-source", community:"Very high, active community", jobs:"DevOps Engineer, Cloud Engineer" },
  { name:"Kubernetes", cat:"Platform", year:2014, license:"Open-source", community:"Very high, growing community", jobs:"Cloud Engineer, DevOps Engineer" },
  { name:"Terraform", cat:"Tool", year:2014, license:"Open-source", community:"High, growing community", jobs:"DevOps Engineer, Cloud Engineer" },
  { name:"Jenkins", cat:"Tool", year:2011, license:"Open-source", community:"High, large community", jobs:"DevOps Engineer, CI/CD Engineer" },
  { name:"Git", cat:"Version Control", year:2005, license:"Open-source", community:"Very high, massive community", jobs:"Software Developer, Backend Developer" },
  { name:"GitHub", cat:"Platform", year:2008, license:"Proprietary", community:"Very high, massive community", jobs:"Software Developer, Open Source Contributor" },
  { name:"GitLab", cat:"Platform", year:2011, license:"Proprietary", community:"High, growing community", jobs:"DevOps Engineer, Software Developer" },
  { name:"AWS", cat:"Cloud Platform", year:2006, license:"Proprietary", community:"Very high, massive community", jobs:"Cloud Engineer, DevOps Engineer" },
  { name:"Google Cloud", cat:"Cloud Platform", year:2008, license:"Proprietary", community:"Very high, growing community", jobs:"Cloud Engineer, DevOps Engineer" },
  { name:"Microsoft Azure", cat:"Cloud Platform", year:2010, license:"Proprietary", community:"Very high, growing community", jobs:"Cloud Engineer, DevOps Engineer" },
  { name:"Firebase", cat:"Platform", year:2011, license:"Proprietary", community:"High, growing community", jobs:"Mobile Developer, Backend Developer" },
  { name:"Blockchain", cat:"Technology", year:2008, license:"Open-source", community:"Very high, growing community", jobs:"Blockchain Developer, Crypto Developer" },
  { name:"Ethereum", cat:"Blockchain", year:2015, license:"Open-source", community:"Very high, growing community", jobs:"Blockchain Developer, DeFi Developer" },
  { name:"Solidity", cat:"Language", year:2014, license:"Open-source", community:"High, growing community", jobs:"Smart Contract Developer" },
  { name:"SQL", cat:"Database Language", year:1974, license:"Open-source, Proprietary", community:"Very high, massive community", jobs:"Database Administrator, Backend Developer" },
  { name:"NoSQL", cat:"Database", year:1998, license:"Open-source", community:"High, growing community", jobs:"Database Engineer, Backend Developer" },
  { name:"GraphQL", cat:"Query Language", year:2012, license:"Open-source", community:"Very high, growing community", jobs:"Frontend Developer, Backend Developer" },
  { name:"REST APIs", cat:"API Architecture", year:2000, license:"Open-source", community:"Very high, massive community", jobs:"API Developer, Full-stack Developer" },
  { name:"Microservices", cat:"Architecture", year:2012, license:"Open-source", community:"High, growing community", jobs:"Software Architect, DevOps Engineer" },
  { name:"AR", cat:"Technology", year:1990, license:"Proprietary, Open-source", community:"High, growing community", jobs:"AR Developer, Game Developer" },
  { name:"VR", cat:"Technology", year:1960, license:"Proprietary, Open-source", community:"High, growing community", jobs:"VR Developer, Game Developer" },
  { name:"5G", cat:"Technology", year:2019, license:"Proprietary", community:"Very high, growing community", jobs:"Telecom Engineer, Network Engineer" },
  { name:"Machine Learning", cat:"Technology", year:1959, license:"Open-source, Proprietary", community:"Very high, growing community", jobs:"Data Scientist, ML Engineer" },
];

// ── DERIVED ANALYTICS ─────────────────────────────────────────────────────────
const categoryCount = {};
RAW.forEach(d => { categoryCount[d.cat] = (categoryCount[d.cat]||0)+1; });
const categoryData = Object.entries(categoryCount)
  .map(([cat,count])=>({cat: cat.length>16?cat.slice(0,14)+"…":cat, count}))
  .sort((a,b)=>b.count-a.count).slice(0,8);

const licenseData = [
  { name:"Open-source", value: RAW.filter(d=>d.license.includes("Open-source")).length },
  { name:"Proprietary", value: RAW.filter(d=>d.license.includes("Proprietary")).length },
];

const decadeMap = {"1950s":0,"1960s":0,"1970s":0,"1980s":0,"1990s":0,"2000s":0,"2010s":0,"2020s":0};
RAW.forEach(d=>{
  const dec = Math.floor(d.year/10)*10;
  const k = dec+"s"; if(decadeMap[k]!==undefined) decadeMap[k]++;
});
const timelineData = Object.entries(decadeMap).map(([decade,count])=>({decade,count})).filter(d=>d.count>0);

const communityScore = (c)=>{
  if(c.includes("Very high")) return 4;
  if(c.includes("Large")) return 3;
  if(c.includes("High")) return 2;
  return 1;
};
const topTech = [...RAW].sort((a,b)=>communityScore(b.community)-communityScore(a.community)).slice(0,8);
const communityData = topTech.map(d=>({name:d.name.length>8?d.name.slice(0,7)+"…":d.name, score:communityScore(d.community)*25}));

const radarData = [
  { subject:"Libraries", A: RAW.filter(d=>d.cat==="Library").length*8 },
  { subject:"Frameworks", A: RAW.filter(d=>d.cat==="Framework").length*8 },
  { subject:"Platforms", A: RAW.filter(d=>d.cat==="Platform").length*10 },
  { subject:"Languages", A: RAW.filter(d=>d.cat==="Programming Language").length*5 },
  { subject:"Cloud", A: RAW.filter(d=>d.cat==="Cloud Platform").length*15 },
  { subject:"Tools", A: RAW.filter(d=>["Tool","Version Control","Architecture"].includes(d.cat)).length*12 },
];

const openSourcePct = Math.round(RAW.filter(d=>d.license.includes("Open-source")).length/RAW.length*100);
const totalTech = RAW.length;
const avgYear = Math.round(RAW.reduce((s,d)=>s+d.year,0)/RAW.length);
const veryHighComm = RAW.filter(d=>d.community.startsWith("Very high")).length;

// ── PALETTE (matching screenshot) ────────────────────────────────────────────
const C = {
  bg: "#0d1117", panel: "#161b22", border: "#21262d",
  green: "#b5f333", cyan: "#00d8ff", purple: "#a78bfa",
  orange: "#fb923c", text: "#e6edf3", muted: "#7d8590",
  card: "#1c2128",
};
const PIE_COLORS = [C.green, C.purple];
const BAR_COLORS = [C.cyan, C.purple, C.green, C.orange, "#f472b6","#34d399","#fbbf24","#60a5fa"];

// ── COMPONENTS ────────────────────────────────────────────────────────────────
const StatCard = ({label, value, sub, accent="#b5f333"}) => (
  <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px",flex:1,minWidth:130}}>
    <div style={{fontSize:26,fontWeight:800,color:accent,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-1}}>{value}</div>
    <div style={{fontSize:12,color:C.text,fontWeight:600,marginTop:4}}>{label}</div>
    {sub && <div style={{fontSize:11,color:C.muted,marginTop:2}}>{sub}</div>}
  </div>
);

const SectionTitle = ({children}) => (
  <div style={{fontSize:13,fontWeight:700,color:C.muted,letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>{children}</div>
);

const Panel = ({children, style={}}) => (
  <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,padding:20,...style}}>{children}</div>
);

const CustomTooltip = ({active,payload,label})=>{
  if(!active||!payload||!payload.length) return null;
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",fontSize:12,color:C.text}}>
      <div style={{fontWeight:700,marginBottom:4,color:C.green}}>{label}</div>
      {payload.map((p,i)=><div key={i} style={{color:p.color}}>{p.name||"Value"}: <b>{p.value}</b></div>)}
    </div>
  );
};

const InnovationGauge = ({score}) => {
  const r=52, cx=70, cy=70;
  const circ = 2*Math.PI*r;
  const arc = circ*0.75;
  const dash = (score/100)*arc;
  return (
    <svg width={140} height={120} viewBox="0 0 140 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.border} strokeWidth={10}
        strokeDasharray={`${arc} ${circ}`} strokeDashoffset={-circ*0.125} strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.green} strokeWidth={10}
        strokeDasharray={`${dash} ${circ}`} strokeDashoffset={-circ*0.125} strokeLinecap="round"
        style={{filter:"drop-shadow(0 0 8px #b5f333)"}}/>
      <text x={cx} y={cy-4} textAnchor="middle" fill={C.green} fontSize={22} fontWeight={800} fontFamily="Space Grotesk">{score}</text>
      <text x={cx} y={cy+14} textAnchor="middle" fill={C.muted} fontSize={10}>/ 100</text>
    </svg>
  );
};

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("researcher");
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");

  const tabs = [
    {id:"researcher", label:"Researcher", sub:"Grants · Trends · IP"},
    {id:"startup", label:"Startup", sub:"Funding · Tech · Commercialize"},
    {id:"manager", label:"Innovation Manager", sub:"Portfolio · Pipeline"},
    {id:"admin", label:"Admin", sub:"Platform · Governance"},
  ];

  const cats = ["All", ...Object.keys(categoryCount).sort()];
  const filtered = RAW.filter(d=>(filterCat==="All"||d.cat===filterCat)&&(d.name.toLowerCase().includes(search.toLowerCase())||d.cat.toLowerCase().includes(search.toLowerCase())));

  const scoreBreakdown = [{label:"Novelty",score:82,color:C.purple},{label:"Impact",score:74,color:C.cyan},{label:"Feasibility",score:88,color:C.green},{label:"Market Fit",score:61,color:C.orange}];

  return (
    <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'Inter',sans-serif",color:C.text,display:"flex",fontSize:13}}>
      {/* SIDEBAR */}
      <div style={{width:220,background:C.panel,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh",flexShrink:0}}>
        {/* Logo */}
        <div style={{padding:"20px 16px 16px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
            <div style={{width:34,height:34,borderRadius:8,background:`linear-gradient(135deg,${C.green},${C.cyan})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🔬</div>
            <div>
              <div style={{fontWeight:800,fontSize:13,color:C.text,lineHeight:1.2}}>Innovation<br/>Intelligence</div>
            </div>
          </div>
          <div style={{fontSize:10,color:C.muted,letterSpacing:1,marginTop:6}}>RESEARCH · FUNDING · IP</div>
        </div>
        {/* Nav tabs */}
        <div style={{padding:"12px 8px",flex:1,overflowY:"auto"}}>
          {tabs.map(t=>(
            <div key={t.id} onClick={()=>setActiveTab(t.id)}
              style={{padding:"10px 12px",borderRadius:8,marginBottom:4,cursor:"pointer",
                background:activeTab===t.id?"rgba(181,243,51,0.1)":  "transparent",
                border:activeTab===t.id?`1px solid rgba(181,243,51,0.25)`:"1px solid transparent",
                transition:"all 0.15s"}}>
              <div style={{fontWeight:700,fontSize:12,color:activeTab===t.id?C.green:C.text}}>{t.label}</div>
              <div style={{fontSize:10,color:C.muted,marginTop:2}}>{t.sub}</div>
            </div>
          ))}
          <div style={{marginTop:20,padding:"0 4px"}}>
            <div style={{fontSize:10,color:C.muted,letterSpacing:1,fontWeight:700,marginBottom:8}}>DASHBOARD SECTIONS</div>
            {["Funding Recommendations","Research Trends","Publication Analytics","Patent Insights","Innovation Score"].map(s=>(
              <div key={s} style={{padding:"8px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",color:C.muted,fontSize:11,cursor:"pointer",borderRadius:6,":hover":{color:C.text}}}>
                <span>{s}</span><span style={{opacity:0.5}}>›</span>
              </div>
            ))}
          </div>
        </div>
        {/* User */}
        <div style={{padding:"12px 16px",borderTop:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${C.green},${C.cyan})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,color:"#000",flexShrink:0}}>MN</div>
          <div>
            <div style={{fontWeight:700,fontSize:12,color:C.text}}>M Nishandhi</div>
            <div style={{fontSize:10,color:C.muted}}>Researcher</div>
          </div>
          <div style={{marginLeft:"auto",fontSize:14,color:C.muted,cursor:"pointer"}}>⚙</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{flex:1,overflowY:"auto",padding:"24px 28px"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <div style={{fontSize:11,color:C.muted,marginBottom:4}}>Innovation Intelligence › <span style={{color:C.text}}>{tabs.find(t=>t.id===activeTab)?.label}</span></div>
            <h1 style={{margin:0,fontSize:22,fontWeight:800,color:C.text,letterSpacing:-0.5}}>Research Funding &amp; Innovation Intelligence Platform</h1>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(181,243,51,0.1)",border:`1px solid rgba(181,243,51,0.3)`,borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:700,color:C.green}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:C.green,display:"inline-block",boxShadow:`0 0 6px ${C.green}`}}/>Live data
            </div>
            <div style={{width:34,height:34,borderRadius:8,background:C.panel,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:14}}>🔔</div>
            <div style={{width:34,height:34,borderRadius:8,background:C.panel,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:14}}>⚙️</div>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{display:"flex",gap:14,marginBottom:22,flexWrap:"wrap"}}>
          <StatCard label="Total Technologies" value={totalTech} sub="Across all categories" accent={C.green}/>
          <StatCard label="Open-Source" value={`${openSourcePct}%`} sub="License distribution" accent={C.cyan}/>
          <StatCard label="Avg Launch Year" value={avgYear} sub="Dataset average" accent={C.purple}/>
          <StatCard label="Very High Community" value={veryHighComm} sub="Massive adoption" accent={C.orange}/>
          <StatCard label="Categories Tracked" value={Object.keys(categoryCount).length} sub="Tech ecosystem" accent="#f472b6"/>
        </div>

        {/* Row 1: Bar + Pie */}
        <div style={{display:"grid",gridTemplateColumns:"1.6fr 1fr",gap:16,marginBottom:16}}>
          <Panel>
            <SectionTitle>Technologies by Category</SectionTitle>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={categoryData} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
                <XAxis dataKey="cat" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Bar dataKey="count" radius={[4,4,0,0]}>
                  {categoryData.map((_,i)=><Cell key={i} fill={BAR_COLORS[i%BAR_COLORS.length]}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          <Panel>
            <SectionTitle>License Distribution</SectionTitle>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",paddingTop:8}}>
              <ResponsiveContainer width="100%" height={170}>
                <PieChart>
                  <Pie data={licenseData} cx="50%" cy="50%" innerRadius={50} outerRadius={76}
                    dataKey="value" stroke="none" paddingAngle={3}>
                    {licenseData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i]}/>)}
                  </Pie>
                  <Tooltip content={<CustomTooltip/>}/>
                </PieChart>
              </ResponsiveContainer>
              <div style={{display:"flex",gap:16,marginTop:-4}}>
                {licenseData.map((d,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:6,fontSize:11}}>
                    <span style={{width:10,height:10,borderRadius:3,background:PIE_COLORS[i],display:"inline-block"}}/>
                    <span style={{color:C.muted}}>{d.name}</span>
                    <span style={{fontWeight:700,color:C.text}}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>

        {/* Row 2: Timeline + Radar + Innovation Score */}
        <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr 0.9fr",gap:16,marginBottom:16}}>
          <Panel>
            <SectionTitle>Adoption Timeline by Decade</SectionTitle>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
                <XAxis dataKey="decade" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Line type="monotone" dataKey="count" stroke={C.green} strokeWidth={2.5} dot={{fill:C.green,r:4,strokeWidth:0}} activeDot={{r:6}}/>
              </LineChart>
            </ResponsiveContainer>
          </Panel>

          <Panel>
            <SectionTitle>Ecosystem Radar</SectionTitle>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={65}>
                <PolarGrid stroke={C.border}/>
                <PolarAngleAxis dataKey="subject" tick={{fill:C.muted,fontSize:10}}/>
                <PolarRadiusAxis tick={false} axisLine={false}/>
                <Radar dataKey="A" stroke={C.cyan} fill={C.cyan} fillOpacity={0.2} strokeWidth={2}/>
              </RadarChart>
            </ResponsiveContainer>
          </Panel>

          <Panel>
            <SectionTitle>Innovation Score</SectionTitle>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <InnovationGauge score={78}/>
              <div style={{width:"100%",marginTop:8}}>
                {scoreBreakdown.map(s=>(
                  <div key={s.label} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                    <span style={{width:60,fontSize:10,color:C.muted,textAlign:"right"}}>{s.label}</span>
                    <div style={{flex:1,height:5,background:C.border,borderRadius:10,overflow:"hidden"}}>
                      <div style={{width:`${s.score}%`,height:"100%",background:s.color,borderRadius:10,boxShadow:`0 0 6px ${s.color}60`}}/>
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:s.color,width:24}}>{s.score}</span>
                  </div>
                ))}
              </div>
              <div style={{fontSize:10,color:C.muted,marginTop:6,textAlign:"center"}}>Top 12% of tracked researchers</div>
            </div>
          </Panel>
        </div>

        {/* Row 3: Community strength bar */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
          <Panel>
            <SectionTitle>Community Strength (Top Technologies)</SectionTitle>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={communityData} layout="vertical" barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false}/>
                <XAxis type="number" domain={[0,100]} tick={{fill:C.muted,fontSize:9}} axisLine={false} tickLine={false}/>
                <YAxis dataKey="name" type="category" width={60} tick={{fill:C.text,fontSize:10}} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Bar dataKey="score" radius={[0,4,4,0]}>
                  {communityData.map((_,i)=><Cell key={i} fill={i%2===0?C.purple:C.cyan}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          {/* Patent-style insights card */}
          <Panel>
            <SectionTitle>Patent / IP Insights</SectionTitle>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[
                {title:"Edge Devices — Federated ML",org:"Qualcomm Inc. · filed 2025",rel:"91% relevant",color:"#b5f333"},
                {title:"Adaptive Differential Privacy for Distributed Training",org:"IBM Research · filed 2024",rel:"84% relevant",color:"#fb923c"},
                {title:"Lightweight Client Selection for Federated Networks",org:"Samsung R&D · filed 2025",rel:"76% relevant",color:"#fb923c"},
              ].map((p,i)=>(
                <div key={i} style={{background:C.card,borderRadius:8,padding:"10px 14px",border:`1px solid ${C.border}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                    <div>
                      <div style={{fontWeight:700,fontSize:12,color:C.text,lineHeight:1.3}}>{p.title}</div>
                      <div style={{fontSize:10,color:C.muted,marginTop:3}}>{p.org}</div>
                    </div>
                    <div style={{background:`${p.color}18`,border:`1px solid ${p.color}40`,color:p.color,fontSize:10,fontWeight:700,borderRadius:20,padding:"3px 10px",whiteSpace:"nowrap",flexShrink:0}}>{p.rel}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Data Table */}
        <Panel>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:10}}>
            <SectionTitle>Technology Registry ({filtered.length} records)</SectionTitle>
            <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search technologies…"
                style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 12px",color:C.text,fontSize:12,outline:"none",width:180}}/>
              <select value={filterCat} onChange={e=>setFilterCat(e.target.value)}
                style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 12px",color:C.text,fontSize:12,outline:"none"}}>
                {cats.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr style={{borderBottom:`1px solid ${C.border}`}}>
                  {["Technology","Category","Year","License","Community","Job Roles"].map(h=>(
                    <th key={h} style={{textAlign:"left",padding:"8px 12px",color:C.muted,fontWeight:700,fontSize:10,letterSpacing:0.5,textTransform:"uppercase"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0,12).map((d,i)=>(
                  <tr key={i} style={{borderBottom:`1px solid ${C.border}20`,transition:"background 0.1s"}}
                    onMouseEnter={e=>e.currentTarget.style.background=C.card}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{padding:"9px 12px",fontWeight:700,color:C.text}}>{d.name}</td>
                    <td style={{padding:"9px 12px"}}>
                      <span style={{background:`${C.purple}18`,color:C.purple,borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:600}}>{d.cat}</span>
                    </td>
                    <td style={{padding:"9px 12px",color:C.muted}}>{d.year}</td>
                    <td style={{padding:"9px 12px"}}>
                      <span style={{color:d.license.includes("Open-source")?C.green:C.orange,fontWeight:600}}>
                        {d.license.includes("Open-source")?"Open-source":"Proprietary"}
                      </span>
                    </td>
                    <td style={{padding:"9px 12px",color:C.muted,fontSize:11}}>{d.community.split(",")[0]}</td>
                    <td style={{padding:"9px 12px",color:C.cyan,fontSize:11}}>{d.jobs.split(",")[0].trim()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length>12&&<div style={{textAlign:"center",color:C.muted,fontSize:11,padding:"10px 0"}}>Showing 12 of {filtered.length} results · Use search/filter to narrow</div>}
          </div>
        </Panel>

        <div style={{textAlign:"center",color:C.muted,fontSize:10,marginTop:20,paddingBottom:16}}>
          Innovation Intelligence Platform · M Nishandhi · Dataset: {totalTech} technologies · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
