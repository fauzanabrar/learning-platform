"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code } from "lucide-react"

export function InteractionSection() {
    return (
        <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-muted/10">
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Core interactive elements with different semantic meanings.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Button>Default</Button>
                        <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Primary</span>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Button variant="secondary">Secondary</Button>
                        <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Neutral</span>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Button variant="outline">Outline</Button>
                        <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Ghosted</span>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Button variant="ghost">Ghost</Button>
                        <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Invisible</span>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Button variant="destructive">Destructive</Button>
                        <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Danger</span>
                    </div>
                </div>

                <div className="p-8 bg-zinc-950 rounded-2xl relative group border border-zinc-800">
                    <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity">
                        <Code className="h-4 w-4 text-emerald-500" />
                    </div>
                    <pre className="text-emerald-500/80 font-mono text-xs overflow-x-auto leading-relaxed">
                        {`<Button variant="primary">Submit</Button>\n<Button variant="outline" size="sm">Cancel</Button>\n<Button variant="ghost" size="icon">\n  <Settings className="h-4 w-4" />\n</Button>`}
                    </pre>
                </div>
            </CardContent>
        </Card>
    )
}
