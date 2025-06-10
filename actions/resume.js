"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    You are a professional resume writer with expertise in creating high-impact, results-oriented descriptions for resumes.

    Evaluate the following content provided by a user for their resume. Your first task is to determine if the content is meaningful, coherent, and relevant to a professional experience, skill, or achievement in the ${user.industry} industry.

    If the content is:
    - Gibberish (e.g., random characters or nonsensical words),
    - Too vague or too short (less than 5 words),
    - Off-topic (not related to job experience, responsibilities, or skills),
    - Incomplete or grammatically broken beyond understanding,

    Then respond ONLY with:  
    **"The input is not a valid description."**

    If the content is valid, improve it by following these guidelines:
    1. Start with a strong action verb.
    2. Make it results-driven and quantifiable — include numbers, metrics, or impact where possible.
    3. Include relevant technical or industry-specific skills.
    4. Make it concise but detailed (no more than 2–3 lines).
    5. Emphasize achievements, not responsibilities.
    6. Use keywords that align with ATS (Applicant Tracking System) best practices.

    Respond ONLY with the improved version of the description, without any extra commentary, explanations, or formatting beyond the paragraph.
      
    Content to assess and improve:  
    "${current}"
    `;



  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();
    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}
