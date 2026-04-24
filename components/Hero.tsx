import { resumes } from "@/lib/constants";
import React from "react";
import { ResumeCard } from "./ResumeCard";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="mt-30 w-full">
      <div className="w-full max-w-3xl text-center mx-auto">
        <h1 className="scroll-m-20 text-6xl font-bold tracking-tight text-balance">
          See Your Resume Rating in Action
        </h1>
        <p className="scroll-m-20 mt-3 text-2xl text-slate-400 tracking-tight">
          Get personalized AI feedback and track your application progress
          effortlessly.
        </p>
        <div>
          <button className="px-4 py-2 mt-5 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
            <Link href={"/dashboard"} className="mt-5">
              Analyze Your Resume
            </Link>
          </button>
        </div>
      </div>
      {resumes.length > 0 && (
        <div className="relative flex flex-wrap w-full max-w-6xl mt-10 justify-around mx-auto">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </section>
  );
};
