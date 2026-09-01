// frontend/src/pages/ResearchDashboard.js

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import "../App.css";

// =========================================================
// API
// =========================================================

const API_URL = "http://127.0.0.1:8000";

// =========================================================
// TECHNOLOGY DATA
// =========================================================

const RAW = [
  {
    name: "Python",
    cat: "Programming Language",
    year: 1991,
    license: "Open-source",
    community: "High, very active community",
    jobs: "Data Scientist, Developer",
  },
  {
    name: "Java",
    cat: "Programming Language",
    year: 1995,
    license: "Open-source",
    community: "High, large community",
    jobs: "Software Engineer, Backend Developer",
  },
  {
    name: "JavaScript",
    cat: "Programming Language",
    year: 1995,
    license: "Open-source",
    community: "Very high, global community",
    jobs: "Frontend Developer, Full-stack Developer",
  },
  {
    name: "C++",
    cat: "Programming Language",
    year: 1985,
    license: "Open-source",
    community: "High, active community",
    jobs: "Game Developer, Systems Engineer",
  },
  {
    name: "C#",
    cat: "Programming Language",
    year: 2000,
    license: "Proprietary",
    community: "High, strong .NET community",
    jobs: "Backend Developer, Software Engineer",
  },
  {
    name: "Ruby",
    cat: "Programming Language",
    year: 1995,
    license: "Open-source",
    community: "Medium, growing community",
    jobs: "Full-stack Developer, Web Developer",
  },
  {
    name: "PHP",
    cat: "Programming Language",
    year: 1995,
    license: "Open-source",
    community: "Large, active community",
    jobs: "Web Developer, Backend Developer",
  },
  {
    name: "Swift",
    cat: "Programming Language",
    year: 2014,
    license: "Open-source",
    community: "High, active community",
    jobs: "iOS Developer, Mobile App Developer",
  },
  {
    name: "Go",
    cat: "Programming Language",
    year: 2009,
    license: "Open-source",
    community: "High, growing community",
    jobs: "Backend Developer, Cloud Engineer",
  },
  {
    name: "Rust",
    cat: "Programming Language",
    year: 2010,
    license: "Open-source",
    community: "High, rapidly growing community",
    jobs: "Systems Engineer, Embedded Developer",
  },
  {
    name: "Kotlin",
    cat: "Programming Language",
    year: 2011,
    license: "Open-source",
    community: "High, growing community",
    jobs: "Android Developer, Full-stack Developer",
  },
  {
    name: "TypeScript",
    cat: "Programming Language",
    year: 2012,
    license: "Open-source",
    community: "High, active community",
    jobs: "Frontend Developer, Full-stack Developer",
  },
  {
    name: "Node.js",
    cat: "Runtime Environment",
    year: 2009,
    license: "Open-source",
    community: "Very high, global community",
    jobs: "Backend Developer, Full-stack Developer",
  },
  {
    name: "React",
    cat: "Library",
    year: 2013,
    license: "Open-source",
    community: "Very high, active community",
    jobs: "Frontend Developer, Full-stack Developer",
  },
  {
    name: "Angular",
    cat: "Framework",
    year: 2010,
    license: "Open-source",
    community: "High, large community",
    jobs: "Frontend Developer, Full-stack Developer",
  },
  {
    name: "Vue.js",
    cat: "Framework",
    year: 2014,
    license: "Open-source",
    community: "High, growing community",
    jobs: "Frontend Developer, Full-stack Developer",
  },
  {
    name: "Django",
    cat: "Framework",
    year: 2005,
    license: "Open-source",
    community: "High, very active community",
    jobs: "Backend Developer, Python Developer",
  },
  {
    name: "Flask",
    cat: "Framework",
    year: 2010,
    license: "Open-source",
    community: "High, growing community",
    jobs: "Backend Developer, Python Developer",
  },
  {
    name: "Spring Boot",
    cat: "Framework",
    year: 2018,
    license: "Open-source",
    community: "High, large community",
    jobs: "Backend Developer, Java Developer",
  },
  {
    name: "Ruby on Rails",
    cat: "Framework",
    year: 2005,
    license: "Open-source",
    community: "High, active community",
    jobs: "Web Developer, Ruby Developer",
  },
  {
    name: "TensorFlow",
    cat: "Library",
    year: 2015,
    license: "Open-source",
    community: "High, rapidly growing community",
    jobs: "ML Engineer, AI Researcher",
  },
  {
    name: "PyTorch",
    cat: "Library",
    year: 2016,
    license: "Open-source",
    community: "High, rapidly growing community",
    jobs: "AI Researcher, ML Engineer",
  },
  {
    name: "Keras",
    cat: "Library",
    year: 2015,
    license: "Open-source",
    community: "High, established community",
    jobs: "ML Engineer, AI Researcher",
  },
  {
    name: "Scikit-learn",
    cat: "Library",
    year: 2007,
    license: "Open-source",
    community: "High, stable community",
    jobs: "Data Scientist, ML Engineer",
  },
  {
    name: "OpenCV",
    cat: "Library",
    year: 2000,
    license: "Open-source",
    community: "High, active community",
    jobs: "Computer Vision Engineer, Data Scientist",
  },
  {
    name: "Apache Hadoop",
    cat: "Framework",
    year: 2006,
    license: "Open-source",
    community: "High, large community",
    jobs: "Big Data Engineer, Data Engineer",
  },
  {
    name: "Spark",
    cat: "Framework",
    year: 2014,
    license: "Open-source",
    community: "High, large community",
    jobs: "Data Engineer, Big Data Architect",
  },
  {
    name: "Docker",
    cat: "Platform",
    year: 2013,
    license: "Open-source",
    community: "Very high, active community",
    jobs: "DevOps Engineer, Cloud Engineer",
  },
  {
    name: "Kubernetes",
    cat: "Platform",
    year: 2014,
    license: "Open-source",
    community: "Very high, growing community",
    jobs: "Cloud Engineer, DevOps Engineer",
  },
  {
    name: "Terraform",
    cat: "Tool",
    year: 2014,
    license: "Open-source",
    community: "High, growing community",
    jobs: "DevOps Engineer, Cloud Engineer",
  },
  {
    name: "Jenkins",
    cat: "Tool",
    year: 2011,
    license: "Open-source",
    community: "High, large community",
    jobs: "DevOps Engineer, CI/CD Engineer",
  },
  {
    name: "Git",
    cat: "Version Control",
    year: 2005,
    license: "Open-source",
    community: "Very high, massive community",
    jobs: "Software Developer, Backend Developer",
  },
  {
    name: "GitHub",
    cat: "Platform",
    year: 2008,
    license: "Proprietary",
    community: "Very high, massive community",
    jobs: "Software Developer, Open Source Contributor",
  },
  {
    name: "GitLab",
    cat: "Platform",
    year: 2011,
    license: "Proprietary",
    community: "High, growing community",
    jobs: "DevOps Engineer, Software Developer",
  },
  {
    name: "AWS",
    cat: "Cloud Platform",
    year: 2006,
    license: "Proprietary",
    community: "Very high, massive community",
    jobs: "Cloud Engineer, DevOps Engineer",
  },
  {
    name: "Google Cloud",
    cat: "Cloud Platform",
    year: 2008,
    license: "Proprietary",
    community: "Very high, growing community",
    jobs: "Cloud Engineer, DevOps Engineer",
  },
  {
    name: "Microsoft Azure",
    cat: "Cloud Platform",
    year: 2010,
    license: "Proprietary",
    community: "Very high, growing community",
    jobs: "Cloud Engineer, DevOps Engineer",
  },
  {
    name: "Firebase",
    cat: "Platform",
    year: 2011,
    license: "Proprietary",
    community: "High, growing community",
    jobs: "Mobile Developer, Backend Developer",
  },
  {
    name: "Blockchain",
    cat: "Technology",
    year: 2008,
    license: "Open-source",
    community: "Very high, growing community",
    jobs: "Blockchain Developer, Crypto Developer",
  },
  {
    name: "Ethereum",
    cat: "Blockchain",
    year: 2015,
    license: "Open-source",
    community: "Very high, growing community",
    jobs: "Blockchain Developer, DeFi Developer",
  },
  {
    name: "Solidity",
    cat: "Language",
    year: 2014,
    license: "Open-source",
    community: "High, growing community",
    jobs: "Smart Contract Developer",
  },
  {
    name: "SQL",
    cat: "Database Language",
    year: 1974,
    license: "Open-source, Proprietary",
    community: "Very high, massive community",
    jobs: "Database Administrator, Backend Developer",
  },
  {
    name: "NoSQL",
    cat: "Database",
    year: 1998,
    license: "Open-source",
    community: "High, growing community",
    jobs: "Database Engineer, Backend Developer",
  },
  {
    name: "GraphQL",
    cat: "Query Language",
    year: 2012,
    license: "Open-source",
    community: "Very high, growing community",
    jobs: "Frontend Developer, Backend Developer",
  },
  {
    name: "REST APIs",
    cat: "API Architecture",
    year: 2000,
    license: "Open-source",
    community: "Very high, massive community",
    jobs: "API Developer, Full-stack Developer",
  },
  {
    name: "Microservices",
    cat: "Architecture",
    year: 2012,
    license: "Open-source",
    community: "High, growing community",
    jobs: "Software Architect, DevOps Engineer",
  },
  {
    name: "AR",
    cat: "Technology",
    year: 1990,
    license: "Proprietary, Open-source",
    community: "High, growing community",
    jobs: "AR Developer, Game Developer",
  },
  {
    name: "VR",
    cat: "Technology",
    year: 1960,
    license: "Proprietary, Open-source",
    community: "High, growing community",
    jobs: "VR Developer, Game Developer",
  },
  {
    name: "5G",
    cat: "Technology",
    year: 2019,
    license: "Proprietary",
    community: "Very high, growing community",
    jobs: "Telecom Engineer, Network Engineer",
  },
  {
    name: "Machine Learning",
    cat: "Technology",
    year: 1959,
    license: "Open-source, Proprietary",
    community: "Very high, growing community",
    jobs: "Data Scientist, ML Engineer",
  },
];

