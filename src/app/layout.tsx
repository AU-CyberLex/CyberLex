import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "CyberLex — Cyber Law & Digital Forensics Studio",
  description:
    "Learn cyber law the way it is actually litigated: statutory modules, a working forensics lab, and branching investigations built on Indian law.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans text-[16px] leading-[1.55] antialiased">
        <StoreProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-[1180px] px-5 pb-20 pt-9">{children}</main>
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
