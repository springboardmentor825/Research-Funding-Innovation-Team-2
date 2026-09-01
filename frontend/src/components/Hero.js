function Hero() {
  return (
    <section className="hero">

      <div className="hero-grid"></div>

      <div className="hero-content">

        <div className="hero-badge">
          <span className="pulse-dot"></span>
          AI-Powered Innovation Intelligence
        </div>

        <h1>
          Turn Research Into
          <span> Innovation Opportunities.</span>
        </h1>

        <p>
          Discover funding opportunities, emerging technologies, research
          trends and patent intelligence through one intelligent platform.
        </p>

        <div className="hero-actions">
         <a href="/research-dashboard" className="primary-button">
  Explore Intelligence →
</a>

          <a href="#workflow" className="secondary-button">
            See How It Works
          </a>
        </div>

        <div className="hero-trust">
          <div>
            <strong>Research</strong>
            <span>Intelligence</span>
          </div>

          <div>
            <strong>Funding</strong>
            <span>Discovery</span>
          </div>

          <div>
            <strong>Patent</strong>
            <span>Analytics</span>
          </div>

          <div>
            <strong>AI</strong>
            <span>Recommendations</span>
          </div>
        </div>

      </div>

      <div className="hero-dashboard">

        <div className="dashboard-top">
          <div>
            <span>Innovation Intelligence</span>
            <h3>Research Opportunity Radar</h3>
          </div>

          <span className="live-badge">● LIVE</span>
        </div>

        <div className="radar">

          <div className="radar-ring ring-one"></div>
          <div className="radar-ring ring-two"></div>
          <div className="radar-ring ring-three"></div>

          <div className="radar-center">
            AI
          </div>

          <div className="radar-node node-one">Funding</div>
          <div className="radar-node node-two">Patent</div>
          <div className="radar-node node-three">Research</div>
          <div className="radar-node node-four">Technology</div>

        </div>

        <div className="dashboard-footer">
          <div>
            <span>Innovation Score</span>
            <strong>87.4</strong>
          </div>

          <div>
            <span>Opportunities</span>
            <strong>142</strong>
          </div>

          <div>
            <span>Emerging Topics</span>
            <strong>28</strong>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Hero;