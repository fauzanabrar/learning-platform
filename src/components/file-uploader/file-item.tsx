"use client"

import { ImageIcon, FileText, CheckCircle2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileWithProgress } from "@/hooks/use-file-upload"

interface FileItemProps {
    file: FileWithProgress
    onRemove: (id: string) => void
}

export function FileItem({ file, onRemove }: FileItemProps) {
    return (
        <div className="p-4 rounded-xl border border-muted dark:border-zinc-800 bg-card/50 dark:bg-zinc-900/50 backdrop-blur-sm flex items-center gap-4 group hover:shadow-md transition-all">
            <div className="h-10 w-10 rounded-lg bg-muted dark:bg-zinc-800 flex items-center justify-center shrink-0">
                {file.file.type.includes("image") ? (
                    <ImageIcon className="h-5 w-5 text-blue-500" />
                ) : (
                    <FileText className="h-5 w-5 text-emerald-500" />
                )}
            </div>
            <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold truncate dark:text-zinc-100">{file.file.name}</p>
                    <span className="text-[10px] font-bold text-muted-foreground">
                        {(file.file.size / 1024).toFixed(1)} KB
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <Progress value={file.progress} className="h-1.5 flex-1 bg-muted dark:bg-zinc-800" />
                    {file.status === "completed" ? (
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                    ) : (
                        <span className="text-[10px] font-black tabular-nums dark:text-zinc-300">
                            {file.progress}%
                        </span>
                    )}
                </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-rose-500 dark:hover:bg-rose-500/10 shrink-0"
                onClick={() => onRemove(file.id)}
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
}
