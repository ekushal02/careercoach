import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";

export default function MockInterviewPage() {
  return (
    <div className="bg-transparent">
      <div className="grid-background"></div>

      <div className="container mx-auto space-y-4 py-6 bg-transparent border-none backdrop-blur-md">
        <div className="flex flex-col space-y-2 mx-2 bg-transparent border-none backdrop-blur-md">
          <Link href="/interview">
            <Button variant="link" className="gap-2 pl-0 border-none bg-transparent hover:bg-transparent focus:outline-none focus:ring-0">
              <ArrowLeft className="h-4 w-4" />
              Back to Interview Preparation
            </Button>
          </Link>

          <div className="bg-transparent border-none backdrop-blur-md">
            <h1 className="text-6xl font-bold gradient-title">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Mock
              </span>{" "}
              Interview
            </h1>
            <p className="text-muted-foreground">
              Test your knowledge with industry-specific questions
            </p>
          </div>
        </div>

        <Quiz />
      </div>
    </div>
  );
}
