"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);
  const [showDots, setShowDots] = useState(false);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  const getScoreColor = (score) => {
    if (score <= 40) return "text-red-500";
    if (score <= 70) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <Card className="bg-transparent border-none shadow-none backdrop-blur-md">
      <CardHeader>
        <CardTitle className="gradient-title text-3xl md:text-4xl">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Performance{" "}
          </span>
          Trend
        </CardTitle>
        <CardDescription>Your quiz scores over time</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="date"
                tick={{ fill: "#fff", fontSize: 12 }}
                axisLine={{ stroke: "#fff" }}
                tickLine={{ stroke: "#fff" }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#fff", fontSize: 12 }}
                axisLine={{ stroke: "#fff" }}
                tickLine={{ stroke: "#fff" }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    const score = payload[0].value;
                    const scoreColor = getScoreColor(score);
                    return (
                      <div className="bg-background border rounded-lg p-2 shadow-md">
                        <p className={`text-sm font-medium ${scoreColor}`}>
                          Score: {score}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {payload[0].payload.date}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={2}
                isAnimationActive={true}
                animationDuration={1200}
                onAnimationEnd={() => setShowDots(true)}
                dot={({ cx, cy, index }) =>
                  showDots ? (
                    <circle
                      key={`dot-${index}`}
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill="#3B82F6"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      className="fade-pop"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    />
                  ) : null
                }
              />

            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
