import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ListVideo, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTopicBySlug } from "@/lib/learning-data";

export default async function TopicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Badge variant="outline">{topic.lessons} lessons</Badge>
        <h1 className="text-3xl font-bold tracking-tight">{topic.title}</h1>
        <p className="text-muted-foreground max-w-2xl">{topic.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Video series</CardTitle>
            <CardDescription>Learn with guided playlists.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topic.series.map((item) => (
              <div key={item.slug} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm font-medium">{item.title}</span>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/dashboard/videos/${item.slug}`}>
                    <ListVideo className="mr-2 h-4 w-4" />
                    Watch
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Courses</CardTitle>
            <CardDescription>Deep dives for the topic.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topic.courses.map((item) => (
              <div key={item.slug} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm font-medium">{item.title}</span>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/dashboard/courses/${item.slug}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Open
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quizzes</CardTitle>
            <CardDescription>Check retention after learning.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topic.quizzes.map((item) => (
              <div key={item.slug} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm font-medium">{item.title}</span>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/dashboard/quizzes/${item.slug}`}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Start
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
