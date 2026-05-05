"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProviders";

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // 1. Route Protection Logic
  useEffect(() => {
      if (!isLoading && !user) {
          router.push('/login');
      }
  }, [user, isLoading, router]);

  // Prevent UI flashing while checking authentication
  if (isLoading || !user) {
      return null; 
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Workspace</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        
        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* Custom Welcome Message */}
          <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}</h1>
              <p className="text-muted-foreground mt-1">Here is the latest activity in your workspace.</p>
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl border border-dashed flex items-center justify-center text-muted-foreground bg-muted/20">
                Goals Widget
            </div>
            <div className="aspect-video rounded-xl border border-dashed flex items-center justify-center text-muted-foreground bg-muted/20">
                Standup Widget
            </div>
            <div className="aspect-video rounded-xl border border-dashed flex items-center justify-center text-muted-foreground bg-muted/20">
                Activity Widget
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl border border-dashed flex items-center justify-center text-muted-foreground bg-muted/20 md:min-h-min">
              Main Dashboard Content Area
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}