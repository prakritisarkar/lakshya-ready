"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const MESSAGES = [
  {
    role: "ai" as const,
    text: "Explain the difference between useEffect and useLayoutEffect. When would you choose each?",
  },
  {
    role: "user" as const,
    text: "useEffect runs after paint; useLayoutEffect fires synchronously before — useful for reading DOM measurements without visual flicker.",
  },
  {
    role: "ai" as const,
    text: "Good. Give me a concrete scenario where that distinction actually saved you.",
  },
];

export default function HeroSection() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    MESSAGES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setTyping(true);
          const t = setTimeout(() => {
            setTyping(false);
            setVisible(i + 1);
          }, 700);
          timers.push(t);
        }, i * 2400 + 800)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center pt-28 pb-24 overflow-hidden"
      style={{ padding: "112px 48px 96px" }}
    >
      {/* Ambient background glows */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `
            radial-gradient(ellipse 55% 45% at 15% 8%, rgba(255,138,0,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 45% 50% at 85% 15%, rgba(255,45,149,0.05) 0%, transparent 65%),
            radial-gradient(ellipse 40% 55% at 50% 95%, rgba(255,94,98,0.04) 0%, transparent 70%)
          `,
        }}
      />

      <div
        className="relative w-full"
        style={{
          zIndex: 1,
          maxWidth: "1152px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
      >
        {/* ── Left: Copy ── */}
        <div>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1px",
                background: "rgba(255,138,0,0.5)",
              }}
            />
            <span
              style={{
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,138,0,0.65)",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              AI Interview Coach
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(42px, 5vw, 64px)",
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              marginBottom: "28px",
              color: "#F5F0EC",
            }}
          >
            Practice.
            <br />
            Improve.
            <br />
            <span
              style={{
                background:
                  "linear-gradient(110deg, #FF8A00 0%, #FF5E62 50%, #FF2D95 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Get Placed.
            </span>
          </h1>

          {/* Body */}
          <p
            style={{
              fontSize: "14px",
              color: "rgba(240,236,232,0.45)",
              lineHeight: 1.85,
              marginBottom: "40px",
              maxWidth: "340px",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            The first voice-based AI interview platform built for CS students.
            Speak naturally, get evaluated like a recruiter would, and track
            every point of improvement — session by session.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "48px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/demo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "10px",
                background: "linear-gradient(110deg, #FF8A00, #FF5E62)",
                color: "#0A0704",
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.04em",
                textDecoration: "none",
              }}
            >
              Start Free Interview
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5-5 5M18 12H6"
                />
              </svg>
            </Link>

            <Link
              href="#how-it-works"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.5)",
                fontSize: "12px",
                fontFamily: "DM Sans, sans-serif",
                textDecoration: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
              Watch Demo
            </Link>
          </div>

          {/* Proof line */}
          <p
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.2)",
              fontFamily: "DM Sans, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            No account required · Free to start · Built with Gemini AI
          </p>
        </div>

        {/* ── Right: Interview Preview ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Interview card */}
          <div
            style={{
              background: "#141009",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {/* Chrome */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: c,
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.2)",
                  fontFamily: "monospace",
                  letterSpacing: "0.04em",
                }}
              >
                Technical Round · SDE Intern
              </span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#FF8A00",
                    display: "inline-block",
                    animation: "blink 1.5s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: "9px",
                    color: "rgba(255,138,0,0.7)",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                  }}
                >
                  LIVE
                </span>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                minHeight: "200px",
              }}
            >
              {MESSAGES.slice(0, visible).map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: msg.role === "user" ? "row-reverse" : "row",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "8px",
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      background:
                        msg.role === "ai"
                          ? "linear-gradient(135deg, #FF8A00, #FF2D95)"
                          : "rgba(255,255,255,0.08)",
                      color: msg.role === "ai" ? "#0A0704" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {msg.role === "ai" ? "AI" : "U"}
                  </div>
                  <div
                    style={{
                      maxWidth: "82%",
                      fontSize: "12px",
                      lineHeight: 1.65,
                      padding: "10px 14px",
                      borderRadius: "10px",
                      fontFamily: "DM Sans, sans-serif",
                      background:
                        msg.role === "ai"
                          ? "rgba(255,138,0,0.06)"
                          : "rgba(255,255,255,0.04)",
                      border:
                        msg.role === "ai"
                          ? "1px solid rgba(255,138,0,0.12)"
                          : "1px solid rgba(255,255,255,0.06)",
                      color:
                        msg.role === "ai"
                          ? "rgba(240,236,232,0.72)"
                          : "rgba(240,236,232,0.6)",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FF8A00, #FF2D95)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "8px",
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      color: "#0A0704",
                      flexShrink: 0,
                    }}
                  >
                    AI
                  </div>
                  <div
                    style={{
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: "rgba(255,138,0,0.06)",
                      border: "1px solid rgba(255,138,0,0.12)",
                    }}
                  >
                    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                      {[0, 0.15, 0.3].map((d, i) => (
                        <span
                          key={i}
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: "rgba(255,138,0,0.5)",
                            display: "inline-block",
                            animation: `bounce 0.8s ease-in-out infinite`,
                            animationDelay: `${d}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Voice bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.012)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "3px",
                  height: "18px",
                  flexShrink: 0,
                }}
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="voice-bar" />
                ))}
              </div>
              <span
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.2)",
                  fontFamily: "DM Sans, sans-serif",
                  letterSpacing: "0.06em",
                  flex: 1,
                }}
              >
                Listening to your answer…
              </span>
              <div
                style={{
                  fontSize: "9px",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  padding: "4px 8px",
                  borderRadius: "5px",
                  background: "rgba(255,138,0,0.1)",
                  border: "1px solid rgba(255,138,0,0.2)",
                  color: "rgba(255,138,0,0.75)",
                }}
              >
                0:42
              </div>
            </div>
          </div>

          {/* Score pills */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            {[
              { label: "Technical", score: "82", color: "#FF8A00" },
              { label: "Communication", score: "74", color: "#FF5E62" },
              { label: "Confidence", score: "68", color: "#FF2D95" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  padding: "14px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "20px",
                    color: s.color,
                    lineHeight: 1,
                    marginBottom: "5px",
                  }}
                >
                  {s.score}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(240,236,232,0.3)",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: "10px",
              color: "rgba(255,255,255,0.18)",
              fontFamily: "DM Sans, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            Scores revealed only after the full interview
          </p>
        </div>
      </div>

      {/* keyframes for bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </section>
  );
}