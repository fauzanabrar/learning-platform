"use server";

import { db } from "@/db";
import { videoEpisodes, videoSeries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createVideoSeries(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const level = formData.get("level") as string;
    const duration = formData.get("duration") as string;
    const episodesJson = formData.get("episodes") as string;

    if (!title || !slug || !level || !duration) {
      return { success: false, error: "Missing required fields" };
    }

    let episodesList: string[] = [];
    try {
      episodesList = JSON.parse(episodesJson);
    } catch {
      episodesList = [];
    }

    const [series] = await db
      .insert(videoSeries)
      .values({
        slug,
        title,
        level,
        duration,
        progress: 0,
      })
      .returning();

    if (episodesList.length > 0) {
      await db.insert(videoEpisodes).values(
        episodesList.map((episodeTitle, index) => ({
          seriesId: series.id,
          title: episodeTitle,
          sortOrder: index + 1,
        }))
      );
    }

    revalidatePath("/dashboard/videos");
    revalidatePath("/dashboard/admin/videos");

    return { success: true, slug: series.slug };
  } catch (error: any) {
    if (error?.code === "23505") {
      return { success: false, error: "A series with this slug already exists" };
    }
    return { success: false, error: "Failed to create video series" };
  }
}

export async function updateVideoSeries(seriesId: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const level = formData.get("level") as string;
    const duration = formData.get("duration") as string;
    const episodesJson = formData.get("episodes") as string;

    if (!title || !level || !duration) {
      return { success: false, error: "Missing required fields" };
    }

    let episodesList: string[] = [];
    try {
      episodesList = JSON.parse(episodesJson);
    } catch {
      episodesList = [];
    }

    const seriesRows = await db.select().from(videoSeries).where(eq(videoSeries.id, seriesId)).limit(1);
    if (seriesRows.length === 0) {
      return { success: false, error: "Series not found" };
    }
    const slug = seriesRows[0].slug;

    await db
      .update(videoSeries)
      .set({ title, level, duration })
      .where(eq(videoSeries.id, seriesId));

    await db.delete(videoEpisodes).where(eq(videoEpisodes.seriesId, seriesId));
    
    if (episodesList.length > 0) {
      await db.insert(videoEpisodes).values(
        episodesList.map((episodeTitle, index) => ({
          seriesId,
          title: episodeTitle,
          sortOrder: index + 1,
        }))
      );
    }

    revalidatePath("/dashboard/videos");
    revalidatePath("/dashboard/admin/videos");

    return { success: true, slug };
  } catch (error: any) {
    return { success: false, error: "Failed to update video series" };
  }
}

export async function deleteVideoSeries(seriesId: string) {
  try {
    await db.delete(videoSeries).where(eq(videoSeries.id, seriesId));
    revalidatePath("/dashboard/videos");
    revalidatePath("/dashboard/admin/videos");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Failed to delete video series" };
  }
}
