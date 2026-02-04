"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, MessageSquare, Paperclip, Trash2, User, Tag, Layout } from "lucide-react"
import { Task } from "./task-card"
import { cn } from "@/lib/utils"

interface TaskDetailsDialogProps {
    task: Task | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete: (taskId: string) => void;
}

export function TaskDetailsDialog({ task, open, onOpenChange, onDelete }: TaskDetailsDialogProps) {
    if (!task) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden border dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl">
                <div className="p-8 space-y-8">
                    <DialogHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Badge variant="secondary" className={cn(
                                "text-[10px] uppercase font-bold px-3 py-1",
                                task.priority === 'High' ? 'bg-rose-500/10 text-rose-500' :
                                    task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                                        'bg-indigo-500/10 text-indigo-500'
                            )}>
                                {task.priority} Priority
                            </Badge>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span className="text-xs font-medium">Updated 2h ago</span>
                            </div>
                        </div>
                        <DialogTitle className="text-2xl font-bold tracking-tight dark:text-zinc-100">
                            {task.title}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Layout className="h-4 w-4" /> Description
                                </h4>
                                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                    {task.description || "No description provided for this task. Add more context to help your team understand the requirements and objectives."}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Tag className="h-4 w-4" /> Tags
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {task.tags.map(tag => (
                                        <Badge key={tag} variant="outline" className="bg-muted/50 dark:bg-zinc-900 border-none font-medium text-xs px-3">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 md:border-l dark:border-zinc-800 md:pl-6">
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <User className="h-4 w-4" /> Assignee
                                </h4>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-indigo-500 text-white font-bold text-xs">
                                            {task.owner}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium dark:text-zinc-200">User {task.owner}</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t dark:border-zinc-800">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Stats</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="flex items-center gap-2 text-muted-foreground">
                                            <MessageSquare className="h-3.5 w-3.5" /> Comments
                                        </span>
                                        <span className="font-bold">{task.comments}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="flex items-center gap-2 text-muted-foreground">
                                            <Paperclip className="h-3.5 w-3.5" /> Attachments
                                        </span>
                                        <span className="font-bold">{task.attachments}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-8 border-t dark:border-zinc-800 flex flex-row items-center justify-between sm:justify-between w-full">
                        <Button
                            variant="ghost"
                            className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 text-xs font-bold gap-2"
                            onClick={() => {
                                onDelete(task.id);
                                onOpenChange(false);
                            }}
                        >
                            <Trash2 className="h-4 w-4" /> Delete Task
                        </Button>
                        <Button
                            className="h-10 px-6 font-bold"
                            onClick={() => onOpenChange(false)}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}
