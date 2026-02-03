"use client";

import * as React from "react";
import {
  AudioWaveform,
  CircleQuestionMark,
  Command,
  Folder,
  GalleryVerticalEnd,
  LayoutDashboard,
  LucideProps,
  Settings,
  SquareCheckBig,
  Users,
} from "lucide-react";

import { WorkspaceSwitcher } from "@/components/Dashboard/workspace-switcher";
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
} from "@/components/ui/sidebar";
import WorkDesk from "../../../public/WorkDesk";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { usePathname } from "next/navigation";
import { userType } from "@/utils/getCurrentUser";

// This is sample data.
const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "https://ui.shadcn.com/avatars/shadcn.jpg",
};
const workspaces = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];
const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Folder,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: SquareCheckBig,
  },
  {
    title: "Members",
    url: "/members",
    icon: Users,
  },
];
const navSecondary = [
  {
    title: "Setting",
    url: "/setting",
    icon: Settings,
  },
  {
    title: "Get Help",
    url: "/gethelp",
    icon: CircleQuestionMark,
  },
];

type navItemType = {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  isActive?: boolean;
};

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="relative">
        <SidebarMenuButton asChild size="lg">
          <a href="#">
            <div className="flex aspect-square size-8 items-center justify-center">
              <WorkDesk />
            </div>
            <h2 className="text-2xl font-display">WorkDesk</h2>
          </a>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <WorkspaceSwitcher workspaces={workspaces} />
        </SidebarGroup>
        {/* Primary Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((navItem) => (
                <SidebarMenuItem key={navItem.title}>
                  <Link href={navItem.url}>
                    <SidebarMenuButton
                      tooltip={navItem.title}
                      isActive={path === navItem.url}
                    >
                      {navItem.icon && <navItem.icon />}
                      <span>{navItem.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Secondary Navigation */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {navSecondary.map((navItem: navItemType) => (
                <SidebarMenuItem key={navItem.title}>
                  <Link href={navItem.url}>
                    <SidebarMenuButton
                      tooltip={navItem.title}
                      isActive={path === navItem.url}
                    >
                      {navItem.icon && <navItem.icon />}
                      <span>{navItem.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
