"use client";

import { InterviewReport, InterviewRole, QAPair } from "@/lib/types/interview";

interface Props {
  report: InterviewReport;
  role: InterviewRole;
  qaHistory: QAPair[];
  duration: number;
  onDashboard: () => void;
  isSaving: boolean;
}

const VERDICT_CONFIG = {
  "Strong Hire": { color: "#22c55e", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)" },
  "Hire": { color: "#FF8A00", bg: "rgba(255,138,0,0.08)", border: "rgba(255,138,0,0.2)" },
  "Maybe": { color: "#FF5E62", bg: "rgba(255,94,98,0.08)", border: "rgba(255,94,98,0.2)" },
  "No Hire": { color: "#FF2D95", bg: "rgba(255,45,149,0.08)", border: "rgba(255,45,149,0.2)" },
};

const PRIORITY_CONFIG = {
  high: { color: "#FF5E62", label: "High Priority" },
  medium: { color: "#FF8A00", label: "Medium" },
  low: { color: "rgba(255,255,255,0.35)", label: "Low" },
};

function ScoreRing({ score, color, size = 80 }: { score: number; color: string; size?: number }) {
  const r = (size / 2) - 8;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1s ease" }}
      />
    </svg>
  );
}

export default function InterviewReportComponent({ report, role, qaHistory, duration, onDashboard, isSaving }: Props) {
  const verdict = VERDICT_CONFIG[report.verdict] || VERDICT_CONFIG["Maybe"];

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0704",
        padding: "48px 24px",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Ambient */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 20% 10%, rgba(255,138,0,0.06) 0%, transparent 65%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "13px",
              background: "linear-gradient(110deg, #FF8A00, #FF2D95)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "16px",
            }}
          >
            Lakshya Ready
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h1
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "28px",
                  letterSpacing: "-0.03em",
                  color: "#F5F0EC",
                  marginBottom: "6px",
                }}
              >
                Interview Report
              </h1>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", fontFamily: "DM Sans, sans-serif" }}>
                {role} · {qaHistory.length} questions · {formatDuration(duration)} · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </div>
            </div>

            {/* Verdict badge */}
            <div
              style={{
                padding: "8px 20px",
                borderRadius: "8px",
                background: verdict.bg,
                border: `1px solid ${verdict.border}`,
                color: verdict.color,
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.04em",
              }}
            >
              {report.verdict}
            </div>
          </div>
        </div>

        {/* Score cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          {[
            { label: "Overall", score: report.overallScore, color: "#FF8A00" },
            { label: "Technical", score: report.technicalScore, color: "#FF5E62" },
            { label: "Communication", score: report.communicationScore, color: "#FF2D95" },
            { label: "Confidence", score: report.confidenceScore, color: "#FF8A00" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#141009",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                padding: "20px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ position: "relative" }}>
                <ScoreRing score={s.score} color={s.color} />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "18px",
                    color: s.color,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.score}
                </div>
              </div>
              <div style={{ fontSize: "11px", color: "rgba(240,236,232,0.4)", fontFamily: "DM Sans, sans-serif" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          style={{
            background: "#141009",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px",
            padding: "24px 28px",
            marginBottom: "16px",
          }}
        >
          <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(255,138,0,0.5)", fontFamily: "DM Sans, sans-serif", marginBottom: "10px" }}>
            Summary
          </div>
          <p style={{ fontSize: "14px", color: "rgba(240,236,232,0.65)", lineHeight: 1.75, fontFamily: "DM Sans, sans-serif" }}>
            {report.summary}
          </p>
        </div>

        {/* Strengths & Weaknesses */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <div style={{ background: "#141009", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px 28px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(34,197,94,0.5)", fontFamily: "DM Sans, sans-serif", marginBottom: "14px" }}>
              Strengths
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {report.strengths.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ color: "#22c55e", fontSize: "14px", marginTop: "1px", flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: "13px", color: "rgba(240,236,232,0.6)", fontFamily: "DM Sans, sans-serif", lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#141009", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px 28px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(255,45,149,0.5)", fontFamily: "DM Sans, sans-serif", marginBottom: "14px" }}>
              Areas to Improve
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {report.weaknesses.map((w, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ color: "#FF2D95", fontSize: "14px", marginTop: "1px", flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: "13px", color: "rgba(240,236,232,0.6)", fontFamily: "DM Sans, sans-serif", lineHeight: 1.5 }}>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Roadmap */}
        {report.roadmap && report.roadmap.length > 0 && (
          <div
            style={{
              background: "#141009",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "24px 28px",
              marginBottom: "16px",
            }}
          >
            <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(255,138,0,0.5)", fontFamily: "DM Sans, sans-serif", marginBottom: "16px" }}>
              Your Study Roadmap
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {report.roadmap.map((item, i) => {
                const pc = PRIORITY_CONFIG[item.priority];
                return (
                  <div
                    key={i}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: pc.color,
                        flexShrink: 0,
                        marginTop: "6px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "13px", color: "rgba(240,236,232,0.8)" }}>
                          {item.topic}
                        </span>
                        <span style={{ fontSize: "9px", color: pc.color, fontFamily: "DM Sans, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
                          {pc.label}
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: "rgba(240,236,232,0.38)", fontFamily: "DM Sans, sans-serif", lineHeight: 1.5 }}>
                        {item.reason}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Resume Tips */}
        {report.resumeTips && report.resumeTips.length > 0 && (
          <div
            style={{
              background: "#141009",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "24px 28px",
              marginBottom: "32px",
            }}
          >
            <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(255,94,98,0.5)", fontFamily: "DM Sans, sans-serif", marginBottom: "14px" }}>
              Resume Tips
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {report.resumeTips.map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ color: "#FF5E62", fontSize: "12px", marginTop: "2px", flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: "13px", color: "rgba(240,236,232,0.55)", fontFamily: "DM Sans, sans-serif", lineHeight: 1.55 }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onDashboard}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              background: "linear-gradient(110deg, #FF8A00, #FF5E62)",
              border: "none",
              color: "#0A0704",
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.02em",
              cursor: "pointer",
            }}
          >
            {isSaving ? "Saving…" : "Go to Dashboard →"}
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "14px 24px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Retry Interview
          </button>
        </div>
      </div>
    </div>
  );
}