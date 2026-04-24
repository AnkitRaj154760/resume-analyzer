"use client";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { analyzeResume } from "@/app/actions/analyze-resume";
import { Feedback } from "@/lib/google";
import { FeedbackDisplay } from "./FeedbackDisplay";

interface FormErrors {
  companyName?: string;
  jobTitle?: string;
  jobDescription?: string;
  file?: string;
}

export const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("uploading...");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const validateForm = (formData: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File | null;
  }): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.companyName.trim()) {
      errors.companyName = "Company name is required";
    }

    if (!formData.jobTitle.trim()) {
      errors.jobTitle = "Job title is required";
    }

    if (!formData.jobDescription.trim()) {
      errors.jobDescription = "Job description is required";
    } else if (formData.jobDescription.length < 50) {
      errors.jobDescription =
        "Job description should be at least 50 characters";
    }

    if (!formData.file) {
      errors.file = "Please upload a resume file";
    } else if (
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(formData.file.type)
    ) {
      errors.file = "Only PDF, DOC, and DOCX files are supported";
    } else if (formData.file.size > 10 * 1024 * 1024) {
      errors.file = "File size must be less than 10MB";
    }

    return errors;
  };

  const handleFileSelect = (file: File | null) => {
    setFile(file);
    // Clear file error when a new file is selected
    if (file && errors.file) {
      setErrors((prev) => ({ ...prev, file: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = {
      companyName: (form.elements.namedItem("company-name") as HTMLInputElement)
        .value,
      jobTitle: (form.elements.namedItem("job-title") as HTMLInputElement)
        .value,
      jobDescription: (
        form.elements.namedItem("job-description") as HTMLTextAreaElement
      ).value,
      file,
    };

    // Validate form
    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setIsProcessing(true);
    setStatusText("Analyzing your resume...");
    setFeedback(null);

    try {
      const response = await analyzeResume({
        companyName: formData.companyName,
        jobTitle: formData.jobTitle,
        jobDescription: formData.jobDescription,
        file: formData.file!,
      });

      console.log("AI Analysis:", response);
      setStatusText("Analysis complete!");
      setFeedback(response);
    } catch (error) {
      console.error("Analysis error:", error);
      setStatusText("Something went wrong. Please try again.");

      // Show user-friendly error message
      if (error instanceof Error) {
        setErrors({ file: error.message });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setFeedback(null);
    setErrors({});
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="scroll-m-20 text-6xl font-bold tracking-tight text-balance text-center">
        Smart Feedback for your dream job
      </h1>

      {isProcessing ? (
        <div className="text-center mt-8">
          <h2 className="text-2xl mb-4">{statusText}</h2>
          <div className="relative w-full h-[400px]">
            <Image
              alt="resume-scan.gif"
              src="/images/resume-scan.gif"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      ) : feedback ? (
        <FeedbackDisplay feedback={feedback} onReset={resetForm} />
      ) : (
        <>
          <h2 className="text-center scroll-m-20 mt-3 text-2xl text-slate-400 tracking-tight">
            Drop your resume for an ATS score and improvement tips
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col px-5 py-7 rounded-lg gap-6 items-center mt-8 max-w-2xl mx-auto box-shadow bg-white"
          >
            {/* Company Name */}
            <div className="flex flex-col gap-2 w-full">
              <Label
                htmlFor="company-name"
                className="text-slate-700 font-medium"
              >
                Company Name *
              </Label>
              <Input
                type="text"
                name="company-name"
                id="company-name"
                placeholder="e.g., Google, Microsoft, Amazon"
                className={`bg-slate-50 h-[45px] border-none box-shadow ${
                  errors.companyName ? "ring-2 ring-red-500" : ""
                }`}
                required
              />
              {errors.companyName && (
                <span className="text-red-500 text-sm">
                  {errors.companyName}
                </span>
              )}
            </div>

            {/* Job Title */}
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="job-title" className="text-slate-700 font-medium">
                Job Title *
              </Label>
              <Input
                type="text"
                name="job-title"
                id="job-title"
                placeholder="e.g., Software Engineer, Product Manager"
                className={`bg-slate-50 h-[45px] border-none ${
                  errors.jobTitle ? "ring-2 ring-red-500" : ""
                }`}
                required
              />
              {errors.jobTitle && (
                <span className="text-red-500 text-sm">{errors.jobTitle}</span>
              )}
            </div>

            {/* Job Description */}
            <div className="flex flex-col gap-2 w-full">
              <Label
                htmlFor="job-description"
                className="text-slate-700 font-medium"
              >
                Job Description *
              </Label>
              <Textarea
                name="job-description"
                id="job-description"
                placeholder="Paste the full job description here... (minimum 50 characters)"
                rows={5}
                className={`bg-slate-50 h-[100px] max-h-[120px] border-none resize-none ${
                  errors.jobDescription ? "ring-2 ring-red-500" : ""
                }`}
                required
              />
              {errors.jobDescription && (
                <span className="text-red-500 text-sm">
                  {errors.jobDescription}
                </span>
              )}
            </div>

            {/* File Upload */}
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="uploader" className="text-slate-700 font-medium">
                Upload Resume *
              </Label>
              <div className="relative">
                <input
                  type="file"
                  id="uploader"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    handleFileSelect(e.target.files?.[0] || null)
                  }
                  className={`w-full p-3 bg-slate-50 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                    errors.file ? "ring-2 ring-red-500" : ""
                  }`}
                />
              </div>
              {file && (
                <div className="text-sm text-slate-600">
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                  MB)
                </div>
              )}
              {errors.file && (
                <span className="text-red-500 text-sm">{errors.file}</span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-medium"
              disabled={isProcessing}
            >
              {isProcessing ? "Analyzing..." : "Analyze Resume"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
