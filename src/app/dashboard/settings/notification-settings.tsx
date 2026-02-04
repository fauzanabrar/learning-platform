"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function NotificationSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                    Configure how you check alerts.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Label htmlFor="email-alerts">Email Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive daily summaries via email.
                        </p>
                    </div>
                    <Switch id="email-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                            Receive real-time alerts in browser.
                        </p>
                    </div>
                    <Switch id="push-notifications" />
                </div>
            </CardContent>
        </Card>
    )
}
