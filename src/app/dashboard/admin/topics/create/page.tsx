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
import { createTopic } from "@/lib/topic-actions";

export default function CreateTopicPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [seriesSlugs, setSeriesSlugs] = useState<string[]>([""]);
  const [courseSlugs, setCourseSlugs] = useState<string[]>([""]);
  const [quizSlugs, setQuizSlugs] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [showBackConfirm, setShowBackConfirm] = useState(false);

  const updateList = (setter: (value: string[]) => void, list: string[], index: number, value: string) => {
    const next = [...list];
    next[index] = value;
    setter(next);
  };

  const addItem = (setter: (value: string[]) => void, list: string[]) => setter([...list, ""]);
  const removeItem = (setter: (value: string[]) => void, list: string[], index: number) =>
    setter(list.filter((_, i) => i !== index));

  const hasDirtyInputs = () => {
    const form = formRef.current;
    const formData = form ? new FormData(form) : null;
    const hasFormValues = formData
      ? Array.from(formData.values()).some((value) => String(value).trim() !== "")
      : false;
    const hasListValues =
      seriesSlugs.some((slug) => slug.trim() !== "") ||
      courseSlugs.some((slug) => slug.trim() !== "") ||
      quizSlugs.some((slug) => slug.trim() !== "");
    return hasFormValues || hasListValues;
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
    formData.append("seriesSlugs", JSON.stringify(seriesSlugs.filter((s) => s.trim() !== "")));
    formData.append("courseSlugs", JSON.stringify(courseSlugs.filter((s) => s.trim() !== "")));
    formData.append("quizSlugs", JSON.stringify(quizSlugs.filter((s) => s.trim() !== "")));

    startTransition(async () => {
      try {
        const result = await createTopic(formData);
        if (result.success) {
          router.push(`/dashboard/topics/${result.slug}`);
        } else {
          setError(result.error || "Failed to create topic");
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
          <h1 className="text-3xl font-bold">Create Topic</h1>
          <p className="text-muted-foreground">Add a new learning topic</p>
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
            <CardTitle>Topic Details</CardTitle>
            <CardDescription>Enter the basic information about the topic</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title*</Label>
                <Input id="title" name="title" placeholder="Frontend Essentials" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug*</Label>
                <Input id="slug" name="slug" placeholder="frontend-essentials" pattern="[a-z0-9-]+" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea id="description" name="description" rows={3} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lessons">Lessons*</Label>
              <Input id="lessons" name="lessons" type="number" min="1" placeholder="12" required />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Related Series (slugs)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {seriesSlugs.map((slug, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <Input value={slug} onChange={(e) => updateList(setSeriesSlugs, seriesSlugs, index, e.target.value)} placeholder="react-fundamentals" />
                </div>
                {seriesSlugs.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(setSeriesSlugs, seriesSlugs, index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addItem(setSeriesSlugs, seriesSlugs)} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Series Slug
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Related Courses (slugs)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseSlugs.map((slug, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <Input value={slug} onChange={(e) => updateList(setCourseSlugs, courseSlugs, index, e.target.value)} placeholder="react-foundations" />
                </div>
                {courseSlugs.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(setCourseSlugs, courseSlugs, index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addItem(setCourseSlugs, courseSlugs)} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Course Slug
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Related Quizzes (slugs)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quizSlugs.map((slug, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <Input value={slug} onChange={(e) => updateList(setQuizSlugs, quizSlugs, index, e.target.value)} placeholder="react-basics" />
                </div>
                {quizSlugs.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(setQuizSlugs, quizSlugs, index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addItem(setQuizSlugs, quizSlugs)} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Quiz Slug
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-3">
          <Button type="button" variant="outline" onClick={handleBack} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Topic"}
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