// =========================================================
// PATENTS
// =========================================================

const PATENTS = [
  {
    title: "Edge Devices — Federated ML",
    org: "Qualcomm Inc. · filed 2025",
    rel: "91% relevant",
    color: "#b5f333",
    desc: "This patent describes an advanced federated learning approach for edge devices, minimizing data transfer and improving privacy. Highly relevant to decentralized AI networks.",
  },
  {
    title: "Adaptive Differential Privacy for Distributed Training",
    org: "IBM Research · filed 2024",
    rel: "84% relevant",
    color: "#fb923c",
    desc: "A novel technique to dynamically adapt privacy budgets during distributed ML model training. Ensures robust privacy guarantees without severely compromising utility.",
  },
  {
    title: "Lightweight Client Selection for Federated Networks",
    org: "Samsung R&D · filed 2025",
    rel: "76% relevant",
    color: "#fb923c",
    desc: "Introduces a lightweight algorithmic framework to select optimal participating clients in a federated setting, enhancing convergence speed and reducing latency.",
  },
  {
    title: "Quantum-Resistant Encryption in Distributed Systems",
    org: "Google Cloud · filed 2025",
    rel: "95% relevant",
    color: "#00d8ff",
    desc: "A method for implementing post-quantum cryptographic primitives within large-scale distributed architectures to future-proof secure communications.",
  },
  {
    title: "Zero-Knowledge Proofs for Autonomous Vehicle Authentication",
    org: "Tesla Research · filed 2024",
    rel: "88% relevant",
    color: "#a78bfa",
    desc: "Utilizes ZK-SNARKs to allow autonomous vehicles to prove identity and access rights to infrastructure without revealing vehicle telemetry data.",
  },
];

// =========================================================
// PUBLICATIONS
// =========================================================

