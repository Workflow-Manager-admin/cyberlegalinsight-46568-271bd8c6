import React from 'react';

/**
 * SVG Radar Chart for demo insights
 * @param {object} props - {data, labels}
 */
function RadarChart({ data, labels, size = 240, maxValue = 100, color = 'var(--primary)', fill = 'var(--primary)', fillOpacity = 0.2 }) {
  // Compute chart points
  const N = data.length;
  const angleSlice = (2 * Math.PI) / N;
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size / 2) * 0.75;

  // To determine which axis gets which label and value
  const getCoords = (i, valueScale = 1) => {
    const angle = i * angleSlice - Math.PI / 2;
    const r = radius * valueScale;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return [x, y];
  };

  // Points for the filled area
  const points = data
    .map((val, i) => {
      const scale = Math.max(0, Math.min(1, val / maxValue));
      const [x, y] = getCoords(i, scale);
      return `${x},${y}`;
    })
    .join(' ');

  // Axes
  const axes = labels.map((label, i) => {
    const [x2, y2] = getCoords(i, 1);
    // Labels (radially outside point)
    const [lx, ly] = getCoords(i, 1.14);
    return (
      <g key={label}>
        <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="var(--border-color)" strokeWidth="1.3" />
        <text x={lx} y={ly} fill="var(--primary)" fontSize="0.97em" textAnchor="middle" alignmentBaseline="middle">
          {label}
        </text>
      </g>
    );
  });

  // Circular gridlines
  const gridLevels = 4;
  const gridCircles = [];
  for (let l = 1; l <= gridLevels; l++) {
    const r = (radius * l) / gridLevels;
    gridCircles.push(
      <circle
        key={'grid-' + l}
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--border-color)"
        strokeWidth="1"
      />
    );
  }

  return (
    <svg width={size} height={size} style={{display:'block', margin:'0 auto'}}>
      {/* concentric circles */}
      {gridCircles}
      {/* axes and labels */}
      {axes}
      {/* filled polygon */}
      <polygon
        points={points}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={color}
        strokeWidth="2.5"
      />
      {/* data points */}
      {data.map((val, i) => {
        const scale = Math.max(0, Math.min(1, val / maxValue));
        const [x, y] = getCoords(i, scale);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={5}
            fill="var(--accent)"
            stroke={color}
            strokeWidth="1.8"
          />
        );
      })}
    </svg>
  );
}

/**
 * SVG Heatmap for demo insights (5x5 grid)
 */
function Heatmap({ matrix, size = 140 }) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const cellSize = size / Math.max(rows, cols);

  // Compute color: gradient from secondary (light) to accent (strong)
  const interpolateColor = (val) => {
    // Clamp and interpolate between secondary (low) and accent (high)
    const minColor = [80, 227, 194];  // #50E3C2
    const maxColor = [245, 166, 35];  // #F5A623
    const t = Math.max(0, Math.min(1, val));
    const rgb = minColor.map((min, i) => Math.round(min + (maxColor[i] - min) * t));
    return `rgb(${rgb.join(',')})`;
  };

  return (
    <svg width={cellSize*cols} height={cellSize*rows} style={{display:'block', margin:'0 auto'}}>
      {matrix.map((row, i) =>
        row.map((val, j) => (
          <rect
            key={`${i}-${j}`}
            x={j * cellSize} y={i * cellSize}
            width={cellSize-2}
            height={cellSize-2}
            rx={4}
            fill={interpolateColor(val)}
            opacity={0.96}
          />
        ))
      )}
    </svg>
  );
}

/**
 * Circular SVG Progress indicator
 */
function ProgressCircle({ progress, size = 80, stroke = "var(--primary)", trail = "var(--border-color)", label }) {
  const r = (size / 2) - 8;
  const circ = 2 * Math.PI * r;
  const progressStroke = progress < 0 ? 0 : progress > 1 ? 1 : progress;
  return (
    <svg width={size} height={size}>
      <circle
        cx={size/2}
        cy={size/2}
        r={r}
        fill="none"
        stroke={trail}
        strokeWidth="9"
      />
      <circle
        cx={size/2}
        cy={size/2}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth="9"
        strokeDasharray={circ}
        strokeDashoffset={circ*(1-progressStroke)}
        style={{
          transition:"stroke-dashoffset 0.7s",
        }}
        strokeLinecap="round"
      />
      <text
        x="50%" y="50%"
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="var(--accent)"
        fontSize="1.15em"
        fontWeight={650}
      >{`${Math.round(progress*100)}%`}</text>
      {label && (
        <text
          x="50%"
          y={size - 10}
          textAnchor="middle"
          alignmentBaseline="hanging"
          fill="var(--primary)"
          fontSize="0.99em"
        >{label}</text>
      )}
    </svg>
  );
}

