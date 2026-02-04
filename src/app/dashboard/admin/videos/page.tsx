import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import Link from "next/link";
import { getVideoSeriesWithIds } from "@/lib/learning-data";
import { DeleteVideoSeriesButton } from "./delete-video-series-button";

export default async function AdminVideosPage() {
  const series = await getVideoSeriesWithIds();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Manage Video Series</h1>
          <p className="text-muted-foreground">Create and manage video series</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/admin/videos/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Video Series
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {series.map((item) => (
          <Card key={item.slug}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.episodes.length} episodes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{item.level}</Badge>
                <Badge variant="outline">{item.duration}</Badge>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/dashboard/videos/${item.slug}`}>
                    View Series
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/admin/videos/${item.slug}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteVideoSeriesButton seriesId={item.id} seriesTitle={item.title} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {series.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No video series found</p>
            <Button asChild>
              <Link href="/dashboard/admin/videos/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Series
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
