import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * AdaptiveQuestionFlow - Dynamic stepwise question flow with adaptive logic.
 * Shows step indicators, supports branching question paths, uses demo/mock data.
 */
function AdaptiveQuestionFlow() {
  // --- Demo questions data structure ---
  // Each question may have conditional logic depending on previous answers.
  // We'll assume a basic structure with 'id', 'question', 'type', 'options', and 'next' (static or function).
  // More sophisticated logic could use rules; for this demo, we cover simple branching.
  const questionData = [
    {
      id: 'start',
      question: "What are you here to analyze today?",
      type: "single", // only 'single' for demo. Could support 'multi', 'text', etc.
      options: [
        { value: "contract", label: "A legal contract" },
        { value: "cyber_behavior", label: "My cyber/messaging behaviors" },
        { value: "other", label: "Something else" },
      ],
      // 'next' is a function(answer) or a static id
      next: (ans) => {
        if (ans === "contract") return "contract1";
        if (ans === "cyber_behavior") return "cyber1";
        return "other1";
      }
    },
    {
      id: "contract1",
      question: "What type of contract is it?",
      type: "single",
      options: [
        { value: "employment", label: "Employment" },
        { value: "nda", label: "Non-Disclosure Agreement" },
        { value: "saas", label: "Software/Service Usage" },
        { value: "other_contract", label: "Other" },
      ],
      next: "contract2"
    },
    {
      id: "contract2",
      question: "Does the contract mention penalties for breach?",
      type: "single",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "not_sure", label: "Not sure" },
      ],
      next: "end"
    },
    {
      id: "cyber1",
      question: "Which platforms do you use most frequently?",
      type: "single",
      options: [
        { value: "social", label: "Social media (Twitter, Facebook etc)" },
        { value: "messaging", label: "Messaging apps (WhatsApp, signal, etc)" },
        { value: "email", label: "Email/messages" },
      ],
      next: "cyber2"
    },
    {
      id: "cyber2",
      question: "Are your accounts protected with 2-Factor Authentication?",
      type: "single",
      options: [
        { value: "yes", label: "Yes on all important accounts" },
        { value: "partial", label: "Only on some" },
        { value: "no", label: "Not at all" },
      ],
      next: "end"
    },
    {
      id: "other1",
      question: "Describe briefly what you'd like to analyze.",
      type: "text",
      next: "end"
    },
    {
      id: "end",
      question: "All done! We’ll use your info to generate insights below.",
      type: "end",
      next: null
    }
  ];

  // Map for O(1) question access by id
  const questionMap = questionData.reduce((m, q) => { m[q.id] = q; return m; }, {});

  // --- State ---
  const [answers, setAnswers] = useState({});
  const [flowPath, setFlowPath] = useState(['start']); // sequence of visited question IDs
  const [inputValue, setInputValue] = useState(""); // for text input type

  const currentStep = flowPath.length - 1;
  const currentQID = flowPath[currentStep];
  const currentQ = questionMap[currentQID];

  const isCompleted = currentQ.type === "end";

  // Step progress bar logic (indicates "step x/y" but doesn't count 'end')
  const stepCount = flowPath.filter(id => questionMap[id].type !== "end").length;
  const stepTotalEstimate = 3; // Show 2-3 steps based on most flows
  // (real step total could be dynamic if question branches are more complex)

  // --- Handlers ---
  function handleOptionSelect(val) {
    setAnswers({ ...answers, [currentQID]: val });
    // Navigation logic
    let nextId = typeof currentQ.next === "function"
      ? currentQ.next(val)
      : currentQ.next;

    if (nextId && questionMap[nextId]) {
      setFlowPath(flowPath.concat(nextId));
      setInputValue(""); // Clear input in case for text
    }
  }

  function handleTextSubmit(e) {
    e.preventDefault();
    setAnswers({ ...answers, [currentQID]: inputValue.trim() });
    let nextId = typeof currentQ.next === "function"
      ? currentQ.next(inputValue.trim())
      : currentQ.next;
    if (nextId && questionMap[nextId]) {
      setFlowPath(flowPath.concat(nextId));
      setInputValue(""); // Clear for next input
    }
  }

  // Go back to the previous step (if not at start)
  function handleBack() {
    if (flowPath.length > 1) {
      setFlowPath(flowPath.slice(0, -1));
      setInputValue(""); // Always clear input when going back
    }
  }

  // Adaptive styling
  const sectionStyle = {
    margin: "38px 0",
    padding: "28px 9vw 26px 4vw",
    background: "var(--base-light)",
    borderRadius: 10,
    maxWidth: 540,
    boxShadow: "0 2px 18px 0 rgba(80, 188, 254, 0.07)",
    position: "relative",
    minHeight: 160
  };

  const stepperStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: 22
  };

  const stepDot = (active) => ({
    width: active ? 18 : 10,
    height: 10,
    borderRadius: 7,
    background: active ? "var(--primary)" : "var(--border-color)",
    boxShadow: active ? "0 2px 8px rgba(80,227,194,0.15)" : "none",
    opacity: active ? 1 : 0.54,
    border: "none",
    transition: "width .2s"
  });

  // Animate transitions: could use ReactCSSTransitionGroup for smoother transitions, but simple conditional styling for demo
  // --- UI ---
  return (
    <section aria-label="Adaptive question flow" style={sectionStyle}>
      <h2>Adaptive Question Flow</h2>

      {/* Step indicator (hidden for end) */}
      {!isCompleted && (
        <div style={stepperStyle}>
          {[...Array(stepTotalEstimate)].map((_, i) => (
            <div
              key={i}
              style={stepDot(i === stepCount - 1)}
              aria-label={i === stepCount - 1 ? "Current step" : null}
            />
          ))}
          <span style={{fontSize: "1rem", color:"var(--text-secondary)", marginLeft: 10}}>
            Step {stepCount} of {stepTotalEstimate}
          </span>
        </div>
      )}

      {/* Actual question panel */}
      <div style={{minHeight:50, marginBottom:14, marginTop:12}}>
        <span style={{fontWeight: 600, fontSize: "1.13rem"}}>
          {currentQ.question}
        </span>
      </div>

      {/* Options for single-select question */}
      {currentQ.type === "single" && (
        <div style={{display:"flex", flexDirection:"column", gap:14}}>
          {currentQ.options.map(opt => (
            <button
              key={opt.value}
              className="btn"
              style={{
                background:
                  answers[currentQID] === opt.value
                    ? "var(--primary)"
                    : "var(--secondary)",
                color: "var(--text-light)",
                border: answers[currentQID] === opt.value ? "2px solid var(--accent)": "none",
                marginBottom: 2,
                alignSelf: "flex-start",
                transition: ".18s"
              }}
              onClick={() => handleOptionSelect(opt.value)}
              disabled={isCompleted}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Text input question */}
      {currentQ.type === "text" && (
        <form style={{marginTop:10, display:"flex", flexDirection:"row", gap: 12}}
              onSubmit={handleTextSubmit}>
          <input
            type="text"
            value={inputValue}
            placeholder="Type your answer..."
            onChange={e => setInputValue(e.target.value)}
            autoFocus
            required
            style={{
              flex:1,
              fontSize:"1rem",
              padding:"7px 12px",
              borderRadius:5,
              border:"1.1px solid var(--border-color)",
              background:"var(--base-light)",
              color:"var(--text-color)"
            }}
            disabled={isCompleted}
            aria-label="Your answer"
          />
          <button className="btn" type="submit"
            style={{
              background: "var(--primary)",
              color:"var(--text-light)",
              minWidth:80
            }}>
            Next
          </button>
        </form>
      )}

      {/* END screen */}
      {isCompleted && (
        <div style={{
          fontWeight:500,
          color: "var(--text-secondary)",
          margin:"22px 0 0 0",
          fontSize:"1.08rem"
        }}>
          <span role="img" aria-label="celebrate">🎉</span> Completed!
        </div>
      )}

      {/* Navigation btns */}
      <div style={{marginTop:26}}>
        <button className="btn"
          style={{
            background: "var(--accent)",
            color: "var(--text-light)",
            marginRight:14,
            visibility: flowPath.length > 1 ? "visible":"hidden"
          }}
          disabled={flowPath.length <= 1 || isCompleted}
          onClick={handleBack}
        >
          ← Back
        </button>
        {/* Possible Reset button for demo */}
        {isCompleted && (
          <button className="btn"
            style={{background:"var(--primary)", color:"var(--text-light)"}}
            onClick={() => {
              setAnswers({});
              setFlowPath(['start']);
              setInputValue('');
            }}
          >
            Restart
          </button>
        )}
      </div>
      {/* Demo: show answers */}
      <div style={{
        fontSize:".95rem",
        marginTop:33,
        color:"var(--text-secondary)",
        opacity:.75
      }}>
        <span>Demo (debug): <span style={{fontSize:".93em"}}>{JSON.stringify(answers)}</span></span>
      </div>
    </section>
  );
}

export default AdaptiveQuestionFlow;
