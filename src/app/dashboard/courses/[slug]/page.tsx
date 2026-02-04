import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, PlayCircle, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseBySlug } from "@/lib/learning-data";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const totalModules = course.modules.length || course.lessons || 1;
  const completedModules = Math.min(
    totalModules,
    Math.max(0, Math.round((course.progress / 100) * totalModules))
  );
  const nextLessonIndex = Math.min(totalModules - 1, completedModules);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{course.level}</Badge>
          <Badge variant="outline">{course.lessons} lessons</Badge>
          <Badge variant="outline">{course.duration}</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
        <p className="text-muted-foreground max-w-2xl">{course.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Course outline</CardTitle>
            <CardDescription>Follow the modules in order to complete the series.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {course.modules.map((module, index) => (
              <div key={module} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{module}</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/courses/${course.slug}/lessons/${index + 1}`}>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Watch
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your progress</CardTitle>
            <CardDescription>Stay consistent to complete the course.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completed</span>
              <span className="font-semibold">{course.progress}%</span>
            </div>
            <Progress value={course.progress} />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <BookOpen className="h-3 w-3" /> {completedModules} / {totalModules} lessons
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {course.duration} total
            </div>
            <Button className="w-full" asChild>
              <Link href={`/dashboard/courses/${course.slug}/lessons/${nextLessonIndex + 1}`}>
                Resume lesson
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Checkpoint quiz</CardTitle>
          <CardDescription>Test retention after completing the modules.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" /> 10-16 questions · 12-18 min
          </div>
          <Button asChild>
            <Link href={`/dashboard/quizzes/${course.quiz}`}>Start quiz</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
