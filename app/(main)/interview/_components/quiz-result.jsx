"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import clsx from "clsx";

export default function QuizResult({ result, hideStartNew = false, onStartNew }) {
  if (!result) return null;

  const score = result.quizScore;

  // Determine color based on score
  const getScoreColor = (score) => {
    if (score > 70) return "green";
    if (score > 40) return "yellow";
    return "red";
  };

  const color = getScoreColor(score);
  const colorClasses = {
    red: "text-red-500 bg-red-200",
    yellow: "text-yellow-500 bg-yellow-200",
    green: "text-green-500 bg-green-200",
  };

  return (
    <div className="mx-auto">
      <h1 className="flex items-center gap-2 text-3xl bg-gradient-to-r from-white to-white text-transparent bg-clip-text font-bold">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6 bg-transparent border-none shadow-none px-0">
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3
            className={clsx(
              "text-2xl font-bold",
              color === "green" && "text-green-500",
              color === "yellow" && "text-yellow-500",
              color === "red" && "text-red-500"
            )}
          >
            {score.toFixed(1)}%
          </h3>
          <Progress
            value={score}
            className={clsx(
              "w-full h-3",
              color === "green" && "bg-green-100 [&>*]:bg-green-500",
              color === "yellow" && "bg-yellow-100 [&>*]:bg-yellow-500",
              color === "red" && "bg-red-100 [&>*]:bg-red-500"
            )}
          />
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div
            className={clsx(
              "p-4 rounded-lg text-sm transition-shadow duration-300",
              color === "green" && "shadow-[0_0_10px_2px_rgba(34,197,94,0.5)]",
              color === "yellow" && "shadow-[0_0_10px_2px_rgba(234,179,8,0.5)]",
              color === "red" && "shadow-[0_0_10px_2px_rgba(239,68,68,0.5)]",
              "bg-transparent border border-none"
            )}
          >
            <p className="font-medium">Improvement Tip:</p>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <h3 className="font-medium">Question Review</h3>
          {result.questions.map((q, index) => (
            <div
              key={index}
              className={clsx(
                "rounded-lg p-4 space-y-2 bg-transparent border border-transparent transition-all duration-300",
                q.isCorrect
                  ? "hover:border-green-500"
                  : "hover:border-red-500"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
              </div>
              <div className="text-sm bg-muted p-2 rounded bg-opacity-10">
                <p className="font-medium">Explanation:</p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <br></br>

      {!hideStartNew && (
        <CardFooter className="bg-transparent border-none shadow-none">
          <Button
            onClick={onStartNew}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-blue-500 hover:to-cyan-400 transition-all duration-300"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
}
