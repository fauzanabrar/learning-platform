"use client"

import { TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { GripVertical, ArrowRight } from "lucide-react"

interface RoutingRuleItemProps {
    rule: {
        id: number;
        pattern: string;
        model: string;
        type: string;
    };
}

export function RoutingRuleItem({ rule }: RoutingRuleItemProps) {
    return (
        <TableRow key={rule.id} className="group border-b-muted/50">
            <TableCell className="py-2 px-2 text-muted-foreground/50">
                <GripVertical className="h-4 w-4 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
            </TableCell>
            <TableCell className="font-mono text-xs py-2">
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="px-1 py-0 text-[10px] h-4 font-normal text-muted-foreground">
                        {rule.type}
                    </Badge>
                    <span className="text-foreground/90">{rule.pattern}</span>
                </div>
            </TableCell>
            <TableCell className="py-2 text-center text-muted-foreground">
                <ArrowRight className="h-3 w-3 inline-block" />
            </TableCell>
            <TableCell className="font-medium text-xs py-2 text-primary">
                {rule.model}
            </TableCell>
        </TableRow>
    )
}
