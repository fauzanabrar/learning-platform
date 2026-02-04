"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ContainmentSection() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-2 border-primary shadow-2xl relative overflow-hidden">
                <div className="absolute -right-8 -top-8 h-24 w-24 bg-primary/10 rounded-full blur-2xl" />
                <CardHeader>
                    <CardTitle>Featured Card</CardTitle>
                    <CardDescription>High emphasis container with shadows and borders.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm opacity-70 leading-relaxed">
                    Used for primary calls to action or emphasizing specific dashboard metrics. Supports complex layouts and interactions.
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-muted/20">
                <CardHeader>
                    <CardTitle>Subtle Card</CardTitle>
                    <CardDescription>Low emphasis container for supporting content.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm opacity-50 leading-relaxed">
                    Ideal for secondary information, documentation snippets, or background elements that shouldn't grab attention.
                </CardContent>
            </Card>
        </div>
    )
}
