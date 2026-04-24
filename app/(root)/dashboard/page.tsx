import { Upload } from "@/components/Upload";
import React from "react";
import type { Metadata } from "next";

// Page-specific metadata
export const metadata: Metadata = {
  title: "Dashboard | Resume Check Karo",
  description:
    "Upload and analyze your resume with AI-powered insights on your Dashboard. Get instant feedback on ATS compatibility and resume optimization.",
  openGraph: {
    title: "Dashboard - Resume Check Karo",
    description:
      "Upload and analyze your resume with AI-powered insights. Track your resume score and ATS compatibility.",
    url: "https://resumecheckkaro.nayalsaurav.tech/dashboard",
    siteName: "Resume Check Karo",
    images: [
      {
        url: "https://resumecheckkaro.nayalsaurav.tech/og-image2.png",
        width: 1200,
        height: 630,
        alt: "Resume Check Karo Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard - Resume Check Karo",
    description:
      "Upload and analyze your resume with AI-powered insights on your Dashboard.",
    images: ["https://resumecheckkaro.nayalsaurav.tech/og-image2.png"],
  },
};

const Dashboard = () => {
  return (
    <section className="max-w-5xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Upload />
    </section>
  );
};

export default Dashboard;
