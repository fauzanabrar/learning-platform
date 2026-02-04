import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug } from "@/lib/learning-data";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{post.tag}</Badge>
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <p className="text-muted-foreground max-w-2xl">{post.summary}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key takeaways</CardTitle>
          <CardDescription>Apply these tips in your next study session.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {post.content.map((paragraph) => (
            <p key={paragraph} className="text-sm text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/dashboard/courses">Browse courses</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/quizzes">Try a quiz</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/dashboard/blog">Back to blog</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Continue learning</CardTitle>
          <CardDescription>Recommended series based on this article.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {[
            { title: "React Fundamentals", slug: "react-fundamentals" },
            { title: "TypeScript Mastery", slug: "typescript-mastery" },
            { title: "Product Design", slug: "product-design" },
          ].map((item) => (
            <div key={item.slug} className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm font-medium">{item.title}</span>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/dashboard/videos/${item.slug}`}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Explore
                </Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
