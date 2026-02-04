"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoutingRuleItem } from "./RoutingRuleItem";

const rules = [
    { id: 1, pattern: "^code.*", model: "claude-3-5-sonnet", type: "regex" },
    { id: 2, pattern: "analysis", model: "claude-3-opus", type: "keyword" },
    { id: 3, pattern: ".*", model: "gpt-4o", type: "default" },
];

export function Router() {
    return (
        <Card className="h-full flex flex-col border shadow-sm bg-white/50 dark:bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-lg">Routing Rules</CardTitle>
                    <CardDescription>Dispatch requests to specific models</CardDescription>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-b-muted/50">
                                <TableHead className="w-[30px]"></TableHead>
                                <TableHead>Pattern</TableHead>
                                <TableHead></TableHead>
                                <TableHead>Target Model</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rules.map((rule) => (
                                <RoutingRuleItem key={rule.id} rule={rule} />
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
