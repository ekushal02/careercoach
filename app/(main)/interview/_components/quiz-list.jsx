"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const getScoreColor = (score) => {
    if (score <= 40) return "text-red-500";
    if (score <= 70) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <>
      <Card className="bg-transparent border-none shadow-none backdrop-blur-md">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="text-3xl md:text-4xl">
                Recent {" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Quizzes
                </span>
              </CardTitle>
              <CardDescription>
                Review your past quiz performance
              </CardDescription>
            </div>
            <Button
              onClick={() => router.push("/interview/mock")}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-blue-500 hover:to-cyan-400 transition-all"
            >
              Start New Quiz
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {assessments?.map((assessment, i) => (
              <Card
                key={assessment.id}
                onClick={() => setSelectedQuiz(assessment)}
                className="cursor-pointer bg-transparent border border-transparent hover:border-blue-400 transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Quiz {i + 1}
                  </CardTitle>
                  <CardDescription className="flex justify-between w-full">
                    <div className={`font-medium ${getScoreColor(assessment.quizScore)}`}>
                      Score: {assessment.quizScore.toFixed(1)}%
                    </div>
                    <div>
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm"
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                {assessment.improvementTip && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
