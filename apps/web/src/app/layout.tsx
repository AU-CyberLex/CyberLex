import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Spectral } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CyberLex — Cyber Law & Digital Forensics Studio",
    template: "%s — CyberLex",
  },
  description:
    "Learn cyber law the way it is actually litigated: statutory modules, a working forensics lab, and branching investigations built on Indian law.",
};

/**
 * Apply an explicitly chosen theme before first paint. Without this, a learner
 * who chose dark mode sees a light flash while React hydrates the store.
 */
const THEME_BOOT = `(function(){try{var raw=localStorage.getItem("cyberlex");if(!raw)return;var parsed=JSON.parse(raw);var theme=parsed&&parsed.state?parsed.state.theme:parsed&&parsed.theme;if(theme==="light"||theme==="dark")document.documentElement.setAttribute("data-theme",theme);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spectral.variable} ${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
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
