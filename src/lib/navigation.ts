import { Home, Settings, User, FileText, BookOpen, PlayCircle, ListVideo, CheckCircle2, Library, BarChart3, GraduationCap } from "lucide-react"

export interface SidebarSubItem {
    title: string;
    url: string;
}

export interface SidebarItem {
    title: string;
    url?: string;
    icon?: any;
    items?: SidebarSubItem[];
}

export interface SidebarGroup {
    title: string;
    type: string;
    items: SidebarItem[];
}

export const sidebarGroups: SidebarGroup[] = [
    {
        title: "Main",
        type: "group",
        items: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: Home,
            },
        ]
    },
    {
        title: "Learning",
        type: "group",
        items: [
            {
                title: "Courses",
                url: "/dashboard/courses",
                icon: BookOpen,
            },
            {
                title: "Video Series",
                url: "/dashboard/videos",
                icon: ListVideo,
            },
            {
                title: "Topics",
                url: "/dashboard/topics",
                icon: GraduationCap,
            },
            {
                title: "Quizzes",
                url: "/dashboard/quizzes",
                icon: CheckCircle2,
            },
            {
                title: "Blog",
                url: "/dashboard/blog",
                icon: FileText,
            },
        ]
    },
    {
        title: "Progress",
        type: "group",
        items: [
            {
                title: "My Progress",
                url: "/dashboard/progress",
                icon: BarChart3,
            },
            {
                title: "Library",
                url: "/dashboard/library",
                icon: Library,
            }
        ]
    },
    {
        title: "Account",
        type: "group",
        items: [
            {
                title: "Profile",
                url: "/dashboard/profile",
                icon: User,
            },
            {
                title: "Settings",
                url: "/dashboard/settings",
                icon: Settings,
            },
            {
                title: "Learning Guide",
                url: "/docs",
                icon: FileText,
            },
        ]
    }
]
