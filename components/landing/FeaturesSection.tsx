const HIGHLIGHTS = [
  { value: "Voice-First", desc: "Speak naturally. No typing. Real interview feel." },
  { value: "5 Tracks", desc: "SDE, Frontend, Python, Data Analyst, ML Engineer." },
  { value: "AI Memory", desc: "Remembers every session. Adapts to your gaps." },
  { value: "No Fluff", desc: "Built for CS students. Evaluated like a recruiter." },
];

const FEATURES = [
  {
    accent: "#FF8A00",
    iconBg: "rgba(255,138,0,0.08)",
    iconBorder: "rgba(255,138,0,0.15)",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    title: "Voice AI Interviews",
    description: "Speak your answers naturally. The AI listens, transcribes, and evaluates in real-time — no typing, no multiple choice.",
  },
  {
    accent: "#FF5E62",
    iconBg: "rgba(255,94,98,0.08)",
    iconBorder: "rgba(255,94,98,0.15)",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Growth Dashboard",
    description: "Track Technical accuracy, Communication, and Confidence across every session. Watch your scores climb over time.",
  },
  {
    accent: "#FF2D95",
    iconBg: "rgba(255,45,149,0.08)",
    iconBorder: "rgba(255,45,149,0.15)",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Resume Reality Check",
    description: "Upload your resume. We compare what you claim against what you demonstrate — and surface every skill gap.",
  },
  {
    accent: "#FF8A00",
    iconBg: "rgba(255,138,0,0.08)",
    iconBorder: "rgba(255,138,0,0.15)",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "AI Roadmaps",
    description: "After every session, receive a personalized study plan targeting the exact topics where your score dropped.",
  },
  {
    accent: "#FF5E62",
    iconBg: "rgba(255,94,98,0.08)",
    iconBorder: "rgba(255,94,98,0.15)",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Candidate Memory",
    description: "The AI remembers your strengths, weaknesses, and history — adapting every new session to push you forward.",
  },
  {
    accent: "#FF2D95",
    iconBg: "rgba(255,45,149,0.08)",
    iconBorder: "rgba(255,45,149,0.15)",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "5 Specialized Tracks",
    description: "Dedicated rubrics for SDE Intern, Frontend, Python Developer, Data Analyst, and ML Engineer roles.",
  },
];

export default function FeaturesSection() {
  return (
    <>
      {/* ── Highlights row ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
            {HIGHLIGHTS.map((h, i) => (
              <div
                key={i}
                style={{
                  padding: "40px 32px",
                  borderRight: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "20px",
                    letterSpacing: "-0.02em",
                    marginBottom: "8px",
                    background: "linear-gradient(110deg, #FF8A00, #FF5E62)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {h.value}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(240,236,232,0.35)",
                    lineHeight: 1.6,
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  {h.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ padding: "120px 48px" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: "72px", maxWidth: "480px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span style={{ display: "block", width: "20px", height: "1px", background: "rgba(255,94,98,0.5)" }} />
              <span style={{ fontSize: "10px", fontFamily: "DM Sans, sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,94,98,0.6)" }}>
                What&apos;s inside
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 4vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#F5F0EC",
                marginBottom: "20px",
              }}
            >
              Everything a recruiter needs to see.{" "}
              <span
                style={{
                  background: "linear-gradient(110deg, #FF5E62, #FF2D95)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                In one session.
              </span>
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(240,236,232,0.38)", lineHeight: 1.8, fontFamily: "DM Sans, sans-serif" }}>
              From your first answer to your final report — every part of Lakshya Ready is designed to make you look hireable and feel prepared.
            </p>
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                style={{
                  padding: "32px",
                  background: "#141009",
                  borderRight: i % 3 !== 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: feat.iconBg,
                    border: `1px solid ${feat.iconBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: feat.accent,
                    marginBottom: "20px",
                    flexShrink: 0,
                  }}
                >
                  {feat.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "13px",
                    letterSpacing: "-0.01em",
                    color: "rgba(240,236,232,0.85)",
                    marginBottom: "10px",
                  }}
                >
                  {feat.title}
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(240,236,232,0.38)",
                    lineHeight: 1.75,
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}