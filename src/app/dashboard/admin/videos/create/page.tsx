"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createVideoSeries } from "@/lib/video-actions";
import { VideoUpload } from "@/components/video-upload";

type EpisodeInput = {
  title: string;
  videoUrl: string;
  uploadStatus?: "idle" | "uploading" | "done" | "error";
};

const isLikelySupportedVideo = (url: string) => {
  const lower = url.toLowerCase();
  return lower.endsWith(".mp4") || lower.endsWith(".webm") || lower.endsWith(".ogg");
};

export default function CreateVideoSeriesPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [episodes, setEpisodes] = useState<EpisodeInput[]>([{ title: "", videoUrl: "" }]);
  const [error, setError] = useState<string | null>(null);

  const addEpisode = () => setEpisodes([...episodes, { title: "", videoUrl: "" }]);
  const removeEpisode = (index: number) => setEpisodes(episodes.filter((_, i) => i !== index));
  const updateEpisode = (index: number, field: keyof EpisodeInput, value: string) => {
    const newEpisodes = [...episodes];
    newEpisodes[index] = { ...newEpisodes[index], [field]: value };
    setEpisodes(newEpisodes);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const normalized = episodes
      .filter((episode) => episode.title.trim() !== "")
      .map((episode) => ({ title: episode.title.trim(), videoUrl: episode.videoUrl || null }));
    formData.append("episodes", JSON.stringify(normalized));

    startTransition(async () => {
      try {
        const result = await createVideoSeries(formData);
        if (result.success) {
          router.push(`/dashboard/videos/${result.slug}`);
        } else {
          setError(result.error || "Failed to create video series");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      }
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create Video Series</h1>
        <p className="text-muted-foreground">Add a new video series</p>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Series Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title*</Label>
                <Input id="title" name="title" placeholder="React Fundamentals" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug*</Label>
                <Input id="slug" name="slug" placeholder="react-fundamentals" pattern="[a-z0-9-]+" required />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
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
                <Input id="duration" name="duration" placeholder="2h 15m" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Episodes</CardTitle>
            <CardDescription>Add episodes for this series</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {episodes.map((episode, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label>Episode {index + 1}</Label>
                  <Input
                    value={episode.title}
                    onChange={(e) => updateEpisode(index, "title", e.target.value)}
                    placeholder="e.g., Introduction to Hooks"
                  />
                  <VideoUpload
                    videoUrl={episode.videoUrl}
                    onUpload={(url) => updateEpisode(index, "videoUrl", url)}
                    uploadStatus={episode.uploadStatus}
                  />
                </div>
                {episodes.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeEpisode(index)} className="mt-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addEpisode} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Episode
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Video Series"}
          </Button>
        </div>
      </form>
    </div>
  );
}
