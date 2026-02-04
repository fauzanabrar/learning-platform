"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export function AppearanceSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Theme Preferences</CardTitle>
                <CardDescription>
                    Customize the look and feel of the application.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Label>Theme Mode</Label>
                        <p className="text-sm text-muted-foreground">
                            Select your preferred theme.
                        </p>
                    </div>
                    <ModeToggle />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Label htmlFor="reduced-motion">Reduced Motion</Label>
                        <p className="text-sm text-muted-foreground">
                            Reduce animations for accessibility.
                        </p>
                    </div>
                    <Switch id="reduced-motion" />
                </div>
            </CardContent>
        </Card>
    )
}
