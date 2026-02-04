import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { quizAttempts, quizQuestions, quizzes } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const slug = formData.get("slug") as string;
    const answersJson = formData.get("answers") as string;
    const answers = JSON.parse(answersJson) as Record<string, string>;

    // Get quiz
    const quizRows = await db.select().from(quizzes).where(eq(quizzes.slug, slug)).limit(1);
    if (quizRows.length === 0) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }
    const quiz = quizRows[0];

    // Get all questions with correct answers
    const questions = await db
      .select()
      .from(quizQuestions)
      .where(eq(quizQuestions.quizId, quiz.id));

    // Calculate score
    let correctCount = 0;
    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctCount++;
      }
    });

    const totalQuestions = questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    // Save attempt
    const [attempt] = await db
      .insert(quizAttempts)
      .values({
        quizId: quiz.id,
        score: correctCount,
        totalQuestions,
        percentage,
      })
      .returning();

    return NextResponse.json({ 
      attemptId: attempt.id,
      score: correctCount,
      totalQuestions,
      percentage,
    });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json({ error: "Failed to submit quiz" }, { status: 500 });
  }
}
