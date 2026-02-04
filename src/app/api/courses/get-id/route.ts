import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const courseRows = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1);
    
    if (courseRows.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ courseId: courseRows[0].id });
  } catch (error) {
    console.error("Error fetching course ID:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}
