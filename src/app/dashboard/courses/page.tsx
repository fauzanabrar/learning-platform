import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { getCourses } from "@/lib/learning-data";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">Follow curated courses and keep track of your progress.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.title}>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <Badge variant="secondary">{course.level}</Badge>
              </div>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><BookOpen className="h-3 w-3" />{course.lessons} lessons</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>
              <Button className="w-full" asChild>
                <Link href={`/dashboard/courses/${course.slug}`}>Continue course</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
