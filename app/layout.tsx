import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/layout/Header";
import ReactQueryClientProvider from "./react-query-client-provider";
import AuthGuard from "./auth-guard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PopPlan - Discover and Book Local Events",
  description: "Discover, browse, and book local events in your area",
  keywords: ["events", "local events", "tickets", "booking", "entertainment"],
  authors: [{ name: "PopPlan" }],
  openGraph: {
    title: "PopPlan - Discover and Book Local Events",
    description: "Discover, browse, and book local events in your area",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AuthGuard>
            <Header />
            <main className="min-h-screen bg-gray-50">{children}</main>
          </AuthGuard>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
