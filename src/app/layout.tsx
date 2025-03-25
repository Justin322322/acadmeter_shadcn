/**
 * Root layout component for the AcadMeter application
 * Provides theme support and font configuration for the entire app
 * Sets up HTML structure and applies global styles
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Configure Geist font with latin subset for optimal loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata configuration for SEO and browser tab display
export const metadata: Metadata = {
  title: "AcadMeter - Smart Academic Performance Monitoring",
  description: "Transform your educational institution with automated grade management and real-time analytics for better learning outcomes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="acadmeter-ui-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
