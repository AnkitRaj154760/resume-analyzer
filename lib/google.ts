import { GoogleGenAI, Type } from "@google/genai";

interface FeedbackTip {
  type: "good" | "improve";
  tip: string;
  explanation?: string;
}

interface FeedbackSection {
  score: number;
  tips: FeedbackTip[];
}

export interface Feedback {
  overallScore: number;
  ATS: FeedbackSection;
  toneAndStyle: FeedbackSection;
  content: FeedbackSection;
  skills: FeedbackSection;
  structure: FeedbackSection;
}

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const resumeAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: { type: Type.NUMBER },
    ATS: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER },
        tips: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, enum: ["good", "improve"] },
              tip: { type: Type.STRING },
            },
            required: ["type", "tip"],
          },
        },
      },
      required: ["score", "tips"],
    },
    toneAndStyle: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER },
        tips: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, enum: ["good", "improve"] },
              tip: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["type", "tip", "explanation"],
          },
        },
      },
      required: ["score", "tips"],
    },
    content: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER },
        tips: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, enum: ["good", "improve"] },
              tip: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["type", "tip", "explanation"],
          },
        },
      },
      required: ["score", "tips"],
    },
    structure: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER },
        tips: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, enum: ["good", "improve"] },
              tip: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["type", "tip", "explanation"],
          },
        },
      },
      required: ["score", "tips"],
    },
    skills: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER },
        tips: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, enum: ["good", "improve"] },
              tip: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["type", "tip", "explanation"],
          },
        },
      },
      required: ["score", "tips"],
    },
  },
  required: [
    "overallScore",
    "ATS",
    "toneAndStyle",
    "content",
    "structure",
    "skills",
  ],
} as const;

export async function getAiResponse(file: File, instruction: string) {
  let jsonOutput = "";
  try {
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    const response = await ai.models.generateContent({
      model: process.env.GOOGLE_AI_MODEL || "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: instruction },
            {
              inlineData: {
                data: fileBuffer.toString("base64"),
                mimeType: "application/pdf",
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: resumeAnalysisSchema,
      },
    });

    jsonOutput = response?.text ?? "";

    if (!jsonOutput) {
      throw new Error("Empty response from AI model");
    }

    console.log("AI Response:", jsonOutput);
    return JSON.parse(jsonOutput) as Feedback;
  } catch (err) {
    console.error("Failed to get AI response:", {
      error: err instanceof Error ? err.message : err,
      jsonOutput,
      fileName: file.name,
      fileSize: file.size,
    });

    // Return more informative error state
    return createErrorFeedback();
  }
}

function createErrorFeedback(): Feedback {
  return {
    overallScore: 0,
    ATS: {
      score: 0,
      tips: [
        { type: "improve", tip: `Analysis failed: internal server error` },
      ],
    },
    toneAndStyle: {
      score: 0,
      tips: [
        {
          type: "improve",
          tip: "Unable to analyze",
        },
      ],
    },
    content: {
      score: 0,
      tips: [
        {
          type: "improve",
          tip: "Unable to analyze",
        },
      ],
    },
    structure: {
      score: 0,
      tips: [
        {
          type: "improve",
          tip: "Unable to analyze",
        },
      ],
    },
    skills: {
      score: 0,
      tips: [
        {
          type: "improve",
          tip: "Unable to analyze",
        },
      ],
    },
  };
}
