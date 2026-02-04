"use client"

import { FileUploader } from "@/components/common/file-uploader"
import { FileField } from "@/components/ui/file-field"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AssetSection() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="bg-muted/10">
                    <CardTitle>Single File Upload</CardTitle>
                    <CardDescription>Restricted to one file at a time, perfect for profile pictures or identity docs.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <FileUploader multiple={false} />
                </CardContent>
            </Card>
            <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="bg-muted/10">
                    <CardTitle>Multi-File Upload</CardTitle>
                    <CardDescription>Allow users to drop a batch of files, suitable for project assets or gallery uploads.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <FileUploader multiple={true} />
                </CardContent>
            </Card>
            <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="bg-muted/10">
                    <CardTitle>Field File Upload</CardTitle>
                    <CardDescription>A compact, input-styled file selector for forms and settings pages.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Standard Field</label>
                        <FileField />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Multi-File Field</label>
                        <FileField multiple={true} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
