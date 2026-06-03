import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "32px 48px",
      }}
    >
      <div
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "5px",
              background: "linear-gradient(135deg, #FF8A00, #FF2D95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: "9px", color: "#0A0704" }}>L</span>
          </div>
          <span
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
          </span>
        </div>

        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "DM Sans, sans-serif" }}>
          Practice. Improve. Get Interview Ready. · Portfolio Project
        </p>

        <div style={{ display: "flex", gap: "20px" }}>
          {["Privacy", "Terms", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", textDecoration: "none", fontFamily: "DM Sans, sans-serif" }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}