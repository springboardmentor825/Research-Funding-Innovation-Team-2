function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="brand">
          <div className="brand-icon">RI</div>
          <div>
            <h2>ResearchIQ</h2>
            <span>Innovation Intelligence</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#features">Capabilities</a>
          <a href="#workflow">Workflow</a>
          <a href="#intelligence">Intelligence</a>
          <a href="#roles">For Teams</a>
        </div>

        <div className="nav-actions">
          <a href="#login" className="login-link">Sign In</a>
          <a href="#get-started" className="nav-button">
            Get Started
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;