// PUBLIC_INTERFACE
/**
 * VisualizationPanel - Demo analytical visualizations styled for CyberLegalInsight.
 * Shows a radar chart, heatmap, and animated progress for risk and completion.
 */
function VisualizationPanel() {
  // --- Demo mock data ---
  // Radar: Dimensions of risk score (0-100), sample axes
  const radarData = [76, 44, 65, 89, 54, 62];
  const radarLabels = [
    "Security",
    "Privacy",
    "Clarity",
    "Enforceability",
    "Compliance",
    "Reputation"
  ];
  // Heatmap: Risk exposure (0-1) for 5x5 grid
  const heatmapData = [
    [0.2, 0.7, 0.6, 0.4, 0.1],
    [0.3, 0.86, 0.93, 0.45, 0.33],
    [0.09, 0.21, 1, 0.6, 0.27],
    [0.38, 0.77, 0.59, 0.2, 0.09],
    [0.11, 0.43, 0.2, 0.16, 0.01]
  ];
  // Progress: completion (questionnaire), and 'risk reduction'
  const progressOverview = [
    { val: 0.78, label: "Profile Complete", color: "var(--primary)" },
    { val: 0.56, label: "Risk Mitigated", color: "var(--secondary)" },
    { val: 0.38, label: "Contract AI Score", color: "var(--accent)" }
  ];

  // Panel style
  const panelStyle = {
    margin: "38px 0",
    padding: "30px 6vw 24px 4vw",
    background: "var(--base-light)",
    borderRadius: 12,
    boxShadow: "0 2px 16px 0 rgba(80, 188, 254, 0.09)",
    maxWidth: 1180,
    width: "100%",
    position:"relative"
  };
  const sectionTitle = {
    fontSize:"1.25rem",
    margin: "0 0 17px 0",
    color:"var(--primary)",
    fontWeight:600,
    letterSpacing: -0.5
  };
  const chartsLayout = {
    display: "flex",
    flexWrap:"wrap",
    gap:"45px 32px",
    alignItems: "start",
    justifyContent:"space-between"
  };
  const chartBlock = {
    background: "rgba(74,144,226,0.04)",
    border: "1.5px solid var(--border-color)",
    borderRadius: 11,
    padding: "25px 27px 16px 27px",
    minWidth: 250,
    minHeight: 270,
    flex: "1 1 260px",
    maxWidth: 370,
    boxShadow: "0px 2px 12px rgba(80, 188, 254, 0.06)",
    marginBottom:25
  };

  const progressLayout = {
    display:"flex",
    gap:"24px",
    margin:"18px 0"
  };

  // --- Render ---
  return (
    <section style={panelStyle} aria-label="Visualization insights panel">
      <div style={sectionTitle}>Your Cyber & Legal Insights</div>
      <div style={chartsLayout}>
        {/* Radar Chart Block */}
        <div style={chartBlock}>
          <div style={{fontWeight:500, fontSize:"1.08em", color:"var(--secondary)", marginBottom:10}}>Contract & Cyber Risk Breakdown</div>
          <RadarChart data={radarData} labels={radarLabels}/>
          <div style={{marginTop:10, color:"var(--text-secondary)", fontSize:".97rem", textAlign:"center"}}>
            Relative risk profile across core legal/cyber dimensions (demo).
          </div>
        </div>

        {/* Heatmap Block */}
        <div style={chartBlock}>
          <div style={{fontWeight:500, fontSize:"1.08em", color:"var(--secondary)", marginBottom:10}}>Risk Exposure Heatmap</div>
          <Heatmap matrix={heatmapData}/>
          <div style={{marginTop:10, color:"var(--text-secondary)", fontSize:".96rem", textAlign:"center"}}>
            Areas of elevated risk; darker orange = higher (mock data).
          </div>
        </div>

        {/* Progress Indicators */}
        <div style={chartBlock}>
          <div style={{fontWeight:500, fontSize:"1.08em", color:"var(--secondary)", marginBottom:16}}>Progress Overview</div>
          <div style={progressLayout}>
            {progressOverview.map(p =>
              <ProgressCircle key={p.label} progress={p.val} stroke={p.color} label={p.label}/>
            )}
          </div>
          <div style={{
            marginTop:14,
            color:"var(--text-secondary)",
            fontSize:".98em", textAlign:"center"
          }}>
            Track your completion, mitigated risk, and automated contract health.
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisualizationPanel;