const PUBLICATIONS = [
  {
    title: "Attention Mechanisms in Next-Gen Transformers",
    org: "Journal of AI · 2024",
    rel: "Highly Cited",
    color: "#b5f333",
    desc: "Analyzes structural improvements in multi-head attention mechanisms, paving the way for larger context windows and more efficient LLMs.",
  },
  {
    title: "Survey on Edge Computing Architectures",
    org: "IEEE Communications · 2025",
    rel: "Trending",
    color: "#00d8ff",
    desc: "A comprehensive survey of current paradigms in Edge and Fog computing, identifying bottlenecks in 5G deployment strategies.",
  },
  {
    title: "Novel Consensus Algorithms for Scalable Blockchains",
    org: "Crypto Research · 2024",
    rel: "Peer-Reviewed",
    color: "#a78bfa",
    desc: "Introduces a hybrid Proof-of-Stake model combined with sharding to achieve unprecedented transaction throughput.",
  },
  {
    title: "Optimizing GraphQL for Microservices",
    org: "WebEng Today · 2025",
    rel: "Industry Report",
    color: "#fb923c",
    desc: "Explores the transition from REST to GraphQL across major cloud architectures, detailing performance metrics and cost reductions.",
  },
];

// =========================================================
// GRANTS
// =========================================================

const GRANTS = [
  {
    id: "NSF-2026-AI",
    name: "National AI Research Institutes",
    amount: "$20M",
    deadline: "Oct 15, 2026",
    match: 92,
  },
  {
    id: "EU-HORIZON-DL",
    name: "Horizon Europe: Decentralized AI",
    amount: "€15M",
    deadline: "Nov 01, 2026",
    match: 88,
  },
  {
    id: "NIH-BD-01",
    name: "Biomedical Data Repositories",
    amount: "$5M",
    deadline: "Sep 30, 2026",
    match: 75,
  },
  {
    id: "DARPA-SEC-26",
    name: "Secure Federated Analytics",
    amount: "$12M",
    deadline: "Dec 10, 2026",
    match: 96,
  },
];

// =========================================================
// DERIVED DATA
// =========================================================

const categoryCount = {};

RAW.forEach((d) => {
  categoryCount[d.cat] = (categoryCount[d.cat] || 0) + 1;
});

const categoryData = Object.entries(categoryCount)
  .map(([cat, count]) => ({
    cat: cat.length > 16 ? cat.slice(0, 14) + "…" : cat,
    count,
  }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 8);

const licenseData = [
  {
    name: "Open-source",
    value: RAW.filter((d) => d.license.includes("Open-source")).length,
  },
  {
    name: "Proprietary",
    value: RAW.filter((d) => d.license.includes("Proprietary")).length,
  },
];

const decadeMap = {
  "1950s": 0,
  "1960s": 0,
  "1970s": 0,
  "1980s": 0,
  "1990s": 0,
  "2000s": 0,
  "2010s": 0,
  "2020s": 0,
};

RAW.forEach((d) => {
  const dec = Math.floor(d.year / 10) * 10;
  const key = dec + "s";

  if (decadeMap[key] !== undefined) {
    decadeMap[key]++;
  }
});

const timelineData = Object.entries(decadeMap)
  .map(([decade, count]) => ({
    decade,
    count,
  }))
  .filter((d) => d.count > 0);

const commScore = (c) => {
  if (c.includes("Very high")) return 4;
  if (c.includes("Large")) return 3;
  if (c.includes("High")) return 2;
  return 1;
};

const topTech = [...RAW]
  .sort((a, b) => commScore(b.community) - commScore(a.community))
  .slice(0, 8);

const communityData = topTech.map((d) => ({
  name: d.name.length > 8 ? d.name.slice(0, 7) + "…" : d.name,
  score: commScore(d.community) * 25,
}));

const radarData = [
  {
    subject: "Libraries",
    A: RAW.filter((d) => d.cat === "Library").length * 8,
  },
  {
    subject: "Frameworks",
    A: RAW.filter((d) => d.cat === "Framework").length * 8,
  },
  {
    subject: "Platforms",
    A: RAW.filter((d) => d.cat === "Platform").length * 10,
  },
  {
    subject: "Languages",
    A: RAW.filter((d) => d.cat === "Programming Language").length * 5,
  },
  {
    subject: "Cloud",
    A: RAW.filter((d) => d.cat === "Cloud Platform").length * 15,
  },
  {
    subject: "Tools",
    A: RAW.filter((d) =>
      ["Tool", "Version Control", "Architecture"].includes(d.cat)
    ).length * 12,
  },
];

const openSourcePct = Math.round(
  (RAW.filter((d) => d.license.includes("Open-source")).length /
    RAW.length) *
    100
);

const totalTech = RAW.length;

const avgYear = Math.round(
  RAW.reduce((sum, d) => sum + d.year, 0) / RAW.length
);

const veryHighComm = RAW.filter((d) =>
  d.community.startsWith("Very high")
).length;

// =========================================================
// COLORS
// =========================================================

const BAR_COLORS = [
  "#00d8ff",
  "#a78bfa",
  "#b5f333",
  "#fb923c",
  "#f472b6",
  "#34d399",
  "#fbbf24",
  "#60a5fa",
];

const PIE_COLORS = ["#b5f333", "#a78bfa"];

const scoreBreakdown = [
  {
    label: "Novelty",
    score: 82,
    color: "#a78bfa",
    desc: "Based on semantic uniqueness against existing IP databases.",
  },
  {
    label: "Impact",
    score: 74,
    color: "#00d8ff",
    desc: "Predicted reach measured by citation velocity and media mentions.",
  },
  {
    label: "Feasibility",
    score: 88,
    color: "#b5f333",
    desc: "Evaluated via technical readiness levels (TRL).",
  },
  {
    label: "Market Fit",
    score: 61,
    color: "#fb923c",
    desc: "Correlated with current venture capital funding trends.",
  },
];

// =========================================================
// TOOLTIP
// =========================================================

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="custom-tooltip">
      <div className="custom-tooltip-label">{label}</div>

      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name || "Value"}: <b>{p.value}</b>
        </div>
      ))}
    </div>
  );
}

