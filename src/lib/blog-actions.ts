"use server";

import { db } from "@/db";
import { blogContents, blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBlogPost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const tag = formData.get("tag") as string;
    const readTime = formData.get("readTime") as string;
    const summary = formData.get("summary") as string;
    const contentsJson = formData.get("contents") as string;

    if (!title || !slug || !tag || !readTime || !summary) {
      return { success: false, error: "Missing required fields" };
    }

    let contentsList: string[] = [];
    try {
      contentsList = JSON.parse(contentsJson);
    } catch {
      contentsList = [];
    }

    const [post] = await db
      .insert(blogPosts)
      .values({
        slug,
        title,
        tag,
        readTime,
        summary,
      })
      .returning();

    if (contentsList.length > 0) {
      await db.insert(blogContents).values(
        contentsList.map((body, index) => ({
          postId: post.id,
          body,
          sortOrder: index + 1,
        }))
      );
    }

    revalidatePath("/dashboard/blog");
    revalidatePath("/dashboard/admin/blog");

    return { success: true, slug: post.slug };
  } catch (error: any) {
    if (error?.code === "23505") {
      return { success: false, error: "A blog post with this slug already exists" };
    }
    return { success: false, error: "Failed to create blog post" };
  }
}

export async function updateBlogPost(postId: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const tag = formData.get("tag") as string;
    const readTime = formData.get("readTime") as string;
    const summary = formData.get("summary") as string;
    const contentsJson = formData.get("contents") as string;

    if (!title || !tag || !readTime || !summary) {
      return { success: false, error: "Missing required fields" };
    }

    let contentsList: string[] = [];
    try {
      contentsList = JSON.parse(contentsJson);
    } catch {
      contentsList = [];
    }

    const postRows = await db.select().from(blogPosts).where(eq(blogPosts.id, postId)).limit(1);
    if (postRows.length === 0) {
      return { success: false, error: "Blog post not found" };
    }
    const slug = postRows[0].slug;

    await db
      .update(blogPosts)
      .set({ title, tag, readTime, summary })
      .where(eq(blogPosts.id, postId));

    await db.delete(blogContents).where(eq(blogContents.postId, postId));
    
    if (contentsList.length > 0) {
      await db.insert(blogContents).values(
        contentsList.map((body, index) => ({
          postId,
          body,
          sortOrder: index + 1,
        }))
      );
    }

    revalidatePath("/dashboard/blog");
    revalidatePath("/dashboard/admin/blog");

    return { success: true, slug };
  } catch (error: any) {
    return { success: false, error: "Failed to update blog post" };
  }
}

export async function deleteBlogPost(postId: string) {
  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, postId));
    revalidatePath("/dashboard/blog");
    revalidatePath("/dashboard/admin/blog");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: "Failed to delete blog post" };
  }
}
