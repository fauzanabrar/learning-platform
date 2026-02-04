import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Target, Trophy } from "lucide-react";

const goals = [
  { title: "Watch 5 lessons", progress: 60, status: "This week" },
  { title: "Complete 2 quizzes", progress: 50, status: "This week" },
  { title: "Finish a course", progress: 35, status: "This month" },
];

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">My Progress</h1>
        <p className="text-muted-foreground">Review your milestones and stay consistent.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly streak</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 weeks</div>
            <p className="text-xs text-muted-foreground">You have learned 5 days in a row</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 badges</div>
            <p className="text-xs text-muted-foreground">Top 15% of learners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next milestone</CardTitle>
            <Target className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90 lessons</div>
            <p className="text-xs text-muted-foreground">4 lessons away</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly goals</CardTitle>
          <CardDescription>Focus on small wins every day.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.title} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{goal.title}</span>
                <Badge variant="outline">{goal.status}</Badge>
              </div>
              <Progress value={goal.progress} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