// =========================================================
// STAT CARD
// =========================================================

function StatCard({ label, value, sub, accent = "#b5f333" }) {
  return (
    <div className="stat-card">
      <div className="stat-value" style={{ color: accent }}>
        {value}
      </div>

      <div className="stat-label">{label}</div>

      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

// =========================================================
// INNOVATION GAUGE
// =========================================================

function InnovationGauge({ score }) {
  const r = 52;
  const cx = 70;
  const cy = 70;

  const circ = 2 * Math.PI * r;
  const arc = circ * 0.75;
  const dash = (score / 100) * arc;

  return (
    <svg width="140" height="120" viewBox="0 0 140 120">
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#21262d"
        strokeWidth="10"
        strokeDasharray={`${arc} ${circ}`}
        strokeDashoffset={-circ * 0.125}
        strokeLinecap="round"
      />

      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#b5f333"
        strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={-circ * 0.125}
        strokeLinecap="round"
        style={{
          filter: "drop-shadow(0 0 8px #b5f333)",
        }}
      />

      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fill="#b5f333"
        fontSize="22"
        fontWeight="800"
        fontFamily="Space Grotesk"
      >
        {score}
      </text>

      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fill="#7d8590"
        fontSize="10"
      >
        / 100
      </text>
    </svg>
  );
}

// =========================================================
// MODAL
// =========================================================

function Modal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{item.title}</h3>

          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-org">{item.org}</div>

        <div style={{ marginBottom: 16 }}>
          <span
            className="list-item-tag"
            style={{
              background: `${item.color}20`,
              borderColor: `${item.color}40`,
              color: item.color,
            }}
          >
            {item.rel}
          </span>
        </div>

        <div className="modal-abstract">
          <div className="modal-abstract-label">
            Description / Abstract
          </div>

          <p className="modal-abstract-text">{item.desc}</p>
        </div>

        <button
          className="modal-cta"
          style={{ background: item.color }}
          onClick={onClose}
        >
          Close Details
        </button>
      </div>
    </div>
  );
}

// =========================================================
// LIST
// =========================================================

function renderList(items, setSelectedItem) {
  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className="list-item"
          style={{ borderColor: "#21262d" }}
          onClick={() => setSelectedItem(item)}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = item.color;
            e.currentTarget.style.background = "#222831";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#21262d";
            e.currentTarget.style.background = "var(--card)";
          }}
        >
          <div className="list-item-row">
            <div>
              <div className="list-item-title">{item.title}</div>
              <div className="list-item-org">{item.org}</div>
            </div>

            <span
              className="list-item-tag"
              style={{
                background: `${item.color}18`,
                borderColor: `${item.color}40`,
                color: item.color,
              }}
            >
              {item.rel}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// =========================================================
// OVERVIEW
// =========================================================

