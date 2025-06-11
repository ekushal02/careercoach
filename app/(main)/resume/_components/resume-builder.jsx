"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>

<div align="center">
${parts.join(" | ")}
</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("resume-pdf");
      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async () => {
    try {
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  // Utility to conditionally add blue border when field has value
  const inputClass = (value) =>
    value ? "border-2 border-cyan-400 focus:border-blue-500" : "";

  return (
    <div>
      <div className="grid-background"></div>
      <div data-color-mode="light" className="space-y-4 p-4">
        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <h1 className="font-bold text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              Resume
            </span>{" "}
            Builder
          </h1>
          <div className="space-x-2 flex flex-wrap">
            <Button
              variant="destructive"
              onClick={handleSubmit(onSubmit)}
              disabled={isSaving}
              className="transition transform hover:scale-105 active:scale-95 focus:ring-2 focus:ring-cyan-400"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save
                </>
              )}
            </Button>

            <Button
              onClick={generatePDF}
              disabled={isGenerating}
              className={`transition transform hover:scale-105 active:scale-95 ${
                isGenerating
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
                  : "bg-white text-black"
              } hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:text-white`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Downloading PDF...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger
              value="edit"
              className="border-none ring-0 outline-none data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              Form
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="border-none ring-0 outline-none data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              Markdown
            </TabsTrigger>
          </TabsList>

          {/* Edit Tab */}
          <TabsContent value="edit">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/** Contact Info */}
              <div className="bg-transparent backdrop-blur-md space-y-1 p-4 rounded-lg">
                <h3 className="text-lg font-medium">Contact{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                    Information
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["email", "mobile", "linkedin", "twitter"].map((field, idx) => {
                    const placeholder = {
                      email: "your@email.com",
                      mobile: "+1 234 567 8900",
                      linkedin: "https://linkedin.com/in/your-profile",
                      twitter: "https://twitter.com/your-handle",
                    }[field];
                    const type = field === "email" ? "email" : field === "mobile" ? "tel" : "url";
                    const iconColor = { linkedin: "💼", twitter: "🐦" };
                    return (
                      <div key={field} className="space-y-2">
                        <label className="text-sm font-medium">
                          {idx === 0 ? "Email" : idx === 1 ? "Mobile Number" : idx === 2 ? "LinkedIn URL" : "Twitter/X Profile"}
                        </label>
                        <Input
                          {...register(`contactInfo.${field}`)}
                          type={type}
                          placeholder={placeholder}
                          className={inputClass(watch(`contactInfo.${field}`))}
                        />
                        {errors.contactInfo?.[field] && (
                          <p className="text-sm text-red-500">
                            {errors.contactInfo[field].message}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/** Professional Summary */}
              <div className="bg-transparent backdrop-blur-md space-y-4 p-4 rounded-lg">
                <h3 className="text-lg font-medium">  
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                    Professional
                  </span>{" "}
                  Summary
                </h3>
                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className={`h-32 ${inputClass(field.value)}`}
                      placeholder="Write a compelling professional summary..."
                      error={errors.summary}
                    />
                  )}
                />
                {errors.summary && (
                  <p className="text-sm text-red-500">{errors.summary.message}</p>
                )}
              </div>

              {/** Skills */}
              <div className="bg-transparent backdrop-blur-md space-y-4 p-4 rounded-lg">
                <h3 className="text-lg font-medium">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                    Skills
                  </span>
                </h3>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className={`h-32 ${inputClass(field.value)}`}
                      placeholder="List your key skills..."
                      error={errors.skills}
                    />
                  )}
                />
                {errors.skills && (
                  <p className="text-sm text-red-500">{errors.skills.message}</p>
                )}
              </div>

              {/** Experience */}
              <div className="bg-transparent backdrop-blur-md space-y-4 p-4 rounded-lg">
                <h3 className="text-lg font-medium">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                    Work
                  </span>{" "}
                  Experience
                </h3>
                <Controller
                  name="experience"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Experience"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.experience && (
                  <p className="text-sm text-red-500">{errors.experience.message}</p>
                )}
              </div>

              {/** Education */}
              <div className="bg-transparent backdrop-blur-md space-y-4 p-4 rounded-lg">
                <h3 className="text-lg font-medium">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                    Education
                  </span>
                </h3>
                <Controller
                  name="education"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Education"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.education && (
                  <p className="text-sm text-red-500">{errors.education.message}</p>
                )}
              </div>

              {/** Projects */}
              <div className="bg-transparent backdrop-blur-md space-y-4 p-4 rounded-lg">
                <h3 className="text-lg font-medium">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                    Projects
                  </span>
                </h3>
                <Controller
                  name="projects"
                  control={control}
                  render={({ field }) => (
                    <EntryForm
                      type="Project"
                      entries={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.projects && (
                  <p className="text-sm text-red-500">{errors.projects.message}</p>
                )}
              </div>
            </form>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            {activeTab === "preview" && (
              <Button
                variant="link"
                type="button"
                className="mb-2"
                onClick={() =>
                  setResumeMode(resumeMode === "preview" ? "edit" : "preview")
                }
              >
                {resumeMode === "preview" ? (
                  <>
                    <Edit className="h-4 w-4" />
                    Edit Resume
                  </>
                ) : (
                  <>
                    <Monitor className="h-4 w-4" />
                    Show Preview
                  </>
                )}
              </Button>
            )}
            {activeTab === "preview" && resumeMode !== "preview" && (
              <div className="flex p-3 gap-2 items-center border-2 border-red-500 text-red-400 rounded mb-2">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">
                  You will lose edited markdown if you update the form data.
                </span>
              </div>
            )}
            <div className="border rounded-lg">
              <MDEditor
                value={previewContent}
                onChange={setPreviewContent}
                height={800}
                preview={resumeMode}
              />
            </div>

            <div className="hidden">
              <div id="resume-pdf">
                <MDEditor.Markdown
                  source={previewContent}
                  style={{ background: "white", color: "black" }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
