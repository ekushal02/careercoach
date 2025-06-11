import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div>
      <div className="grid-background"></div>
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">
          My {" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            Cover
          </span>{" "}  Letters
        </h1>
        <Link href="/ai-cover-letter/new">
          <Button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:scale-105 transition-transform">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}
