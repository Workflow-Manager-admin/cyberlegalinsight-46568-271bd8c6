import React, { useState, useRef } from 'react';

// PUBLIC_INTERFACE
/**
 * FileUpload - Contract analysis input area.
 * Allows users to upload files or paste/type contract text for analysis.
 */
function FileUpload() {
  // UI and state logic for tab (file/text), input values, errors
  const [inputMode, setInputMode] = useState('file'); // 'file' or 'text'
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [text, setText] = useState('');
  const [textError, setTextError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef();

  // Allowed file types for contract upload
  const ACCEPTED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain"
  ];
  const MAX_SIZE_MB = 5;

  // Handle file select
  function handleFileChange(e) {
    const f = e.target.files[0];
    setFile(null);
    setFileError('');
    if (!f) {
      setFile(null);
      return;
    }
    // Validation: type and size
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setFileError('Unsupported file type. Please upload a PDF, DOCX, or TXT file.');
      setFile(null);
    } else if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setFileError(`File is too large (max ${MAX_SIZE_MB}MB).`);
      setFile(null);
    } else {
      setFile(f);
      setFileError('');
    }
  }

  // Handle text input change
  function handleTextChange(e) {
    setText(e.target.value);
    setTextError('');
  }

  // Submission handler
  function handleSubmit(e) {
    e.preventDefault();
    setFileError('');
    setTextError('');
    setSubmitted(false);
    if (inputMode === 'file') {
      if (!file) {
        setFileError('Please select a file to upload.');
        return;
      }
      // (Placeholder: handle file upload)
      setSubmitted(true);
    } else {
      if (!text.trim()) {
        setTextError('Please enter contract text.');
        return;
      }
      // (Placeholder: handle text submission)
      setSubmitted(true);
    }
  }

  // Switch between file & text
  function handleTab(mode) {
    setInputMode(mode);
    setFile(null);
    setFileError('');
    setText('');
    setTextError('');
    setSubmitted(false);
    // If switching to file mode, clear input
    if (fileInputRef.current && mode === "file") {
      fileInputRef.current.value = '';
    }
  }

  // Minimal UI style palette for card area
  const panelStyle = {
    margin: "42px 0 34px 0",
    padding: "32px 7vw 30px 4vw",
    background: "var(--base-light)",
    borderRadius: 12,
    boxShadow: "0 2px 16px 0 rgba(74, 144, 226, 0.09)",
    maxWidth: 480,
    width: "100%"
  };
  const tabButtonStyle = (active) => ({
    background: active ? "var(--accent)" : "var(--secondary)",
    color: "var(--text-light)",
    border: "none",
    borderRadius: "6px 6px 0 0",
    padding: "9px 22px",
    fontWeight: 600,
    fontSize: "1.07em",
    marginRight: 3,
    opacity: active ? 1 : 0.73,
    letterSpacing: 0,
    cursor: "pointer",
    outline: "none",
    borderBottom: active ? "3px solid var(--accent)" : "3px solid transparent",
    transition: "background 0.17s,border 0.2s"
  });

  // ACTUAL UI RENDER
  return (
    <section aria-label="Contract upload/input panel" style={panelStyle}>
      <h2 style={{ margin: "0 0 14px 0" }}>
        Contract Upload & Analysis
      </h2>

      {/* Tabs for mode */}
      <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
        <button
          type="button"
          style={tabButtonStyle(inputMode === 'file')}
          onClick={() => handleTab('file')}
          aria-pressed={inputMode === "file"}
        >
          Upload File
        </button>
        <button
          type="button"
          style={tabButtonStyle(inputMode === 'text')}
          onClick={() => handleTab('text')}
          aria-pressed={inputMode === "text"}
        >
          Paste / Type Text
        </button>
      </div>

      {/* File Upload mode  */}
      {inputMode === "file" && (
        <form onSubmit={handleSubmit} aria-label="Upload contract file" style={{ marginTop: 9, display: "flex", flexDirection: "column", gap: 13 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            style={{
              marginBottom: 5,
              fontSize: "1rem",
              padding: "6px",
              background: "var(--base-light)",
              color: "var(--text-color)",
              border: "1.25px solid var(--border-color)",
              borderRadius: 7,
              cursor: "pointer"
            }}
            aria-label="Select contract file"
          />
          <small style={{color:"var(--text-secondary)", marginBottom:-4}}>
            Accepts: PDF, DOCX, DOC, TXT — max {MAX_SIZE_MB}MB
          </small>
          {file && (
            <div style={{ fontSize: ".98em", marginTop: 6 }}>
              <span style={{ color: "var(--primary)", fontWeight: 500 }}>Selected:</span>&nbsp;
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </div>
          )}
          {fileError && (
            <div style={{ color: "var(--accent)", marginTop: 2, fontSize: ".98em" }} aria-live="polite">{fileError}</div>
          )}
          <button type="submit" className="btn" style={{ marginTop: 9, maxWidth: 170, background: "var(--primary)" }}>
            Analyze Contract
          </button>
        </form>
      )}

      {/* Text Input mode */}
      {inputMode === "text" && (
        <form onSubmit={handleSubmit} aria-label="Input contract text" style={{marginTop:7, display:"flex", flexDirection:"column", gap:14}}>
          <textarea
            value={text}
            onChange={handleTextChange}
            rows={7}
            required
            aria-label="Contract text"
            placeholder="Paste or type contract text here... (Recommended: up to ~6000 characters)"
            style={{
              border: "1.3px solid var(--border-color)",
              borderRadius: 8,
              fontSize: "1.07rem",
              padding: "10px 12px",
              background: "var(--base-light)",
              color: "var(--text-color)",
              resize: "vertical",
              width: "100%",
              minHeight: 110,
              maxHeight: 320
            }}
            maxLength={6500}
          />
          <div style={{fontSize:".96em", color:"var(--text-secondary)", marginLeft:1, marginTop:-5}}>
            Tip: Remove personal data unless needed.
            <span style={{float:"right", opacity:0.7}}>{text.length}/6500</span>
          </div>
          {textError && (
            <div style={{ color: "var(--accent)", fontSize: ".97em", marginTop: -7 }} aria-live="polite">{textError}</div>
          )}
          <button type="submit" className="btn" style={{ maxWidth:170, background: "var(--primary)" }}>
            Analyze Contract
          </button>
        </form>
      )}

      {/* Confirmation Demo */}
      {submitted && (
        <div style={{
          marginTop: 19,
          color: "var(--secondary)",
          fontWeight: 550,
          fontSize: "1.08em"
        }}>
          ✔️ Contract {inputMode === 'file' ? 'file ready for analysis.' : 'text ready for analysis.'}
        </div>
      )}
    </section>
  );
}

export default FileUpload;
