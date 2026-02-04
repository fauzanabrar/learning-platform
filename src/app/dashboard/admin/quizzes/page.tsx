import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import Link from "next/link";
import { getQuizzesWithIds } from "@/lib/learning-data";
import { DeleteQuizButton } from "./delete-quiz-button";

export default async function AdminQuizzesPage() {
  const quizzes = await getQuizzesWithIds();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Manage Quizzes</h1>
          <p className="text-muted-foreground">Create and manage quizzes</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/admin/quizzes/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Quiz
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {quizzes.map((quiz) => (
          <Card key={quiz.slug}>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.questions} questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{quiz.level}</Badge>
                <Badge variant="outline">{quiz.time}</Badge>
              </div>

              <div className="text-sm text-muted-foreground">Topics: {quiz.topics.length}</div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/dashboard/quizzes/${quiz.slug}`}>
                    View Quiz
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/admin/quizzes/${quiz.slug}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteQuizButton quizId={quiz.id} quizTitle={quiz.title} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {quizzes.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No quizzes found</p>
            <Button asChild>
              <Link href="/dashboard/admin/quizzes/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Quiz
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
