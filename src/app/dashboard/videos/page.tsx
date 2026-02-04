import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Clock, ListVideo } from "lucide-react";
import Link from "next/link";
import { getVideoSeries } from "@/lib/learning-data";

export default async function VideosPage() {
  const series = await getVideoSeries();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Video Series</h1>
        <p className="text-muted-foreground">Watch topic-based playlists and stay on track.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {series.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <Badge variant="secondary">{item.level}</Badge>
              </div>
              <CardDescription>Structured series with actionable lessons.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><ListVideo className="h-3 w-3" />{item.episodes.length} episodes</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{item.duration}</span>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <Link href={`/dashboard/videos/${item.slug}`}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Start series
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
