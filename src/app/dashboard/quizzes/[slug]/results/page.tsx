import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Trophy, RotateCw } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { quizAttempts, quizzes } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function QuizResultsPage({ 
  params,
  searchParams,
}: { 
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ attemptId?: string }>;
}) {
  const { slug } = await params;
  const { attemptId } = await searchParams;

  if (!attemptId) {
    notFound();
  }

  // Get attempt details
  const attemptRows = await db
    .select()
    .from(quizAttempts)
    .where(eq(quizAttempts.id, attemptId))
    .limit(1);

  if (attemptRows.length === 0) {
    notFound();
  }

  const attempt = attemptRows[0];

  // Get quiz details
  const quizRows = await db
    .select()
    .from(quizzes)
    .where(eq(quizzes.id, attempt.quizId))
    .limit(1);

  if (quizRows.length === 0) {
    notFound();
  }

  const quiz = quizRows[0];

  const isPassing = attempt.percentage >= 70;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-3 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          {isPassing ? (
            <Trophy className="h-10 w-10 text-primary" />
          ) : (
            <RotateCw className="h-10 w-10 text-muted-foreground" />
          )}
        </div>
        <h1 className="text-3xl font-bold">
          {isPassing ? "Great Job!" : "Keep Practicing!"}
        </h1>
        <p className="text-muted-foreground">
          You completed the {quiz.title} quiz
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Score</CardTitle>
          <CardDescription>Quiz performance summary</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold">{attempt.percentage}%</div>
              <div className="text-sm text-muted-foreground">
                {attempt.score} out of {attempt.totalQuestions} correct
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{attempt.score}</div>
                <div className="text-xs text-muted-foreground">Correct answers</div>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{attempt.totalQuestions - attempt.score}</div>
                <div className="text-xs text-muted-foreground">Incorrect answers</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Badge variant={isPassing ? "default" : "secondary"}>
              {isPassing ? "Passed" : "Not Passed"} - {isPassing ? "70%+ required" : "Need 70% to pass"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/dashboard/quizzes/${slug}`}>
            Back to Quiz
          </Link>
        </Button>
        <Button asChild className="flex-1">
          <Link href={`/dashboard/quizzes/${slug}/take`}>
            <RotateCw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Link>
        </Button>
      </div>
    </div>
  );
}
