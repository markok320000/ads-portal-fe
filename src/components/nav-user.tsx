"use client"

import {IconLogout} from "@tabler/icons-react"
import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar"
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem,} from "@/components/ui/sidebar"

export function NavUser({
                            user,
                            onLogout,
                        }: {
    user: {
        name: string
        email: string
        avatar: string
    }
    onLogout?: () => void
}) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    onClick={onLogout}
                    className="flex items-center gap-2"
                >
                    <Avatar className="h-8 w-8 rounded-lg grayscale">
                        <AvatarImage src={user.avatar} alt={user.name}/>
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{user.name}</span>
                        <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
                    </div>
                    <IconLogout className="cursor-pointer ml-auto w-4 h-4"/>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
