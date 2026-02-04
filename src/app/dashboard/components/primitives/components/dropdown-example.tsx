"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, Mail, MessageSquare, Settings, User, UserPlus } from "lucide-react"

export function DropdownExample() {
    return (
        <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-muted/10">
                <CardTitle>Dropdown Menu</CardTitle>
                <CardDescription>A versatile menu for actions, navigation, and settings.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 flex items-center justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2 px-6 h-12 font-bold shadow-md hover:shadow-lg transition-all border-zinc-200 dark:border-zinc-800">
                            Account Settings <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="center">
                        <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-widest opacity-50 px-2 py-1.5">Personal Space</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                <User className="h-4 w-4 text-indigo-500" />
                                <span className="font-medium">My Profile</span>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                <Settings className="h-4 w-4 text-emerald-500" />
                                <span className="font-medium">Preferences</span>
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="gap-2 cursor-pointer">
                                <UserPlus className="h-4 w-4 text-blue-500" />
                                <span className="font-medium">Invite users</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent className="w-48">
                                    <DropdownMenuItem className="gap-2 cursor-pointer">
                                        <Mail className="h-4 w-4" />
                                        <span>via Email</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="gap-2 cursor-pointer">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>via Message</span>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 cursor-pointer text-rose-500 focus:text-rose-500 focus:bg-rose-500/10">
                            <LogOut className="h-4 w-4" />
                            <span className="font-bold">Log out</span>
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardContent>
        </Card>
    )
}
