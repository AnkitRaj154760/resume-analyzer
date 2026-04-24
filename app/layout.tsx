import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Provider from "./providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    default: "Resume Check Karo",
    template: "%s | Resume Check Karo",
  },
  description:
    "Analyze your resume with AI-powered insights. Get instant feedback on ATS compatibility, keyword optimization, and formatting to improve your job application success rate.",
  keywords: [
    "Ankit Raj",
    "AnkitRaj154760",
    "resume analyzer",
    "ATS checker",
    "resume scanner",
    "CV analyzer",
    "job application optimizer",
    "resume feedback",
    "ATS compatibility",
    "resume score",
  ],
  authors: [{ name: "Ankit Raj" }],
  openGraph: {
    title: "Resume Check Karo - Resume Analyzer & ATS Checker",
    description:
      "Analyze your resume with AI-powered insights. Get instant feedback on ATS compatibility, keyword optimization, and formatting to improve your job application success rate.",
    url: "https://resume-analyzer.vercel.app",
    siteName: "Resume Check Karo",
    images: [
      {
        url: "https://resume-analyzer.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resume Check Karo - Resume Analyzer & ATS Checker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Check Karo - Resume Analyzer & ATS Checker",
    description:
      "Analyze your resume with AI-powered insights. Get instant feedback on ATS compatibility, keyword optimization, and formatting.",
    images: ["https://resume-analyzer.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${roboto.variable}`}>
        <Provider>
          <main className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
