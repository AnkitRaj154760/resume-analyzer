"use server";

import { getAiResponse, type Feedback } from "@/lib/google";

interface AnalyzeResumeProps {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  file: File;
}

// Add validation function
const validateInputs = ({
  companyName,
  jobTitle,
  jobDescription,
  file,
}: AnalyzeResumeProps) => {
  const errors: string[] = [];

  if (!companyName?.trim()) {
    errors.push("Company name is required");
  }

  if (!jobTitle?.trim()) {
    errors.push("Job title is required");
  }

  if (!jobDescription?.trim()) {
    errors.push("Job description is required");
  }

  if (!file) {
    errors.push("Resume file is required");
  } else if (file.type !== "application/pdf") {
    errors.push("Only PDF files are supported");
  } else if (file.size > 10 * 1024 * 1024) {
    // 10MB
    errors.push("File size must be less than 10MB");
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(", ")}`);
  }
};

export const analyzeResume = async ({
  companyName,
  jobTitle,
  jobDescription,
  file,
}: AnalyzeResumeProps): Promise<Feedback> => {
  try {
    // Validate inputs
    validateInputs({ companyName, jobTitle, jobDescription, file });

    const instruction = prepareInstructions({
      companyName,
      jobTitle,
      jobDescription,
    });

    const feedback = await getAiResponse(file, instruction);
    console.log("Parsed Feedback:", feedback);
    return feedback;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error; // Re-throw to be handled by the client
  }
};

const prepareInstructions = ({
  companyName,
  jobTitle,
  jobDescription,
}: {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
}) => `
You are an expert ATS (Applicant Tracking System) and resume analysis specialist. 

CONTEXT:
- Company: ${companyName}
- Position: ${jobTitle}
- Job Description: ${jobDescription}

ANALYSIS REQUIREMENTS:
1. Analyze the resume against the provided job description
2. Rate each category from 0-100 (be critical - low scores are acceptable for poor resumes)
3. Provide 3-4 actionable tips per category
4. Focus on ATS compatibility, keyword matching, and job relevance

EVALUATION CRITERIA:
- ATS Score: Keyword optimization, formatting compatibility, parsing friendliness
- Tone & Style: Professional language, appropriate voice, industry standards
- Content: Relevance to job, achievements vs duties, quantified results
- Structure: Layout clarity, section organization, readability
- Skills: Technical/soft skills alignment, keyword presence, skill demonstration

FORMAT: Return ONLY a JSON object matching the schema below, no additional text or markdown.

${AIResponseFormat}
`;

const AIResponseFormat = `
{
  "overallScore": number, // 0-100, weighted average of all categories
  "ATS": {
    "score": number, // 0-100, based on keyword density, format compatibility
    "tips": [
      {
        "type": "good" | "improve",
        "tip": "string" // Concise actionable advice (3-4 tips total)
      }
    ]
  },
  "toneAndStyle": {
    "score": number, // 0-100, professional language and industry appropriateness
    "tips": [
      {
        "type": "good" | "improve", 
        "tip": "string", // Brief title/summary
        "explanation": "string" // Detailed explanation with examples
      }
    ]
  },
  "content": {
    "score": number, // 0-100, relevance and quality of information
    "tips": [
      {
        "type": "good" | "improve",
        "tip": "string", // Brief title/summary  
        "explanation": "string" // Detailed explanation with specific suggestions
      }
    ]
  },
  "structure": {
    "score": number, // 0-100, layout and organization quality
    "tips": [
      {
        "type": "good" | "improve",
        "tip": "string", // Brief title/summary
        "explanation": "string" // Detailed formatting and structure advice
      }
    ]
  },
  "skills": {
    "score": number, // 0-100, skill relevance and presentation
    "tips": [
      {
        "type": "good" | "improve", 
        "tip": "string", // Brief title/summary
        "explanation": "string" // Specific skills recommendations
      }
    ]
  }
}`;
