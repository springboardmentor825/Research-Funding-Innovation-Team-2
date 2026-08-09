function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        <div className="footer-brand">

          <div className="brand">
            <div className="brand-icon">RI</div>

            <div>
              <h2>ResearchIQ</h2>
              <span>Innovation Intelligence</span>
            </div>
          </div>

          <p>
            AI-powered intelligence for research, funding,
            technology and innovation discovery.
          </p>

        </div>

        <div className="footer-column">

          <h4>Platform</h4>

          <a href="#features">Capabilities</a>
          <a href="#workflow">Workflow</a>
          <a href="#intelligence">Intelligence</a>
          <a href="#roles">Teams</a>

        </div>

        <div className="footer-column">

          <h4>Intelligence</h4>

          <a href="#features">Funding Discovery</a>
          <a href="#features">Patent Analytics</a>
          <a href="#features">Technology Intelligence</a>
          <a href="#features">Innovation Scoring</a>

        </div>

        <div className="footer-column">

          <h4>Account</h4>

          <a href="#login">Sign In</a>
          <a href="#get-started">Get Started</a>
          <a href="#roles">User Roles</a>

        </div>

      </div>

      <div className="footer-bottom">

        <span>
          © 2026 ResearchIQ. Research Funding & Innovation Intelligence.
        </span>

        <span>
          Built for intelligent innovation.
        </span>

      </div>

    </footer>
  );
}

export default Footer;