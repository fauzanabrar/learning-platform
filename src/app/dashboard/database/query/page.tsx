"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Save, History, Search, Table as TableIcon, Database } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function QueryEditorPage() {
    const [query, setQuery] = useState("SELECT * FROM users WHERE active = true LIMIT 10;")
    const [executing, setExecuting] = useState(false);
    const [hasResults, setHasResults] = useState(false);

    const handleRun = () => {
        setExecuting(true);
        setHasResults(false);

        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 800)),
            {
                loading: 'Executing SQL...',
                success: () => {
                    setExecuting(false);
                    setHasResults(true);
                    return 'Query returned 10 rows';
                },
                error: 'Query execution failed',
            }
        );
    }

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Query Editor</h2>
                    <p className="text-muted-foreground">Run native SQL queries against your database instance.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("Query history is empty")}>
                        <History className="h-4 w-4" /> History
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.success("Query saved to favorites")}>
                        <Save className="h-4 w-4" /> Save
                    </Button>
                    <Button
                        size="sm"
                        className="gap-2 shadow-lg bg-emerald-600 hover:bg-emerald-700"
                        onClick={handleRun}
                        disabled={executing}
                    >
                        <Play className={`h-4 w-4 ${executing ? 'animate-pulse' : ''}`} /> Run Query
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Explorer */}
                <Card className="w-64 shrink-0 flex flex-col overflow-hidden border shadow-sm">
                    <CardHeader className="py-3 bg-muted/20 border-b">
                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Schema Explorer</CardTitle>
                    </CardHeader>
                    <ScrollArea className="flex-1">
                        <div className="p-2 space-y-1">
                            {["users", "profiles", "sessions", "accounts", "posts", "comments"].map((table) => (
                                <div
                                    key={table}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer group transition-colors"
                                    onClick={() => setQuery(`SELECT * FROM ${table} LIMIT 10;`)}
                                >
                                    <TableIcon className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                                    <span className="text-xs font-medium">{table}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </Card>

                <div className="flex-1 flex flex-col gap-6 overflow-hidden text-start">
                    {/* Editor */}
                    <Card className="flex-1 flex flex-col overflow-hidden border shadow-md bg-zinc-950 text-zinc-100">
                        <div className="px-4 py-2 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                            <div className="flex items-center gap-2">
                                <Database className="h-3 w-3 text-emerald-500" />
                                <span className="text-[10px] font-bold uppercase tracking-tighter opacity-50">PostgreSQL Session</span>
                            </div>
                            <span className="text-[10px] font-mono opacity-30 italic">Line 1, Col {query.length}</span>
                        </div>
                        <textarea
                            className="flex-1 bg-transparent p-6 font-mono text-sm resize-none focus:outline-none focus:ring-0 selection:bg-emerald-500/20"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            spellCheck={false}
                        />
                    </Card>

                    {/* Results / Console */}
                    <Card className="h-1/3 flex flex-col overflow-hidden border shadow-sm">
                        <CardHeader className="py-2 px-4 border-b bg-muted/10 flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="text-xs font-bold">Query Results</CardTitle>
                            {hasResults && <span className="text-[10px] text-emerald-500 font-bold">Success: 12ms</span>}
                        </CardHeader>
                        <CardContent className="flex-1 p-0 flex items-center justify-center bg-muted/5">
                            {hasResults ? (
                                <div className="p-4 w-full h-full overflow-auto">
                                    <div className="text-xs font-mono opacity-60">
                                        [Row 1] id: 1, name: "Admin", active: true... <br />
                                        [Row 2] id: 2, name: "User_A", active: true... <br />
                                        [Row 3] id: 3, name: "User_B", active: true...
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 opacity-20">
                                    <Search className="h-8 w-8" />
                                    <span className="text-xs font-medium font-mono">No data returned or query not yet executed</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
