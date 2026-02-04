"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Search, Filter, MoreHorizontal, Download, UserPlus, Trash2, Mail, User } from "lucide-react"
import { CardedTable } from "@/components/common/carded-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const initialCustomers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Active", spent: "$1,200.00", orders: 12, avatar: "AJ" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Inactive", spent: "$450.00", orders: 5, avatar: "BS" },
    { id: 3, name: "Charlie Davis", email: "charlie@example.com", status: "Active", spent: "$2,800.00", orders: 24, avatar: "CD" },
    { id: 4, name: "Diana Prince", email: "diana@example.com", status: "Active", spent: "$3,500.00", orders: 30, avatar: "DP" },
    { id: 5, name: "Edward Norton", email: "edward@example.com", status: "Banned", spent: "$0.00", orders: 0, avatar: "EN" },
]

export function CustomersView() {
    const [customers, setCustomers] = useState(initialCustomers)
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [customerToDelete, setCustomerToDelete] = useState<number | null>(null)

    const [newName, setNewName] = useState("")
    const [newEmail, setNewEmail] = useState("")

    const handleAddCustomer = () => {
        if (!newName.trim() || !newEmail.trim()) {
            toast.error("Please fill in all fields")
            return
        }

        const newCustomer = {
            id: Date.now(),
            name: newName,
            email: newEmail,
            status: "Active",
            spent: "$0.00",
            orders: 0,
            avatar: newName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase(),
        }

        setCustomers([newCustomer, ...customers])
        toast.success("Customer added successfully")
        setIsAddDialogOpen(false)
        setNewName("")
        setNewEmail("")
    }

    const handleDeleteCustomer = () => {
        if (customerToDelete === null) return
        setCustomers(customers.filter((c) => c.id !== customerToDelete))
        toast.success("Customer deleted successfully")
        setIsDeleteDialogOpen(false)
        setCustomerToDelete(null)
    }

    return (
        <div className="space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                <p className="text-muted-foreground">View and manage your client database and their activity.</p>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => toast.success("Customer list exported to CSV")}
                >
                    <Download className="h-4 w-4" /> Export
                </Button>
                <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
                    <UserPlus className="h-4 w-4" /> Add Customer
                </Button>
            </div>

            <CardedTable
                title="Customer Table"
                headerContent={
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
                        <div className="relative w-full md:max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search customers..." className="pl-9 h-10 bg-background" />
                        </div>
                        <Button
                            variant="ghost"
                            className="gap-2 h-10 border border-muted-foreground/10 bg-background hover:bg-muted/50"
                            onClick={() => toast.info("Filter sidebar opened")}
                        >
                            <Filter className="h-4 w-4" /> Filter
                        </Button>
                    </div>
                }
            >
                <Table className="min-w-[800px]">
                    <TableHeader className="bg-muted/5 text-start">
                        <TableRow>
                            <TableHead className="w-[80px] px-6 py-4 border-none">Avatar</TableHead>
                            <TableHead className="px-6 py-4 border-none">Customer</TableHead>
                            <TableHead className="px-6 py-4 border-none">Status</TableHead>
                            <TableHead className="text-right px-6 py-4 border-none">Orders</TableHead>
                            <TableHead className="text-right px-6 py-4 border-none">Total Spent</TableHead>
                            <TableHead className="w-[50px] px-6 py-4 text-right border-none">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow
                                key={customer.id}
                                className="group hover:bg-muted/20 transition-colors border-b-muted/50 text-start"
                            >
                                <TableCell className="px-6 py-4">
                                    <Avatar className="h-10 w-10 border border-border shadow-sm">
                                        <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-bold">
                                            {customer.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-bold text-sm text-foreground">{customer.name}</span>
                                        <span className="text-xs text-muted-foreground">{customer.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <Badge
                                        variant="outline"
                                        className={`font-bold uppercase tracking-wider text-[9px] border-none px-2.5 py-0.5 ${
                                            customer.status === "Active"
                                                ? "bg-emerald-500/10 text-emerald-500"
                                                : customer.status === "Inactive"
                                                ? "bg-amber-500/10 text-amber-500"
                                                : "bg-rose-500/10 text-rose-500"
                                        }`}
                                    >
                                        {customer.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium text-sm px-6 py-4">
                                    {customer.orders}
                                </TableCell>
                                <TableCell className="text-right font-bold text-sm text-primary px-6 py-4">
                                    {customer.spent}
                                </TableCell>
                                <TableCell className="px-6 py-4 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-40">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => toast.info(`Viewing ${customer.name}`)}>
                                                View Profile
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => toast.info(`Editing ${customer.name}`)}>
                                                Edit Details
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-rose-500 focus:text-rose-500"
                                                onClick={() => {
                                                    setCustomerToDelete(customer.id)
                                                    setIsDeleteDialogOpen(true)
                                                }}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardedTable>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Customer</DialogTitle>
                        <DialogDescription>
                            Create a new customer profile. Fill in the details below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2 text-start">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="h-3 w-3" /> Full Name
                            </Label>
                            <Input
                                id="name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="e.g. John Doe"
                            />
                        </div>
                        <div className="grid gap-2 text-start">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-3 w-3" /> Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddCustomer}>Add Customer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Customer</DialogTitle>
                        <DialogDescription>
                            This will permanently delete the customer record. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteCustomer}>
                            Delete Permanent
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
