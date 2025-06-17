import React from 'react';

// PUBLIC_INTERFACE
/**
 * GamificationPanel - Displays user gamification status: profile progress,
 * XP, badges, and achievements with modern theme-matching UI.
 * Accepts no props (mock/demo data only); full integration handles data in future.
 */
function GamificationPanel() {
  // --- Demo/mock gamification data ---
  const user = {
    username: "DemoUser",
    level: 4,
    xp: 1780,
    nextLevelXP: 2400, // Needed for progress
    badges: [
      { name: "First Analyzer", icon: "🔍", desc: "Uploaded your first contract", date: "2024-05-01" },
      { name: "Security Sleuth", icon: "🦸‍♂️", desc: "Completed cyber risk quiz", date: "2024-05-03" },
      { name: "Sharp Mind", icon: "🎓", desc: "Scored >80% on analytics", date: "2024-05-12" },
    ],
    recentAchievements: [
      { title: "Streak: 3 Days Active", icon: "🔥", when: "Today" },
      { title: "Uploaded 5 Contracts", icon: "📄", when: "2 days ago" },
    ],
    completed: 0.82, // 82% profile progress
  };

  // --- Styles ---
  const panelStyle = {
    margin: "37px 0 16px 0",
    padding: "28px 7vw 27px 4vw",
    background: "var(--base-light)",
    borderRadius: 12,
    boxShadow: "0 2px 13px 0 rgba(74, 144, 226, 0.11)",
    maxWidth: 540,
    width: "100%",
    minHeight: 170,
    position: "relative"
  };
  const headlineStyle = {
    fontSize: "1.28rem",
    margin: 0,
    color: "var(--primary)",
    fontWeight: 700,
    letterSpacing: -0.5
  };
  const progressBarWrap = {
    margin: "13px 0 16px 0",
    background: "rgba(80, 227, 194, 0.11)",
    borderRadius: 10,
    height: 26,
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(80,227,194,0.03)"
  };
  const progressBar = (pct) => ({
    width: `${pct * 100}%`,
    height: "100%",
    background:
      "linear-gradient(90deg, var(--primary) 74%, var(--secondary) 100%)",
    borderRadius: "10px 0 0 10px",
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    fontSize: "1.02em",
    color: "var(--text-light)",
    transition: "width .7s cubic-bezier(.7,.36,.45,1.09)"
  });
  const badgeRow = {
    display: "flex",
    gap: "17px",
    margin: "18px 0 10px 0",
    flexWrap: "wrap"
  };
  const badgeCard = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(245,166,35,0.09)",
    border: "1.1px solid var(--border-color)",
    borderRadius: 11,
    padding: "12px 17px",
    minWidth: 82,
    minHeight: 90,
    boxShadow: "0 1px 7px rgba(245,166,35,0.08)",
    fontSize: "1.13em",
    position: "relative"
  };
  const badgeIcon = {
    fontSize: "2.1em",
    marginBottom: 5,
    filter: "drop-shadow(0 3px 2px rgba(245,166,35,.13))"
  };
  const badgeName = {
    fontWeight: 600,
    color: "var(--accent)",
    fontSize: "0.98em",
    marginBottom: 2
  };
  const achievRow = {
    display: "flex",
    gap: "19px",
    margin: "15px 0 7px 0"
  };
  const achievCard = {
    display: "flex",
    alignItems: "center",
    background: "rgba(74, 144, 226, 0.06)",
    border: "1px solid var(--border-color)",
    borderRadius: 10,
    padding: "9px 13px",
    fontSize: "1.01em",
    fontWeight: 500,
    color: "var(--primary)",
    minWidth: 135
  };

  // XP progress calculation
  const xpThisLevel = user.xp - ((user.level - 1) * 600);
  const xpLevelCap = user.nextLevelXP - ((user.level - 1) * 600);
  const xpProgress = Math.max(0, Math.min(1, xpThisLevel / xpLevelCap)); // Bounds [0,1]

  // --- UI Render ---
  return (
    <section aria-label="User Progress, Badges, and Achievements" style={panelStyle}>
      <div style={headlineStyle}>
        <span role="img" aria-label="badge" style={{marginRight:7}}>🏅</span>
        Gamification & Progress
      </div>
      {/* Progress: Level/XP/Completion */}
      <div style={{margin: "13px 0 7px 3px", fontSize: "1.07em", color:"var(--text-secondary)"}}>
        {user.username} &middot; Level <span style={{color:"var(--primary)", fontWeight:600}}>{user.level}</span>
        &nbsp; &bull; &nbsp; XP: <span style={{color:"var(--secondary)", fontWeight:500}}>{user.xp}</span> / {user.nextLevelXP}
      </div>
      {/* Linear XP Progress Bar */}
      <div style={progressBarWrap}>
        <div style={progressBar(xpProgress)}>
          <span style={{marginLeft:13}}>
            {Math.round(xpProgress * 100)}%
          </span>
        </div>
      </div>
      {/* Badges */}
      <div style={{fontWeight: 500, color:"var(--accent)", marginTop: 19, marginBottom:5}}>
        Recent Badges
      </div>
      <div style={badgeRow}>
        {user.badges.map((b, idx) => (
          <div key={b.name} style={badgeCard} title={b.desc}>
            <span style={badgeIcon} role="img" aria-label={b.name}>{b.icon}</span>
            <span style={badgeName}>{b.name}</span>
            <span style={{fontSize:".89em", color:"var(--text-secondary)"}}>{b.desc}</span>
            <span style={{fontSize:".8em", color:"var(--border-color)", marginTop:2}}>
              {b.date}
            </span>
          </div>
        ))}
      </div>
      {/* Achievements */}
      <div style={{fontWeight:500, color:"var(--secondary)", marginTop:18, marginBottom:7}}>
        Latest Achievements
      </div>
      <div style={achievRow}>
        {user.recentAchievements.map((a, idx) => (
          <div key={a.title} style={achievCard} title={a.title}>
            <span style={{fontSize:"1.43em", marginRight:11}} role="img" aria-label={a.title}>{a.icon}</span>
            <span>
              {a.title}
              <span style={{color:"var(--text-secondary)", fontWeight:400, marginLeft:8, fontSize:".97em"}}>
                {a.when}
              </span>
            </span>
          </div>
        ))}
      </div>
      {/* Profile Completion */}
      <div style={{
        margin: "18px 0 0 2.5px",
        fontSize:"1.02em"
      }}>
        <span style={{
          fontWeight: 480, color:"var(--primary)"
        }}>Profile Completion:</span>
        <span style={{
          marginLeft: 9, color: "var(--accent)",
          fontWeight: 600
        }}>{Math.round(user.completed * 100)}%</span>
        <span role="img" aria-label="progress" style={{marginLeft:9, fontSize:"1.23em"}}>✅</span>
        <div style={{
          width: "94%", height: 13, background: "rgba(245,166,35,0.16)",
          borderRadius: 7, marginTop: 5,
          boxShadow: "0 1px 2.5px rgba(245,166,35,0.06)",
          position: "relative"
        }}>
          <div style={{
            width: `${user.completed * 100}%`,
            background: "linear-gradient(90deg, var(--accent), var(--secondary) 90%)",
            height: "100%",
            borderRadius: 7,
            transition: "width .7s cubic-bezier(.8,.36,.27,1.1)",
          }} />
        </div>
      </div>
    </section>
  );
}

export default GamificationPanel;
