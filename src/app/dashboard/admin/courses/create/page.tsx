"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCourse } from "@/lib/course-actions";

export default function CreateCoursePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [modules, setModules] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);

  const addModule = () => {
    setModules([...modules, ""]);
  };

  const removeModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const updateModule = (index: number, value: string) => {
    const newModules = [...modules];
    newModules[index] = value;
    setModules(newModules);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Add modules to form data
    const filteredModules = modules.filter(m => m.trim() !== "");
    formData.append("modules", JSON.stringify(filteredModules));

    startTransition(async () => {
      try {
        const result = await createCourse(formData);
        if (result.success) {
          router.push(`/dashboard/courses/${result.slug}`);
        } else {
          setError(result.error || "Failed to create course");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create New Course</h1>
        <p className="text-muted-foreground">Add a new course to the learning platform</p>
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
            <CardTitle>Course Details</CardTitle>
            <CardDescription>Enter the basic information about the course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title*</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="React Foundations"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug*</Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="react-foundations"
                  pattern="[a-z0-9-]+"
                  title="Only lowercase letters, numbers, and hyphens"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Learn the fundamentals of React..."
                rows={3}
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="level">Level*</Label>
                <Select name="level" required>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration*</Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="2h 30m"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lessons">Number of Lessons*</Label>
                <Input
                  id="lessons"
                  name="lessons"
                  type="number"
                  min="1"
                  placeholder="12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quizSlug">Related Quiz Slug</Label>
              <Input
                id="quizSlug"
                name="quizSlug"
                placeholder="react-basics"
                pattern="[a-z0-9-]*"
                title="Only lowercase letters, numbers, and hyphens"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty if no quiz is associated
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Course Modules</CardTitle>
            <CardDescription>Add the modules/lessons for this course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {modules.map((module, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`module-${index}`}>Module {index + 1}</Label>
                  <Input
                    id={`module-${index}`}
                    value={module}
                    onChange={(e) => updateModule(index, e.target.value)}
                    placeholder={`e.g., Introduction to React`}
                  />
                </div>
                {modules.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeModule(index)}
                    className="mt-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addModule}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Module
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Course"}
          </Button>
        </div>
      </form>
    </div>
  );
}
