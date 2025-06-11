"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";
import { coverLetterSchema } from "@/app/lib/schema";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoverLetterGenerator() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
  });


  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  // Update content when letter is generated
  useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter generated successfully!");
      router.push(`/ai-cover-letter/${generatedLetter.id}`);
      reset();
    }
  }, [generatedLetter]);

  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      toast.error(error.message || "Failed to generate cover letter");
    }
  };

  const watchFields = watch(["companyName", "jobTitle", "jobDescription"]);


  return (
    <div>
      <div className="grid-background"></div>
      <div className="space-y-6">
        <Card className="bg-transparent border-none shadow-none backdrop-blur-md">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Provide information about the position you're applying for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Form fields remain the same */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Enter company name"
                    className={`${watchFields[0] ? "border-cyan-500" : "border-input"} focus:border-cyan-500`}
                    {...register("companyName")}
                  />
                  {errors.companyName && (
                    <p className="text-sm text-red-500">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="Enter job title"
                    className={`${watchFields[1] ? "border-cyan-500" : "border-input"} focus:border-cyan-500`}
                    {...register("jobTitle")}
                  />
                  {errors.jobTitle && (
                    <p className="text-sm text-red-500">
                      {errors.jobTitle.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the job description here"
                  className={`h-32 ${watchFields[2] ? "border-cyan-500" : "border-input"} focus:border-cyan-500`}
                  {...register("jobDescription")}
                />

                {errors.jobDescription && (
                  <p className="text-sm text-red-500">
                    {errors.jobDescription.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={generating}
                  className={`text-white transition-all font-semibold ${
                    generating
                      ? "bg-gradient-to-r from-red-500 to-blue-500"
                      : "bg-gradient-to-r from-red-500 to-blue-500 hover:scale-105"
                  }`}
                >
                  {generating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Cover Letter"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
      
  );
}
