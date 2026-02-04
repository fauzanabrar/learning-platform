"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, MapPin, Clock } from "lucide-react"

export default function CalendarPage() {
    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
                    <p className="text-muted-foreground">Schedule and manage your events and meetings.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-lg border bg-background shadow-sm mr-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 border-r rounded-none"><ChevronLeft className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="h-9 px-4 font-semibold uppercase tracking-widest text-[10px]">Today</Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 border-l rounded-none"><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" /> Add Event
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Calendar Grid */}
                <Card className="lg:col-span-3 overflow-hidden border shadow-md">
                    <CardHeader className="bg-muted/20 border-b py-3">
                        <div className="flex items-center justify-between">
                            <span className="font-bold">October 2024</span>
                            <div className="flex gap-1">
                                <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-tight">Month</Button>
                                <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-tight">Week</Button>
                                <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-tight">Day</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-7 border-b bg-muted/5">
                            {weekDays.map(day => (
                                <div key={day} className="p-3 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider border-r last:border-r-0">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 auto-rows-[120px]">
                            {/* Empty days padding */}
                            <div className="border-r border-b bg-muted/10" />
                            <div className="border-r border-b bg-muted/10" />

                            {days.map(day => (
                                <div key={day} className={`p-2 border-r border-b transition-colors hover:bg-muted/10 group relative ${day === 24 ? 'bg-primary/5' : ''}`}>
                                    <span className={`text-xs font-bold ${day === 24 ? 'h-6 w-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg' : 'text-foreground/70'}`}>
                                        {day}
                                    </span>

                                    {day === 24 && (
                                        <div className="mt-2 space-y-1">
                                            <div className="px-2 py-1 rounded bg-blue-500/10 border-l-2 border-blue-500 text-[10px] font-medium text-blue-600 truncate">
                                                Tech Sync
                                            </div>
                                            <div className="px-2 py-1 rounded bg-emerald-500/10 border-l-2 border-emerald-500 text-[10px] font-medium text-emerald-600 truncate">
                                                Design Review
                                            </div>
                                        </div>
                                    )}

                                    {day === 25 && (
                                        <div className="mt-2">
                                            <div className="px-2 py-1 rounded bg-rose-500/10 border-l-2 border-rose-500 text-[10px] font-medium text-rose-600 truncate">
                                                Deployment
                                            </div>
                                        </div>
                                    )}

                                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Events */}
                <div className="space-y-6">
                    <Card className="shadow-sm border">
                        <CardHeader>
                            <CardTitle className="text-sm">Upcoming Events</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {[
                                    { title: "Team Lunch", time: "12:30 PM", loc: "Garden Bistro", color: "bg-orange-500" },
                                    { title: "Client Call", time: "03:00 PM", loc: "Zoom Hub", color: "bg-blue-500" },
                                    { title: "Review", time: "05:00 PM", loc: "Conference Room B", color: "bg-purple-500" },
                                ].map((event, i) => (
                                    <div key={i} className="p-4 flex gap-3 hover:bg-muted/20 transition-colors cursor-pointer">
                                        <div className={`w-1 shrink-0 rounded-full ${event.color}`} />
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold">{event.title}</p>
                                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                                <Clock className="h-3 w-3" /> {event.time}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                                <MapPin className="h-3 w-3" /> {event.loc}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
