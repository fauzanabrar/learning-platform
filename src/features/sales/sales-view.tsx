"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, TrendingUp, CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, Printer, Share2 } from "lucide-react"
import { toast } from "sonner"
import { CardedTable } from "@/components/common/carded-table"

const sales = [
    { id: "ORD-7281", customer: "Alice Johnson", date: "Oct 24, 2024", amount: "$120.00", status: "Paid", method: "Visa **** 4242" },
    { id: "ORD-7282", customer: "Bob Smith", date: "Oct 24, 2024", amount: "$45.00", status: "Pending", method: "PayPal" },
    { id: "ORD-7283", customer: "Charlie Davis", date: "Oct 23, 2024", amount: "$280.00", status: "Paid", method: "Mastercard **** 5555" },
    { id: "ORD-7284", customer: "Diana Prince", date: "Oct 22, 2024", amount: "$3,500.00", status: "Paid", method: "Apple Pay" },
    { id: "ORD-7285", customer: "Edward Norton", date: "Oct 21, 2024", amount: "$99.00", status: "Refunded", method: "Visa **** 1234" },
]

export function SalesView() {
    return (
        <div className="space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
                <p className="text-muted-foreground">Track your transactions and billing history in real-time.</p>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2" onClick={() => window.print()}>
                    <Printer className="h-4 w-4" /> Print
                </Button>
                <Button
                    className="gap-2"
                    onClick={() => toast.success("Sales report shared successfully")}
                >
                    <Share2 className="h-4 w-4" /> Share Report
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Revenue", val: "$45,231", icon: DollarSign, delta: "+20%", pos: true },
                    { title: "Transactions", val: "1,204", icon: CreditCard, delta: "+15%", pos: true },
                    { title: "Avg. Value", val: "$89.50", icon: TrendingUp, delta: "-2%", pos: false },
                    { title: "Active Subs", val: "482", icon: ShoppingCart, delta: "+5%", pos: true },
                ].map((stat, i) => (
                    <Card
                        key={i}
                        className="border-none shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
                        onClick={() => toast.info(`Viewing trends for ${stat.title}`)}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.val}</div>
                            <p
                                className={`text-[10px] font-bold flex items-center gap-1 mt-1 ${
                                    stat.pos ? "text-emerald-500" : "text-rose-500"
                                }`}
                            >
                                {stat.pos ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                {stat.delta} from last week
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <CardedTable
                title="Recent Transactions"
                description="A list of your most recent sales across all channels."
            >
                <Table className="min-w-[800px]">
                    <TableHeader className="bg-muted/5 text-start">
                        <TableRow>
                            <TableHead className="w-[120px] px-6 py-4">Order ID</TableHead>
                            <TableHead className="px-6 py-4">Customer</TableHead>
                            <TableHead className="px-6 py-4">Date</TableHead>
                            <TableHead className="px-6 py-4">Payment Method</TableHead>
                            <TableHead className="text-right px-6 py-4">Status</TableHead>
                            <TableHead className="text-right px-6 py-4">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sales.map((sale) => (
                            <TableRow
                                key={sale.id}
                                className="hover:bg-muted/10 transition-colors border-b-muted/50 cursor-pointer text-start"
                                onClick={() => toast.info(`Transaction #${sale.id} details`)}
                            >
                                <TableCell className="font-mono text-xs font-bold text-primary px-6 py-4">
                                    {sale.id}
                                </TableCell>
                                <TableCell className="font-medium px-6 py-4">{sale.customer}</TableCell>
                                <TableCell className="text-muted-foreground text-xs px-6 py-4">{sale.date}</TableCell>
                                <TableCell className="text-xs font-medium px-6 py-4">{sale.method}</TableCell>
                                <TableCell className="text-right px-6 py-4">
                                    <Badge
                                        className={`font-bold uppercase tracking-wider text-[9px] border-none px-2.5 py-0.5 ${
                                            sale.status === "Paid"
                                                ? "bg-emerald-500 text-white shadow-sm"
                                                : sale.status === "Pending"
                                                ? "bg-amber-500 text-white shadow-sm"
                                                : "bg-rose-500 text-white shadow-sm"
                                        }`}
                                    >
                                        {sale.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-bold text-sm px-6 py-4">
                                    {sale.amount}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardedTable>
        </div>
    )
}
