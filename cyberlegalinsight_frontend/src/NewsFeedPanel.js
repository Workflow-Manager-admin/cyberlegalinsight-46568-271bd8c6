import React from 'react';

// PUBLIC_INTERFACE
/**
 * NewsFeedPanel - Displays a styled, scrolling news feed and phishing alert panel.
 * Uses mock/static data, styled to visually integrate with sidebar/app theme.
 * Meant to be placed in the left sidebar (under or above ChatSidebar).
 */
function NewsFeedPanel() {
  // --------- Demo/mock news and alerts data ----------
  const newsItems = [
    {
      type: "news",
      icon: "📰",
      headline: "Court Rules Against Social Engineering Scam Victim",
      summary: "A recent ruling reminds companies to enhance anti-phishing training amid rise in cyber scams.",
      time: "2h ago"
    },
    {
      type: "alert",
      icon: "⚠️",
      headline: "Phishing Alert: Contract PDF Message",
      summary: "Fake PDF attachments claim to be contract updates—do NOT click or open links.",
      time: "46m ago"
    },
    {
      type: "news",
      icon: "🔒",
      headline: "New EU Law Strengthens Digital Contracts",
      summary: "Regulation mandates plain-language terms for online platforms—compliance required by June.",
      time: "3d ago"
    },
    {
      type: "alert",
      icon: "🛑",
      headline: "Suspicious Login Blocked",
      summary: "We detected and blocked an unrecognized login to your account from Russia.",
      time: "8m ago"
    },
    {
      type: "news",
      icon: "💡",
      headline: "Cyber Tip: Spotting Link Manipulation",
      summary: "Double-check URLs in messages and browser address bar for subtle misspellings.",
      time: "Just now"
    }
  ];

  // --------- Styles ---------
  const panelStyle = {
    background: "rgba(15, 26, 49, 0.11)", // Semi dark, transparent overlay on sidebar bg
    borderRadius: 11,
    padding: "10px 8px 12px 10px",
    boxShadow: "0 1px 12px rgba(74,144,226,0.05)",
    minHeight: 250,
    maxHeight: 400,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: 0
  };
  const headerStyle = {
    color: "#fff",
    fontSize: "1.11em",
    fontWeight: 700,
    letterSpacing: -.5,
    margin: "7px 0 11px 3px",
    display: "flex",
    alignItems: "center",
    gap: 7
  };
  const feedListStyle = {
    overflowY: "auto",
    paddingRight: 2,
    maxHeight: 315,
    display: "flex",
    flexDirection: "column",
    gap: 0
  };
  const itemStyle = (type) => ({
    background: type === "alert"
      ? "linear-gradient(87deg, rgba(245,166,35,0.09) 80%, rgba(236, 28, 36, 0.04))"
      : "rgba(255,255,255,0.06)",
    borderRadius: 8,
    border: type === "alert"
      ? "1.6px solid var(--accent)"
      : "1.2px solid var(--border-color)",
    margin: "0 0 14px 0",
    padding: "10px 14px 10px 12px",
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    gap: 12,
    boxShadow: type === "alert"
      ? "0 1px 7px rgba(245,166,35,0.08)"
      : "0 1px 4px rgba(80,227,194,0.03)"
  });
  const iconStyle = {
    fontSize: "1.49em",
    marginTop: "1px",
    flexShrink: 0,
    filter: "drop-shadow(0 1px 3px rgba(20,28,40,0.11))"
  };
  const contentStyle = {
    color: "#fff",
    fontWeight: 500,
    fontSize: "1.055em",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 3
  };
  const headStyle = (type) => ({
    color: type === "alert" ? "var(--accent)" : "var(--secondary)",
    fontWeight: 700,
    fontSize: "1.05em",
    letterSpacing: "-0.2px",
    marginBottom: 1
  });
  const summaryStyle = {
    color: "var(--text-light)",
    opacity: .85,
    fontWeight: 400,
    fontSize: "0.97em",
    margin: 0
  };
  const timeStyle = {
    fontSize: ".94em",
    color: "rgba(255,255,255,0.58)",
    fontWeight: 420,
    marginTop: 2
  };

  // --------- Main UI Render ---------
  return (
    <section aria-label="News Feed and Phishing Alerts" style={panelStyle}>
      <div style={headerStyle}>
        <span role="img" aria-label="alert" style={{fontSize:"1.33em"}}>🔔</span>
        News &amp; Phishing Alerts
      </div>
      <div style={feedListStyle} tabIndex={0} aria-live="polite">
        {newsItems.map((item, idx) => (
          <div key={item.headline+idx} style={itemStyle(item.type)} aria-label={item.type === "alert" ? "Security alert" : "News"}>
            <span style={iconStyle} role="img" aria-label={item.type === "alert" ? "Alert" : "News"}>
              {item.icon}
            </span>
            <div style={contentStyle}>
              <span style={headStyle(item.type)}>{item.headline}</span>
              <span style={summaryStyle}>{item.summary}</span>
              <span style={timeStyle}>{item.time}</span>
            </div>
          </div>
        ))}
        {newsItems.length === 0 &&
          <div style={{
            color: "rgba(255,255,255,0.8)", padding:"9px", textAlign:"center", fontWeight: 400, letterSpacing:0,
            fontSize: "1em"
          }}>
            No recent news or alerts.
          </div>
        }
      </div>
    </section>
  );
}

export default NewsFeedPanel;
