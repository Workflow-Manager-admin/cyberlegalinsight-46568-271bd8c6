import React, { useState, useRef } from 'react';
import './App.css';
import AdaptiveQuestionFlow from './AdaptiveQuestionFlow';
import VisualizationPanel from './VisualizationPanel';
import ThemeToggle from './ThemeToggle';
import FileUpload from './FileUpload';
import ReportGenerator from './ReportGenerator';
import GamificationPanel from './GamificationPanel';
import ChatSidebar from './ChatSidebar';
import NewsFeedPanel from './NewsFeedPanel';
import Modal from './Modal';

/**
 * Main application entrypoint and layout for CyberLegalInsight with feature navigation and modal/dialog flow.
 * Integrates modal scaffolds across Get Started, Report Preview, Gamification, and supports navigation triggers.
 */
// PUBLIC_INTERFACE
function App() {
  // --- Modal/dialog navigation state ---
  // Only one modal/dialog open at a time; keys: 'getStarted', 'reportPreview', 'gamification', etc., or null
  const [modal, setModal] = useState(null);

  // Ref for AdaptiveQuestionFlow for smooth scrolling
  const questionFlowRef = useRef(null);

  // Helper: Close modal, then scroll to AdaptiveQuestionFlow
  function scrollToQuestionFlow() {
    setModal(null);
    // Small setTimeout ensures modal closes before scroll (for a11y)
    setTimeout(() => {
      if (questionFlowRef.current) {
        questionFlowRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 70);
  }

  // Callback for "Get Started" hero button: open onboarding modal and guide into question flow
  function handleGetStarted() {
    setModal('getStarted');
  }

  // Callback for when user presses "Start" in onboarding modal or clicks navigation for Question Flow
  function handleStartQuestionFlow() {
    scrollToQuestionFlow();
  }

  // Callback for showing report preview in modal
  function handleShowReportPreview() {
    setModal('reportPreview');
  }

  // Callback for showing gamification / badges modal
  function handleShowGamification() {
    setModal('gamification');
  }

  // Central function to close any modal
  function handleCloseModal() {
    setModal(null);
  }

  // Navi buttons for jumping to key flows, for demo (could be replaced with react-router if multi-page in future)
  function MainNav() {
    return (
      <div style={{display:'flex', gap:10, marginBottom:19}}>
        <button
          className="btn"
          style={{background:'var(--primary)'}}
          onClick={handleStartQuestionFlow}
        >Question Flow</button>
        <button className="btn" style={{background:'var(--secondary)'}} onClick={() => setModal('reportPreview')}>Report Preview</button>
        <button className="btn" style={{background:'var(--accent)'}} onClick={() => setModal('gamification')}>Badges</button>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Fixed Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="logo">
            <span className="logo-symbol">⚡</span>
            CyberLegalInsight
          </div>
          <button
            className="btn"
            style={{ background: "var(--accent)", color: "var(--text-light)" }}
            onClick={() => setModal('login')}
          >
            Login / Sign Up
          </button>
        </div>
      </nav>

      {/* Responsive Layout: Sidebar + Main */}
      <div className="content-layout">
        <aside className="sidebar">
          {/* === Sidebar: Chat Assistant and News Feed Panel === */}
          <ChatSidebar />
          <NewsFeedPanel />
        </aside>
        <main className="main-content">
          {/* Theme toggle and main flows navigation */}
          <ThemeToggle />
          <MainNav />

          {/* Hero Section (with Get Started modal trigger) */}
          <div className="hero">
            <div className="subtitle">
              Advanced Cyber Risk & Contract Analysis
            </div>
            <h1 className="title">
              Welcome to CyberLegalInsight
            </h1>
            <div className="description">
              Secure, analyze, and understand your digital contracts & online behaviors with powerful AI—visualizations, chat-based help, and real-time updates.
            </div>
            <button
              className="btn btn-large"
              style={{ background: "var(--primary)" }}
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>

          {/* File Upload Flow */}
          <FileUpload />

          {/* Adaptive Question Flow (anchor section for question-based onboarding) */}
          <div ref={questionFlowRef}>
            <AdaptiveQuestionFlow />
          </div>

          {/* Visualization Insights Panel */}
          <VisualizationPanel />

          {/* Report Generator; adds button for opening preview modal */}
          <div style={{ position: 'relative' }}>
            <ReportGenerator />
            {/* Overlay report preview shortcut */}
            <button
              className="btn"
              style={{
                position: 'absolute',
                top: 23,
                right: 26,
                zIndex: 2,
                background: "var(--secondary)",
                color: "#fff",
                fontSize: ".98em"
              }}
              onClick={handleShowReportPreview}
            >
              Preview in Modal
            </button>
          </div>

          {/* Gamification with modal shortcut */}
          <div style={{ position: 'relative' }}>
            <GamificationPanel />
            <button
              className="btn"
              style={{
                position: 'absolute',
                top: 22,
                right: 26,
                zIndex: 2,
                background: "var(--accent)",
                color: "#fff",
                fontSize: ".98em"
              }}
              onClick={handleShowGamification}
            >
              View Badges
            </button>
          </div>
        </main>
      </div>

      {/* === Modal Dialog Scaffolds === */}
      <Modal open={modal === 'getStarted'} onClose={handleCloseModal} title="Get Started: Assessment Flow">
        <p>Welcome! Ready to analyze your legal and cyber risk? <br />
           Use the <strong>Question Flow</strong> below to begin.<br /><br />
          <span role="img" aria-label="idea">🧭</span>
        </p>
        {/* Scroll to AdaptiveQuestionFlow on Start */}
        <button
          className="btn"
          style={{ marginTop:18, background:"var(--primary)" }}
          onClick={handleStartQuestionFlow}
        >
          Start
        </button>
      </Modal>

      <Modal open={modal === 'reportPreview'} onClose={handleCloseModal} title="Report Preview">
        {/* Minimal stub for report preview; delegates to ReportGenerator internally */}
        <div style={{marginBottom:13, color:'var(--secondary)', fontWeight:500}}>
          Demo: Preview summary report export in a modal dialog here.<br/>
          (Use full <b>Report Generator</b> for actions.)
        </div>
        {/* Optionally insert real preview by extracting ReportPreview from ReportGenerator */}
        <button className="btn" style={{marginTop:10, background:'var(--primary)'}} onClick={handleCloseModal}>
          Close
        </button>
      </Modal>

      <Modal open={modal === 'gamification'} onClose={handleCloseModal} title="Your Badges & Progress">
        <div>
          <span style={{fontSize:"2em"}} role="img" aria-label="star">🏅</span>
          <div style={{margin:"10px 0", color:"var(--accent)"}}>Recent badges and achievements earned through your cyber/legal insights activity!</div>
          {/* In real app, inject or render list of badges/achievements */}
          <button className="btn" style={{marginTop:11, background:"var(--secondary)"}} onClick={handleCloseModal}>Close</button>
        </div>
      </Modal>

      {/* Other modal/dialog flows can be scaffolded here as needed */}
      <Modal open={modal === 'login'} onClose={handleCloseModal} title="Login / Sign Up">
        <p>This is a demo. Auth will be supported soon.</p>
        <button className="btn" style={{marginTop:13, background:"var(--secondary)"}} onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
}

export default App;