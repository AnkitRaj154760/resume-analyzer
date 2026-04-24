import React from "react";
import ScoreCircle from "./ScoreCircle";
import Image from "next/image";

export const ResumeCard = ({ resume }: { resume: Resume }) => {
  return (
    <div
      // href={`/resume/${resume.id}`}
      className="bg-white box-shadow rounded-3xl h-[480px] w-full md:w-[30%] mb-8 animate-in fade-in duration-1000"
    >
      <div className="flex items-center justify-between px-5">
        <div className="flex flex-col gap-2">
          <h2 className="!text-black font-bold break-words">
            {resume.companyName}
          </h2>
          <h3 className="text-lg break-words text-gray-500">
            {resume.jobTitle}
          </h3>
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>
      <div>
        <div className="w-full h-full">
          <Image
            src={resume.imagePath}
            alt={resume.imagePath}
            width={400}
            height={350}
            className="w-full h-[350px] object-cover object-top"
            priority
          />
        </div>
      </div>
    </div>
  );
};
