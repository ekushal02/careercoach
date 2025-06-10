import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Personalized Onboarding",
    description:
      "Tell us about your industry and experience to receive tailored career guidance.",
    icon: <UserPlus className="w-12 h-10 text-cyan-500" />,
  },
  {
    title: "Create Your Documents",
    description:
      "Build ATS-friendly resumes and compelling cover letters effortlessly.",
    icon: <FileEdit className="w-12 h-10 text-cyan-500" />,
  },
  {
    title: "Ace Your Interviews",
    description:
      "Practice with AI-powered mock interviews customized for your target role.",
    icon: <Users className="w-12 h-10 text-cyan-500" />,
  },
  {
    title: "Monitor Your Growth",
    description:
      "Track your progress and get detailed analytics to stay on the right path.",
    icon: <LineChart className="w-12 h-10 text-cyan-500" />,
  },
];
