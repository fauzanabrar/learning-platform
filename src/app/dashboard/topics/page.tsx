import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, LayoutList } from "lucide-react";
import Link from "next/link";
import { getTopics } from "@/lib/learning-data";

export default async function TopicsPage() {
  const topics = await getTopics();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Topics</h1>
        <p className="text-muted-foreground">Pick a topic to explore related video series and quizzes.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {topics.map((topic) => (
          <Card key={topic.title}>
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{topic.title}</CardTitle>
              </div>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><BookOpen className="h-3 w-3" />{topic.lessons} lessons</span>
                <span className="inline-flex items-center gap-1"><LayoutList className="h-3 w-3" />3 series</span>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/topics/${topic.slug}`}>Explore</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
