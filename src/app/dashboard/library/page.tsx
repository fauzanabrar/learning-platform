import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, BookOpen, FileText } from "lucide-react";
import Link from "next/link";
import { getLibraryItems } from "@/lib/learning-data";

export default async function LibraryPage() {
  const savedItems = await getLibraryItems();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Library</h1>
        <p className="text-muted-foreground">Keep all your saved courses, videos, and articles in one place.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {savedItems.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <Badge variant="secondary">{item.type}</Badge>
              </div>
              <CardDescription>{item.note}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Bookmark className="h-3 w-3" /> Saved
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={item.href}>
                  {item.type === "Blog" ? (
                    <FileText className="mr-2 h-4 w-4" />
                  ) : (
                    <BookOpen className="mr-2 h-4 w-4" />
                  )}
                  Open
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
