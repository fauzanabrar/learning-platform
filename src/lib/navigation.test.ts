import { describe, it, expect } from "vitest"
import { sidebarGroups } from "@/lib/navigation"

describe("sidebar navigation", () => {
    it("keeps Development hierarchy in the intended order", () => {
        const developmentGroup = sidebarGroups.find((group) => group.title === "Development")
        expect(developmentGroup).toBeTruthy()

        const itemTitles = developmentGroup?.items.map((item) => item.title)
        expect(itemTitles).toEqual(["Database", "Components", "API Keys"])

        const databaseItem = developmentGroup?.items.find((item) => item.title === "Database")
        expect(databaseItem?.items?.map((item) => item.title)).toEqual([
            "All Tables",
            "Query Editor",
            "Migrations",
        ])
    })
})