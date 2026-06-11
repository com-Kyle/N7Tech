import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.n7technologies.org"),
  title: {
    default: "n7technologies",
    template: "%s · n7technologies",
  },
  description: "Building the next generation of software.",
  openGraph: {
    title: "n7technologies",
    description: "Building the next generation of software.",
    url: "https://www.n7technologies.org",
    siteName: "n7technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "n7technologies",
    description: "Building the next generation of software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
