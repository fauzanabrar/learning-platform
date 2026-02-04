"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, LineChart, PieChart, Activity, TrendingUp, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
                    <p className="text-muted-foreground">Deep dive into your application performance and user engagement.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Real-time Users</CardTitle>
                        <Activity className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">573</div>
                        <p className="text-xs text-muted-foreground">
                            +12.5% from last hour
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3.2%</div>
                        <p className="text-xs text-emerald-500 flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3" /> +0.4%
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                        <PieChart className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">42.8%</div>
                        <p className="text-xs text-rose-500 flex items-center gap-1">
                            <ArrowDownRight className="h-3 w-3" /> -2.1%
                        </p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,482</div>
                        <p className="text-xs text-muted-foreground">
                            +18% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Usage Overview</CardTitle>
                        <CardDescription>
                            Traffic trends and user interactions for the last 30 days.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center border-t">
                        <div className="text-muted-foreground flex flex-col items-center gap-2">
                            <LineChart className="h-12 w-12 opacity-20" />
                            <span>Interactive Chart Placeholder</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Top Referrers</CardTitle>
                        <CardDescription>
                            Where your users are coming from.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Google", value: "45%", color: "bg-blue-500" },
                                { name: "Direct", value: "25%", color: "bg-emerald-500" },
                                { name: "Social Media", value: "20%", color: "bg-purple-500" },
                                { name: "Other", value: "10%", color: "bg-gray-500" },
                            ].map((item) => (
                                <div key={item.name} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{item.name}</span>
                                        <span className="text-muted-foreground">{item.value}</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                        <div className={`h-full ${item.color}`} style={{ width: item.value }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
