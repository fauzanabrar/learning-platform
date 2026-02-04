import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { getQuizzes } from "@/lib/learning-data";

export default async function QuizzesPage() {
  const quizzes = await getQuizzes();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
        <p className="text-muted-foreground">Test what you learned and track your scores.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {quizzes.map((quiz) => (
          <Card key={quiz.title}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{quiz.title}</CardTitle>
                <Badge variant="secondary">{quiz.level}</Badge>
              </div>
              <CardDescription>Quick checkpoint after completing the topic.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" />{quiz.questions} questions</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{quiz.time}</span>
              </div>
              <Button className="w-full" asChild>
                <Link href={`/dashboard/quizzes/${quiz.slug}`}>Start quiz</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
