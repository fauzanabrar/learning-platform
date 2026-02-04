import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/learning-data";
import CourseEditForm from "./course-edit-form";

export default async function EditCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseEditForm course={course} />;
}
