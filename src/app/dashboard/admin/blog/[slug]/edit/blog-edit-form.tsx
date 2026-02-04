"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateBlogPost } from "@/lib/blog-actions";

type BlogPostAdmin = {
  id: string;
  slug: string;
  title: string;
  tag: string;
  readTime: string;
  summary: string;
  content: string[];
};

export default function BlogEditForm({ post }: { post: BlogPostAdmin }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [contents, setContents] = useState<string[]>(post.content.length > 0 ? post.content : [""]);
  const [error, setError] = useState<string | null>(null);

  const addContent = () => setContents([...contents, ""]);
  const removeContent = (index: number) => setContents(contents.filter((_, i) => i !== index));
  const updateContent = (index: number, value: string) => {
    const newContents = [...contents];
    newContents[index] = value;
    setContents(newContents);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("contents", JSON.stringify(contents.filter((c) => c.trim() !== "")));

    startTransition(async () => {
      try {
        const result = await updateBlogPost(post.id, formData);
        if (result.success) {
          router.push("/dashboard/admin/blog");
        } else {
          setError(result.error || "Failed to update blog post");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground">Update blog post content</p>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>Update the blog post details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title*</Label>
              <Input id="title" name="title" defaultValue={post.title} required />
            </div>
            <div className="space-y-2">
              <Label>Slug (cannot be changed)</Label>
              <Input value={post.slug} disabled />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tag">Tag/Category*</Label>
                <Input id="tag" name="tag" defaultValue={post.tag} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time*</Label>
                <Input id="readTime" name="readTime" defaultValue={post.readTime} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary*</Label>
              <Textarea id="summary" name="summary" defaultValue={post.summary} rows={3} required />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Content Paragraphs</CardTitle>
            <CardDescription>Update blog post content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contents.map((content, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`content-${index}`}>Paragraph {index + 1}</Label>
                  {contents.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeContent(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Textarea
                  id={`content-${index}`}
                  value={content}
                  onChange={(e) => updateContent(index, e.target.value)}
                  rows={5}
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addContent} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Paragraph
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}