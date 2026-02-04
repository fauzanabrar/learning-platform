"use client"

import { DatePicker } from "@/components/ui/date-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ScheduleSection() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="bg-muted/10">
                    <CardTitle>Single Date Picker</CardTitle>
                    <CardDescription>Standard date selection for forms, birthdays, or specific event dates.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Select Date</label>
                        <DatePicker />
                    </div>
                </CardContent>
            </Card>
            <Card className="border-none shadow-md lg:col-span-2 overflow-hidden">
                <CardHeader className="bg-muted/10">
                    <CardTitle>Date Range Picker</CardTitle>
                    <CardDescription>Allow users to select a timeframe, ideal for reports, bookings, or analytics filters.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Select Range</label>
                        <DateRangePicker />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
