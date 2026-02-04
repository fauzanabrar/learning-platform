import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import Link from "next/link";
import { getTopicsWithIds } from "@/lib/learning-data";
import { DeleteTopicButton } from "./delete-topic-button";

export default async function AdminTopicsPage() {
  const topics = await getTopicsWithIds();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Manage Topics</h1>
          <p className="text-muted-foreground">Create and manage learning topics</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/admin/topics/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Topic
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {topics.map((topic) => (
          <Card key={topic.slug}>
            <CardHeader>
              <CardTitle>{topic.title}</CardTitle>
              <CardDescription className="line-clamp-2">{topic.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{topic.lessons} lessons</Badge>
                <Badge variant="outline">{topic.seriesCount} series</Badge>
                <Badge variant="outline">{topic.coursesCount} courses</Badge>
                <Badge variant="outline">{topic.quizzesCount} quizzes</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/dashboard/topics/${topic.slug}`}>
                    View Topic
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/admin/topics/${topic.slug}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteTopicButton topicId={topic.id} topicTitle={topic.title} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {topics.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No topics found</p>
            <Button asChild>
              <Link href="/dashboard/admin/topics/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Topic
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}