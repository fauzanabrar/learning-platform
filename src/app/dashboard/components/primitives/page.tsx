"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Box, CalendarDays, Layers, List, MousePointer2, Upload } from "lucide-react"

import { InteractionSection } from "./components/interaction-section"
import { IdentificationSection } from "./components/identification-section"
import { ContainmentSection } from "./components/containment-section"
import { AssetSection } from "./components/asset-section"
import { ScheduleSection } from "./components/schedule-section"
import { MenuSection } from "./components/menu-section"

export default function PrimitivesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">UI Primitives</h2>
                    <p className="text-muted-foreground">The foundational building blocks of our design system.</p>
                </div>
            </div>

            <Tabs defaultValue="buttons" className="space-y-6">
                <TabsList className="bg-muted/50 p-1 border">
                    <TabsTrigger value="buttons" className="gap-2"><MousePointer2 className="h-4 w-4" /> Interaction</TabsTrigger>
                    <TabsTrigger value="badges" className="gap-2"><Layers className="h-4 w-4" /> Identification</TabsTrigger>
                    <TabsTrigger value="cards" className="gap-2"><Box className="h-4 w-4" /> Containment</TabsTrigger>
                    <TabsTrigger value="uploads" className="gap-2"><Upload className="h-4 w-4" /> Assets</TabsTrigger>
                    <TabsTrigger value="schedule" className="gap-2"><CalendarDays className="h-4 w-4" /> Schedule</TabsTrigger>
                    <TabsTrigger value="menus" className="gap-2"><List className="h-4 w-4" /> Menus</TabsTrigger>
                </TabsList>

                <TabsContent value="buttons" className="space-y-6">
                    <InteractionSection />
                </TabsContent>

                <TabsContent value="badges" className="space-y-6">
                    <IdentificationSection />
                </TabsContent>

                <TabsContent value="cards" className="space-y-6">
                    <ContainmentSection />
                </TabsContent>

                <TabsContent value="uploads" className="space-y-6">
                    <AssetSection />
                </TabsContent>

                <TabsContent value="schedule" className="space-y-6">
                    <ScheduleSection />
                </TabsContent>

                <TabsContent value="menus" className="space-y-6">
                    <MenuSection />
                </TabsContent>
            </Tabs>
        </div>
    )
}
