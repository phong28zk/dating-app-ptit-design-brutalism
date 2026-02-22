import type { Metadata } from "next";
import { spaceGrotesk, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "PTIT Dating - Soft Brutalism",
  description: "A dating app with Soft Brutalism design system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Figma capture script — TEMPORARY for export */}
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
