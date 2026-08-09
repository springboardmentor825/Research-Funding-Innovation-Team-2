import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Workflow from "./components/Workflow";
import IntelligenceOverview from "./components/IntelligenceOverview";
import IntelligenceScore from "./components/IntelligenceScore";
import Roles from "./components/Roles";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div className="app">

      <Navbar />

      <main>
        <Hero />
        <Features />
        <Workflow />
        <IntelligenceOverview />
        <IntelligenceScore />
        <Roles />
        <CTA />
      </main>

      <Footer />

    </div>
  );
}

export default App;