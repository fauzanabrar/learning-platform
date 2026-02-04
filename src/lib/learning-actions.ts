"use server";

import { db } from "@/db";
import { courses, courseModules } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function completeLesson(formData: FormData) {
  const slug = formData.get("slug")?.toString();
  const lessonIndexRaw = formData.get("lessonIndex")?.toString();

  if (!slug || lessonIndexRaw === undefined) {
    return;
  }

  const lessonIndex = Number(lessonIndexRaw);
  if (Number.isNaN(lessonIndex) || lessonIndex < 0) {
    return;
  }

  const courseRows = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1);
  if (courseRows.length === 0) {
    return;
  }

  const [course] = courseRows;
  const moduleRows = await db
    .select()
    .from(courseModules)
    .where(eq(courseModules.courseId, course.id));

  const totalLessons = moduleRows.length || course.lessons || 1;
  const completedLessons = Math.min(totalLessons, Math.max(1, lessonIndex + 1));
  const progress = Math.min(100, Math.round((completedLessons / totalLessons) * 100));

  await db
    .update(courses)
    .set({ progress })
    .where(eq(courses.id, course.id));

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/courses");
  revalidatePath(`/dashboard/courses/${slug}`);
  revalidatePath(`/dashboard/courses/${slug}/lessons/${lessonIndex + 1}`);

  redirect(`/dashboard/courses/${slug}`);
}
