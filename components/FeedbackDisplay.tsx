"use client";

import { Feedback } from "@/lib/google";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  FileText,
  Palette,
  BookOpen,
  Target,
  Layout,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface FeedbackDisplayProps {
  feedback: Feedback;
  onReset: () => void;
}

const sectionConfig: Record<
  keyof Omit<Feedback, "overallScore">,
  { title: string; icon: React.ElementType; gradient: string }
> = {
  ATS: {
    title: "ATS Compatibility",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
  },
  toneAndStyle: {
    title: "Tone & Style",
    icon: Palette,
    gradient: "from-purple-500 to-pink-500",
  },
  content: {
    title: "Content Quality",
    icon: BookOpen,
    gradient: "from-green-500 to-emerald-500",
  },
  skills: {
    title: "Skills Relevance",
    icon: Target,
    gradient: "from-orange-500 to-red-500",
  },
  structure: {
    title: "Structure & Formatting",
    icon: Layout,
    gradient: "from-indigo-500 to-purple-500",
  },
};

const ProgressBar: React.FC<{ score: number; gradient: string }> = ({
  score,
  gradient,
}) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedWidth(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out",
          gradient
        )}
        style={{ width: `${animatedWidth}%` }}
      />
    </div>
  );
};

const ScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  const getScoreVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  return (
    <Badge
      variant={getScoreVariant(score)}
      className="text-lg px-3 py-1 font-bold"
    >
      {score}/100
    </Badge>
  );
};

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({
  feedback,
  onReset,
}) => {
  const getScoreDescription = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    if (score >= 60) return "Needs Improvement";
    return "Poor";
  };

  const getOverallGradient = (score: number) => {
    if (score >= 80) return "from-green-400 to-emerald-600";
    if (score >= 60) return "from-yellow-400 to-orange-600";
    return "from-red-400 to-red-600";
  };

  return (
    <div className="mt-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Resume Analysis Results
          </h2>
          <p className="text-gray-600 mt-2">
            Comprehensive feedback to enhance your resume
          </p>
        </div>
        <Button
          onClick={onReset}
          variant="outline"
          className="gap-2 hover:shadow-md transition-shadow"
        >
          <RotateCcw className="w-4 h-4" />
          Analyze Another Resume
        </Button>
      </div>

      {/* Overall Score Card */}
      <Card className="overflow-hidden shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-gray-700" />
              <h3 className="text-2xl font-bold text-gray-900">
                Overall Score
              </h3>
            </div>

            <div className="relative">
              <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {feedback.overallScore}
                <span className="text-3xl text-gray-500">/100</span>
              </div>
              <p className="text-xl text-gray-600 mb-6">
                {getScoreDescription(feedback.overallScore)}
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <ProgressBar
                score={feedback.overallScore}
                gradient={getOverallGradient(feedback.overallScore)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Sections Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {(Object.keys(sectionConfig) as (keyof typeof sectionConfig)[]).map(
          (key) => {
            const section = feedback[key];
            const config = sectionConfig[key];
            const Icon = config.icon;

            return (
              <Card
                key={key}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg"
              >
                <CardContent className="p-6 text-wrap">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg bg-gradient-to-r",
                          config.gradient
                        )}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">
                        {config.title}
                      </h4>
                    </div>
                    <ScoreBadge score={section.score} />
                  </div>

                  <div className="mb-4">
                    <ProgressBar
                      score={section.score}
                      gradient={config.gradient}
                    />
                  </div>

                  <div className="space-y-3">
                    {section.tips.map((tip, index) => {
                      const isGood = tip.type === "good";
                      return (
                        <div
                          key={index}
                          className={cn(
                            "p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-sm",
                            isGood
                              ? "bg-emerald-50 border-emerald-400 hover:bg-emerald-100"
                              : "bg-red-50 border-red-400 hover:bg-red-100"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            {isGood ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div
                                className={cn(
                                  "font-semibold",
                                  isGood ? "text-emerald-800" : "text-red-800"
                                )}
                              >
                                {tip.tip}
                              </div>
                              {"explanation" in tip && tip.explanation && (
                                <div
                                  className={cn(
                                    "text-sm mt-2 leading-relaxed",
                                    isGood ? "text-emerald-700" : "text-red-700"
                                  )}
                                >
                                  {tip.explanation}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>

      {/* Footer CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">
            Ready to improve your resume?
          </h3>
          <p className="text-blue-100 mb-4">
            Use these insights to create a more competitive resume
          </p>
          <Button
            onClick={onReset}
            variant="secondary"
            className="gap-2 bg-white text-blue-600 hover:bg-gray-100"
          >
            <RotateCcw className="w-4 h-4" />
            Analyze Another Resume
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
