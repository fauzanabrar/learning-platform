"use client";

import { Button } from "@/components/ui/button";
import { ConfirmBackDialog } from "@/components/common/confirm-back-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateVideoSeries } from "@/lib/video-actions";
import { VideoUpload } from "@/components/video-upload";

type EpisodeInput = {
  title: string;
  videoUrl: string;
  uploadStatus?: "idle" | "uploading" | "done" | "error";
};

type VideoSeriesAdmin = {
  id: string;
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  progress: number;
  episodes: { title: string; videoUrl?: string | null }[];
};

export default function VideoSeriesEditForm({ series }: { series: VideoSeriesAdmin }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const initialEpisodes = useMemo(
    () =>
      series.episodes.length > 0
        ? series.episodes.map((ep) => ({ title: ep.title, videoUrl: ep.videoUrl || "" }))
        : [{ title: "", videoUrl: "" }],
    [series.episodes]
  );
  const [episodes, setEpisodes] = useState<EpisodeInput[]>(initialEpisodes);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [showBackConfirm, setShowBackConfirm] = useState(false);

  const addEpisode = () => setEpisodes([...episodes, { title: "", videoUrl: "" }]);
  const removeEpisode = (index: number) => setEpisodes(episodes.filter((_, i) => i !== index));
  const updateEpisode = (index: number, field: keyof EpisodeInput, value: string) => {
    const newEpisodes = [...episodes];
    newEpisodes[index] = { ...newEpisodes[index], [field]: value };
    setEpisodes(newEpisodes);
  };

  const normalizeEpisode = (episode: EpisodeInput) => ({
    title: episode.title.trim(),
    videoUrl: episode.videoUrl.trim(),
  });

  const hasDirtyInputs = () => {
    const form = formRef.current;
    const formData = form ? new FormData(form) : null;
    const title = formData?.get("title")?.toString().trim() || "";
    const level = formData?.get("level")?.toString().trim() || "";
    const duration = formData?.get("duration")?.toString().trim() || "";

    const isSeriesDirty =
      title !== series.title || level !== series.level || duration !== series.duration;

    const normalizedEpisodes = episodes.map(normalizeEpisode);
    const normalizedInitial = initialEpisodes.map(normalizeEpisode);
    const isEpisodeCountDirty = normalizedEpisodes.length !== normalizedInitial.length;
    const isEpisodeContentDirty = normalizedEpisodes.some((episode, index) => {
      const initial = normalizedInitial[index];
      if (!initial) return true;
      return episode.title !== initial.title || episode.videoUrl !== initial.videoUrl;
    });

    return isSeriesDirty || isEpisodeCountDirty || isEpisodeContentDirty;
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
    const normalized = episodes
      .filter((episode) => episode.title.trim() !== "")
      .map((episode) => ({ title: episode.title.trim(), videoUrl: episode.videoUrl || null }));
    formData.append("episodes", JSON.stringify(normalized));

    startTransition(async () => {
      try {
        const result = await updateVideoSeries(series.id, formData);
        if (result.success) {
          router.push("/dashboard/admin/videos");
        } else {
          setError(result.error || "Failed to update video series");
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
          <h1 className="text-3xl font-bold">Edit Video Series</h1>
          <p className="text-muted-foreground">Update video series details</p>
        </div>
        <Button type="button" variant="outline" onClick={handleBack} disabled={isPending}>
          Back
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      <form ref={formRef} onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Series Details</CardTitle>
            <CardDescription>Update title, level, and duration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title*</Label>
              <Input id="title" name="title" defaultValue={series.title} required />
            </div>
            <div className="space-y-2">
              <Label>Slug (cannot be changed)</Label>
              <Input value={series.slug} disabled />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="level">Level*</Label>
                <Select name="level" defaultValue={series.level} required>
                  <SelectTrigger id="level">
                    <SelectValue />
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
                <Input id="duration" name="duration" defaultValue={series.duration} required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Episodes</CardTitle>
            <CardDescription>Update episodes in this series</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {episodes.map((episode, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label>Episode {index + 1}</Label>
                  <Input
                    value={episode.title}
                    onChange={(e) => updateEpisode(index, "title", e.target.value)}
                    placeholder="e.g., Intro to Hooks"
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
          <Button type="button" variant="outline" onClick={handleBack} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update Series"}
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