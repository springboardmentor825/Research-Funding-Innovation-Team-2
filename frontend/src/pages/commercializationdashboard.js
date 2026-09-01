import React, { useState } from "react";
import "./commercializationdashboard.css";

function CommercializationDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  const opportunities = [
    {
      name: "AI-Powered Healthcare Analytics",
      domain: "Healthcare AI",
      readiness: 92,
      market: "$8.4B",
      status: "High Potential",
    },
    {
      name: "Federated Learning Platform",
      domain: "Cybersecurity",
      readiness: 86,
      market: "$6.2B",
      status: "Ready",
    },
    {
      name: "Smart Research Intelligence",
      domain: "Research Tech",
      readiness: 81,
      market: "$4.8B",
      status: "Promising",
    },
    {
      name: "Edge AI Optimization",
      domain: "Edge Computing",
      readiness: 76,
      market: "$3.9B",
      status: "Emerging",
    },
  ];

  const funding = [
    {
      name: "National AI Research Institutes",
      organization: "NSF",
      amount: "$20M",
      deadline: "Oct 15, 2026",
      match: 92,
    },
    {
      name: "Decentralized AI",
      organization: "Horizon Europe",
      amount: "€15M",
      deadline: "Nov 01, 2026",
      match: 88,
    },
    {
      name: "Secure Federated Analytics",
      organization: "DARPA",
      amount: "$12M",
      deadline: "Dec 10, 2026",
      match: 96,
    },
  ];

  const technologies = [
    {
      name: "Machine Learning",
      category: "Artificial Intelligence",
      score: 94,
      stage: "Commercial Ready",
    },
    {
      name: "Federated Learning",
      category: "Privacy AI",
      score: 89,
      stage: "Growth",
    },
    {
      name: "Edge Computing",
      category: "Cloud / Edge",
      score: 84,
      stage: "Growth",
    },
    {
      name: "Blockchain",
      category: "Distributed Systems",
      score: 78,
      stage: "Emerging",
    },
  ];

  return (
    <div className="commercialization-dashboard">

      {/* SIDEBAR */}
      <aside className="commercial-sidebar">

        <div className="commercial-logo">
          <div className="commercial-logo-icon">🚀</div>

          <div>
            <div className="commercial-logo-title">
              Innovation
            </div>

            <div className="commercial-logo-title">
              Intelligence
            </div>

            <div className="commercial-logo-sub">
              COMMERCIALIZATION
            </div>
          </div>
        </div>

        <div className="commercial-nav-title">
          STARTUP DASHBOARD
        </div>

        {[
          "Overview",
          "Market Opportunities",
          "Technology Analysis",
          "Funding",
          "IP & Patents",
        ].map((item) => (
          <button
            key={item}
            className={
              activeTab === item
                ? "commercial-nav-item active"
                : "commercial-nav-item"
            }
            onClick={() => setActiveTab(item)}
          >
            <span>
              {item === "Overview" && "◈"}
              {item === "Market Opportunities" && "◉"}
              {item === "Technology Analysis" && "⚡"}
              {item === "Funding" && "💰"}
              {item === "IP & Patents" && "©"}
            </span>

            {item}
          </button>
        ))}

        <div className="commercial-sidebar-bottom">
          <div className="commercial-user-avatar">
            MN
          </div>

          <div>
            <div className="commercial-user-name">
              M Nishandhi
            </div>

            <div className="commercial-user-role">
              Startup / Researcher
            </div>
          </div>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="commercial-main">

        {/* TOPBAR */}
        <header className="commercial-topbar">

          <div>
            <div className="commercial-breadcrumb">
              Innovation Intelligence
              <span>›</span>
              Startup
              <span>›</span>
              {activeTab}
            </div>

            <h1>
              {activeTab === "Overview"
                ? "Commercialization Intelligence Dashboard"
                : activeTab}
            </h1>

            <p>
              Discover technologies, markets, funding and
              commercialization opportunities.
            </p>
          </div>

          <div className="commercial-live">
            <span></span>
            LIVE INTELLIGENCE
          </div>

        </header>

        {/* OVERVIEW */}
        {activeTab === "Overview" && (
          <>
            {/* STAT CARDS */}
            <section className="commercial-stat-grid">

              <div className="commercial-stat-card green">
                <span>Commercial Opportunities</span>
                <strong>142</strong>
                <small>↑ 18.4% this quarter</small>
              </div>

              <div className="commercial-stat-card blue">
                <span>Market Potential</span>
                <strong>$37.8B</strong>
                <small>Across tracked sectors</small>
              </div>

              <div className="commercial-stat-card purple">
                <span>Technology Readiness</span>
                <strong>87%</strong>
                <small>Average commercialization score</small>
              </div>

              <div className="commercial-stat-card orange">
                <span>Funding Available</span>
                <strong>$47M+</strong>
                <small>Matched opportunities</small>
              </div>

            </section>

            {/* MAIN GRID */}
            <section className="commercial-grid-2">

              {/* READINESS */}
              <div className="commercial-panel">

                <div className="commercial-panel-header">
                  <div>
                    <h2>Commercialization Readiness</h2>
                    <p>
                      Overall technology readiness across
                      your research portfolio.
                    </p>
                  </div>

                  <div className="commercial-score">
                    87
                    <small>/100</small>
                  </div>
                </div>

                <div className="commercial-progress-list">

                  <Progress
                    label="Market Demand"
                    value={91}
                  />

                  <Progress
                    label="Technology Maturity"
                    value={88}
                  />

                  <Progress
                    label="Competitive Advantage"
                    value={84}
                  />

                  <Progress
                    label="Investment Potential"
                    value={86}
                  />

                </div>

              </div>

              {/* MARKET */}
              <div className="commercial-panel">

                <div className="commercial-panel-header">
                  <div>
                    <h2>Market Opportunity</h2>
                    <p>
                      High-growth markets identified by AI.
                    </p>
                  </div>
                </div>

                <div className="market-bars">

                  <MarketBar
                    name="Artificial Intelligence"
                    value={94}
                    market="$12.4B"
                  />

                  <MarketBar
                    name="Healthcare Technology"
                    value={86}
                    market="$8.7B"
                  />

                  <MarketBar
                    name="Cybersecurity"
                    value={81}
                    market="$6.2B"
                  />

                  <MarketBar
                    name="Cloud & Edge"
                    value={76}
                    market="$4.8B"
                  />

                </div>

              </div>

            </section>

            {/* OPPORTUNITIES */}
            <section className="commercial-panel">

              <div className="commercial-panel-header">

                <div>
                  <h2>
                    Top Commercialization Opportunities
                  </h2>

                  <p>
                    AI-ranked opportunities with the highest
                    commercial potential.
                  </p>
                </div>

                <button
                  className="commercial-action"
                  onClick={() =>
                    setActiveTab("Market Opportunities")
                  }
                >
                  View All →
                </button>

              </div>

              <OpportunityTable
                opportunities={opportunities}
              />

            </section>

            {/* BOTTOM GRID */}
            <section className="commercial-grid-3">

              <MiniCard
                title="Active Patents"
                value="342"
                subtitle="218 granted"
                icon="©"
              />

              <MiniCard
                title="Potential Investors"
                value="68"
                subtitle="12 high-match investors"
                icon="◈"
              />

              <MiniCard
                title="Emerging Technologies"
                value="28"
                subtitle="9 high-growth areas"
                icon="⚡"
              />

            </section>
          </>
        )}

        {/* MARKET OPPORTUNITIES */}
        {activeTab === "Market Opportunities" && (
          <section className="commercial-panel">

            <div className="commercial-panel-header">
              <div>
                <h2>Market Opportunities</h2>
                <p>
                  High-potential markets identified from
                  research and technology trends.
                </p>
              </div>
            </div>

            <div className="commercial-opportunity-grid">

              {opportunities.map((item) => (
                <div
                  className="commercial-opportunity-card"
                  key={item.name}
                >

                  <div className="opportunity-icon">
                    🚀
                  </div>

                  <h3>{item.name}</h3>

                  <span className="opportunity-domain">
                    {item.domain}
                  </span>

                  <div className="opportunity-market">
                    <span>Market Size</span>
                    <strong>{item.market}</strong>
                  </div>

                  <div className="opportunity-readiness">
                    <span>Readiness</span>

                    <strong>
                      {item.readiness}%
                    </strong>
                  </div>

                  <div className="opportunity-progress">
                    <div
                      style={{
                        width: `${item.readiness}%`,
                      }}
                    ></div>
                  </div>

                  <span className="opportunity-status">
                    {item.status}
                  </span>

                </div>
              ))}

            </div>

          </section>
        )}

        {/* TECHNOLOGY ANALYSIS */}
        {activeTab === "Technology Analysis" && (
          <section className="commercial-panel">

            <div className="commercial-panel-header">
              <div>
                <h2>Technology Commercialization Analysis</h2>
                <p>
                  Technologies ranked according to
                  commercialization potential.
                </p>
              </div>
            </div>

            <div className="commercial-tech-grid">

              {technologies.map((tech) => (
                <div
                  className="commercial-tech-card"
                  key={tech.name}
                >

                  <div className="tech-top">
                    <div className="tech-icon">
                      ⚡
                    </div>

                    <span className="tech-score">
                      {tech.score}
                    </span>
                  </div>

                  <h3>{tech.name}</h3>

                  <p>{tech.category}</p>

                  <div className="tech-stage">
                    {tech.stage}
                  </div>

                  <div className="commercial-progress">
                    <div
                      style={{
                        width: `${tech.score}%`,
                      }}
                    ></div>
                  </div>

                </div>
              ))}

            </div>

          </section>
        )}

        {/* FUNDING */}
        {activeTab === "Funding" && (
          <section className="commercial-panel">

            <div className="commercial-panel-header">
              <div>
                <h2>Funding Opportunities</h2>
                <p>
                  Funding programs matched to your
                  commercialization goals.
                </p>
              </div>
            </div>

            <div className="commercial-funding-list">

              {funding.map((grant) => (
                <div
                  className="commercial-funding-card"
                  key={grant.name}
                >

                  <div>
                    <span className="funding-id">
                      {grant.organization}
                    </span>

                    <h3>{grant.name}</h3>

                    <p>
                      Deadline: {grant.deadline}
                    </p>
                  </div>

                  <div className="funding-amount">
                    {grant.amount}
                  </div>

                  <div className="funding-match">
                    <span>Match</span>
                    <strong>{grant.match}%</strong>
                  </div>

                  <button className="commercial-apply">
                    Explore
                  </button>

                </div>
              ))}

            </div>

          </section>
        )}

        {/* IP */}
        {activeTab === "IP & Patents" && (
          <section className="commercial-panel">

            <div className="commercial-panel-header">
              <div>
                <h2>IP & Patent Intelligence</h2>
                <p>
                  Intellectual property insights for
                  commercialization decisions.
                </p>
              </div>
            </div>

            <div className="commercial-stat-grid">

              <MiniCard
                title="Total Patents"
                value="342"
                subtitle="Tracked patents"
                icon="©"
              />

              <MiniCard
                title="Granted"
                value="218"
                subtitle="63.7% grant rate"
                icon="✓"
              />

              <MiniCard
                title="Pending"
                value="124"
                subtitle="Under examination"
                icon="◌"
              />

              <MiniCard
                title="High-Value IP"
                value="47"
                subtitle="Commercial potential"
                icon="◆"
              />

            </div>

            <div className="ip-highlight">

              <div className="ip-icon">
                🔐
              </div>

              <div>
                <h3>
                  Strong IP Protection Opportunity
                </h3>

                <p>
                  AI analysis identified 47 patent assets
                  with strong commercial potential and
                  potential licensing opportunities.
                </p>
              </div>

            </div>

          </section>
        )}

        <footer className="commercial-footer">
          Innovation Intelligence Platform ·
          Commercialization Intelligence · 2026
        </footer>

      </main>
    </div>
  );
}


