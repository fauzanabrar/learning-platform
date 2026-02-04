"use server";

import { db } from "@/db";
import { quizAttempts, quizQuestions, quizTopics, quizzes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type QuestionData = {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
};

export async function createQuiz(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const level = formData.get("level") as string;
    const time = formData.get("time") as string;
    const topicsJson = formData.get("topics") as string;
    const questionsJson = formData.get("questions") as string;

    if (!title || !slug || !level || !time) {
      return { success: false, error: "Missing required fields" };
    }

    let topicsList: string[] = [];
    let questionsList: QuestionData[] = [];
    
    try {
      topicsList = JSON.parse(topicsJson);
      questionsList = JSON.parse(questionsJson);
    } catch {
      topicsList = [];
      questionsList = [];
    }

    const [quiz] = await db
      .insert(quizzes)
      .values({
        slug,
        title,
        level,
        time,
        questions: questionsList.length,
      })
      .returning();

    if (topicsList.length > 0) {
      await db.insert(quizTopics).values(
        topicsList.map((topicTitle, index) => ({
          quizId: quiz.id,
          title: topicTitle,
          sortOrder: index + 1,
        }))
      );
    }

    if (questionsList.length > 0) {
      await db.insert(quizQuestions).values(
        questionsList.map((q, index) => ({
          quizId: quiz.id,
          question: q.question,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          correctAnswer: q.correctAnswer,
          sortOrder: index + 1,
        }))
      );
    }

    revalidatePath("/dashboard/quizzes");
    revalidatePath("/dashboard/admin/quizzes");

    return { success: true, slug: quiz.slug };
  } catch (error: any) {
    if (error?.code === "23505") {
      return { success: false, error: "A quiz with this slug already exists" };
    }
    return { success: false, error: "Failed to create quiz" };
  }
}

export async function updateQuiz(quizId: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const level = formData.get("level") as string;
    const time = formData.get("time") as string;
    const topicsJson = formData.get("topics") as string;
    const questionsJson = formData.get("questions") as string;

    if (!title || !level || !time) {
      return { success: false, error: "Missing required fields" };
    }

    let topicsList: string[] = [];
    let questionsList: QuestionData[] = [];
    
    try {
      topicsList = JSON.parse(topicsJson);
      questionsList = JSON.parse(questionsJson);
    } catch {
      topicsList = [];
      questionsList = [];
    }

    const quizRows = await db.select().from(quizzes).where(eq(quizzes.id, quizId)).limit(1);
    if (quizRows.length === 0) {
      return { success: false, error: "Quiz not found" };
    }
    const slug = quizRows[0].slug;

    await db
      .update(quizzes)
      .set({ title, level, time, questions: questionsList.length })
      .where(eq(quizzes.id, quizId));

    await db.delete(quizTopics).where(eq(quizTopics.quizId, quizId));
    await db.delete(quizQuestions).where(eq(quizQuestions.quizId, quizId));
    
    if (topicsList.length > 0) {
      await db.insert(quizTopics).values(
        topicsList.map((topicTitle, index) => ({
          quizId,
          title: topicTitle,
          sortOrder: index + 1,
        }))
      );
    }

    if (questionsList.length > 0) {
      await db.insert(quizQuestions).values(
        questionsList.map((q, index) => ({
          quizId,
          question: q.question,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          correctAnswer: q.correctAnswer,
          sortOrder: index + 1,
        }))
      );
    }

    revalidatePath("/dashboard/quizzes");
    revalidatePath("/dashboard/admin/quizzes");

    return { success: true, slug };
  } catch (error: any) {
    return { success: false, error: "Failed to update quiz" };
  }
}

export async function deleteQuiz(quizId: string) {
  try {
    await db.delete(quizzes).where(eq(quizzes.id, quizId));
    revalidatePath("/dashboard/quizzes");
    revalidatePath("/dashboard/admin/quizzes");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Failed to delete quiz" };
  }
}
