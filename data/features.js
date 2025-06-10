import {
  BrainCircuit,
  Briefcase,
  LineChart,
  ScrollText,
} from "lucide-react";

export const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 mb-4 text-cyan-500" />,
    title: "Smart Career Navigator",
    description:
      "Leverage AI-driven insights to discover the right career paths tailored to your strengths and goals.",
  },
  {
    icon: <Briefcase className="w-10 h-10 mb-4 text-cyan-500" />,
    title: "AI Mock Interviews",
    description:
      "Simulate real interview scenarios with intelligent feedback to boost your confidence and readiness.",
  },
  {
    icon: <LineChart className="w-10 h-10 mb-4 text-cyan-500" />,
    title: "Live Job Market Pulse",
    description:
      "Access real-time analytics on job trends, top roles, and evolving skills across industries.",
  },
  {
    icon: <ScrollText className="w-10 h-10 mb-4 text-cyan-500" />,
    title: "AI Resume Builder",
    description:
      "Craft sleek, ATS-friendly resumes backed by AI suggestions tailored to your target roles.",
  },
];
