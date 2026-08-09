const roles = [
  {
    icon: "R",
    title: "Researcher",
    description:
      "Discover funding, monitor research trends, manage publications and understand innovation potential."
  },
  {
    icon: "S",
    title: "Startup Founder",
    description:
      "Identify technologies, funding opportunities, patents and commercialization possibilities."
  },
  {
    icon: "I",
    title: "Innovation Manager",
    description:
      "Monitor portfolios, technology trends, innovation pipelines and funding analytics."
  },
  {
    icon: "A",
    title: "Administrator",
    description:
      "Manage users, platform analytics, recommendations and system reports."
  }
];

function Roles() {
  return (
    <section className="section roles-section" id="roles">

      <div className="section-heading">

        <span>BUILT FOR INNOVATION TEAMS</span>

        <h2>
          One platform.
          <br />
          Different perspectives.
        </h2>

        <p>
          Role-based intelligence gives every member of the innovation
          ecosystem the information they need.
        </p>

      </div>

      <div className="roles-grid">

        {roles.map((role, index) => (
          <div className="role-card" key={index}>

            <div className="role-icon">
              {role.icon}
            </div>

            <h3>{role.title}</h3>

            <p>{role.description}</p>

            <span>Explore workspace →</span>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Roles;