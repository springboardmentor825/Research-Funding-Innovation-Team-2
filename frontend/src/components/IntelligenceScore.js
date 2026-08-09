const scores = [
  { label: "Research Novelty", value: 30 },
  { label: "Patent Strength", value: 20 },
  { label: "Technology Maturity", value: 15 },
  { label: "Market Potential", value: 20 },
  { label: "Funding Relevance", value: 15 }
];

function IntelligenceScore() {
  return (
    <section className="section score-section">

      <div className="score-card">

        <div className="score-left">

          <span className="section-label">
            INNOVATION SCORING ENGINE
          </span>

          <h2>
            Measure innovation
            <span> with evidence.</span>
          </h2>

          <p>
            Evaluate research and innovation potential through a weighted
            intelligence model combining multiple signals.
          </p>

          <div className="score-circle">
            <div>
              <strong>87.4</strong>
              <span>Innovation Score</span>
            </div>
          </div>

        </div>

        <div className="score-right">

          <h3>Weighted Intelligence Model</h3>

          {scores.map((score, index) => (
            <div className="score-row" key={index}>

              <div className="score-label">
                <span>{score.label}</span>
                <strong>{score.value}%</strong>
              </div>

              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: `${score.value * 3.33}%` }}
                ></div>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default IntelligenceScore;
