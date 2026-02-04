"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Rocket, Shield, Zap, Search, ChevronRight, FileText } from "lucide-react"

export default function DocsPage() {
    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <div className="space-y-4 mb-12">
                <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-[0.2em] text-xs">
                    <BookOpen className="h-4 w-4" /> Learning Guide
                </div>
                <h1 className="text-5xl font-black tracking-tighter">Start Learning Smarter</h1>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    Tips, guides, and best practices to help you learn faster with video series, topic paths, and quizzes.
                </p>
                <div className="relative max-w-md pt-4">
                    <Search className="absolute left-3 top-[calc(50%+8px)] -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        placeholder="Search documentation..."
                        className="w-full bg-muted/50 border-none rounded-xl h-11 pl-10 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                    />
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                {[
                    { title: "Learning Paths", desc: "Follow structured topics and series that build skills step by step.", icon: Zap, color: "text-amber-500 bg-amber-500/10" },
                    { title: "Quick Start", desc: "Build a daily study routine in under 5 minutes.", icon: Rocket, color: "text-emerald-500 bg-emerald-500/10" },
                    { title: "Assessment", desc: "Use quizzes and checkpoints to reinforce retention.", icon: Shield, color: "text-blue-500 bg-blue-500/10" },
                ].map((item, i) => (
                    <Card key={i} className="hover:shadow-xl transition-all cursor-pointer group border-muted/50">
                        <CardHeader>
                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-2 ${item.color}`}>
                                <item.icon className="h-6 w-6" />
                            </div>
                            <CardTitle className="group-hover:text-primary transition-colors">{item.title}</CardTitle>
                            <CardDescription className="leading-relaxed">{item.desc}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <div className="grid gap-12 lg:grid-cols-4">
                <div className="lg:col-span-1 space-y-8 h-fit sticky top-8">
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Getting Started</h4>
                        <div className="space-y-1">
                            {["Welcome", "Learning Paths", "Video Series", "Quizzes"].map(link => (
                                <div key={link} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer text-sm font-medium transition-colors group">
                                    <span className="group-hover:text-primary">{link}</span>
                                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-30" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Study Skills</h4>
                        <div className="space-y-1">
                            {["Time Blocking", "Active Recall", "Note Taking", "Project Practice"].map(link => (
                                <div key={link} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer text-sm font-medium transition-colors group">
                                    <span className="group-hover:text-primary">{link}</span>
                                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-30" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Card className="lg:col-span-3 border-none shadow-none bg-transparent">
                    <CardContent className="space-y-10 p-0">
                        <section className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight">Welcome</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                The LearnHub guide helps you build a focused study plan, pick the right series, and stay accountable with quizzes and progress tracking.
                            </p>
                            <div className="p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl">
                                <p className="text-sm font-medium leading-relaxed italic opacity-80">
                                    "Small, consistent sessions outperform occasional marathons."
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl font-bold">Core Learning Tools</h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    { name: "Video Series", status: "Guided" },
                                    { name: "Topic Maps", status: "Structured" },
                                    { name: "Quizzes", status: "Retention" },
                                    { name: "Blog Notes", status: "Reference" },
                                ].map(tech => (
                                    <div key={tech.name} className="p-4 border rounded-xl flex items-center justify-between bg-white/50 dark:bg-card/50">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-bold">{tech.name}</span>
                                        </div>
                                        <Badge variant="secondary" className="text-[10px] px-1.5 font-bold uppercase tracking-tighter opacity-70">
                                            {tech.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
