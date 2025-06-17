import React, { useState, useRef, useEffect } from 'react';

// PUBLIC_INTERFACE
/**
 * ChatSidebar - Collapsible chat assistant for legal/safety Q&A.
 * Features:
 *  - Collapsible sidebar on the right
 *  - Styled to match main theme (light/dark)
 *  - Demo mode: uses local data/messages
 *  - Simulates assistant responses with short delay
 *  - Resizable input area, scrollable chat, visually integrates with app
 */
function ChatSidebar() {
  // --- Demo: Simulate assistant responses locally ---
  const DEMO_RESPONSES = [
    {
      question: "What is a cyber contract?",
      answer: "A cyber contract is any legal agreement relating to digital assets, online services, or cyber behavior. Need more details or an example?"
    },
    {
      question: "How do I reduce risk in my contract?",
      answer: "You can reduce risk by clarifying terms, including liability clauses, and ensuring privacy/data protection rules are explicit."
    },
    {
      question: "What are phishing alerts?",
      answer: "Phishing alerts warn you about suspicious messages, emails, or links designed to steal information. Always verify the sender!"
    }
  ];

  // --- State ----
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([
    {
      from: "assistant",
      text: "Hi! I’m your CyberLegal Assistant. Ask me a question about contracts or cyber safety. (Try: \"What is a cyber contract?\")",
      ts: Date.now()
    }
  ]);
  const [sending, setSending] = useState(false);

  const chatEndRef = useRef(null);

  // Scroll to new message automatically
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat, open]);

  function handleToggle() {
    setOpen(val => !val);
  }

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSend(e) {
    e && e.preventDefault();
    if (!input.trim() || sending) return;

    const userMsg = { from: "user", text: input.trim(), ts: Date.now() };
    setChat(old => [...old, userMsg]);
    setInput('');
    setSending(true);

    // Demo: Find relevant canned response, else generic answer
    setTimeout(() => {
      let match = DEMO_RESPONSES.find(r =>
        input.toLowerCase().includes(r.question.toLowerCase().split(' ').slice(0, 2).join(' '))
      );
      let answer = match
        ? match.answer
        : "I'm here to help with cyber/legal queries! Try asking about contract clauses or digital privacy—this is a demo assistant with canned responses.";
      setChat(old => [
        ...old,
        {
          from: "assistant",
          text: answer,
          ts: Date.now()
        }
      ]);
      setSending(false);
    }, 700 + Math.random() * 400); // delay to simulate AI typing
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
  }

  // --- UI/Layout Styles ---
  const sidebarStyle = {
    width: open ? 298 : 44,
    transition: "width 0.23s cubic-bezier(.57,.14,.24,1.07)",
    background: "linear-gradient(160deg, var(--secondary) 80%, var(--primary) 100%)",
    color: "var(--text-light)",
    boxShadow: "2px 0 11px 0 rgba(80, 227, 194, 0.09)",
    padding: open ? "14px 7px 18px 14px" : "14px 6px",
    minHeight: "340px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
    borderRadius: "11px 0 0 11px"
  };
  const toggleBtnStyle = {
    position: "absolute",
    left: -27,
    top: 30,
    width: 37,
    height: 38,
    borderRadius: "17px 0 0 17px",
    background: "var(--primary)",
    color: "var(--text-light)",
    border: "none",
    boxShadow: "0 0 8px rgba(74,144,226,0.10)",
    cursor: "pointer",
    zIndex: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    outline: "none",
    fontSize: "1.32em",
    transition: "left 0.18s"
  };
  const headerStyle = {
    display: open ? "flex" : "none",
    alignItems: "center",
    gap: 8,
    margin: "4px 0 17px 0"
  };
  const chatListStyle = {
    flex: "1 1 auto",
    overflowY: "auto",
    maxHeight: 320,
    paddingRight: 5,
    marginRight: 0,
    marginBottom: 8,
    transition: "opacity .18s"
  };
  const inputBarStyle = {
    display: open ? "flex" : "none",
    alignItems: "flex-end",
    gap: 7,
    marginTop: 5
  };
  const inputStyle = {
    borderRadius: 7,
    padding: "7px 12px",
    fontSize: ".98em",
    minHeight: 25,
    maxHeight: 65,
    flex: 1,
    resize: "vertical",
    outline: "none",
    border: "1px solid var(--primary)",
    background: "#fff",
    color: "#18202b",
    fontFamily: "inherit"
  };
  const sendBtnStyle = {
    background: "var(--accent)",
    color: "var(--text-light)",
    border: "none",
    borderRadius: 7,
    padding: open ? "8px 17px" : "9px 7px",
    fontWeight: 600,
    fontSize: ".98em",
    minWidth: 39,
    cursor: sending ? "not-allowed" : "pointer",
    opacity: sending ? 0.7 : 1
  };

  // Message arr for display
  function ChatMessage({ msg }) {
    const isUser = msg.from === "user";
    const bubbles = {
      display: "inline-block",
      wordBreak: "break-word",
      background: isUser
        ? "rgba(245,166,35,0.94)"
        : "rgba(255,255,255,0.13)",
      color: isUser ? "#fff" : "#fff",
      padding: "10px 13px",
      borderRadius: isUser ? "13px 13px 2px 13px" : "14px 14px 14px 2px",
      fontSize: "1.04em",
      maxWidth: "93%",
      margin: isUser ? "2px 0 2px 17px" : "2px 17px 2px 0",
      boxShadow: "0 1px 7px rgba(245,166,35,.07)"
    };
    const row = {
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: "3px"
    };
    return (
      <div style={row}>
        <div style={bubbles} aria-label={isUser ? "Your message" : "Assistant message"}>
          {msg.text}
        </div>
      </div>
    );
  }

  return (
    <aside aria-label="Chat Assistant" style={sidebarStyle}>
      {/* Collapsible Toggle Button */}
      <button
        type="button"
        style={toggleBtnStyle}
        onClick={handleToggle}
        aria-label={open ? "Collapse chat sidebar" : "Expand chat sidebar"}
        title={open ? "Close" : "Open"}
      >
        {open ? <>&#10094;</> : <span role="img" aria-label="Chat">💬</span>}
      </button>
      {/* Header */}
      <div style={headerStyle}>
        <span role="img" aria-label="cyber chat" style={{ fontSize: "1.5em" }}>
          🤖
        </span>
        <span style={{ fontWeight: 600, fontSize: "1.17em", color: "#fff" }}>
          Chat Assistant
        </span>
      </div>
      {/* Chat List */}
      {open && (
        <div style={chatListStyle} aria-live="polite">
          {chat.map((msg, i) => (
            <ChatMessage key={msg.ts + "-" + i} msg={msg} />
          ))}
          <div ref={chatEndRef} />
        </div>
      )}

      {/* Input Bar */}
      <form style={inputBarStyle} onSubmit={handleSend}>
        <textarea
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          style={inputStyle}
          disabled={sending}
          placeholder="Type your question…"
          aria-label="Ask a question"
          maxLength={420}
          rows={1}
        />
        <button
          type="submit"
          style={sendBtnStyle}
          disabled={sending || !input.trim()}
          aria-label="Send message"
        >
          {sending ? "..." : "Send"}
        </button>
      </form>
      {/* If collapsed */}
      {!open &&
        <div style={{
          writingMode: "vertical-lr",
          transform: "rotate(180deg)",
          color: "var(--text-light)",
          fontWeight: 500,
          fontSize: "1em",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "0.03em",
          opacity: 0.75
        }}>
          Chat
        </div>
      }
    </aside>
  );
}

export default ChatSidebar;
