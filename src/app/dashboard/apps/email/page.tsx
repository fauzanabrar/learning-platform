"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Inbox, Send, Archive, Trash2, Star, AlertCircle, Plus, MoreVertical, Paperclip } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

const emails = [
    { id: 1, from: "Vercel Support", subject: "Deployment Successful", date: "Oct 24", preview: "Your project 'ccr-clone' has been successfully deployed to production...", read: false, starred: true },
    { id: 2, from: "GitHub Notifications", subject: "New Pull Request #42", date: "Oct 23", preview: "Antigravity opened a new pull request: 'Refactor Auth and Forms'...", read: true, starred: false },
    { id: 3, from: "Stripe", subject: "Invoice #INV-2024-001", date: "Oct 22", preview: "Your invoice for this month's subscription is now available for download...", read: true, starred: true },
    { id: 4, from: "Slack", subject: "New direct message from manager", date: "Oct 22", preview: "Hey, can you take a look at the latest designs for the dashboard?", read: false, starred: false },
    { id: 5, from: "Google Cloud", subject: "Service Update: Cloud SQL", date: "Oct 21", preview: "We are reaching out to let you know about upcoming maintenance scheduled for...", read: true, starred: false },
]

export default function EmailPage() {
    const [selectedId, setSelectedId] = useState<number | null>(1);

    const handleAction = (action: string) => {
        toast.success(`Email ${action} successfully`);
    }

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6 overflow-hidden">
            {/* Sidebar */}
            <div className="w-56 flex flex-col gap-4">
                <Button className="w-full gap-2 shadow-md" onClick={() => toast.success("New message composer opened")}>
                    <Plus className="h-4 w-4" /> Compose
                </Button>
                <div className="space-y-1">
                    {[
                        { icon: Inbox, label: "Inbox", count: 3, active: true },
                        { icon: Star, label: "Starred", active: false },
                        { icon: Send, label: "Sent", active: false },
                        { icon: AlertCircle, label: "Spam", active: false },
                        { icon: Archive, label: "Archive", active: false },
                        { icon: Trash2, label: "Trash", active: false },
                    ].map((item) => (
                        <Button
                            key={item.label}
                            variant={item.active ? "secondary" : "ghost"}
                            className="w-full justify-between font-medium h-10"
                            onClick={() => toast(`Viewing ${item.label}`)}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={`h-4 w-4 ${item.active ? 'text-primary' : 'text-muted-foreground'}`} />
                                <span>{item.label}</span>
                            </div>
                            {item.count && (
                                <Badge variant="default" className="h-5 px-1.5 min-w-[20px] justify-center text-[10px]">
                                    {item.count}
                                </Badge>
                            )}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <Card className="flex-1 flex flex-col overflow-hidden border shadow-sm">
                <div className="p-4 border-b flex items-center justify-between gap-4 bg-muted/20">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search emails..." className="pl-9 bg-background/50 h-9" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction("archived")}><Archive className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction("deleted")}><Trash2 className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAction("marked as spam")}><AlertCircle className="h-4 w-4" /></Button>
                        <div className="w-[1px] h-4 bg-border mx-1" />
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info("More email options")}><MoreVertical className="h-4 w-4" /></Button>
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="divide-y text-start">
                        {emails.map((email) => (
                            <div
                                key={email.id}
                                className={`p-4 flex gap-4 cursor-pointer hover:bg-muted/30 transition-colors ${selectedId === email.id ? 'bg-primary/5 border-l-2 border-primary' : ''} ${!email.read ? 'bg-muted/10' : ''}`}
                                onClick={() => setSelectedId(email.id)}
                            >
                                <div className="pt-1">
                                    <Star className={`h-4 w-4 ${email.starred ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} onClick={(e) => { e.stopPropagation(); toast.success("Starred state toggled"); }} />
                                </div>
                                <div className="flex-1 space-y-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h4 className={`text-sm ${!email.read ? 'font-bold' : 'font-medium'}`}>{email.from}</h4>
                                        <span className="text-xs text-muted-foreground font-medium">{email.date}</span>
                                    </div>
                                    <p className={`text-sm truncate ${!email.read ? 'font-semibold' : 'text-foreground/80'}`}>
                                        {email.subject}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {email.preview}
                                    </p>
                                </div>
                                {email.id === 1 && (
                                    <div className="flex items-center gap-1">
                                        <Paperclip className="h-3 w-3 text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </Card>
        </div>
    )
}
