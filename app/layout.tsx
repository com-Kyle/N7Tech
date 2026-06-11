import type { Metadata } from "next";
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
    images: ["/brand/n7-technologies.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "N7 Technologies",
    description: "Building the next generation of software.",
    images: ["/brand/n7-technologies.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${chakra.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
