"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    BarChart3,
    ShieldCheck,
    Settings,
    Users,
    MessageSquareQuote,
    AlertTriangle,
    UserCircle,
    Activity,
    ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    const pathname = usePathname();

    // Determine current role based on path
    const isStudent = pathname.startsWith("/dashboard/student");
    const isDeptAdmin = pathname.startsWith("/dashboard/admin/dept");
    const isSuperAdmin = pathname.startsWith("/dashboard/admin/super");

    const getMenuItems = () => {
        if (isStudent) {
            return [
                { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/student" },
                { icon: MessageSquareQuote, label: "Submit Grievance", href: "/submit" },
                { icon: FileText, label: "My History", href: "/complaints" },
                { icon: UserCircle, label: "Profile", href: "/dashboard/student/profile" },
            ];
        }
        if (isDeptAdmin) {
            return [
                { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin/dept" },
                { icon: Activity, label: "Dept Queue", href: "/dashboard/admin/dept" },
                { icon: BarChart3, label: "Performance", href: "/analytics" },
                { icon: UserCircle, label: "Management", href: "/dashboard/admin/dept" },
            ];
        }
        if (isSuperAdmin) {
            return [
                { icon: LayoutDashboard, label: "Command Center", href: "/dashboard/admin/super" },
                { icon: BarChart3, label: "Global Analytics", href: "/analytics" },
                { icon: Users, label: "Admin Management", href: "/dashboard/admin/super" },
                { icon: ShieldAlert, label: "Escalation Hub", href: "/dashboard/admin/super" },
            ];
        }
        // Default (fallback/guest)
        return [
            { icon: LayoutDashboard, label: "Dashboard", href: "/" },
            { icon: Users, label: "Departments", href: "/departments" },
            { icon: ShieldCheck, label: "Privacy Vault", href: "/privacy" },
        ];
    };

    const menuItems = getMenuItems();

    return (
        <div className="fixed left-0 top-0 h-screen w-64 glass border-r border-white/10 hidden md:flex flex-col p-6 z-50">
            <div className="flex items-center gap-3 mb-10 px-2 transition-transform hover:scale-105 duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-secondary">
                    <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white font-jakarta">AEGIS</span>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "bg-secondary/20 text-secondary border border-secondary/30"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 w-1 h-full bg-secondary shadow-[0_0_15px_rgba(0,173,239,0.5)]" />
                            )}
                            <item.icon className={cn(
                                "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                                isActive ? "text-secondary" : "text-slate-400 group-hover:text-white"
                            )} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto space-y-2">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all group"
                >
                    <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                    <span className="font-medium">Settings</span>
                </Link>

                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mt-4 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700" />
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-secondary scale-110 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-secondary">SOS Hub</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                        Instant support for critical safety issues.
                    </p>
                    <button className="w-full mt-3 py-2 text-[10px] font-bold bg-secondary/20 hover:bg-secondary text-white rounded-lg transition-all border border-secondary/20 hover:border-transparent uppercase tracking-widest">
                        Quick Assistance
                    </button>
                </div>
            </div>
        </div>
    );
}
