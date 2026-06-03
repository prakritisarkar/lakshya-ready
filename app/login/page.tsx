"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch {
      // error handled in context
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0A0704",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            border: "2px solid rgba(255,138,0,0.2)",
            borderTop: "2px solid #FF8A00",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
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
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse 60% 50% at 30% 20%, rgba(255,138,0,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 70% 80%, rgba(255,45,149,0.05) 0%, transparent 65%)
          `,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "400px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #FF8A00, #FF2D95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <span
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 900,
                fontSize: "20px",
                color: "#0A0704",
              }}
            >
              L
            </span>
          </div>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "22px",
              letterSpacing: "-0.03em",
              color: "#F5F0EC",
              marginBottom: "6px",
            }}
          >
            Welcome to Lakshya Ready
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(240,236,232,0.4)",
              fontFamily: "DM Sans, sans-serif",
              lineHeight: 1.6,
            }}
          >
            Sign in to track your interviews,
            <br />
            scores, and improvement over time.
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#141009",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "20px",
            padding: "32px",
          }}
        >
          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              padding: "14px 20px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#F0ECE8",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
              marginBottom: "20px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            {/* Google SVG Icon */}
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "DM Sans, sans-serif" }}>
              or
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          </div>

          {/* Demo mode */}
          <button
            onClick={() => window.location.href = "/demo"}
            style={{
              width: "100%",
              padding: "14px 20px",
              borderRadius: "12px",
              background: "linear-gradient(110deg, rgba(255,138,0,0.12), rgba(255,45,149,0.08))",
              border: "1px solid rgba(255,138,0,0.2)",
              color: "#FF8A00",
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.02em",
              cursor: "pointer",
            }}
          >
            Try Demo Without Signing In →
          </button>
        </div>

        {/* Fine print */}
        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: "rgba(255,255,255,0.18)",
            fontFamily: "DM Sans, sans-serif",
            marginTop: "20px",
            lineHeight: 1.6,
          }}
        >
          By continuing, you agree to our Terms of Service.
          <br />
          We never share your data with third parties.
        </p>
      </div>
    </div>
  );
}