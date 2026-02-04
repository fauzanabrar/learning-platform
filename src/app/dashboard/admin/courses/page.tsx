import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import Link from "next/link";
import { getCoursesWithIds } from "@/lib/learning-data";
import { DeleteCourseButton } from "./delete-course-button";

export default async function AdminCoursesPage() {
  const courses = await getCoursesWithIds();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Manage Courses</h1>
          <p className="text-muted-foreground">Create, edit, and manage learning courses</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/admin/courses/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.slug}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{course.level}</Badge>
                <Badge variant="outline">{course.lessons} lessons</Badge>
                <Badge variant="outline">{course.duration}</Badge>
              </div>

              <div className="text-sm text-muted-foreground">
                <div>Modules: {course.modules.length}</div>
                <div>Quiz: {course.quiz}</div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/dashboard/courses/${course.slug}`}>
                    View Course
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/admin/courses/${course.slug}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteCourseButton courseId={course.id} courseTitle={course.title} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No courses found</p>
            <Button asChild>
              <Link href="/dashboard/admin/courses/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Course
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
