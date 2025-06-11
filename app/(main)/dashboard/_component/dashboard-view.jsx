"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getGrowthRateColorInfo = (rate) => {
    if (rate >= 20) {
      return {
        icon: TrendingUp,
        color: "text-green-500", // green
        gradientClass: "from-green-400 to-green-600",
        shadowClass: "shadow-green-500/40",
      };
    } else if (rate >= 10) {
      return {
        icon: LineChart,
        color: "text-yellow-500", // yellow
        gradientClass: "from-yellow-400 to-yellow-600",
        shadowClass: "shadow-yellow-500/40",
      };
    } else {
      return {
        icon: TrendingDown,
        color: "text-red-500", // red
        gradientClass: "from-red-500 to-pink-500",
        shadowClass: "shadow-red-500/40"
      };
    }
  };

  const getDemandLevelInfo = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return {
          color: "text-green-500", // green
          gradientClass: "from-green-400 to-green-600",
          shadowClass: "shadow-green-500/40",
        };
      case "medium":
        return {
          color: "text-yellow-500", // yellow
          gradientClass: "from-yellow-400 to-yellow-600",
          shadowClass: "shadow-yellow-500/40",
        };
      case "low":
        return {
          color: "text-red-500", // red
          gradientClass: "from-red-500 to-pink-500",
          shadowClass: "shadow-red-500/40"
        };
      default:
        return {
          color: "text-gray-500", // gray
          gradientClass: "from-gray-300 to-gray-800",
          shadowClass: "shadow-gray-500/40",
        };
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return {
          icon: TrendingUp,
          color: "text-green-500", // green
          gradientClass: "from-green-400 to-green-600",
          shadowClass: "shadow-green-500/40",
        };
      case "neutral":
        return {
          icon: LineChart,
          color: "text-yellow-500", // yellow
          gradientClass: "from-yellow-400 to-yellow-600",
          shadowClass: "shadow-yellow-500/40",
        };
      case "negative":
        return {
          icon: TrendingDown,
          color: "text-red-500", // red
          gradientClass: "from-red-500 to-pink-500",
          shadowClass: "shadow-red-500/40"
        };
      default:
        return {
          icon: LineChart,
          color: "text-gray-500", // gray
          gradientClass: "from-gray-300 to-gray-800",
          shadowClass: "shadow-gray-500/40",
        };
    }
  };

  const {
    icon: OutlookIcon,
    color: outlookIconColor,
    gradientClass: outlookGradientClass,
    shadowClass: outlookShadowClass,
  } = getMarketOutlookInfo(insights.marketOutlook);
  
  const {
    icon: GrowthIcon,
    color: growthColor,
    gradientClass: growthGradientClass,
    shadowClass: growthShadowClass,
  } = getGrowthRateColorInfo(insights.growthRate);
  
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true });
  
  const {
    color: demandColor,
    gradientClass: demandGradientClass,
    shadowClass: demandShadowClass,
  } = getDemandLevelInfo(insights.demandLevel);

  return (
    <div>
      <div className="grid-background"></div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Badge variant="outline">
            Last updated:{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {lastUpdatedDate}
            </span>
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Market Outlook */}
          <Card
            className={`bg-transparent border-none backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] shadow-lg ${outlookShadowClass}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Outlook</CardTitle>
              <OutlookIcon className="h-5 w-5" style={{ color: outlookIconColor }} />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${outlookGradientClass}`}
              >
                {insights.marketOutlook}
              </div>
              <p className="text-xs text-muted-foreground">
                Next update {nextUpdateDistance}
              </p>
            </CardContent>
          </Card>

          {/* Industry Growth */}
          <Card
            className={`bg-transparent border-none backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] shadow-lg ${growthShadowClass}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Industry Growth</CardTitle>
              <GrowthIcon className="h-5 w-5" style={{ color: growthColor }} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${growthGradientClass}`}>
                {insights.growthRate.toFixed(1)}%
              </div>
              <Progress value={insights.growthRate} className="mt-2" />
            </CardContent>
          </Card>

          {/* Demand Level */}
          <Card
            className={`bg-transparent border-none backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] shadow-lg ${demandShadowClass}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
              <BriefcaseIcon className="h-5 w-5" style={{ color: demandColor }} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${demandGradientClass}`}>
                {insights.demandLevel}
              </div>
              <div className={`h-2 w-full rounded-full mt-2 bg-gradient-to-r ${demandGradientClass}`} />
            </CardContent>
          </Card>

          {/* Top Skills */}
          <Card className="bg-transparent border-none backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] shadow-lg shadow-cyan-500/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
              <Brain className="h-5 w-5 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {insights.topSkills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`text-white px-2 py-1 text-sm rounded-full ${
                      index % 2 === 0
                        ? "bg-gradient-to-r from-background to-blue-500"
                        : "bg-gradient-to-r from-background to-cyan-400"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Salary Chart */}
        <Card className="col-span-4 bg-background/60 backdrop-blur-md border-none transition-transform duration-200 hover:scale-[1.01]">
          <CardHeader className="text-center group">
            <CardTitle className="text-2xl font-bold transition-all duration-300">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300">
                Salary
              </span>
              <span className="text-foreground">{" "}Ranges by Role</span>
            </CardTitle>
            <CardDescription>
              Displaying minimum, median, and maximum salaries (in thousands)
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salaryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <XAxis
                    dataKey="name"
                    interval={0}
                    angle={0}
                    textAnchor="middle"
                    tickLine={false}
                    tick={({ x, y, payload }) => {
                      return (
                        <g transform={`translate(${x},${y + 10})`}>
                          <foreignObject
                            x={-60}
                            y={0}
                            width={120}
                            height={50}
                            style={{ overflow: "visible" }}
                          >
                            <div
                              xmlns="http://www.w3.org/1999/xhtml"
                              style={{ 
                                fontSize: "12px",
                                textAlign: "center",
                                wordWrap: "break-word",
                              }}
                            >
                              {payload.value}
                            </div>
                          </foreignObject>
                        </g>
                      );
                    }}
                  />

                  <YAxis
                    tick={{ fill: "#FFFFFF", fontSize: 12 }}
                    tickMargin={5}
                  />

                  <defs>
                    <linearGradient id="minGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#facc15" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                    <linearGradient id="medianGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C6FF00" />
                      <stop offset="100%" stopColor="#facc15" />
                    </linearGradient>
                    <linearGradient id="maxGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16a34a" />
                      <stop offset="100%" stopColor="#C6FF00" />
                    </linearGradient>
                  </defs>

                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.05)" }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded-lg p-2 shadow-md text-sm">
                            <p className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                              {label}
                            </p>
                            {payload.map((item) => {
                              const color = {
                                min: "text-red-500",
                                median: "text-yellow-500",
                                max: "text-green-500",
                              }[item.dataKey] || "text-foreground";
                              return (
                                <p key={item.name} className={`${color}`}>
                                  {item.name}: ${item.value}K
                                </p>
                              );
                            })}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />

                  <Bar dataKey="min" name="Min Salary (K)" fill="url(#minGradient)" />
                  <Bar dataKey="median" name="Median Salary (K)" fill="url(#medianGradient)" />
                  <Bar dataKey="max" name="Max Salary (K)" fill="url(#maxGradient)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Trends & Recommended Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Key Industry Trends */}
          <Card className="bg-transparent border-none backdrop-blur-md transition-transform duration-200 hover:scale-[1.01] shadow-lg shadow-cyan-500/40">
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-300" />
                <CardTitle className="text-sm font-semibold text-cyan-100">
                  <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    Key Industry Trends
                  </span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="h-[200px] overflow-hidden">
                <div className="animate-marquee space-y-2">
                  {insights.keyTrends.concat(insights.keyTrends).map((trend, idx) => (
                    <div
                      key={trend + idx}
                      className="text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full px-3 py-1 w-fit mx-auto hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-sm"
                    >
                      {trend}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Skills */}
          <Card className="bg-transparent border-none backdrop-blur-md transition-transform duration-200 hover:scale-[1.01] shadow-lg shadow-blue-500/40">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-400" />
                <CardTitle className="text-sm font-semibold">
                  <span className="bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent">
                    Recommended Skills
                  </span>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 justify-center">
                {insights.recommendedSkills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`text-sm text-white px-4 py-1.5 rounded-full text-center transition-transform hover:scale-105
                      ${index % 2 !== 0 ? "mt-2 ml-4" : ""}
                      ${index % 2 === 0 ? "bg-gradient-to-r from-cyan-500 to-cyan-600" : "bg-gradient-to-r from-blue-500 to-blue-600"}
                    `}
                    style={{
                      width: "120px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;