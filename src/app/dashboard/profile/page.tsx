"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
    return (
        <div className="space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <p className="text-muted-foreground">This is how others will see you on the site.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: User Info */}
                <div className="flex-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" defaultValue="admin_user" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" placeholder="Tell us a little bit about yourself" className="resize-none" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" defaultValue="admin@example.com" disabled />
                            </div>
                            <Button>Save profile</Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Avatar & Account */}
                <div className="w-full lg:w-80 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Avatar</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" className="w-full">Change Avatar</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Plan</span>
                                <span className="text-sm text-muted-foreground">Pro</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Member since</span>
                                <span className="text-sm text-muted-foreground">Jan 2024</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
