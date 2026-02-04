"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Plus, Key, Copy, Trash2, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { CardedTable } from "@/components/common/carded-table"

const initialKeys = [
    { id: 1, name: "Production API", key: "ak_live_7281...x82", status: "Active", created: "Oct 20, 2024", lastUsed: "2 mins ago" },
    { id: 2, name: "Staging Key", key: "ak_test_4123...q90", status: "Active", created: "Oct 15, 2024", lastUsed: "1 day ago" },
    { id: 3, name: "Mobile App Key", key: "ak_live_9921...k33", status: "Revoked", created: "Sep 28, 2024", lastUsed: "Never" },
]

export function ApiKeysView() {
    const [keys, setKeys] = useState(initialKeys)
    const [showKeys, setShowKeys] = useState<Record<number, boolean>>({})
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [keyToDelete, setKeyToDelete] = useState<number | null>(null)
    const [newKeyName, setNewKeyName] = useState("")

    const toggleHide = (id: number) => {
        setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    const copyToClipboard = (key: string) => {
        navigator.clipboard.writeText(key)
        toast.success("API Key copied to clipboard")
    }

    const handleGenerateKey = () => {
        if (!newKeyName.trim()) {
            toast.error("Please enter a name for the key")
            return
        }

        const newKey = {
            id: Date.now(),
            name: newKeyName,
            key: `ak_live_${Math.random().toString(36).substring(7)}...${Math.random()
                .toString(36)
                .substring(7)}`,
            status: "Active",
            created: "Just now",
            lastUsed: "Never",
        }

        setKeys([...keys, newKey])
        toast.success("New API key generated")
        setIsAddDialogOpen(false)
        setNewKeyName("")
    }

    const handleDeleteKey = () => {
        if (keyToDelete === null) return
        setKeys(keys.filter((k) => k.id !== keyToDelete))
        toast.success("API key revoked and deleted")
        setIsDeleteDialogOpen(false)
        setKeyToDelete(null)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">API Management</h2>
                    <p className="text-muted-foreground">Manage your secret keys and integrate with external services.</p>
                </div>
                <Button className="gap-2 shadow-lg" onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="h-4 w-4" /> Generate New Key
                </Button>
            </div>

            <CardedTable
                className="shadow-md overflow-hidden bg-white/50 dark:bg-card/50 backdrop-blur-sm"
                headerContent={
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div className="text-start">
                            <CardTitle>Your API Keys</CardTitle>
                            <CardDescription>
                                Keep these keys secret. Do not share them in public repositories.
                            </CardDescription>
                        </div>
                    </div>
                }
            >
                <Table className="min-w-[800px]">
                    <TableHeader className="bg-muted/5 text-start">
                        <TableRow>
                            <TableHead className="px-6 py-4 border-none">Name</TableHead>
                            <TableHead className="px-6 py-4 border-none">API Key</TableHead>
                            <TableHead className="px-6 py-4 border-none">Status</TableHead>
                            <TableHead className="px-6 py-4 border-none">Created</TableHead>
                            <TableHead className="px-6 py-4 border-none">Last Used</TableHead>
                            <TableHead className="w-[100px] px-6 py-4 border-none text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {keys.map((key) => (
                            <TableRow
                                key={key.id}
                                className="group hover:bg-muted/20 transition-colors border-b-muted/50 text-start"
                            >
                                <TableCell className="px-6 py-5 font-bold text-sm">{key.name}</TableCell>
                                <TableCell className="px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <code className="bg-muted/50 px-2 py-1 rounded text-xs font-mono text-muted-foreground">
                                            {showKeys[key.id] ? key.key : "••••••••••••••••••••"}
                                        </code>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                            onClick={() => toggleHide(key.id)}
                                        >
                                            {showKeys[key.id] ? (
                                                <EyeOff className="h-3 w-3" />
                                            ) : (
                                                <Eye className="h-3 w-3" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                                            onClick={() => copyToClipboard(key.key)}
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-5">
                                    <Badge
                                        className={`font-bold uppercase tracking-wider text-[9px] border-none px-2.5 ${
                                            key.status === "Active"
                                                ? "bg-emerald-500 text-white"
                                                : "bg-rose-500 text-white"
                                        }`}
                                    >
                                        {key.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-6 py-5 text-xs text-muted-foreground">
                                    {key.created}
                                </TableCell>
                                <TableCell className="px-6 py-5 text-xs font-medium">{key.lastUsed}</TableCell>
                                <TableCell className="px-6 py-5 text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => {
                                            setKeyToDelete(key.id)
                                            setIsDeleteDialogOpen(true)
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardedTable>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-none shadow-sm bg-gradient-to-br from-primary/5 to-transparent">
                    <CardHeader className="text-start">
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                            <Key className="h-4 w-4 text-primary" /> Webhook Integration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-xs text-muted-foreground text-start">
                            Configure webhooks to receive real-time notifications when events happen in your account.
                        </p>
                        <div className="flex gap-2">
                            <Input placeholder="https://your-domain.com/webhook" className="bg-background/50 text-xs h-9" />
                            <Button size="sm">Connect</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-gradient-to-br from-secondary/5 to-transparent">
                    <CardHeader className="text-start">
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                            <Eye className="h-4 w-4 text-secondary" /> Access Logs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground mb-4 text-start">
                            Monitor recent API requests and identify potential security issues with detailed access logs.
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                            View Audit Trail
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Generate New Key</DialogTitle>
                        <DialogDescription>
                            Give your new API key a name to help you identify it later.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2 text-start">
                            <Label htmlFor="keyName">Key Name</Label>
                            <Input
                                id="keyName"
                                value={newKeyName}
                                onChange={(e) => setNewKeyName(e.target.value)}
                                placeholder="e.g. My Application"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleGenerateKey}>Generate Key</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Revoke API Key</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to revoke this key? Any application using this key will immediately lose access.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteKey}>
                            Revoke & Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
