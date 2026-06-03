"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InterviewRole } from "@/lib/types/interview";
import InterviewRoom from "./InterviewRoom";

const ROLES: { value: InterviewRole; desc: string; tags: string[] }[] = [
  {
    value: "SDE Intern",
    desc: "Data structures, algorithms, basic system design",
    tags: ["DSA", "OOP", "Problem Solving"],
  },
  {
    value: "Frontend Developer",
    desc: "React, JavaScript, CSS, browser APIs, performance",
    tags: ["React", "JS", "CSS", "DOM"],
  },
  {
    value: "Python Developer",
    desc: "Python internals, frameworks, scripting, OOP",
    tags: ["Python", "Flask/Django", "OOP"],
  },
  {
    value: "Data Analyst",
    desc: "SQL, pandas, statistics, visualization, Excel",
    tags: ["SQL", "Pandas", "Statistics"],
  },
  {
    value: "ML Engineer",
    desc: "ML algorithms, model training, evaluation, math",
    tags: ["ML", "PyTorch", "Math", "Data"],
  },
];

const TOTAL_QUESTIONS = 7;

export default function InterviewSetup() {
  const [selectedRole, setSelectedRole] = useState<InterviewRole | null>(null);
  const [started, setStarted] = useState(false);
  const router = useRouter();

  if (started && selectedRole) {
    return (
      <InterviewRoom
        role={selectedRole}
        totalQuestions={TOTAL_QUESTIONS}
        onExit={() => router.push("/dashboard")}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0704",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        position: "relative",
        overflow: "hidden",
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

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "680px" }}>

        {/* Back */}
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            color: "rgba(255,255,255,0.3)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "DM Sans, sans-serif",
            marginBottom: "40px",
            padding: 0,
          }}
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ display: "block", width: "20px", height: "1px", background: "rgba(255,138,0,0.5)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,138,0,0.65)", fontFamily: "DM Sans, sans-serif" }}>
              New Interview
            </span>
          </div>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "32px",
              letterSpacing: "-0.03em",
              color: "#F5F0EC",
              marginBottom: "8px",
            }}
          >
            Choose your role
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(240,236,232,0.38)", fontFamily: "DM Sans, sans-serif", lineHeight: 1.6 }}>
            The AI will ask {TOTAL_QUESTIONS} questions tailored to this role. Answer using your microphone.
          </p>
        </div>

        {/* Role cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.value;
            return (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  borderRadius: "14px",
                  background: isSelected
                    ? "rgba(255,138,0,0.07)"
                    : "#141009",
                  border: isSelected
                    ? "1px solid rgba(255,138,0,0.35)"
                    : "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: "15px",
                      color: isSelected ? "#FF8A00" : "rgba(240,236,232,0.85)",
                      marginBottom: "4px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {role.value}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(240,236,232,0.35)",
                      fontFamily: "DM Sans, sans-serif",
                    }}
                  >
                    {role.desc}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "10px",
                        fontFamily: "DM Sans, sans-serif",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        background: isSelected
                          ? "rgba(255,138,0,0.12)"
                          : "rgba(255,255,255,0.05)",
                        color: isSelected
                          ? "rgba(255,138,0,0.8)"
                          : "rgba(255,255,255,0.25)",
                        border: "1px solid",
                        borderColor: isSelected
                          ? "rgba(255,138,0,0.2)"
                          : "rgba(255,255,255,0.06)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {isSelected && (
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FF8A00, #FF5E62)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0A0704" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Instructions */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "12px",
            padding: "16px 20px",
            marginBottom: "28px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {[
            { icon: "🎙️", text: "Allow microphone access when prompted" },
            { icon: "🔊", text: "AI will speak each question aloud" },
            { icon: "⏱️", text: `${TOTAL_QUESTIONS} questions · ~15 minutes` },
            { icon: "📊", text: "Scores revealed only at the end" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "14px" }}>{item.icon}</span>
              <span style={{ fontSize: "11px", color: "rgba(240,236,232,0.35)", fontFamily: "DM Sans, sans-serif" }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Start button */}
        <button
          onClick={() => selectedRole && setStarted(true)}
          disabled={!selectedRole}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "12px",
            background: selectedRole
              ? "linear-gradient(110deg, #FF8A00, #FF5E62)"
              : "rgba(255,255,255,0.05)",
            border: "none",
            color: selectedRole ? "#0A0704" : "rgba(255,255,255,0.2)",
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "0.02em",
            cursor: selectedRole ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
          }}
        >
          {selectedRole
            ? `Start ${selectedRole} Interview →`
            : "Select a role to begin"}
        </button>
      </div>
    </div>
  );
}