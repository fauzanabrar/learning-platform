import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BookOpen, CheckCircle2, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { getCourseBySlug } from "@/lib/learning-data";
import { completeLesson } from "@/lib/learning-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug, lesson } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const lessonIndex = Number(lesson) - 1;
  const totalLessons = course.modules.length || course.lessons || 1;

  if (Number.isNaN(lessonIndex) || lessonIndex < 0 || lessonIndex >= totalLessons) {
    redirect(`/dashboard/courses/${slug}`);
  }

  const moduleTitle = course.modules[lessonIndex] ?? `Lesson ${lesson}`;
  const nextLesson = lessonIndex + 1 < totalLessons ? lessonIndex + 2 : null;
  const prevLesson = lessonIndex > 0 ? lessonIndex : null;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <BookOpen className="h-3 w-3" />
          <span>{course.title}</span>
          <span>•</span>
          <span>Lesson {lesson}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{moduleTitle}</h1>
        <p className="text-muted-foreground">Watch the lesson and mark it complete to update your progress.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson player</CardTitle>
          <CardDescription>Video placeholder for {moduleTitle}.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full rounded-xl bg-muted flex items-center justify-center">
            <PlayCircle className="h-12 w-12 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lesson notes</CardTitle>
          <CardDescription>Key points and takeaways.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Review the core concepts highlighted in this lesson.</p>
          <p>• Apply them in a small exercise right after the video.</p>
          <p>• Note any questions to revisit during the quiz.</p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        {prevLesson ? (
          <Button variant="outline" asChild>
            <Link href={`/dashboard/courses/${slug}/lessons/${prevLesson}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous lesson
            </Link>
          </Button>
        ) : (
          <Button variant="outline" asChild>
            <Link href={`/dashboard/courses/${slug}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to course
            </Link>
          </Button>
        )}

        <form action={completeLesson}>
          <input type="hidden" name="slug" value={slug} />
          <input type="hidden" name="lessonIndex" value={lessonIndex} />
          <Button type="submit">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Mark complete
          </Button>
        </form>

        {nextLesson ? (
          <Button variant="ghost" asChild>
            <Link href={`/dashboard/courses/${slug}/lessons/${nextLesson}`}>
              Next lesson
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="ghost" asChild>
            <Link href={`/dashboard/courses/${slug}`}>
              Finish course
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
