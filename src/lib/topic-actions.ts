"use server";

import { db } from "@/db";
import { courses, quizzes, topicCourses, topicQuizzes, topicSeries, topics, videoSeries } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function parseJsonArray(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string" && item.trim() !== "") : [];
  } catch {
    return [];
  }
}

export async function createTopic(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const lessons = parseInt(formData.get("lessons") as string);

    if (!title || !slug || !description || !lessons) {
      return { success: false, error: "Missing required fields" };
    }

    const seriesSlugs = parseJsonArray(formData.get("seriesSlugs"));
    const courseSlugs = parseJsonArray(formData.get("courseSlugs"));
    const quizSlugs = parseJsonArray(formData.get("quizSlugs"));

    const [topic] = await db
      .insert(topics)
      .values({
        slug,
        title,
        description,
        lessons,
      })
      .returning();

    const [seriesRows, courseRows, quizRows] = await Promise.all([
      seriesSlugs.length ? db.select().from(videoSeries).where(inArray(videoSeries.slug, seriesSlugs)) : [],
      courseSlugs.length ? db.select().from(courses).where(inArray(courses.slug, courseSlugs)) : [],
      quizSlugs.length ? db.select().from(quizzes).where(inArray(quizzes.slug, quizSlugs)) : [],
    ]);

    if (seriesRows.length) {
      await db.insert(topicSeries).values(seriesRows.map((row) => ({ topicId: topic.id, seriesId: row.id })));
    }
    if (courseRows.length) {
      await db.insert(topicCourses).values(courseRows.map((row) => ({ topicId: topic.id, courseId: row.id })));
    }
    if (quizRows.length) {
      await db.insert(topicQuizzes).values(quizRows.map((row) => ({ topicId: topic.id, quizId: row.id })));
    }

    revalidatePath("/dashboard/topics");
    revalidatePath("/dashboard/admin/topics");

    return { success: true, slug: topic.slug };
  } catch (error: any) {
    if (error?.code === "23505") {
      return { success: false, error: "A topic with this slug already exists" };
    }
    return { success: false, error: "Failed to create topic" };
  }
}

export async function updateTopic(topicId: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const lessons = parseInt(formData.get("lessons") as string);

    if (!title || !description || !lessons) {
      return { success: false, error: "Missing required fields" };
    }

    const seriesSlugs = parseJsonArray(formData.get("seriesSlugs"));
    const courseSlugs = parseJsonArray(formData.get("courseSlugs"));
    const quizSlugs = parseJsonArray(formData.get("quizSlugs"));

    const topicRows = await db.select().from(topics).where(eq(topics.id, topicId)).limit(1);
    if (topicRows.length === 0) {
      return { success: false, error: "Topic not found" };
    }

    await db.update(topics).set({ title, description, lessons }).where(eq(topics.id, topicId));

    await Promise.all([
      db.delete(topicSeries).where(eq(topicSeries.topicId, topicId)),
      db.delete(topicCourses).where(eq(topicCourses.topicId, topicId)),
      db.delete(topicQuizzes).where(eq(topicQuizzes.topicId, topicId)),
    ]);

    const [seriesRows, courseRows, quizRows] = await Promise.all([
      seriesSlugs.length ? db.select().from(videoSeries).where(inArray(videoSeries.slug, seriesSlugs)) : [],
      courseSlugs.length ? db.select().from(courses).where(inArray(courses.slug, courseSlugs)) : [],
      quizSlugs.length ? db.select().from(quizzes).where(inArray(quizzes.slug, quizSlugs)) : [],
    ]);

    if (seriesRows.length) {
      await db.insert(topicSeries).values(seriesRows.map((row) => ({ topicId, seriesId: row.id })));
    }
    if (courseRows.length) {
      await db.insert(topicCourses).values(courseRows.map((row) => ({ topicId, courseId: row.id })));
    }
    if (quizRows.length) {
      await db.insert(topicQuizzes).values(quizRows.map((row) => ({ topicId, quizId: row.id })));
    }

    revalidatePath("/dashboard/topics");
    revalidatePath("/dashboard/admin/topics");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Failed to update topic" };
  }
}

export async function deleteTopic(topicId: string) {
  try {
    await db.delete(topics).where(eq(topics.id, topicId));
    revalidatePath("/dashboard/topics");
    revalidatePath("/dashboard/admin/topics");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Failed to delete topic" };
  }
}