const features = [
  {
    icon: "◈",
    title: "Funding Discovery",
    description:
      "Find relevant grants, research councils, innovation funds, accelerators and venture programs."
  },
  {
    icon: "⌁",
    title: "Research Intelligence",
    description:
      "Analyze publication trends, emerging topics, research hotspots and citation patterns."
  },
  {
    icon: "◇",
    title: "Patent Intelligence",
    description:
      "Search, cluster and analyze patents while monitoring competitors and innovation landscapes."
  },
  {
    icon: "✦",
    title: "Technology Intelligence",
    description:
      "Identify emerging technologies, technology maturity and potential innovation opportunities."
  },
  {
    icon: "◎",
    title: "Innovation Scoring",
    description:
      "Evaluate research novelty, patent strength, technology maturity, market potential and funding relevance."
  },
  {
    icon: "↗",
    title: "Commercialization",
    description:
      "Discover productization, licensing, startup creation and industry partnership opportunities."
  }
];

function Features() {
  return (
    <section className="section features-section" id="features">

      <div className="section-heading">
        <span>CORE CAPABILITIES</span>
        <h2>From Research Data to<br />Actionable Intelligence</h2>
        <p>
          A unified intelligence layer connecting research, funding,
          patents, technology and commercialization.
        </p>
      </div>

      <div className="feature-grid">

        {features.map((feature, index) => (
          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

            <div className="feature-link">
              Explore capability →
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;