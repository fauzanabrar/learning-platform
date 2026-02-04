import { notFound } from "next/navigation";
import { getBlogPostAdminBySlug } from "@/lib/learning-data";
import BlogEditForm from "./blog-edit-form";

export default async function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostAdminBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogEditForm post={post} />;
}