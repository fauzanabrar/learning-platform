"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { GripVertical, MessageSquare, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"

export type Task = {
    id: string;
    title: string;
    priority: "High" | "Medium" | "Low";
    owner: string;
    comments: number;
    attachments: number;
    tags: string[];
    description?: string;
}

interface TaskCardProps {
    task: Task;
    colId: string;
    isDragged: boolean;
    onDragStart: (e: React.DragEvent, taskId: string, colId: string) => void;
    onDragEnd: () => void;
    onClick: (task: Task) => void;
}

export function TaskCard({ task, colId, isDragged, onDragStart, onDragEnd, onClick }: TaskCardProps) {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, task.id, colId)}
            onDragEnd={onDragEnd}
            onClick={() => onClick(task)}
            className="transition-transform active:scale-[0.98] touch-none"
        >
            <Card className={cn(
                "group relative border dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing bg-white dark:bg-zinc-900 overflow-hidden",
                isDragged ? "opacity-50 grayscale" : "opacity-100"
            )}>
                <CardContent className="p-4 space-y-4">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-wrap gap-1.5">
                            <Badge variant="secondary" className={cn(
                                "text-[10px] uppercase font-bold px-2 py-0 h-5 flex items-center",
                                task.priority === 'High' ? 'bg-rose-500/10 text-rose-500' :
                                    task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                                        'bg-indigo-500/10 text-indigo-500'
                            )}>
                                {task.priority}
                            </Badge>
                            {task.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted dark:bg-zinc-800 text-muted-foreground uppercase tracking-tight italic">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <GripVertical className="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors" />
                    </div>

                    <p className="font-semibold text-sm text-start leading-snug dark:text-zinc-200">
                        {task.title}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t dark:border-zinc-800">
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <MessageSquare className="h-3.5 w-3.5" />
                                <span className="text-[10px] font-bold">{task.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Paperclip className="h-3.5 w-3.5" />
                                <span className="text-[10px] font-bold">{task.attachments}</span>
                            </div>
                        </div>
                        <Avatar className="h-6 w-6 border dark:border-zinc-800">
                            <AvatarFallback className="text-[9px] font-bold bg-indigo-500 text-white leading-none">
                                {task.owner}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