/* =========================
   PROGRESS COMPONENT
========================= */

function Progress({ label, value }) {
  return (
    <div className="commercial-progress-row">

      <div className="progress-info">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>

      <div className="commercial-progress">
        <div
          style={{
            width: `${value}%`,
          }}
        ></div>
      </div>

    </div>
  );
}


/* =========================
   MARKET BAR
========================= */

function MarketBar({ name, value, market }) {
  return (
    <div className="market-bar-item">

      <div className="market-bar-header">
        <span>{name}</span>
        <strong>{market}</strong>
      </div>

      <div className="commercial-progress">
        <div
          style={{
            width: `${value}%`,
          }}
        ></div>
      </div>

    </div>
  );
}


/* =========================
   OPPORTUNITY TABLE
========================= */

function OpportunityTable({ opportunities }) {
  return (
    <div className="commercial-table-wrapper">

      <table className="commercial-table">

        <thead>
          <tr>
            <th>Opportunity</th>
            <th>Domain</th>
            <th>Market</th>
            <th>Readiness</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {opportunities.map((item) => (
            <tr key={item.name}>

              <td>
                <strong>{item.name}</strong>
              </td>

              <td>
                {item.domain}
              </td>

              <td className="market-value">
                {item.market}
              </td>

              <td>

                <div className="table-readiness">

                  <div className="commercial-progress">
                    <div
                      style={{
                        width: `${item.readiness}%`,
                      }}
                    ></div>
                  </div>

                  <span>
                    {item.readiness}%
                  </span>

                </div>

              </td>

              <td>
                <span className="status-badge">
                  {item.status}
                </span>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}


/* =========================
   MINI CARD
========================= */

function MiniCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="commercial-mini-card">

      <div className="mini-icon">
        {icon}
      </div>

      <div>

        <span>{title}</span>

        <strong>{value}</strong>

        <small>{subtitle}</small>

      </div>

    </div>
  );
}

export default CommercializationDashboard;