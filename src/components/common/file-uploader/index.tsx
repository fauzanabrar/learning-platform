"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useFileUpload } from "@/hooks/use-file-upload"
import { UploadZone } from "./upload-zone"
import { FileItem } from "./file-item"

interface FileUploaderProps {
    className?: string
    multiple?: boolean
}

export function FileUploader({ className, multiple = true }: FileUploaderProps) {
    const { files, handleUpload, removeFile } = useFileUpload(multiple)

    return (
        <div className={cn("space-y-4", className)}>
            <UploadZone multiple={multiple} onFilesSelected={handleUpload} />

            {files.length > 0 && (
                <div className="grid gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {files.map((file) => (
                        <FileItem key={file.id} file={file} onRemove={removeFile} />
                    ))}
                </div>
            )}
        </div>
    )
}
