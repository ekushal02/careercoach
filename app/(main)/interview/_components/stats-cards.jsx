import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[assessments.length - 1]; // last item = latest test
  };


  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  const score = parseFloat(getAverageScore());

  const getColorConfig = (value) => {
    if (value <= 40) {
      return {
        gradient: "from-red-500 to-pink-500",
        shadow: "shadow-red-500/40",
        icon: "text-red-500",
      };
    } else if (value <= 75) {
      return {
        gradient: "from-yellow-400 to-yellow-600",
        shadow: "shadow-yellow-500/40",
        icon: "text-yellow-500",
      };
    } else {
      return {
        gradient: "from-green-400 to-green-600",
        shadow: "shadow-green-500/40",
        icon: "text-green-500",
      };
    }
  };

  const averageConfig = getColorConfig(score);
  const latestScore = getLatestAssessment()?.quizScore || 0;
  const latestConfig = getColorConfig(latestScore);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Average Score Card */}
      <Card
        className={`bg-transparent border-none backdrop-blur-md transition-transform duration-200 hover:scale-105 shadow-lg ${averageConfig.shadow}`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <Trophy className={`h-5 w-5 ${averageConfig.icon}`} />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${averageConfig.gradient}`}
          >
            {score}%
          </div>
          <p className="text-xs text-muted-foreground">Across all assessments</p>
        </CardContent>
      </Card>

      {/* Total Questions Card */}
      <Card className="bg-transparent border-none backdrop-blur-md transition-transform duration-200 hover:scale-105 shadow-lg shadow-cyan-500/40">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Questions Practiced</CardTitle>
          <Brain className="h-5 w-5 text-cyan-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cyan-500">
            {getTotalQuestions()}
          </div>
          <p className="text-xs text-muted-foreground">Total questions</p>
        </CardContent>
      </Card>

      {/* Latest Score Card */}
      <Card
        className={`bg-transparent border-none backdrop-blur-md transition-transform duration-200 hover:scale-105 shadow-lg ${latestConfig.shadow}`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
          <Target className={`h-5 w-5 ${latestConfig.icon}`} />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${latestConfig.gradient}`}
          >
            {latestScore.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
}
