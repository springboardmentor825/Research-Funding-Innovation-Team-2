function IntelligenceOverview() {
  return (
    <section className="section intelligence-section" id="intelligence">

      <div className="intelligence-layout">

        <div className="intelligence-text">

          <span className="section-label">
            INTELLIGENCE LAYER
          </span>

          <h2>
            See the signals
            <span> others miss.</span>
          </h2>

          <p>
            ResearchIQ brings multiple innovation signals together so
            researchers and organizations can understand where research,
            technology, funding and market opportunities intersect.
          </p>

          <div className="signal-list">

            <div className="signal">
              <span>01</span>
              <div>
                <strong>Research Trends</strong>
                <p>Identify emerging research areas and hotspots.</p>
              </div>
            </div>

            <div className="signal">
              <span>02</span>
              <div>
                <strong>Patent Landscape</strong>
                <p>Understand intellectual property and competitive activity.</p>
              </div>
            </div>

            <div className="signal">
              <span>03</span>
              <div>
                <strong>Funding Signals</strong>
                <p>Discover funding opportunities aligned with research.</p>
              </div>
            </div>

            <div className="signal">
              <span>04</span>
              <div>
                <strong>Technology Opportunities</strong>
                <p>Identify technologies with future innovation potential.</p>
              </div>
            </div>

          </div>

        </div>

        <div className="intelligence-visual">

          <div className="visual-card main-visual">

            <div className="visual-header">
              <span>Opportunity Map</span>
              <span>2026</span>
            </div>

            <div className="opportunity-map">

              <div className="map-node funding-node">
                <small>FUNDING</small>
                <strong>92%</strong>
              </div>

              <div className="map-node research-node">
                <small>RESEARCH</small>
                <strong>86%</strong>
              </div>

              <div className="map-node patent-node">
                <small>PATENT</small>
                <strong>78%</strong>
              </div>

              <div className="map-node technology-node">
                <small>TECH</small>
                <strong>91%</strong>
              </div>

              <div className="map-core">
                <span>AI</span>
                <small>INTELLIGENCE</small>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default IntelligenceOverview;