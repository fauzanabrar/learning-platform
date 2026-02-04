"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuTrigger,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubTrigger,
    ContextMenuSubContent
} from "@/components/ui/context-menu"
import { MousePointer2 } from "lucide-react"

export function ContextExample() {
    return (
        <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-muted/10">
                <CardTitle>Context Menu</CardTitle>
                <CardDescription>Right-click interactions for contextual actions on specific elements.</CardDescription>
            </CardHeader>
            <CardContent className="p-10">
                <ContextMenu>
                    <ContextMenuTrigger className="flex h-[180px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-sm font-bold text-muted-foreground hover:bg-muted/30 transition-all cursor-context-menu bg-muted/10 group">
                        <div className="text-center space-y-2 group-hover:scale-105 transition-transform duration-300">
                            <MousePointer2 className="h-8 w-8 mx-auto opacity-20" />
                            <p>Right click anywhere here</p>
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-64">
                        <ContextMenuItem className="gap-2 cursor-pointer" inset>
                            Back
                            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem className="gap-2 cursor-pointer" inset disabled>
                            Forward
                            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem className="gap-2 cursor-pointer" inset>
                            Reload
                            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuSub>
                            <ContextMenuSubTrigger className="gap-2 cursor-pointer" inset>More Tools</ContextMenuSubTrigger>
                            <ContextMenuSubContent className="w-48">
                                <ContextMenuItem className="gap-2 cursor-pointer">
                                    Save Page As...
                                    <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuItem className="gap-2 cursor-pointer">Inspect Element</ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuItem className="gap-2 cursor-pointer">Developer Tools</ContextMenuItem>
                            </ContextMenuSubContent>
                        </ContextMenuSub>
                        <ContextMenuSeparator />
                        <ContextMenuLabel className="font-black text-[10px] uppercase tracking-widest opacity-50 px-2 py-1.5" inset>Display Options</ContextMenuLabel>
                        <ContextMenuSeparator />
                        <ContextMenuItem className="gap-2 cursor-pointer" inset>
                            Show Sidebar
                            <ContextMenuShortcut>⇧⌘B</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem className="gap-2 cursor-pointer" inset>Full Resolution</ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </CardContent>
        </Card>
    )
}
