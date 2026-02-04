"use client"

import * as React from "react"
import { Paperclip, X, Files } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface FileFieldProps extends Omit<React.ComponentProps<"input">, "type"> {
    onFileSelect?: (files: File[] | null) => void
    multiple?: boolean
}

export function FileField({ className, onFileSelect, multiple = false, ...props }: FileFieldProps) {
    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : []
        setSelectedFiles(files)
        if (onFileSelect) onFileSelect(files.length > 0 ? files : null)
    }

    const clearFiles = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedFiles([])
        if (inputRef.current) inputRef.current.value = ""
        if (onFileSelect) onFileSelect(null)
    }

    const getDisplayText = () => {
        if (selectedFiles.length === 0) return null
        if (selectedFiles.length === 1) return selectedFiles[0].name
        return `${selectedFiles.length} files selected`
    }

    const displayText = getDisplayText()

    return (
        <div className={cn("relative group w-full", className)}>
            <div className="relative">
                <Input
                    type="text"
                    readOnly
                    placeholder={displayText || "Select file(s)..."}
                    className={cn(
                        "pr-10 cursor-pointer bg-background dark:bg-zinc-900/50 border-input transition-all select-none caret-transparent",
                        displayText ? "text-foreground font-medium" : "text-muted-foreground"
                    )}
                    onClick={() => inputRef.current?.click()}
                    {...props}
                />
                <div className="absolute right-0 top-0 h-full flex items-center px-3 gap-1">
                    {displayText ? (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-rose-500 rounded-full"
                            onClick={clearFiles}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    ) : (
                        multiple ? (
                            <Files className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        ) : (
                            <Paperclip className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        )
                    )}
                </div>
            </div>
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                multiple={multiple}
                onChange={handleFileChange}
            />
        </div>
    )
}
