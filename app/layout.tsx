import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Chakra_Petch } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Display face for headings + wordmark — geometric, chamfered, echoes the
// angular N7 logo lettering.
const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.n7technologies.org"),
  title: {
    default: "N7 Technologies",
    template: "%s · N7 Technologies",
  },
  description: "Building the next generation of software.",
  openGraph: {
    title: "N7 Technologies",
    description: "Building the next generation of software.",
    url: "https://www.n7technologies.org",
    siteName: "N7 Technologies",
    type: "website",
    // ASSET-TODO: replace with a real 1200×630 og-default.png export. Using the
    // valid (square) logo for now — cropped previews are acceptable, a
    // malformed image file is not.
    images: ["/brand/neural-zenith-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "N7 Technologies",
    description: "Building the next generation of software.",
    // ASSET-TODO: replace with a real 1200×630 og-default.png export.
    images: ["/brand/neural-zenith-logo.png"],
  },
};

// JSON-LD Organization block for richer brand SERP / knowledge panel.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "N7 Technologies",
  url: "https://www.n7technologies.org",
  logo: "https://www.n7technologies.org/brand/neural-zenith-logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${chakra.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Plausible analytics — only loads when the domain env var is set. */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            strategy="afterInteractive"
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.tagged-events.js"
          />
        )}
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
