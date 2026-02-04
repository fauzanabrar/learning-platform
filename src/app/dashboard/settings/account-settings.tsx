"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AccountSettings() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                    Update your personal information.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" defaultValue="Admin User" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="admin@example.com" disabled />
                </div>
                <Button>Save Changes</Button>
            </CardContent>
        </Card>
    )
}
