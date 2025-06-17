import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * ReportGenerator - Report generation, PDF export, and sharing UI.
 * Users can download mock report as PDF (stub), preview report, and use demo share/email features.
 */
function ReportGenerator() {
  // --- Demo/mock report data ---
  const demoReport = {
    title: "Contract Risk Analysis Summary",
    date: new Date().toLocaleDateString(),
    score: 83,
    summary: "Your contract demonstrates moderate risk with strong security and clarity, but lacks compliance detail. Recommendations provided below.",
    sections: [
      {
        heading: "Key Insights",
        items: [
          "Security provisions are sufficient (Score: 8.5/10)",
          "No explicit limitation of liability clause detected",
          "Governing law is defined as 'California, USA'",
          "Penalty for breach: present (quantitative details missing)"
        ]
      },
      {
        heading: "AI Recommendations",
        items: [
          "Clarify data privacy responsibilities",
          "Add explicit clauses for breach notification timelines",
          "Include a detailed termination procedure"
        ]
      }
    ],
    shareLink: "https://cyberlegalinsight-demo.com/report/ABC123"
  };

  // --- UI State ---
  const [showPreview, setShowPreview] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // --- Stub for generating PDF ---
  // PUBLIC_INTERFACE
  function handleExportPDF() {
    // Simulate PDF export—just trigger a download of a .txt (in real use, PDF generation lib or server call)
    const blob = new Blob(
      [
        `== ${demoReport.title} ==\nDate: ${demoReport.date}\nScore: ${demoReport.score}/100\nSummary: ${demoReport.summary}\n\n${
          demoReport.sections
            .map(sec => `-- ${sec.heading} --\n${sec.items.map(i=>" - "+i).join("\n")}`).join("\n\n")
        }\n\nShare Link: ${demoReport.shareLink}\n`
      ],
      { type: "text/plain" }
    );
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report-summary-demo.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    setStatusMsg("PDF export triggered (demo: .txt file).");
  }

  // PUBLIC_INTERFACE
  function handleShareEmail() {
    // Simulate opening mail client with mailto: pre-populated
    const subject = encodeURIComponent("CyberLegalInsight: Your Report");
    const body = encodeURIComponent(
      `Hello,\n\nHere is your report link: ${demoReport.shareLink}\n\nSummary: ${demoReport.summary}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setStatusMsg("Share via email launched your mail client (demo).");
  }

  // PUBLIC_INTERFACE
  function handleShowDemoPreview() {
    setShowPreview(!showPreview);
    setStatusMsg("");
  }

  // PUBLIC_INTERFACE
  function handleShowSharePanel() {
    setShareVisible(!shareVisible);
    setStatusMsg("");
  }

  // --- Styles ---
  const sectionStyle = {
    margin: "38px 0 22px 0",
    padding: "32px 7vw 30px 4vw",
    background: "var(--base-light)",
    borderRadius: 12,
    boxShadow: "0 2px 14px 0 rgba(74, 144, 226, 0.07)",
    maxWidth: 520,
    width: "100%",
    position: "relative"
  };
  const btnRow = {
    display: "flex",
    gap: "15px",
    marginBottom: "15px",
    flexWrap: "wrap"
  };
  const btnShare = {
    background: "var(--secondary)",
    color: "var(--text-light)"
  };
  const btnPDF = {
    background: "var(--primary)",
    color: "var(--text-light)"
  };
  const btnPreview = {
    background: "var(--accent)",
    color: "var(--text-light)"
  };

  // --- Demo Report Preview (simple markup) ---
  function ReportPreview({ report }) {
    return (
      <div style={{
        border: "1.2px solid var(--border-color)",
        borderRadius: 7,
        background: "rgba(74,144,226,0.04)",
        padding: "21px 16px 15px 22px",
        marginTop: 12,
        marginBottom: 15,
        color: "var(--text-color)",
        fontSize: "1.07em",
        transition: "box-shadow .18s",
        boxShadow: "0 1px 12px 0 rgba(74,144,226,0.07)"
      }}>
        <h3 style={{margin:"0 0 4px 0", color: "var(--primary)"}}>
          {report.title}
        </h3>
        <div style={{fontSize: ".98em", color:"var(--text-secondary)", marginBottom:4}}>
          Date: {report.date} &nbsp; | &nbsp; Score: <span style={{fontWeight:550}}>{report.score}/100</span>
        </div>
        <div style={{margin: "7px 0 7px 0", color: "var(--accent)"}}>
          <b>Summary:</b> {report.summary}
        </div>
        <div>
          {report.sections.map(section => (
            <div key={section.heading} style={{marginBottom: 7}}>
              <b style={{color:"var(--secondary)", fontWeight:500}}>{section.heading}:</b>
              <ul style={{margin:"5px 0 6px 20px", fontSize:".99em"}}>
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{marginTop:8, color:"var(--primary)", fontSize:".96em"}}>
          Shareable Link: <a href={report.shareLink} style={{color:"var(--accent)",textDecoration:"underline"}} target="_blank" rel="noopener noreferrer">{report.shareLink}</a>
        </div>
      </div>
    );
  }

  // --- Share/demo panel ---
  function SharePanel({ report, onClose, onEmail }) {
    return (
      <div style={{
        marginTop: 7,
        marginBottom: 13,
        border: "1.15px solid var(--border-color)",
        background: "#fafbff",
        borderRadius: 8,
        padding: "17px 17px 12px 19px"
      }}>
        <b>Share this report:</b>
        <div style={{margin:"10px 0 6px 1px", fontSize:".98em", display:'flex', alignItems:"center", flexWrap:"wrap"}}>
          <input
            value={report.shareLink}
            readOnly
            style={{
              width: "68%",
              fontSize: ".99em",
              borderRadius: 6,
              border: "1px solid var(--border-color)",
              padding: "7px 8px",
              marginRight: 6,
              background:"#fff"
            }}
            onFocus={e => e.target.select()}
            aria-label="Shareable link"
          />
          <button
            className="btn"
            style={btnShare}
            onClick={() => {
              navigator.clipboard.writeText(report.shareLink);
              setStatusMsg("Copied share link to clipboard!");
            }}
          >
            Copy Link
          </button>
          <button
            className="btn"
            style={{...btnShare, marginLeft:8}}
            onClick={onEmail}
          >
            Email...
          </button>
        </div>
        <button
          className="btn"
          style={{
            background: "var(--border-color)",
            color:"var(--text-secondary)",
            fontSize:".98em",
            marginTop: 7
          }}
          onClick={onClose}
        >Close</button>
      </div>
    );
  }

  // --- UI Render ---
  return (
    <section aria-label="Report Generator panel" style={sectionStyle}>
      <h2 style={{margin:"0 0 13px 0"}}>Report Generator</h2>
      <div style={btnRow}>
        <button
          className="btn"
          style={btnPDF}
          onClick={handleExportPDF}
        >
          Export as PDF
        </button>
        <button
          className="btn"
          style={btnShare}
          onClick={handleShowSharePanel}
        >
          Share Report
        </button>
        <button
          className="btn"
          style={btnPreview}
          onClick={handleShowDemoPreview}
        >
          {showPreview ? "Hide" : "Preview"} Report
        </button>
      </div>
      {statusMsg && (
        <div style={{color:"var(--accent)", fontWeight:500, margin: "7px 0 3px 1px", fontSize:".98em"}}>
          {statusMsg}
        </div>
      )}
      {/* Share panel with demo controls */}
      {shareVisible && (
        <SharePanel
          report={demoReport}
          onClose={handleShowSharePanel}
          onEmail={handleShareEmail}
        />
      )}
      {/* Report preview */}
      {showPreview && (
        <ReportPreview report={demoReport} />
      )}
      {!showPreview && !shareVisible && (
        <div style={{color: "#888", marginTop:6}}>[Stub] Generate, download, and share reports here.</div>
      )}
    </section>
  );
}

export default ReportGenerator;
