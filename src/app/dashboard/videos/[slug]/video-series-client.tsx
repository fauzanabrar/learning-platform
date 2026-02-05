"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, PlayCircle, Volume2, Maximize2, Gauge, Settings } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Episode = {
  title: string;
  videoUrl?: string | null;
};

type VideoSeries = {
  slug: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  progress: number;
  episodes: Episode[];
};

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];
const QUALITIES = [
  { label: "Auto", value: "auto" },
  { label: "1080p", value: "1080p", width: 1920, height: 1080 },
  { label: "720p", value: "720p", width: 1280, height: 720 },
  { label: "480p", value: "480p", width: 854, height: 480 },
];

function getVideoUrlWithQuality(originalUrl: string, quality: string): string {
  if (quality === "auto" || !originalUrl) return originalUrl;
  
  // Check if it's a Cloudinary URL
  if (!originalUrl.includes("cloudinary.com")) return originalUrl;
  
  const qualityConfig = QUALITIES.find(q => q.value === quality);
  if (!qualityConfig || !qualityConfig.width) return originalUrl;
  
  // Insert transformation before the version number or filename
  // Example: https://res.cloudinary.com/demo/video/upload/v1234/sample.mp4
  // Becomes: https://res.cloudinary.com/demo/video/upload/c_limit,h_720,w_1280/v1234/sample.mp4
  const transformation = `c_limit,h_${qualityConfig.height},q_auto:good,w_${qualityConfig.width}`;
  return originalUrl.replace(/\/upload\//, `/upload/${transformation}/`);
}

export default function VideoSeriesClient({ series }: { series: VideoSeries }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState("auto");
  const [detectedResolution, setDetectedResolution] = useState<{ width: number; height: number } | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const storageKey = useMemo(() => `learnhub:video:${series.slug}`, [series.slug]);
  const selectedEpisode = series.episodes[selectedIndex];
  const videoUrl = useMemo(
    () => getVideoUrlWithQuality(selectedEpisode?.videoUrl || "", quality),
    [selectedEpisode?.videoUrl, quality]
  );

  // Detect video resolution when metadata loads
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDetectedResolution({ width: video.videoWidth, height: video.videoHeight });
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [videoUrl]);

  // Filter quality options based on detected resolution
  const availableQualities = useMemo(() => {
    if (!detectedResolution) return QUALITIES;

    return QUALITIES.filter((q) => {
      if (q.value === "auto") return true;
      if (!q.height) return false;
      // Only show qualities at or below the source resolution
      return q.height <= detectedResolution.height;
    });
  }, [detectedResolution]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { index?: number; time?: number };
        if (typeof parsed.index === "number") {
          setSelectedIndex(Math.min(parsed.index, series.episodes.length - 1));
        }
      } catch {
        // ignore
      }
    }
  }, [storageKey, series.episodes.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { index?: number; time?: number };
        if (parsed.index === selectedIndex && typeof parsed.time === "number") {
          video.currentTime = parsed.time;
        }
      } catch {
        // ignore
      }
    }

    const handleTimeUpdate = () => {
      localStorage.setItem(storageKey, JSON.stringify({ index: selectedIndex, time: video.currentTime }));
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [selectedIndex, storageKey]);

  const handleQualityChange = (newQuality: string) => {
    const video = videoRef.current;
    if (!video) {
      setQuality(newQuality);
      return;
    }

    // Save current position and playing state
    const currentTime = video.currentTime;
    const wasPlaying = !video.paused;

    // Pause before changing
    video.pause();

    // Change quality (this will trigger a re-render with new URL)
    setQuality(newQuality);

    // Wait for next tick to ensure new video element is rendered
    setTimeout(() => {
      const newVideo = videoRef.current;
      if (newVideo) {
        newVideo.currentTime = currentTime;
        if (wasPlaying) {
          newVideo.play().catch(() => {
            // Autoplay might be blocked
          });
        }
      }
    }, 100);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{series.level}</Badge>
          <Badge variant="outline">{series.episodes.length} episodes</Badge>
          <Badge variant="outline">{series.duration}</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{series.title}</h1>
        <p className="text-muted-foreground">Follow the playlist and learn at your own pace.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Now playing</CardTitle>
          <CardDescription>{selectedEpisode ? selectedEpisode.title : "No episode available"}</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedEpisode?.videoUrl ? (
            <div className="space-y-4">
              <video
                ref={videoRef}
                className="w-full rounded-xl border bg-black"
                controls
                preload="metadata"
                src={videoUrl}
                key={videoUrl}
              />
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Gauge className="h-3 w-3" /> Speed
                  </span>
                  {SPEEDS.map((speed) => (
                    <Button
                      key={speed}
                      type="button"
                      size="sm"
                      variant={playbackRate === speed ? "default" : "outline"}
                      onClick={() => setPlaybackRate(speed)}
                    >
                      {speed}x
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Settings className="h-3 w-3" /> Quality
                  </span>
                  {availableQualities.map((q) => (
                    <Button
                      key={q.value}
                      type="button"
                      size="sm"
                      variant={quality === q.value ? "default" : "outline"}
                      onClick={() => handleQualityChange(q.value)}
                    >
                      {q.label}
                    </Button>
                  ))}
                  {detectedResolution && (
                    <span className="text-xs text-muted-foreground">
                      ({detectedResolution.width}×{detectedResolution.height})
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><PlayCircle className="h-3 w-3" /> Playback controls</span>
                <span className="inline-flex items-center gap-1"><Volume2 className="h-3 w-3" /> Adjustable volume</span>
                <span className="inline-flex items-center gap-1"><Maximize2 className="h-3 w-3" /> Fullscreen supported</span>
              </div>
            </div>
          ) : (
            <div className="h-64 w-full rounded-xl bg-muted flex items-center justify-center">
              <PlayCircle className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Episode list</CardTitle>
            <CardDescription>Jump to any lesson in the series.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {series.episodes.map((episode, index) => (
              <div key={`${episode.title}-${index}`} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{index + 1}. {episode.title}</p>
                  <p className="text-xs text-muted-foreground">12-18 min</p>
                </div>
                <Button
                  variant={selectedIndex === index ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedIndex(index)}
                  disabled={!episode.videoUrl}
                >
                  <PlayCircle className="mr-2 h-4 w-4" />
                  {episode.videoUrl ? (selectedIndex === index ? "Playing" : "Play") : "No video"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Series progress</CardTitle>
            <CardDescription>Keep your streak going.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completed</span>
              <span className="font-semibold">{series.progress}%</span>
            </div>
            <Progress value={series.progress} />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {series.duration} total
            </div>
            <Button className="w-full" onClick={() => setSelectedIndex(selectedIndex)}>
              Resume series
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
