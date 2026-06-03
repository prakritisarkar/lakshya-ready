"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = ["Features", "Demo", "Roles", "How It Works"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.4s ease",
        padding: scrolled ? "14px 0" : "20px 0",
        background: scrolled ? "rgba(10,7,4,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #FF8A00, #FF2D95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: "10px", color: "#0A0704" }}>L</span>
          </div>
          <span
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "14px",
              letterSpacing: "-0.02em",
              background: "linear-gradient(110deg, #FF8A00, #FF5E62, #FF2D95)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Lakshya Ready
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {NAV_LINKS.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              style={{
                fontSize: "12px",
                letterSpacing: "0.02em",
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                fontFamily: "DM Sans, sans-serif",
                transition: "color 0.2s",
              }}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            href="/login"
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            Sign in
          </Link>
          <Link
            href="/demo"
            style={{
              fontSize: "11px",
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              letterSpacing: "0.04em",
              padding: "9px 18px",
              borderRadius: "8px",
              background: "linear-gradient(110deg, #FF8A00, #FF5E62)",
              color: "#0A0704",
              textDecoration: "none",
            }}
          >
            Try Demo Free
          </Link>
        </div>
      </div>
    </nav>
  );
}