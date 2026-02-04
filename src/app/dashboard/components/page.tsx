"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar } from "@/components/ui/calendar"
import { AssetSection } from "@/app/dashboard/components/primitives/components/asset-section"
import { ContainmentSection } from "@/app/dashboard/components/primitives/components/containment-section"
import { IdentificationSection } from "@/app/dashboard/components/primitives/components/identification-section"
import { InteractionSection } from "@/app/dashboard/components/primitives/components/interaction-section"
import { MenuSection } from "@/app/dashboard/components/primitives/components/menu-section"
import { ScheduleSection } from "@/app/dashboard/components/primitives/components/schedule-section"
import { CheckCircle2, Info } from "lucide-react"

export default function ComponentsPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <div className="space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Component Gallery</h1>
                <p className="text-muted-foreground">A straightforward showcase of the core UI pieces.</p>
            </div>

            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Actions</h2>
                    <p className="text-sm text-muted-foreground">Buttons in common styles and sizes.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Button Variants</CardTitle>
                            <CardDescription>Primary, subtle, outline, ghost, and link.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Button>Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="link">Link</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Button Sizes</CardTitle>
                            <CardDescription>Compact to prominent actions.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap items-center gap-2">
                            <Button size="sm">Small</Button>
                            <Button>Default</Button>
                            <Button size="lg">Large</Button>
                            <Button size="icon">
                                <Info className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Forms</h2>
                    <p className="text-sm text-muted-foreground">Inputs, selects, toggles, and sliders.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Text Inputs</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="name@company.com" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="••••••••" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Add a few details..." rows={3} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Select</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Label>Favorite fruit</Label>
                            <Select defaultValue="apple">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pick one" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="orange">Orange</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Choices & Toggles</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Checkboxes</p>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="cb-1" defaultChecked />
                                    <Label htmlFor="cb-1">Marketing emails</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="cb-2" />
                                    <Label htmlFor="cb-2">Weekly summary</Label>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Radio group</p>
                                <RadioGroup defaultValue="option-1">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-1" id="option-1" />
                                        <Label htmlFor="option-1">Option one</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-2" id="option-2" />
                                        <Label htmlFor="option-2">Option two</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium leading-none">Notifications</p>
                                        <p className="text-xs text-muted-foreground">Enable product updates.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="space-y-1">
                                    <Label>Volume</Label>
                                    <Slider defaultValue={[40]} max={100} step={5} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Feedback</h2>
                    <p className="text-sm text-muted-foreground">Badges, alerts, and progress.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Badges</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Badge>Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge className="bg-emerald-100 text-emerald-900">Success</Badge>
                            <Badge className="bg-blue-100 text-blue-900">Info</Badge>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Alerts & Progress</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Alert>
                                    <CheckCircle2 className="h-4 w-4" />
                                    <AlertTitle>Success</AlertTitle>
                                    <AlertDescription>Your changes were saved.</AlertDescription>
                                </Alert>
                                <Alert variant="destructive">
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>Action failed. Try again.</AlertDescription>
                                </Alert>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span className="text-muted-foreground">40%</span>
                                </div>
                                <Progress value={40} />
                                <div className="flex justify-between text-sm">
                                    <span>Uploading</span>
                                    <span className="text-muted-foreground">72%</span>
                                </div>
                                <Progress value={72} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Overlays</h2>
                    <p className="text-sm text-muted-foreground">Dialogs, popovers, and tooltips.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dialog</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>Open dialog</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Review changes</DialogTitle>
                                        <DialogDescription>Confirm before applying updates.</DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Popover</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">Open popover</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-72">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium leading-none">Dimensions</p>
                                        <p className="text-xs text-muted-foreground">Set the layer size.</p>
                                        <div className="grid grid-cols-3 items-center gap-2">
                                            <Label htmlFor="width">Width</Label>
                                            <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tooltip</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost">Hover me</Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs">Helpful microcopy.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Navigation</h2>
                    <p className="text-sm text-muted-foreground">Tabs, accordion, and calendar.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tabs</CardTitle>
                            <CardDescription>Segmented content panels.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="overview" className="space-y-2">
                                <TabsList className="w-full justify-start">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="details">Details</TabsTrigger>
                                    <TabsTrigger value="activity">Activity</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview" className="text-sm text-muted-foreground">
                                    Overview content for this tab.
                                </TabsContent>
                                <TabsContent value="details" className="text-sm text-muted-foreground">
                                    Detailed information and descriptions.
                                </TabsContent>
                                <TabsContent value="activity" className="text-sm text-muted-foreground">
                                    Recent activity and history.
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Accordion</CardTitle>
                            <CardDescription>Expandable content groups.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>What is this UI kit?</AccordionTrigger>
                                    <AccordionContent>A collection of reusable components and patterns.</AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Can I customize it?</AccordionTrigger>
                                    <AccordionContent>Yes, theme it via tokens.</AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Calendar</CardTitle>
                            <CardDescription>Pick a date without overlap.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border bg-card text-card-foreground shadow-sm"
                            />
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Primitives</h2>
                    <p className="text-sm text-muted-foreground">Foundational building blocks grouped by purpose.</p>
                </div>
                <div className="space-y-6">
                    <InteractionSection />
                    <IdentificationSection />
                    <ContainmentSection />
                    <AssetSection />
                    <ScheduleSection />
                    <MenuSection />
                </div>
            </section>
        </div>
    )
}
