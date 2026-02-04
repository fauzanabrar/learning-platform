import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { getBlogPosts } from "@/lib/learning-data";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-muted-foreground">Short reads to reinforce your learning sessions.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.title}>
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{post.tag}</Badge>
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
              </div>
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <CardDescription>Learn practical strategies you can apply right away.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/dashboard/blog/${post.slug}`}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read article
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
