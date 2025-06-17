import React, { useState, useEffect } from 'react';

/**
 * ThemeToggle - Theme switcher (light/dark mode) for the app.
 * Allows users to toggle between themes by setting a class on <body>.
 */
// PUBLIC_INTERFACE
function ThemeToggle() {
  // Reads stored preference or defaults to 'light'
  const getInitialTheme = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      const stored = window.localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
    }
    // Prefer user OS dark mode if set
    if (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return "dark";
    }
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Effect: apply class to <body> and save to localStorage
  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const oppositeLabel = theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";

  return (
    <div style={{margin: "0 0 18px 0", textAlign: "right"}}>
      <button
        className="btn"
        style={{
          fontSize: ".96rem",
          background: "var(--secondary)",
          color: "var(--text-light)",
          minWidth: 130
        }}
        onClick={toggleTheme}
        title="Toggle Theme"
        aria-label="Toggle light/dark mode"
      >
        {oppositeLabel}
      </button>
    </div>
  );
}

export default ThemeToggle;
