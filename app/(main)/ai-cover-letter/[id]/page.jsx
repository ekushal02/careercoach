import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoverLetter, updateCoverLetter } from "@/actions/cover-letter";
import CoverLetterEditor from "../_components/cover-letter-editor";

export default async function EditCoverLetterPage({ params }) {
  const { id } = params;
  const coverLetter = await getCoverLetter(id);

  return (
    <div>
      <div className="grid-background"></div>
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-2">
          <Link href="/ai-cover-letter">
            <Button variant="link" className="gap-2 pl-0">
              <ArrowLeft className="h-4 w-4" />
              Back to Cover Letters
            </Button>
          </Link>

          <h1 className="text-6xl font-bold gradient-title mb-6">
            {coverLetter?.jobTitle} at{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              {coverLetter?.companyName}
            </span>
          </h1>
        </div>

        <CoverLetterEditor id={id} initialContent={coverLetter?.content} />
      </div>
    </div>
  );
}