import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Workflow from "./components/Workflow";
import IntelligenceOverview from "./components/IntelligenceOverview";
import IntelligenceScore from "./components/IntelligenceScore";
import Roles from "./components/Roles";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import CommercializationDashboard from "./pages/commercializationdashboard";

import ResearchDashboard from "./pages/ResearchDashboard";

import "./App.css";

function LandingPage() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Research Analytics + AI Recommendations */}
        <Route
          path="/research-dashboard"
          element={<ResearchDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;