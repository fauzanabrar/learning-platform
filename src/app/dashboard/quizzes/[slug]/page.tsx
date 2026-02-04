import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuizBySlug, getLatestQuizAttempt } from "@/lib/learning-data";

export default async function QuizDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = await getQuizBySlug(slug);
  const latestAttempt = await getLatestQuizAttempt(slug);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{quiz.level}</Badge>
          <Badge variant="outline">{quiz.questions} questions</Badge>
          <Badge variant="outline">{quiz.time}</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{quiz.title}</h1>
        <p className="text-muted-foreground">Review the topics and start when you are ready.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quiz preview</CardTitle>
            <CardDescription>Sample topics covered in this assessment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quiz.topics.map((topic) => (
              <div key={topic} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{topic}</span>
                </div>
                <span className="text-xs text-muted-foreground">2-4 questions</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ready to begin?</CardTitle>
            <CardDescription>Keep your focus for the full session.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> Estimated time: {quiz.time}
            </div>
            <Button asChild className="w-full">
              <Link href={`/dashboard/quizzes/${slug}/take`}>
                Start quiz
              </Link>
            </Button>
            {latestAttempt && (
              <p className="text-xs text-muted-foreground">
                Last score: {latestAttempt.percentage}%
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
