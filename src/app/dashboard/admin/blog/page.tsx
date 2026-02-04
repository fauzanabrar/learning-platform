import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import Link from "next/link";
import { getBlogPostsWithIds } from "@/lib/learning-data";
import { DeleteBlogPostButton } from "./delete-blog-post-button";

export default async function AdminBlogPage() {
  const posts = await getBlogPostsWithIds();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
          <p className="text-muted-foreground">Create and manage blog content</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/admin/blog/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Blog Post
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="line-clamp-2">{post.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{post.tag}</Badge>
                <Badge variant="outline">{post.readTime}</Badge>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/dashboard/blog/${post.slug}`}>
                    View Post
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/admin/blog/${post.slug}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteBlogPostButton postId={post.id} postTitle={post.title} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No blog posts found</p>
            <Button asChild>
              <Link href="/dashboard/admin/blog/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Post
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
