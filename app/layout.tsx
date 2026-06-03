import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lakshya Ready — Practice. Improve. Get Interview Ready.",
  description:
    "AI-powered voice-based mock interviews for CS students. Get scored, tracked, and guided to your dream tech role.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}