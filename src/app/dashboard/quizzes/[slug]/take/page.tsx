import { notFound } from "next/navigation";
import { getQuizWithQuestions } from "@/lib/learning-data";
import QuizTakeClient from "./quiz-take-client";

export default async function QuizTakePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = await getQuizWithQuestions(slug);

  if (!quiz) {
    notFound();
  }

  return <QuizTakeClient quiz={quiz} />;
}

