"use client"

import * as React from "react"
import { Home, Target, CheckCircle, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/providers/AuthProviders"

// Replaced dummy data with actual Focus-Flow navigation
const data = {
  navMain: [
    {
      title: "Workspace",
      items: [
        { title: "Dashboard", url: "/dashboard", icon: Home, isActive: true },
        { title: "Goal Tracker", url: "/dashboard/goals", icon: Target },
        { title: "Daily Standup", url: "/dashboard/standup", icon: CheckCircle },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // 1. Hook into your global auth state
  const { user, logout } = useAuth()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
      </SidebarHeader>
      
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* 2. Added Footer for User Profile and Logout */}
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {user ? (
          <div className="flex flex-col gap-3">
             <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium truncate">{user.name}</span>
              <span className="text-xs text-sidebar-foreground/70 truncate">{user.email}</span>
            </div>
            <SidebarMenuButton 
                onClick={logout} 
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
            </SidebarMenuButton>
          </div>
        ) : (
          <div className="animate-pulse h-10 bg-muted rounded-md" />
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}