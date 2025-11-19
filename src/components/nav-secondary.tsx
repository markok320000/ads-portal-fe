"use client"

import * as React from "react"
import {type Icon} from "@tabler/icons-react"
import {usePathname} from "next/navigation"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary({
                                 items,
                                 ...props
                             }: {
    items: {
        title: string
        url: string
        icon: Icon
    }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const pathname = usePathname()

    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const isActive = pathname === item.url
                        return (
                            <SidebarMenuItem key={item.title} className={isActive ? "bg-blue-100" : ""}>
                                <SidebarMenuButton asChild>
                                    <a href={item.url} className={isActive ? "font-bold text-blue-600" : ""}>
                                        <item.icon/>
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
