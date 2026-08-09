const steps = [
  {
    number: "01",
    title: "Build Your Research Profile",
    description:
      "Define research domains, keywords, publications, patents and technology areas."
  },
  {
    number: "02",
    title: "Analyze Intelligence",
    description:
      "Connect research trends, patent landscapes and emerging technologies."
  },
  {
    number: "03",
    title: "Discover Opportunities",
    description:
      "Match your research with relevant funding and innovation opportunities."
  },
  {
    number: "04",
    title: "Move Toward Innovation",
    description:
      "Use scoring and recommendations to identify commercialization pathways."
  }
];

function Workflow() {
  return (
    <section className="section workflow-section" id="workflow">

      <div className="section-heading">
        <span>INTELLIGENCE WORKFLOW</span>
        <h2>Research → Intelligence → Opportunity</h2>
        <p>
          A structured workflow designed to transform research information
          into meaningful funding and innovation decisions.
        </p>
      </div>

      <div className="workflow-line">

        {steps.map((step, index) => (
          <div className="workflow-step" key={index}>

            <div className="step-number">
              {step.number}
            </div>

            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>

            {index !== steps.length - 1 && (
              <div className="step-arrow">→</div>
            )}

          </div>
        ))}

      </div>

    </section>
  );
}

export default Workflow;