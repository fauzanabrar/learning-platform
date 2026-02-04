"use client"

import * as React from "react"
import { toast } from "sonner"

export interface FileWithProgress {
    id: string
    file: File
    progress: number
    status: "uploading" | "completed" | "error"
}

export function useFileUpload(multiple: boolean = true) {
    const [files, setFiles] = React.useState<FileWithProgress[]>([])

    const handleUpload = React.useCallback((newFiles: File[]) => {
        const mappedFiles: FileWithProgress[] = newFiles.map(f => ({
            id: Math.random().toString(36).substring(7),
            file: f,
            progress: 0,
            status: "uploading"
        }))

        if (multiple) {
            setFiles(prev => [...prev, ...mappedFiles])
        } else {
            setFiles(mappedFiles)
        }

        // Simulate upload progress
        mappedFiles.forEach(file => {
            let p = 0
            const interval = setInterval(() => {
                p += Math.floor(Math.random() * 30)
                if (p >= 100) {
                    p = 100
                    clearInterval(interval)
                    setFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress: 100, status: "completed" } : f))
                    toast.success(`${file.file.name} uploaded successfully`)
                } else {
                    setFiles(prev => prev.map(f => f.id === file.id ? { ...f, progress: p } : f))
                }
            }, 400)
        })
    }, [multiple])

    const removeFile = React.useCallback((id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id))
    }, [])

    return {
        files,
        handleUpload,
        removeFile
    }
}
