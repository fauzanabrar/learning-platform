"use server";

import { db } from "@/db";
import { courseModules, courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createCourse(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const level = formData.get("level") as string;
    const duration = formData.get("duration") as string;
    const lessons = parseInt(formData.get("lessons") as string);
    const quizSlug = (formData.get("quizSlug") as string) || "";
    const modulesJson = formData.get("modules") as string;

    // Validate required fields
    if (!title || !slug || !description || !level || !duration || !lessons) {
      return { success: false, error: "Missing required fields" };
    }

    // Parse modules
    let modulesList: string[] = [];
    try {
      modulesList = JSON.parse(modulesJson);
    } catch {
      modulesList = [];
    }

    // Create course
    const [course] = await db
      .insert(courses)
      .values({
        slug,
        title,
        description,
        lessons,
        duration,
        level,
        progress: 0,
        quizSlug: quizSlug || "react-basics", // Default quiz
      })
      .returning();

    // Create modules if any
    if (modulesList.length > 0) {
      await db.insert(courseModules).values(
        modulesList.map((moduleTitle, index) => ({
          courseId: course.id,
          title: moduleTitle,
          sortOrder: index + 1,
        }))
      );
    }

    revalidatePath("/dashboard/courses");
    revalidatePath("/dashboard/admin/courses");
    revalidatePath(`/dashboard/courses/${slug}`);

    return { success: true, slug: course.slug };
  } catch (error: any) {
    console.error("Error creating course:", error);
    
    // Check for duplicate slug error
    if (error?.code === "23505" && error?.constraint_name === "courses_slug_unique") {
      return { success: false, error: "A course with this slug already exists" };
    }

    return { success: false, error: "Failed to create course" };
  }
}

export async function updateCourse(courseId: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const level = formData.get("level") as string;
    const duration = formData.get("duration") as string;
    const lessons = parseInt(formData.get("lessons") as string);
    const quizSlug = (formData.get("quizSlug") as string) || "";
    const modulesJson = formData.get("modules") as string;

    // Validate required fields
    if (!title || !description || !level || !duration || !lessons) {
      return { success: false, error: "Missing required fields" };
    }

    // Parse modules
    let modulesList: string[] = [];
    try {
      modulesList = JSON.parse(modulesJson);
    } catch {
      modulesList = [];
    }

    // Get course slug before update
    const courseRows = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
    if (courseRows.length === 0) {
      return { success: false, error: "Course not found" };
    }
    const slug = courseRows[0].slug;

    // Update course
    await db
      .update(courses)
      .set({
        title,
        description,
        lessons,
        duration,
        level,
        quizSlug: quizSlug || "react-basics",
      })
      .where(eq(courses.id, courseId));

    // Delete existing modules and create new ones
    await db.delete(courseModules).where(eq(courseModules.courseId, courseId));
    
    if (modulesList.length > 0) {
      await db.insert(courseModules).values(
        modulesList.map((moduleTitle, index) => ({
          courseId,
          title: moduleTitle,
          sortOrder: index + 1,
        }))
      );
    }

    revalidatePath("/dashboard/courses");
    revalidatePath("/dashboard/admin/courses");
    revalidatePath(`/dashboard/courses/${slug}`);

    return { success: true, slug };
  } catch (error: any) {
    console.error("Error updating course:", error);
    return { success: false, error: "Failed to update course" };
  }
}

export async function deleteCourse(courseId: string) {
  try {
    // Get course slug before delete for revalidation
    const courseRows = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
    if (courseRows.length === 0) {
      return { success: false, error: "Course not found" };
    }
    const slug = courseRows[0].slug;

    // Delete course (modules will cascade delete)
    await db.delete(courses).where(eq(courses.id, courseId));

    revalidatePath("/dashboard/courses");
    revalidatePath("/dashboard/admin/courses");
    revalidatePath(`/dashboard/courses/${slug}`);

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting course:", error);
    return { success: false, error: "Failed to delete course" };
  }
}
