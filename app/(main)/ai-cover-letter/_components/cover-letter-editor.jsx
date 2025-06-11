"use client";

import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { updateCoverLetter } from "@/actions/cover-letter";
import { toast } from "sonner";

const CoverLetterEditor = ({ id, initialContent }) => {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateCoverLetter(id, content);
      toast.success("Cover letter saved successfully!");
    } catch (error) {
      toast.error("Failed to save changes.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4 space-y-4">
      <MDEditor value={content} onChange={setContent} height={700} />
      <Button
        onClick={handleSave}
        disabled={loading}
        className={`gap-2 text-white transition-all duration-300 ${
          loading
            ? "bg-gradient-to-r from-background to-green-500"
            : "bg-gradient-to-r from-background to-blue-500 hover:from-cyan-400 hover:to-background"
        }`}
      >
        <Save className="w-4 h-4" />
        {loading ? "Saving..." : "Save Changes"}
      </Button>

    </div>
  );
};

export default CoverLetterEditor;
