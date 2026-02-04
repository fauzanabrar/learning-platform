"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar"
import { SidebarItem as SidebarItemType } from "@/lib/navigation"

interface SidebarItemProps {
    item: SidebarItemType;
}

export function SidebarItem({ item }: SidebarItemProps) {
    const pathname = usePathname()
    const { isMobile, setOpenMobile } = useSidebar()

    const handleClick = () => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }

    // Check if pathname starts with the item URL for nested pages
    const isParentActive = item.url && pathname.startsWith(item.url)
    const isExactMatch = pathname === item.url

    if (item.items) {
        return (
            <SidebarMenuItem>
                <div className="space-y-2">
                    <div className="px-3 py-2 flex items-center gap-3 text-sm font-bold text-foreground/70 uppercase tracking-tight">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                    </div>
                    <SidebarMenuSub className="space-y-1 pl-4 border-l-0 px-0 mx-0 mt-0">
                        {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === subItem.url}
                                    size="md"
                                    className="h-10 text-base font-medium border border-transparent hover:bg-sidebar-accent hover:border-sidebar-border hover:shadow-sm transition-all"
                                >
                                    <Link href={subItem.url} onClick={handleClick}>
                                        <span>{subItem.title}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </div>
            </SidebarMenuItem>
        )
    }

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isExactMatch}
                tooltip={item.title}
                size="lg"
                className="h-12 text-base font-medium border border-transparent shadow-none hover:shadow-sm hover:border-sidebar-border hover:bg-sidebar-accent transition-all"
            >
                <Link href={item.url || "#"} onClick={handleClick}>
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}
