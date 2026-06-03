import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Lakshya Ready — Practice. Improve. Get Interview Ready.",
  description:
    "AI-powered voice-based mock interviews for CS students. Get scored, tracked, and guided to your dream tech role.",
  openGraph: {
    title: "Lakshya Ready",
    description: "AI-powered voice interview coach for CS students.",
    url: "https://lakshya-ready.vercel.app",
    siteName: "Lakshya Ready",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}