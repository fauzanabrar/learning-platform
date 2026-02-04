"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateTopic } from "@/lib/topic-actions";

type TopicAdmin = {
  id: string;
  slug: string;
  title: string;
  description: string;
  lessons: number;
  seriesSlugs: string[];
  courseSlugs: string[];
  quizSlugs: string[];
};

export default function TopicEditForm({ topic }: { topic: TopicAdmin }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [seriesSlugs, setSeriesSlugs] = useState<string[]>(topic.seriesSlugs.length > 0 ? topic.seriesSlugs : [""]);
  const [courseSlugs, setCourseSlugs] = useState<string[]>(topic.courseSlugs.length > 0 ? topic.courseSlugs : [""]);
  const [quizSlugs, setQuizSlugs] = useState<string[]>(topic.quizSlugs.length > 0 ? topic.quizSlugs : [""]);
  const [error, setError] = useState<string | null>(null);

  const updateList = (setter: (value: string[]) => void, list: string[], index: number, value: string) => {
    const next = [...list];
    next[index] = value;
    setter(next);
  };

  const addItem = (setter: (value: string[]) => void, list: string[]) => setter([...list, ""]);
  const removeItem = (setter: (value: string[]) => void, list: string[], index: number) =>
    setter(list.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("seriesSlugs", JSON.stringify(seriesSlugs.filter((s) => s.trim() !== "")));
    formData.append("courseSlugs", JSON.stringify(courseSlugs.filter((s) => s.trim() !== "")));
    formData.append("quizSlugs", JSON.stringify(quizSlugs.filter((s) => s.trim() !== "")));

    startTransition(async () => {
      try {
        const result = await updateTopic(topic.id, formData);
        if (result.success) {
          router.push("/dashboard/admin/topics");
        } else {
          setError(result.error || "Failed to update topic");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Edit Topic</h1>
        <p className="text-muted-foreground">Update topic details and relationships</p>
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
            <CardTitle>Topic Details</CardTitle>
            <CardDescription>Update the topic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title*</Label>
              <Input id="title" name="title" defaultValue={topic.title} required />
            </div>
            <div className="space-y-2">
              <Label>Slug (cannot be changed)</Label>
              <Input value={topic.slug} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea id="description" name="description" defaultValue={topic.description} rows={3} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lessons">Lessons*</Label>
              <Input id="lessons" name="lessons" type="number" min="1" defaultValue={topic.lessons} required />
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
                  <Input value={slug} onChange={(e) => updateList(setSeriesSlugs, seriesSlugs, index, e.target.value)} />
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
                  <Input value={slug} onChange={(e) => updateList(setCourseSlugs, courseSlugs, index, e.target.value)} />
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
                  <Input value={slug} onChange={(e) => updateList(setQuizSlugs, quizSlugs, index, e.target.value)} />
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
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update Topic"}
          </Button>
        </div>
      </form>
    </div>
  );
}