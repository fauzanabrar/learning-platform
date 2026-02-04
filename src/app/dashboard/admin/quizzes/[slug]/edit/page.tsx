import { notFound } from "next/navigation";
import { getQuizAdminBySlug } from "@/lib/learning-data";
import QuizEditForm from "./quiz-edit-form";

export default async function EditQuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = await getQuizAdminBySlug(slug);

  if (!quiz) {
    notFound();
  }

  return <QuizEditForm quiz={quiz} />;
}