import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, PlayCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { getVideoSeriesBySlug } from "@/lib/learning-data";

export default async function VideoSeriesDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const current = await getVideoSeriesBySlug(slug);

  if (!current) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{current.level}</Badge>
          <Badge variant="outline">{current.episodes.length} episodes</Badge>
          <Badge variant="outline">{current.duration}</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{current.title}</h1>
        <p className="text-muted-foreground">Follow the playlist and mark each lesson complete.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Now playing</CardTitle>
          <CardDescription>Episode 1 · 14 min</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full rounded-xl bg-muted flex items-center justify-center">
            <PlayCircle className="h-12 w-12 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Episode list</CardTitle>
            <CardDescription>Jump to any lesson in the series.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {current.episodes.map((episode, index) => (
              <div key={episode} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{index + 1}. {episode}</p>
                  <p className="text-xs text-muted-foreground">12-18 min</p>
                </div>
                <Button variant="ghost" size="sm">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Play
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
              <span className="font-semibold">{current.progress}%</span>
            </div>
            <Progress value={current.progress} />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> {current.duration} total
            </div>
            <Button className="w-full">Resume series</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
