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
        color: "#22c55e", // green
        gradientClass: "bg-gradient-to-r from-green-300 to-green-800",
      };
    } else if (rate >= 10) {
      return {
        icon: LineChart,
        color: "#eab308", // yellow
        gradientClass: "bg-gradient-to-r from-yellow-300 to-yellow-800",
      };
    } else {
      return {
        icon: TrendingDown,
        color: "#ef4444", // red
        gradientClass: "bg-gradient-to-r from-red-300 to-red-800",
      };
    }
  };


  const getDemandLevelInfo = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return {
          color: "#22c55e", // green
          gradientClass: "bg-gradient-to-r from-green-300 to-green-800",
        };
      case "medium":
        return {
          color: "#eab308", // yellow
          gradientClass: "bg-gradient-to-r from-yellow-300 to-yellow-800",
        };
      case "low":
        return {
          color: "#ef4444", // red
          gradientClass: "bg-gradient-to-r from-red-300 to-red-800",
        };
      default:
        return {
          color: "#6b7280", // gray
          gradientClass: "bg-gradient-to-r from-gray-300 to-gray-800",
        };
    }
  };


  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return {
          icon: TrendingUp,
          color: "#22c55e", // green-500
          gradientClass: "bg-gradient-to-r from-green-300 to-green-800",
        };
      case "neutral":
        return {
          icon: LineChart,
          color: "#eab308", // yellow-500
          gradientClass: "bg-gradient-to-r from-yellow-300 to-yellow-800",
        };
      case "negative":
        return {
          icon: TrendingDown,
          color: "#ef4444", // red-500
          gradientClass: "bg-gradient-to-r from-red-300 to-red-800",
        };
      default:
        return {
          icon: LineChart,
          color: "#6b7280", // gray-500
          gradientClass: "bg-gradient-to-r from-gray-300 to-gray-800",
        };
    }
  };


  const {
    icon: OutlookIcon,
    color: outlookIconColor,
    gradientClass: outlookGradientClass,
  } = getMarketOutlookInfo(insights.marketOutlook);
  const {
    icon: GrowthIcon,
    color: growthColor,
    gradientClass: growthGradientClass,
  } = getGrowthRateColorInfo(insights.growthRate);
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true });
  const {
    color: demandColor,
    gradientClass: demandGradientClass,
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
            className="bg-transparent backdrop-blur-md transition-transform duration-200 hover:scale-[1.02]"
            style={{
              boxShadow: `0 0 12px 0 ${outlookIconColor}`,
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 24px 4px ${outlookIconColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 12px 0 ${outlookIconColor}`;
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Outlook</CardTitle>
              <OutlookIcon className="h-4 w-4" style={{ color: outlookIconColor }} />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold bg-clip-text text-transparent ${outlookGradientClass}`}
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
            className="bg-transparent backdrop-blur-md transition-transform duration-200 hover:scale-[1.02]"
            style={{
              boxShadow: `0 0 12px 0 ${growthColor}`,
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 24px 4px ${growthColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 12px 0 ${growthColor}`;
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Industry Growth</CardTitle>
              <GrowthIcon className="h-4 w-4" style={{ color: growthColor }} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold bg-clip-text text-transparent ${growthGradientClass}`}>
                {insights.growthRate.toFixed(1)}%
              </div>
              <Progress value={insights.growthRate} className="mt-2" />
            </CardContent>
          </Card>

          {/* Demand Level */}
          <Card
            className="bg-transparent backdrop-blur-md transition-transform duration-200 hover:scale-[1.02]"
            style={{
              boxShadow: `0 0 12px 0 ${demandColor}`,
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 24px 4px ${demandColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 12px 0 ${demandColor}`;
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
              <BriefcaseIcon className="h-4 w-4" style={{ color: demandColor }} />
            </CardHeader>
            <CardContent>
              <br />
              <div className={`text-2xl font-bold bg-clip-text text-transparent ${demandGradientClass}`}>
                {insights.demandLevel}
              </div>
              <div className={`h-2 w-full rounded-full mt-2 ${getDemandLevelInfo(insights.demandLevel)}`} />
            </CardContent>
          </Card>

          {/* Top Skills */}
          <Card
            className="bg-transparent backdrop-blur-md transition-transform duration-200 hover:scale-[1.02]"
            style={{
              boxShadow: `0 0 12px 0 #22d3ee`, // cyan-400
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 24px 4px #22d3ee`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 12px 0 #22d3ee`;
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
              <Brain className="h-4 w-4" style={{ color: "#22d3ee" }} />
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
        <Card className="col-span-4 bg-background/60 backdrop-blur-md border-none">
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
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}

                  {/* X-Axis with word wrap + upright orientation */}
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

                  {/* Y-Axis with spacing and color */}
                  <YAxis
                    tick={{ fill: "#FFFFFF", fontSize: 12 }}
                    tickMargin={5}
                  />

                  {/* Gradient definitions */}
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

                  {/* Bars */}
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
          <Card className="bg-transparent shadow-none backdrop-blur-md transition-transform duration-200 hover:scale-[1.01]">
            {/* <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 animate-pulse" /> */}
            <CardHeader className="relative z-10">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cyan-300" />
                <CardTitle className="text-sm font-semibold text-cyan-100">Key Industry Trends</CardTitle>
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
          <Card className="bg-transparent shadow-none backdrop-blur-md transition-transform duration-200 hover:scale-[1.01]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-cyan-400" />
                <CardTitle className="text-sm font-semibold text-foreground">Recommended Skills</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 justify-center">
                {insights.recommendedSkills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`text-sm text-white px-4 py-1.5 rounded-full text-center transition-transform hover:scale-105
                      ${index % 2 !== 0 ? "mt-2 ml-4" : ""}
                      ${index % 2 === 0 ? "bg-cyan-500" : "bg-blue-500"}
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