function OverviewView({ dashboardData }) {
  const collections = dashboardData?.collections || {};

  const realUsers = collections.users || 0;
  const realTechnologies = collections.technologies || 0;
  const realPublications = collections.publications || 0;
  const realResearchProfiles = collections.research_profiles || 0;
  const realResearchDomains = collections.research_domains || 0;

  return (
    <div>
      <div className="stat-row">
        <StatCard
          label="Total Technologies"
          value={realTechnologies}
          sub="From MongoDB"
          accent="#b5f333"
        />

        <StatCard
          label="Users"
          value={realUsers}
          sub="Registered users"
          accent="#00d8ff"
        />

        <StatCard
          label="Research Profiles"
          value={realResearchProfiles}
          sub="Researcher profiles"
          accent="#a78bfa"
        />

        <StatCard
          label="Publications"
          value={realPublications}
          sub="Research publications"
          accent="#fb923c"
        />

        <StatCard
          label="Research Domains"
          value={realResearchDomains}
          sub="Tracked domains"
          accent="#f472b6"
        />

        <StatCard
          label="Open-Source"
          value={`${openSourcePct}%`}
          sub="License distribution"
          accent="#00d8ff"
        />

        <StatCard
          label="Avg Launch Year"
          value={avgYear}
          sub="Dataset average"
          accent="#a78bfa"
        />

        <StatCard
          label="Very High Community"
          value={veryHighComm}
          sub="Massive adoption"
          accent="#fb923c"
        />

        <StatCard
          label="Categories Tracked"
          value={Object.keys(categoryCount).length}
          sub="Tech ecosystem"
          accent="#f472b6"
        />
      </div>

      <div className="grid-2-col">
        <div className="panel">
          <div className="section-title">
            Technologies by Category
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} barSize={24}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#21262d"
                vertical={false}
              />

              <XAxis
                dataKey="cat"
                tick={{ fill: "#7d8590", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#7d8590", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {categoryData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={BAR_COLORS[i % BAR_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div className="section-title">
            License Distribution
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 8,
            }}
          >
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={licenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                  paddingAngle={3}
                >
                  {licenseData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>

                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="pie-legend">
              {licenseData.map((d, i) => (
                <div key={i} className="pie-legend-item">
                  <span
                    className="pie-legend-dot"
                    style={{ background: PIE_COLORS[i] }}
                  />

                  <span style={{ color: "#7d8590" }}>
                    {d.name}
                  </span>

                  <span
                    style={{
                      fontWeight: 700,
                      color: "#e6edf3",
                    }}
                  >
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-3-col">
        <div className="panel">
          <div className="section-title">
            Adoption Timeline by Decade
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timelineData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#21262d"
                vertical={false}
              />

              <XAxis
                dataKey="decade"
                tick={{ fill: "#7d8590", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#7d8590", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#b5f333"
                strokeWidth={3}
                dot={{
                  fill: "#b5f333",
                  r: 4,
                  strokeWidth: 0,
                }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <div className="section-title">
            Ecosystem Radar
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <RadarChart
              data={radarData}
              cx="50%"
              cy="50%"
              outerRadius={70}
            >
              <PolarGrid stroke="#21262d" />

              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fill: "#7d8590",
                  fontSize: 10,
                }}
              />

              <PolarRadiusAxis
                tick={false}
                axisLine={false}
              />

              <Radar
                dataKey="A"
                stroke="#00d8ff"
                fill="#00d8ff"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div
          className="panel"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="section-title">
            Innovation Score
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <InnovationGauge score={78} />

            <div
              style={{
                width: "100%",
                marginTop: 16,
              }}
            >
              {scoreBreakdown.map((s) => (
                <div
                  key={s.label}
                  className="progress-row"
                >
                  <span className="progress-label">
                    {s.label}
                  </span>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${s.score}%`,
                        background: s.color,
                        boxShadow: `0 0 6px ${s.color}60`,
                      }}
                    />
                  </div>

                  <span
                    className="progress-value"
                    style={{ color: s.color }}
                  >
                    {s.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// FUNDING
// =========================================================

function FundingView() {
  return (
    <div>
      <div className="stat-row">
        <StatCard
          label="Active Grants"
          value="4"
          accent="#b5f333"
        />

        <StatCard
          label="Total Available"
          value="$37M+"
          accent="#00d8ff"
        />

        <StatCard
          label="Avg Match Score"
          value="87%"
          accent="#a78bfa"
        />
      </div>

      <div className="panel">
        <div className="section-title">
          Recommended Funding Opportunities
        </div>

        <div
          className="table-scroll"
          style={{ marginTop: 16 }}
        >
          <table className="grants-table">
            <thead>
              <tr>
                {[
                  "Grant ID",
                  "Program Name",
                  "Amount",
                  "Deadline",
                  "Match Score",
                  "Action",
                ].map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {GRANTS.map((g) => (
                <tr key={g.id}>
                  <td
                    style={{
                      color: "#00d8ff",
                      fontWeight: 600,
                    }}
                  >
                    {g.id}
                  </td>

                  <td
                    style={{
                      color: "#e6edf3",
                      fontWeight: 600,
                    }}
                  >
                    {g.name}
                  </td>

                  <td style={{ color: "#e6edf3" }}>
                    {g.amount}
                  </td>

                  <td style={{ color: "#fb923c" }}>
                    {g.deadline}
                  </td>

                  <td>
                    <div className="match-cell">
                      <div className="match-bar">
                        <div
                          className="match-fill"
                          style={{
                            width: `${g.match}%`,
                          }}
                        />
                      </div>

                      <span className="match-pct">
                        {g.match}%
                      </span>
                    </div>
                  </td>

                  <td>
                    <button className="apply-btn">
                      Apply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// RESEARCH TRENDS
// =========================================================

function ResearchTrendsView() {
  const [search, setSearch] = useState("");
  const [filterCat, setFilter] = useState("All");

  const cats = [
    "All",
    ...Object.keys(categoryCount).sort(),
  ];

  const filtered = RAW.filter(
    (d) =>
      (filterCat === "All" || d.cat === filterCat) &&
      (d.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        d.cat
          .toLowerCase()
          .includes(search.toLowerCase()))
  );

  return (
    <div
      style={{
        display: "grid",
        gap: 16,
      }}
    >
      <div className="flex-row">
        <div className="panel flex-1">
          <div className="section-title">
            Adoption Timeline by Decade
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#21262d"
                vertical={false}
              />

              <XAxis
                dataKey="decade"
                tick={{
                  fill: "#7d8590",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#7d8590",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#b5f333"
                strokeWidth={3}
                dot={{
                  fill: "#b5f333",
                  r: 5,
                  strokeWidth: 0,
                }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel flex-1">
          <div className="section-title">
            Community Strength (Top Technologies)
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={communityData}
              layout="vertical"
              barSize={16}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#21262d"
                horizontal={false}
              />

              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{
                  fill: "#7d8590",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                dataKey="name"
                type="category"
                width={80}
                tick={{
                  fill: "#e6edf3",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              <Bar
                dataKey="score"
                radius={[0, 4, 4, 0]}
              >
                {communityData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={
                      i % 2 === 0
                        ? "#a78bfa"
                        : "#00d8ff"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel">
        <div className="section-title">
          Technology Registry ({filtered.length} records)
        </div>

        <div className="filter-row">
          <input
            className="search-input"
            value={search}
            placeholder="Search technologies…"
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="filter-select"
            value={filterCat}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            {cats.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                {[
                  "Technology",
                  "Category",
                  "Year",
                  "License",
                  "Community",
                  "Job Roles",
                ].map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.slice(0, 10).map((d, i) => (
                <tr key={i}>
                  <td
                    style={{
                      fontWeight: 700,
                      color: "#e6edf3",
                    }}
                  >
                    {d.name}
                  </td>

                  <td>
                    <span
                      className="badge"
                      style={{
                        background:
                          "rgba(167,139,250,0.18)",
                        color: "#a78bfa",
                      }}
                    >
                      {d.cat}
                    </span>
                  </td>

                  <td style={{ color: "#7d8590" }}>
                    {d.year}
                  </td>

                  <td>
                    <span
                      style={{
                        color:
                          d.license.includes(
                            "Open-source"
                          )
                            ? "#b5f333"
                            : "#fb923c",
                        fontWeight: 600,
                      }}
                    >
                      {d.license.includes(
                        "Open-source"
                      )
                        ? "Open-source"
                        : "Proprietary"}
                    </span>
                  </td>

                  <td
                    style={{
                      color: "#7d8590",
                      fontSize: 12,
                    }}
                  >
                    {d.community.split(",")[0]}
                  </td>

                  <td
                    style={{
                      color: "#00d8ff",
                      fontSize: 12,
                    }}
                  >
                    {d.jobs
                      .split(",")[0]
                      .trim()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// PUBLICATIONS
// =========================================================

function PublicationsView({ setSelectedItem }) {
  return (
    <div className="grid-equal-2">
      <div className="flex-col">
        <div className="flex-row">
          <StatCard
            label="Total Papers"
            value="1,248"
            accent="#a78bfa"
          />

          <StatCard
            label="Citations"
            value="34.2K"
            accent="#00d8ff"
          />
        </div>

        <div
          className="panel"
          style={{ flex: 1 }}
        >
          <div className="section-title">
            Citations Over Time
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={[
                { year: "2021", c: 4000 },
                { year: "2022", c: 6500 },
                { year: "2023", c: 8200 },
                { year: "2024", c: 11000 },
                { year: "2025", c: 4500 },
              ]}
              barSize={30}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#21262d"
                vertical={false}
              />

              <XAxis
                dataKey="year"
                tick={{
                  fill: "#7d8590",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#7d8590",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              <Bar
                dataKey="c"
                name="Citations"
                fill="#a78bfa"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel">
        <div className="section-title">
          Top Impact Publications
        </div>

        {renderList(
          PUBLICATIONS,
          setSelectedItem
        )}
      </div>
    </div>
  );
}

// =========================================================
// PATENTS
// =========================================================

function PatentsView({ setSelectedItem }) {
  return (
    <div>
      <div className="stat-row">
        <StatCard
          label="Patents Filed"
          value="342"
          accent="#fb923c"
        />

        <StatCard
          label="Granted"
          value="218"
          accent="#b5f333"
        />

        <StatCard
          label="Pending"
          value="124"
          accent="#00d8ff"
        />
      </div>

      <div className="panel">
        <div className="section-title">
          Intellectual Property Registry
        </div>

        {renderList(
          PATENTS,
          setSelectedItem
        )}
      </div>
    </div>
  );
}

// =========================================================
// INNOVATION SCORE
// =========================================================

function InnovationScoreView() {
  return (
    <div className="score-page-grid">
      <div className="panel score-center-panel">
        <div className="section-title">
          Global Innovation Score
        </div>

        <div
          style={{
            transform: "scale(1.5)",
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <InnovationGauge score={78} />
        </div>

        <div className="score-rank-note">
          Your organization ranks in the top{" "}
          <strong>12%</strong> of all tracked
          research institutions globally.
        </div>
      </div>

      <div className="panel">
        <div className="section-title">
          Score Breakdown & Methodology
        </div>

        <div style={{ marginTop: 20 }}>
          {scoreBreakdown.map((s) => (
            <div
              key={s.label}
              className="score-detail-row"
            >
              <div className="score-detail-header">
                <span className="score-detail-name">
                  {s.label}
                </span>

                <span
                  className="score-detail-value"
                  style={{ color: s.color }}
                >
                  {s.score}/100
                </span>
              </div>

              <div className="score-detail-bar">
                <div
                  className="score-detail-fill"
                  style={{
                    width: `${s.score}%`,
                    background: s.color,
                    boxShadow: `0 0 6px ${s.color}60`,
                  }}
                />
              </div>

              <div className="score-detail-desc">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =========================================================
// AI RECOMMENDATIONS
// =========================================================

function AIRecommendationsView() {
  const recommendations = [
    {
      title: "Federated Learning for Edge AI",
      category: "Emerging Technology",
      score: 94,
      reason:
        "Strong alignment with current AI research trends and distributed computing opportunities.",
      action: "High Priority",
      color: "#b5f333",
    },
    {
      title: "Secure AI & Privacy Engineering",
      category: "Research Opportunity",
      score: 91,
      reason:
        "Growing demand for privacy-preserving machine learning and secure data processing.",
      action: "High Priority",
      color: "#00d8ff",
    },
    {
      title: "Quantum-Resistant Cryptography",
      category: "Technology Opportunity",
      score: 87,
      reason:
        "Increasing importance of post-quantum security for future distributed systems.",
      action: "Recommended",
      color: "#a78bfa",
    },
    {
      title: "Edge Computing + 5G",
      category: "Commercial Opportunity",
      score: 84,
      reason:
        "Strong market potential through low-latency AI and real-time distributed applications.",
      action: "Recommended",
      color: "#fb923c",
    },
  ];

  return (
    <div>
      <div className="stat-row">
        <StatCard
          label="AI Recommendations"
          value="24"
          sub="Generated insights"
          accent="#b5f333"
        />

        <StatCard
          label="High Priority"
          value="8"
          sub="Immediate opportunities"
          accent="#00d8ff"
        />

        <StatCard
          label="Avg AI Confidence"
          value="89%"
          sub="Recommendation confidence"
          accent="#a78bfa"
        />
      </div>

      <div className="panel">
        <div className="section-title">
          AI-Powered Research Recommendations
        </div>

        <div
          style={{
            display: "grid",
            gap: 14,
            marginTop: 18,
          }}
        >
          {recommendations.map((r, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #21262d",
                borderRadius: 12,
                padding: 18,
                background: "#161b22",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#e6edf3",
                    }}
                  >
                    {r.title}
                  </div>

                  <div
                    style={{
                      marginTop: 5,
                      color: "#7d8590",
                      fontSize: 13,
                    }}
                  >
                    {r.category}
                  </div>
                </div>

                <div
                  style={{
                    color: r.color,
                    fontWeight: 800,
                    fontSize: 20,
                  }}
                >
                  {r.score}%
                </div>
              </div>

              <p
                style={{
                  color: "#8b949e",
                  lineHeight: 1.6,
                  margin: "12px 0",
                }}
              >
                {r.reason}
              </p>

              <span
                className="list-item-tag"
                style={{
                  background: `${r.color}18`,
                  borderColor: `${r.color}40`,
                  color: r.color,
                }}
              >
                {r.action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// =========================================================
// SAVED OPPORTUNITIES
// =========================================================

function SavedOpportunitiesView() {
  const savedOpportunities = [
    {
      title: "National AI Research Institutes",
      type: "Funding Opportunity",
      deadline: "Oct 15, 2026",
      score: 92,
      color: "#b5f333",
    },
    {
      title: "Secure Federated Analytics",
      type: "Research Funding",
      deadline: "Dec 10, 2026",
      score: 96,
      color: "#00d8ff",
    },
    {
      title: "Horizon Europe: Decentralized AI",
      type: "International Funding",
      deadline: "Nov 01, 2026",
      score: 88,
      color: "#a78bfa",
    },
  ];

  return (
    <div>
      <div className="stat-row">
        <StatCard
          label="Saved Opportunities"
          value={savedOpportunities.length}
          sub="Your saved items"
          accent="#b5f333"
        />

        <StatCard
          label="High Match"
          value="3"
          sub="Strong opportunities"
          accent="#00d8ff"
        />
      </div>

      <div className="panel">
        <div className="section-title">
          Saved Opportunities
        </div>

        <div
          style={{
            display: "grid",
            gap: 14,
            marginTop: 18,
          }}
        >
          {savedOpportunities.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #21262d",
                borderRadius: 12,
                padding: 18,
                background: "#161b22",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#e6edf3",
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    style={{
                      marginTop: 6,
                      color: "#7d8590",
                      fontSize: 13,
                    }}
                  >
                    {item.type}
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      color: "#fb923c",
                      fontSize: 13,
                    }}
                  >
                    Deadline: {item.deadline}
                  </div>
                </div>

                <div
                  style={{
                    color: item.color,
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  {item.score}%
                </div>
              </div>

              <button
                className="apply-btn"
                style={{ marginTop: 14 }}
              >
                View Opportunity
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// =========================================================
// HELP & SUPPORT
// =========================================================

function HelpSupportView() {
  return (
    <div>
      <div className="panel">
        <div className="section-title">
          Help & Support
        </div>

        <div
          style={{
            marginTop: 20,
            display: "grid",
            gap: 14,
          }}
        >
          <div
            style={{
              padding: 20,
              border: "1px solid #21262d",
              borderRadius: 12,
              background: "#161b22",
            }}
          >
            <h3 style={{ color: "#e6edf3" }}>
              How to use the dashboard
            </h3>

            <p style={{ color: "#8b949e", lineHeight: 1.6 }}>
              Use the sidebar to explore funding opportunities,
              research trends, publications, patents and
              AI-powered recommendations.
            </p>
          </div>

          <div
            style={{
              padding: 20,
              border: "1px solid #21262d",
              borderRadius: 12,
              background: "#161b22",
            }}
          >
            <h3 style={{ color: "#e6edf3" }}>
              Research Analytics
            </h3>

            <p style={{ color: "#8b949e", lineHeight: 1.6 }}>
              Research Analytics helps you understand technology
              trends, publications, patents and innovation metrics.
            </p>
          </div>

          <div
            style={{
              padding: 20,
              border: "1px solid #21262d",
              borderRadius: 12,
              background: "#161b22",
            }}
          >
            <h3 style={{ color: "#e6edf3" }}>
              AI Recommendations
            </h3>

            <p style={{ color: "#8b949e", lineHeight: 1.6 }}>
              AI Recommendations highlight research, technology
              and commercialization opportunities based on
              available intelligence.
            </p>
          </div>

          <div
            style={{
              padding: 20,
              border: "1px solid #21262d",
              borderRadius: 12,
              background: "#161b22",
            }}
          >
            <h3 style={{ color: "#e6edf3" }}>
              Need Assistance?
            </h3>

            <p style={{ color: "#8b949e", lineHeight: 1.6 }}>
              Contact the platform administrator for account,
              data or technical support.
            </p>

            <button className="apply-btn">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// =========================================================
// RESEARCH ANALYTICS
// =========================================================

function ResearchAnalyticsView() {
  return (
    <div>
      <div className="stat-row">

        <StatCard
          label="Research Publications"
          value="1,248"
          sub="Tracked publications"
          accent="#a78bfa"
        />

        <StatCard
          label="Citations"
          value="34.2K"
          sub="Total citations"
          accent="#00d8ff"
        />

        <StatCard
          label="Research Domains"
          value="16"
          sub="Active research domains"
          accent="#b5f333"
        />

      </div>

      <div className="grid-2-col">

        {/* RESEARCH ACTIVITY */}

        <div className="panel">

          <div className="section-title">
            Research Activity
          </div>

          <ResponsiveContainer
            width="100%"
            height={260}
          >
            <LineChart
              data={[
                {
                  year: "2021",
                  publications: 180,
                },
                {
                  year: "2022",
                  publications: 240,
                },
                {
                  year: "2023",
                  publications: 310,
                },
                {
                  year: "2024",
                  publications: 390,
                },
                {
                  year: "2025",
                  publications: 460,
                },
              ]}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#21262d"
                vertical={false}
              />

              <XAxis
                dataKey="year"
                tick={{
                  fill: "#7d8590",
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#7d8590",
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
              />

              <Line
                type="monotone"
                dataKey="publications"
                name="Publications"
                stroke="#00d8ff"
                strokeWidth={3}
                dot={{
                  fill: "#00d8ff",
                  r: 4,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>


        {/* RESEARCH IMPACT */}

        <div className="panel">

          <div className="section-title">
            Research Impact by Domain
          </div>

          <ResponsiveContainer
            width="100%"
            height={260}
          >

            <BarChart
              data={[
                {
                  domain: "AI",
                  score: 92,
                },
                {
                  domain: "Cybersecurity",
                  score: 86,
                },
                {
                  domain: "Cloud",
                  score: 78,
                },
                {
                  domain: "IoT",
                  score: 71,
                },
                {
                  domain: "Blockchain",
                  score: 65,
                },
              ]}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#21262d"
                vertical={false}
              />

              <XAxis
                dataKey="domain"
                tick={{
                  fill: "#7d8590",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                domain={[0, 100]}
                tick={{
                  fill: "#7d8590",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
              />

              <Bar
                dataKey="score"
                name="Impact Score"
                fill="#a78bfa"
                radius={[4, 4, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* RESEARCH INSIGHTS */}

      <div
        className="grid-3-col"
        style={{
          marginTop: 16,
        }}
      >

        <div className="panel">

          <div className="section-title">
            Top Research Area
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#b5f333",
              marginTop: 15,
            }}
          >
            Artificial Intelligence
          </div>

          <div
            style={{
              color: "#7d8590",
              marginTop: 8,
            }}
          >
            Highest research activity
          </div>

        </div>


        <div className="panel">

          <div className="section-title">
            Research Growth
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#00d8ff",
              marginTop: 15,
            }}
          >
            +38%
          </div>

          <div
            style={{
              color: "#7d8590",
              marginTop: 8,
            }}
          >
            Growth in research activity
          </div>

        </div>


        <div className="panel">

          <div className="section-title">
            Research Impact
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#a78bfa",
              marginTop: 15,
            }}
          >
            89 / 100
          </div>

          <div
            style={{
              color: "#7d8590",
              marginTop: 8,
            }}
          >
            Overall research impact score
          </div>

        </div>

      </div>

    </div>
  );
}
// =========================================================
// MAIN DASHBOARD
// =========================================================

function Dashboard() {
  const [activeTab, setActiveTab] =
    useState("researcher");

  const [activeSection, setActiveSection] =
    useState("Overview");

  const [selectedItem, setSelectedItem] =
    useState(null);

  const [dashboardData, setDashboardData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    console.log(
      "Loading dashboard from:",
      `${API_URL}/api/dashboard`
    );

    fetch(`${API_URL}/api/dashboard`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Dashboard API returned ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log(
          "Dashboard API:",
          data
        );

        setDashboardData(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error(
          "Dashboard API Error:",
          err
        );

        /*
         * Do not block the complete frontend
         * if backend is not running.
         */
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const tabs = [
    {
      id: "researcher",
      label: "Researcher",
      sub: "Grants · Trends · IP",
    },
    {
      id: "startup",
      label: "Startup",
      sub: "Funding · Tech · Commercialize",
    },
    {
      id: "manager",
      label: "Innovation Manager",
      sub: "Portfolio · Pipeline",
    },
    {
      id: "admin",
      label: "Admin",
      sub: "Platform · Governance",
    },
  ];

 const sections = [
  "Overview",
  "Funding Recommendations",
  "Research Analytics",
  "Research Trends",
  "Publication Analytics",
  "Patent Insights",
  "AI Recommendations",
  "Innovation Score",
  "Saved Opportunities",
  "Help & Support",
];

  const activeTabObj = tabs.find(
    (t) => t.id === activeTab
  );

  const pageTitle =
    activeSection === "Overview"
      ? "Research Funding & Innovation Intelligence Platform"
      : activeSection;

  return (
    <div className="layout">
      <Modal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* SIDEBAR */}

      <nav className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-row">
            <div className="logo-icon">
              🔬
            </div>

            <div>
              <div className="logo-text">
                Innovation
                <br />
                Intelligence
              </div>
            </div>
          </div>

          <div className="logo-tagline">
            RESEARCH · FUNDING · IP
          </div>
        </div>

        <div className="sidebar-nav">
          <div className="nav-section-label">
            USER PERSONAS
          </div>

          {tabs.map((t) => (
            <div
              key={t.id}
              className={
                "nav-item" +
                (activeTab === t.id
                  ? " active"
                  : "")
              }
              onClick={() =>
                setActiveTab(t.id)
              }
            >
              <div className="nav-item-label">
                {t.label}
              </div>

              <div className="nav-item-sub">
                {t.sub}
              </div>
            </div>
          ))}

          <div className="nav-spacer">
            <div className="nav-section-label">
              DASHBOARD SECTIONS
            </div>

            {sections.map((section) => (
              <div
                key={section}
                className={
                  "section-item" +
                  (activeSection === section
                    ? " active"
                    : "")
                }
                onClick={() =>
                  setActiveSection(section)
                }
              >
                <span>{section}</span>

                {activeSection !== section && (
                  <span className="section-arrow">
                    ›
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">
            MN
          </div>

          <div>
            <div className="user-name">
              M Nishandhi
            </div>

            <div className="user-role">
              Researcher
            </div>
          </div>

          <div className="user-settings">
            ⚙
          </div>
        </div>
      </nav>

      {/* MAIN */}

      <main className="main">
        <div className="topbar">
          <div>
            <div className="breadcrumb">
              Innovation Intelligence ›{" "}
              {activeTabObj?.label} ›{" "}
              <span>{activeSection}</span>
            </div>

            <h1 className="page-title">
              {pageTitle}
            </h1>
          </div>

          <div className="topbar-actions">
            <div className="live-badge">
              <span className="live-dot" />
              Live data
            </div>

            <div className="icon-btn">
              🔔
            </div>

            <div className="icon-btn">
              ⚙️
            </div>
          </div>
        </div>

        {/* CONTENT */}

        {loading ? (
          <div
            className="panel"
            style={{
              margin: 20,
              padding: 30,
            }}
          >
            <div className="section-title">
              Loading dashboard...
            </div>
          </div>
        ) : activeSection ===
          "Overview" ? (
          <OverviewView
            dashboardData={dashboardData}
          />
        ) : activeSection ===
  "Funding Recommendations" ? (
  <FundingView />

) : activeSection ===
  "Research Analytics" ? (
  <ResearchAnalyticsView />

) : activeSection ===
  "Research Trends" ? (
  <ResearchTrendsView />

) : activeSection ===
  "Publication Analytics" ? (
  <PublicationsView
    setSelectedItem={setSelectedItem}
  />

) : activeSection ===
  "Patent Insights" ? (
  <PatentsView
    setSelectedItem={setSelectedItem}
  />

) : activeSection ===
  "AI Recommendations" ? (
  <AIRecommendationsView />

) : activeSection ===
  "Saved Opportunities" ? (
  <SavedOpportunitiesView />

) : activeSection ===
  "Innovation Score" ? (
  <InnovationScoreView />

) : activeSection ===
  "Help & Support" ? (
  <HelpSupportView />

) : null}

        {error && (
          <div
            style={{
              margin: "20px",
              padding: "10px 15px",
              color: "#fb923c",
              fontSize: 12,
            }}
          >
            Backend connection: {error}
          </div>
        )}

        <div className="footer">
          Innovation Intelligence Platform · M
          Nishandhi · Dataset: {totalTech}{" "}
          technologies ·{" "}
          {new Date().getFullYear()}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;