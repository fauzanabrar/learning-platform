"use client";

import { Button } from "@/components/ui/button";
import { ConfirmBackDialog } from "@/components/common/confirm-back-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost } from "@/lib/blog-actions";

export default function CreateBlogPostPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [contents, setContents] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [showBackConfirm, setShowBackConfirm] = useState(false);

  const addContent = () => setContents([...contents, ""]);
  const removeContent = (index: number) => setContents(contents.filter((_, i) => i !== index));
  const updateContent = (index: number, value: string) => {
    const newContents = [...contents];
    newContents[index] = value;
    setContents(newContents);
  };

  const hasDirtyInputs = () => {
    const form = formRef.current;
    const formData = form ? new FormData(form) : null;
    const hasFormValues = formData
      ? Array.from(formData.values()).some((value) => String(value).trim() !== "")
      : false;
    const hasContentValues = contents.some((content) => content.trim() !== "");
    return hasFormValues || hasContentValues;
  };

  const handleBack = () => {
    if (hasDirtyInputs()) {
      setShowBackConfirm(true);
      return;
    }
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("contents", JSON.stringify(contents.filter(c => c.trim() !== "")));

    startTransition(async () => {
      try {
        const result = await createBlogPost(formData);
        if (result.success) {
          router.push(`/dashboard/blog/${result.slug}`);
        } else {
          setError(result.error || "Failed to create blog post");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create Blog Post</h1>
          <p className="text-muted-foreground">Write a new blog post</p>
        </div>
        <Button type="button" variant="outline" onClick={handleBack} disabled={isPending}>
          Back
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </CardContent>
        </Card>
      )}

      <form ref={formRef} onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>Enter the basic information about the blog post</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title*</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Understanding React Hooks"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug*</Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="understanding-react-hooks"
                  pattern="[a-z0-9-]+"
                  title="Only lowercase letters, numbers, and hyphens"
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tag">Tag/Category*</Label>
                <Input
                  id="tag"
                  name="tag"
                  placeholder="Tutorial"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time*</Label>
                <Input
                  id="readTime"
                  name="readTime"
                  placeholder="5 min read"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary*</Label>
              <Textarea
                id="summary"
                name="summary"
                placeholder="A brief overview of the blog post..."
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Content Paragraphs</CardTitle>
            <CardDescription>Add content paragraphs for this blog post</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contents.map((content, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`content-${index}`}>Paragraph {index + 1}</Label>
                  {contents.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeContent(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Textarea
                  id={`content-${index}`}
                  value={content}
                  onChange={(e) => updateContent(index, e.target.value)}
                  placeholder={`Write paragraph ${index + 1}...`}
                  rows={5}
                />
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addContent}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Paragraph
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-3">
          <Button type="button" variant="outline" onClick={handleBack} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Publishing..." : "Publish Post"}
          </Button>
        </div>
      </form>
      <ConfirmBackDialog
        open={showBackConfirm}
        onOpenChange={setShowBackConfirm}
        onConfirm={() => router.back()}
      />
    </div>
  );
}
