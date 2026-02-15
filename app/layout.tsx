import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { DirUpdater } from "@/components/DirUpdater";
import { I18nProvider } from "@/lib/i18n";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "CyberGuard Tunisia",
  description:
    "AI-Powered Cybersecurity Training Simulator for Tunisian citizens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <I18nProvider>
          <DirUpdater />
          <Navbar />
          <main className="flex min-h-screen flex-col pt-20">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
