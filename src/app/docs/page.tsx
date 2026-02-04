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
                    <BookOpen className="h-4 w-4" /> Documentation
                </div>
                <h1 className="text-5xl font-black tracking-tighter">Getting Started</h1>
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                    Everything you need to build and scale your applications with our modern platform architecture and design system.
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
                    { title: "Core Concepts", desc: "Understand the fundamental architecture and principles.", icon: Zap, color: "text-amber-500 bg-amber-500/10" },
                    { title: "Quick Setup", desc: "Deploy your first application in less than 5 minutes.", icon: Rocket, color: "text-emerald-500 bg-emerald-500/10" },
                    { title: "Security Guide", desc: "Learn how we protect your data and identity.", icon: Shield, color: "text-blue-500 bg-blue-500/10" },
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
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Fundamentals</h4>
                        <div className="space-y-1">
                            {["Introduction", "Architecture", "Installation", "Folder Structure"].map(link => (
                                <div key={link} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer text-sm font-medium transition-colors group">
                                    <span className="group-hover:text-primary">{link}</span>
                                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-30" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Frameworks</h4>
                        <div className="space-y-1">
                            {["Next.js", "React Native", "Tailwind CSS", "Drizzle ORM"].map(link => (
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
                            <h2 className="text-3xl font-bold tracking-tight">Introduction</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Welcome to the official documentation. This guide is designed to help you navigate through the complexities of modern web development using our curated technology stack. We prioritize performance, developer experience, and scalability above all else.
                            </p>
                            <div className="p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl">
                                <p className="text-sm font-medium leading-relaxed italic opacity-80">
                                    "Architecture should be a servant of the business, not a master of the engineers."
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-xl font-bold">Key Technologies</h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    { name: "Next.js 14", status: "Production Ready" },
                                    { name: "Tailwind CSS", status: "Utility First" },
                                    { name: "Lucide Icons", status: "Vibrant Symbols" },
                                    { name: "Drizzle ORM", status: "Type Safe Access" },
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
