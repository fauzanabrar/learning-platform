"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function IdentificationSection() {
    return (
        <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-muted/10">
                <CardTitle>Status Indicators</CardTitle>
                <CardDescription>Badges and tags for metadata and status representation.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-12">
                <div className="flex flex-wrap gap-6 items-center justify-center">
                    <Badge>Stable</Badge>
                    <Badge variant="secondary">In Review</Badge>
                    <Badge variant="outline" className="border-blue-500 text-blue-500">Feature</Badge>
                    <Badge variant="destructive">Urgent</Badge>
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none shadow-md">Completed</Badge>
                    <Badge className="bg-indigo-500 hover:bg-indigo-600 border-none shadow-md">Architecture</Badge>
                </div>
            </CardContent>
        </Card>
    )
}
