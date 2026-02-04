"use client"

import { DropdownExample } from "./dropdown-example"
import { ContextExample } from "./context-example"

export function MenuSection() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <DropdownExample />
            <ContextExample />
        </div>
    )
}
