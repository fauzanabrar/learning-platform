import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, CheckCircle2, Clock, Flame, GraduationCap, ListVideo, PlayCircle } from "lucide-react";
import Link from "next/link";
import { getBlogPosts, getCourses, getQuizzes, getTopics } from "@/lib/learning-data";

export default async function Dashboard() {
  const courses = await getCourses();
  const topics = await getTopics();
  const blogPosts = await getBlogPosts();
  const quizzes = await getQuizzes();

  const continueLearning = courses.slice(0, 3).map((course) => ({
    title: course.title,
    lesson: course.modules[1] ?? course.modules[0] ?? "Next lesson",
    progress: course.progress,
    duration: "12-22 min",
    level: course.level,
  }));

  const stats = [
    {
      label: "Courses in progress",
      value: String(courses.length),
      icon: BookOpen,
      tone: "text-primary",
    },
    {
      label: "Lessons watched",
      value: String(courses.reduce((sum, course) => sum + Math.round(course.lessons * (course.progress / 100)), 0)),
      icon: PlayCircle,
      tone: "text-emerald-500",
    },
    {
      label: "Quizzes available",
      value: String(quizzes.length),
      icon: CheckCircle2,
      tone: "text-blue-500",
    },
    {
      label: "Study streak",
      value: "9 days",
      icon: Flame,
      tone: "text-orange-500",
    },
  ];

  const topicIcons = [GraduationCap, ListVideo, BookOpen];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Learning Dashboard</h1>
        <p className="text-muted-foreground">Track your progress, jump into video series, and keep up with quizzes and blogs.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.tone}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Continue learning</h2>
            <p className="text-sm text-muted-foreground">Pick up where you left off across your active courses.</p>
          </div>
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/dashboard/courses">
              View all courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {continueLearning.map((course) => (
            <Card key={course.title}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>{course.lesson}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
                <Button className="w-full">Resume lesson</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Topics & series</CardTitle>
            <CardDescription>Browse curated paths by skill and role.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topics.map((topic, index) => {
              const Icon = topicIcons[index % topicIcons.length];
              return (
                <div key={topic.slug} className="flex items-center justify-between rounded-xl border p-3 bg-background/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{topic.title}</p>
                    <p className="text-xs text-muted-foreground">{topic.lessons} lessons</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/dashboard/topics/${topic.slug}`}>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Latest from the blog</CardTitle>
            <CardDescription>Short reads to complement your video learning.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.title} className="space-y-2 border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{post.tag}</Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <p className="text-sm font-semibold leading-snug">{post.title}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/blog">Explore blog</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming quizzes</CardTitle>
            <CardDescription>Test your understanding after each topic.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quizzes.map((quiz) => (
              <div key={quiz.title} className="flex items-center justify-between rounded-xl border p-3 bg-background/50">
                <div>
                  <p className="text-sm font-semibold">{quiz.title}</p>
                  <p className="text-xs text-muted-foreground">{quiz.questions} questions</p>
                </div>
                <Badge variant="secondary">{quiz.level}</Badge>
              </div>
            ))}
            <Button className="w-full" asChild>
              <Link href="/dashboard/quizzes">Start a quiz</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
