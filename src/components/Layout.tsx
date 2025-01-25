"use client"

import {
    BadgeCheck,
    Bell,
    ChevronRight,
    ChevronsUpDown,
    LogOut,
    Sparkles,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Bus, Users, Settings, School, MessageCircle, LayoutDashboard } from "lucide-react"
import { Outlet } from 'react-router-dom'
import { useLocation } from "react-router-dom"
import { useState } from "react"
import logo from '@/assets/vigilbuslogo.png'

const data = {
    user: {
        name: "Khalid kassimi",
        email: "khalid@gmail.com",
        avatar: "/avatars/johndoe.jpg",
    },
    teams: [
        {
            name: "Greenwood High",
            logo: School,
            plan: "Enterprise",
        },
        {
            name: "Maplewood Elementary",
            logo: School,
            plan: "Pro",
        },
        {
            name: "Springfield Middle School",
            logo: School,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: LayoutDashboard,
            isActive: true,
            items: [
                {
                    title: "Overview",
                    url: "/",
                },
                {
                    title: "Reports",
                    url: "/reports",
                },
                {
                    title: "Live Map",
                    url: "/live-map",
                },
            ],
        },
        {
            title: "Fleet Management",
            url: "/fleet-management",
            icon: Bus,
            items: [
                {
                    title: "Vehicles",
                    url: "/fleet-management/",
                },
                {
                    title: "Drivers",
                    url: "/fleet-management/drivers",
                },
                {
                    title: "Routes",
                    url: "/fleet-management/routes",
                },
            ],
        },
        {
            title: "Students Management",
            url: "/student-management",
            icon: Users,
            items: [
                {
                    title: "Students",
                    url: "/student-management/students",
                },
                {
                    title: "Parents",
                    url: "/student-management/parents",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings,
            items: [
                {
                    title: "theme",
                    url: "/settings/theme",
                },
                {
                    title: "language",
                    url: "/settings/language",
                },
                {
                    title: "Support",
                    url: "/settings/support",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Notifications",
            url: "/notifications",
            icon: Bell,
        },
        {
            name: "Messages",
            url: "/messages",
            icon: MessageCircle,
        }
    ],
}



export default function Layout() {
    const { pathname } = useLocation();
    // const currentPath = pathname
    //     .replace(/^\/|\/$/g, '')                // Remove leading and trailing slashes
    //     .replace(/-/g, ' ')                     // Replace hyphens with spaces
    //     .split('/')                             // Split by remaining slashes
    //     .map(part =>                            // For each part
    //         part.replace(/^\w/, c => c.toUpperCase())  // Capitalize first letter
    //     )
    //     .join('/');

    const hasChildComponent = () => {
        const pathSegments = pathname.split('/').filter(Boolean);

        // Handle root route
        if (pathSegments.length === 0) {
            return { category: 'Dashboard', subcategory: 'Overview' };
        }

        // Specific routes mapping
        const specificRoutes = {
            'messages': { category: 'Messages', subcategory: 'Inbox' },
            'notifications': { category: 'Notifications', subcategory: 'Alerts' },
            'reports': { category: 'Dashboard', subcategory: 'Reports' },
            'live-map': { category: 'Dashboard', subcategory: 'Live Map' },
            'settings/theme': { category: 'Settings', subcategory: 'Theme' },
            'settings/language': { category: 'Settings', subcategory: 'Language' },
            'settings/support': { category: 'Settings', subcategory: 'Support' }
        };

        // Check if current path matches specific routes
        const specificRoute = specificRoutes[pathname.slice(1) as keyof typeof specificRoutes];
        if (specificRoute) return specificRoute;

        // Fallback to existing logic for other routes
        const matchingRoute = data.navMain.find(route =>
            route.url.slice(1) === pathSegments[0]
        );

        if (matchingRoute) {
            const subcategory = matchingRoute.items.find(item =>
                item.url === pathname
            );

            return {
                category: matchingRoute.title,
                subcategory: subcategory ? subcategory.title : pathSegments[1] || ''
            };
        }

        return null;
    };

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <SidebarProvider>
            <Sidebar className="border-r border-gray-500 " collapsible="icon">
                {
                    !isSidebarCollapsed && (
                        <SidebarHeader className="bg-white dark:bg-[#2B2B2B] text-black dark:text-white py-4 px-2 overflow-hidden">
                            {/* <div className={`flex font-bold`}>
                                <h1 className="text-purple-500">Fleet</h1>
                                <h1 className="ml-1">Tracker</h1>
                                <h3 className="text-xs text-gray-400 mx-2">school</h3>
                            </div> */}

                            <div className="flex relative">
                                <img src={'https://shobeewebsite.sirv.com/Images/vigilbus/logovb.png'} className="w-12" />
                                <div className="flex absolute bottom-0 left-9 items-end uppercase texl-2xl w-full font-bold">
                                    <h1 className="ml-1 text-[#eeb70a]">igil</h1>
                                    <h1 className="ml-1">Bus</h1>
                                </div>
                            </div>
                        </SidebarHeader>
                    )
                }
                <SidebarContent className="bg-white dark:bg-[#2B2B2B] text-black dark:text-white">
                    <SidebarGroup className="">
                        <SidebarGroupLabel className="text-gray-500/90 ">Platform</SidebarGroupLabel>
                        <SidebarMenu className="">
                            {data.navMain.map((item) => (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={item.isActive}
                                    className="group/collapsible "
                                >
                                    <SidebarMenuItem className="">
                                        <CollapsibleTrigger className="hover:bg-gray-300/30 dark:hover:bg-gray-500/30 hover:text-black dark:hover:text-white" asChild>
                                            <SidebarMenuButton className="hover:bg-gray-300/30 dark:hover:bg-gray-500/30 hover:text-black dark:hover:text-white" tooltip={item.title}>
                                                {item.icon && <item.icon />}
                                                <span className="">{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub className="">
                                                {item.items?.map((subItem) => (
                                                    <SidebarMenuSubItem className="" key={subItem.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <a className="hover:underline" href={subItem.url}>
                                                                <span className="">{subItem.title}</span>
                                                            </a>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                        <SidebarGroupLabel className="text-gray-500/90">Notifications & Messages</SidebarGroupLabel>
                        <SidebarMenu className="">
                            {data.projects.map((item) => (
                                <SidebarMenuItem className="" key={item.name}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </a>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter className="bg-white dark:bg-[#2B2B2B] text-black dark:text-white">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="hover:bg-gray-300/30 dark:hover:bg-gray-500/30 active:bg-transparent active:text-white hover:text-black dark:hover:text-white"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={data.user.avatar}
                                                alt={data.user.name}
                                            />
                                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {data.user.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {data.user.email}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-gray-500 dark:bg-[#2B2B2B] text-white"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal bg-gray-500 dark:bg-[#2B2B2B] text-white">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage
                                                    src={data.user.avatar}
                                                    alt={data.user.name}
                                                />
                                                <AvatarFallback className="rounded-lg">
                                                    CN
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                    {data.user.name}
                                                </span>
                                                <span className="truncate text-xs">
                                                    {data.user.email}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Sparkles />
                                            Upgrade to Pro
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <BadgeCheck />
                                            Account
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
                {/* <SidebarRail /> */}
            </Sidebar>
            <SidebarInset>
                <header className=" bg-white dark:bg-[#2B2B2B] border-b border-gray-500 text-black dark:text-white flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger
                            className="-ml-1 hover:bg-gray-500/30 rounded"
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        />
                        <Separator orientation="vertical" className="mr-2 h-4 bg-white" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {hasChildComponent() && (
                                    <>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink>{hasChildComponent()?.category}</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>{hasChildComponent()?.subcategory}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </>
                                )}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-col gap-4 dark:bg-[#2B2B2B] bg-[#FFFFFF]">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
