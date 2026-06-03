"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function DashboardPage() 
{
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading || !user) {
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
                padding: "48px",
                position: "relative",
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

            <div style={{ position: "relative", zIndex: 1, maxWidth: "1152px", margin: "0 auto" }}>

                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "56px",
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "6px",
                            }}
                        >
                            <div
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "8px",
                                    background: "linear-gradient(135deg, #FF8A00, #FF2D95)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "Syne, sans-serif",
                                        fontWeight: 900,
                                        fontSize: "12px",
                                        color: "#0A0704",
                                    }}
                                >
                                    L
                                </span>
                            </div>
                            <span
                                style={{
                                    fontFamily: "Syne, sans-serif",
                                    fontWeight: 800,
                                    fontSize: "14px",
                                    background: "linear-gradient(110deg, #FF8A00, #FF2D95)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Lakshya Ready
                            </span>
                        </div>
                        <h1
                            style={{
                                fontFamily: "Syne, sans-serif",
                                fontWeight: 800,
                                fontSize: "28px",
                                letterSpacing: "-0.03em",
                                color: "#F5F0EC",
                            }}
                        >
                            Welcome back,{" "}
                            <span
                                style={{
                                    background: "linear-gradient(110deg, #FF8A00, #FF5E62)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                {user.displayName?.split(" ")[0]}
                            </span>
                        </h1>
                        <p
                            style={{
                                fontSize: "13px",
                                color: "rgba(240,236,232,0.38)",
                                fontFamily: "DM Sans, sans-serif",
                                marginTop: "4px",
                            }}
                        >
                            Your interview dashboard is being built. Check back soon.
                        </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        {user.photoURL && (
                            <img
                                src={user.photoURL}
                                alt={user.displayName || "User"}
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "50%",
                                    border: "2px solid rgba(255,138,0,0.3)",
                                }}
                            />
                        )}
                        <button
                            onClick={signOut}
                            style={{
                                fontSize: "12px",
                                fontFamily: "DM Sans, sans-serif",
                                color: "rgba(255,255,255,0.35)",
                                background: "none",
                                border: "1px solid rgba(255,255,255,0.08)",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                cursor: "pointer",
                            }}
                        >
                            Sign out
                        </button>
                    </div>
                </div>

                {/* Placeholder cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "16px",
                        marginBottom: "32px",
                    }}
                >
                    {[
                        { label: "Interviews Completed", value: "0", color: "#FF8A00" },
                        { label: "Average Score", value: "—", color: "#FF5E62" },
                        { label: "Top Skill", value: "—", color: "#FF2D95" },
                    ].map((card) => (
                        <div
                            key={card.label}
                            style={{
                                background: "#141009",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: "16px",
                                padding: "28px",
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: "Syne, sans-serif",
                                    fontWeight: 800,
                                    fontSize: "36px",
                                    color: card.color,
                                    marginBottom: "6px",
                                    letterSpacing: "-0.03em",
                                }}
                            >
                                {card.value}
                            </div>
                            <div
                                style={{
                                    fontSize: "12px",
                                    color: "rgba(240,236,232,0.35)",
                                    fontFamily: "DM Sans, sans-serif",
                                }}
                            >
                                {card.label}
                            </div>
                        </div>
                    ))}
                </div>



                {/* Start interview CTA */}
                <div
                    style={{
                        background: "#141009",
                        border: "1px solid rgba(255,138,0,0.15)",
                        borderRadius: "16px",
                        padding: "40px",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            fontFamily: "Syne, sans-serif",
                            fontWeight: 800,
                            fontSize: "20px",
                            color: "#F5F0EC",
                            marginBottom: "8px",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Ready to practice?
                    </div>

                    <p
                        style={{
                            fontSize: "13px",
                            color: "rgba(240,236,232,0.38)",
                            fontFamily: "DM Sans, sans-serif",
                            marginBottom: "24px",
                        }}
                    >
                        Choose a role and start a voice-based AI interview right now.
                    </p>

                    <Link
                        href="/interview"
                        style={{
                            display: "inline-block",
                            padding: "12px 28px",
                            borderRadius: "10px",
                            background: "linear-gradient(110deg, #FF8A00, #FF5E62)",
                            color: "#0A0704",
                            fontFamily: "Syne, sans-serif",
                            fontWeight: 700,
                            fontSize: "13px",
                            letterSpacing: "0.02em",
                            textDecoration: "none",
                        }}
                    >
                        Start Interview →
                    </Link>
                </div>
            </div>
        </div>
                
    );
}