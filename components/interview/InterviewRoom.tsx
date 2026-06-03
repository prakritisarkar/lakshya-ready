"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { InterviewRole, QAPair, InterviewReport, InterviewStatus } from "@/lib/types/interview";
import { useSpeech } from "@/lib/hooks/useSpeech";
import InterviewReportView from "./InterviewReport";

interface Props {
  role: InterviewRole;
  totalQuestions: number;
  onExit: () => void;
}

export default function InterviewRoom({ role, totalQuestions, onExit }: Props) {
  const { user } = useAuth();
  const { speak, startListening, stopListening, transcript, isListening, isSpeaking, resetTranscript } = useSpeech();

  const [status, setStatus] = useState<InterviewStatus>("starting");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [qaHistory, setQaHistory] = useState<QAPair[]>([]);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [report, setReport] = useState<InterviewReport | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const hasStarted = useRef(false);
  const currentTranscriptRef = useRef("");

  // Update live transcript ref
  useEffect(() => {
    currentTranscriptRef.current = transcript;
    setLiveTranscript(transcript);
  }, [transcript]);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // ── Fetch question from API ──
  const fetchQuestion = useCallback(async (
    qNumber: number,
    history: QAPair[]
  ): Promise<string> => {
    const res = await fetch("/api/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "generate_question",
        role,
        questionNumber: qNumber,
        totalQuestions,
        previousQA: history.map((qa) => ({
          question: qa.question,
          answer: qa.answer,
        })),
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.question;
  }, [role, totalQuestions]);

  // ── Evaluate answer ──
  const evaluateAnswer = useCallback(async (
    history: QAPair[],
    answer: string
  ) => {
    const res = await fetch("/api/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "evaluate_answer",
        role,
        previousQA: history.map((qa) => ({
          question: qa.question,
          answer: qa.answer,
        })),
        currentAnswer: answer,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.evaluation;
  }, [role]);

  // ── Generate final report ──
  const generateReport = useCallback(async (history: QAPair[]) => {
    const res = await fetch("/api/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "final_report",
        role,
        allQA: history.map((qa) => ({
          question: qa.question,
          answer: qa.answer,
        })),
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.report;
  }, [role]);

  // ── Save session to Firestore ──
  const saveSession = useCallback(async (
    history: QAPair[],
    finalReport: InterviewReport
  ) => {
    if (!user) return;
    setIsSaving(true);
    try {
      await addDoc(collection(db, "interviews"), {
        userId: user.uid,
        role,
        status: "completed",
        qaHistory: history,
        report: finalReport,
        createdAt: serverTimestamp(),
        duration: Math.floor((Date.now() - startTime) / 1000),
      });
    } catch (err) {
      console.error("Failed to save session:", err);
    } finally {
      setIsSaving(false);
    }
  }, [user, role, startTime]);

  // ── Main interview flow ──
  const runQuestion = useCallback(async (
    qNumber: number,
    history: QAPair[]
  ) => {
    try {
      setError(null);

      // 1. Fetch question
      setStatus("speaking");
      const question = await fetchQuestion(qNumber, history);
      setCurrentQuestion(question);

      // 2. Speak it
      await speak(question);

      // 3. Start listening
      resetTranscript();
      currentTranscriptRef.current = "";
      setStatus("listening");
      startListening();

    } catch (err) {
      console.error("Question error:", err);
      setError("Something went wrong. Please try again.");
    }
  }, [fetchQuestion, speak, resetTranscript, startListening]);

  // ── Start interview on mount ──
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const init = async () => {
      await speak(`Welcome to your ${role} interview. I will ask you ${totalQuestions} questions. Please answer each one clearly using your microphone. Let's begin.`);
      await runQuestion(1, []);
    };

    init();
  }, []);

  // ── Handle "Submit Answer" button ──
  const handleSubmitAnswer = async () => {
    stopListening();

    const answer = currentTranscriptRef.current.trim();
    if (!answer) {
      setError("No answer detected. Please try speaking again.");
      return;
    }

    setStatus("processing");
    setError(null);

    try {
      // Build updated history
      const newQA: QAPair = { question: currentQuestion, answer };
      const evaluation = await evaluateAnswer(
        [...qaHistory, newQA],
        answer
      );
      newQA.evaluation = evaluation;

      const updatedHistory = [...qaHistory, newQA];
      setQaHistory(updatedHistory);

      const nextQ = questionNumber + 1;

      if (nextQ > totalQuestions) {
        // ── Final question done → generate report ──
        setStatus("speaking");
        await speak("Thank you for completing the interview. Generating your report now.");
        setStatus("processing");

        const finalReport = await generateReport(updatedHistory);
        await saveSession(updatedHistory, finalReport);
        setReport(finalReport);
        setStatus("complete");
      } else {
        // ── Next question ──
        setQuestionNumber(nextQ);
        resetTranscript();
        await runQuestion(nextQ, updatedHistory);
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("Evaluation failed. Please try again.");
      setStatus("listening");
      startListening();
    }
  };

  // ── Show report ──
  if (status === "complete" && report) {
    return (
      <InterviewReportView
        report={report}
        role={role}
        qaHistory={qaHistory}
        duration={timeElapsed}
        onDashboard={onExit}
        isSaving={isSaving}
      />
    );
  }

  const progressPct = ((questionNumber - 1) / totalQuestions) * 100;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0704",
        display: "flex",
        flexDirection: "column",
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
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(255,138,0,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 40px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "13px",
              background: "linear-gradient(110deg, #FF8A00, #FF2D95)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Lakshya Ready
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.25)",
              fontFamily: "DM Sans, sans-serif",
              padding: "3px 10px",
              borderRadius: "4px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {role}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "monospace",
            }}
          >
            {formatTime(timeElapsed)}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              color: "rgba(255,138,0,0.7)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FF8A00",
                display: "inline-block",
                animation: "blink 1.5s infinite",
              }}
            />
            LIVE
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: "2px",
          background: "rgba(255,255,255,0.04)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPct}%`,
            background: "linear-gradient(90deg, #FF8A00, #FF5E62)",
            transition: "width 0.5s ease",
          }}
        />
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ width: "100%", maxWidth: "680px" }}>

          {/* Question number */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontFamily: "DM Sans, sans-serif",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
              }}
            >
              Question {questionNumber} of {totalQuestions}
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              {Array.from({ length: totalQuestions }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "20px",
                    height: "3px",
                    borderRadius: "2px",
                    background:
                      i < questionNumber - 1
                        ? "linear-gradient(90deg, #FF8A00, #FF5E62)"
                        : i === questionNumber - 1
                        ? "rgba(255,138,0,0.5)"
                        : "rgba(255,255,255,0.08)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* AI Speaker card */}
          <div
            style={{
              background: "#141009",
              border: `1px solid ${isSpeaking ? "rgba(255,138,0,0.3)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: "20px",
              padding: "32px",
              marginBottom: "20px",
              transition: "border-color 0.3s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: currentQuestion ? "20px" : "0",
              }}
            >
              {/* AI avatar */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF8A00, #FF2D95)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: isSpeaking ? "0 0 20px rgba(255,138,0,0.3)" : "none",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: "13px", color: "#0A0704" }}>
                  AI
                </span>
              </div>

              <div>
                <div style={{ fontSize: "12px", fontFamily: "Syne, sans-serif", fontWeight: 700, color: "rgba(240,236,232,0.7)", marginBottom: "2px" }}>
                  Lakshya AI Interviewer
                </div>
                <div style={{ fontSize: "10px", fontFamily: "DM Sans, sans-serif", color: "rgba(255,255,255,0.25)", letterSpacing: "0.04em" }}>
                  {isSpeaking ? "Speaking…" : status === "processing" ? "Evaluating answer…" : status === "listening" ? "Listening to your answer" : "Preparing question…"}
                </div>
              </div>

              {/* Speaking animation */}
              {isSpeaking && (
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "flex-end", gap: "3px", height: "20px" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="voice-bar"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              )}

              {/* Processing spinner */}
              {status === "processing" && (
                <div
                  style={{
                    marginLeft: "auto",
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,138,0,0.2)",
                    borderTop: "2px solid #FF8A00",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
              )}
            </div>

            {/* Question text */}
            {currentQuestion && (
              <div
                style={{
                  fontSize: "17px",
                  lineHeight: 1.65,
                  color: "rgba(240,236,232,0.88)",
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 400,
                  paddingLeft: "52px",
                }}
              >
                {currentQuestion}
              </div>
            )}

            {!currentQuestion && (
              <div style={{ paddingLeft: "52px", display: "flex", gap: "4px", alignItems: "center" }}>
                {[0, 0.15, 0.3].map((d, i) => (
                  <span
                    key={i}
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "rgba(255,138,0,0.4)",
                      display: "inline-block",
                      animation: "bounce 0.8s ease-in-out infinite",
                      animationDelay: `${d}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* User answer area */}
          {(status === "listening" || status === "processing") && (
            <div
              style={{
                background: "#141009",
                border: `1px solid ${isListening ? "rgba(255,45,149,0.25)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "20px",
                padding: "24px 28px",
                marginBottom: "16px",
                transition: "border-color 0.3s ease",
                minHeight: "120px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                {/* Mic indicator */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: isListening
                      ? "rgba(255,45,149,0.12)"
                      : "rgba(255,255,255,0.05)",
                    border: `1px solid ${isListening ? "rgba(255,45,149,0.3)" : "rgba(255,255,255,0.08)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <svg width="12" height="12" fill="none" stroke={isListening ? "#FF2D95" : "rgba(255,255,255,0.3)"} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>

                <div>
                  <div style={{ fontSize: "11px", fontFamily: "Syne, sans-serif", fontWeight: 700, color: isListening ? "rgba(255,45,149,0.8)" : "rgba(255,255,255,0.3)" }}>
                    {isListening ? "Recording…" : "Your Answer"}
                  </div>
                </div>

                {/* Waveform while listening */}
                {isListening && (
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "flex-end", gap: "3px", height: "18px" }}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="voice-bar"
                        style={{
                          background: "linear-gradient(to top, #FF2D95, #FF5E62)",
                          animationDelay: `${i * 0.09}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Live transcript */}
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: liveTranscript ? "rgba(240,236,232,0.75)" : "rgba(255,255,255,0.15)",
                  fontFamily: "DM Sans, sans-serif",
                  minHeight: "48px",
                }}
              >
                {liveTranscript || "Start speaking — your words will appear here…"}
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div
              style={{
                background: "rgba(255,45,149,0.06)",
                border: "1px solid rgba(255,45,149,0.2)",
                borderRadius: "10px",
                padding: "12px 16px",
                marginBottom: "16px",
                fontSize: "12px",
                color: "rgba(255,45,149,0.8)",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit button */}
          {status === "listening" && (
            <button
              onClick={handleSubmitAnswer}
              disabled={!liveTranscript.trim()}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                background: liveTranscript.trim()
                  ? "linear-gradient(110deg, #FF8A00, #FF5E62)"
                  : "rgba(255,255,255,0.04)",
                border: "none",
                color: liveTranscript.trim() ? "#0A0704" : "rgba(255,255,255,0.2)",
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.02em",
                cursor: liveTranscript.trim() ? "pointer" : "not-allowed",
                transition: "all 0.2s ease",
              }}
            >
              {questionNumber === totalQuestions
                ? "Submit Final Answer →"
                : "Submit Answer & Next Question →"}
            </button>
          )}

          {/* Previous answers */}
          {qaHistory.length > 0 && (
            <div style={{ marginTop: "32px" }}>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.2)",
                  fontFamily: "DM Sans, sans-serif",
                  marginBottom: "12px",
                }}
              >
                Previous Questions
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {qaHistory.slice(-3).map((qa, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div style={{ fontSize: "11px", color: "rgba(255,138,0,0.5)", fontFamily: "DM Sans, sans-serif", marginBottom: "3px" }}>
                      Q{qaHistory.length - (qaHistory.slice(-3).length - 1 - i)}
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(240,236,232,0.4)", fontFamily: "DM Sans, sans-serif", lineHeight: 1.5 }}>
                      {qa.question}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      `}</style>
    </div>
  );
}