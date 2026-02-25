"use client";

import { Bell, Search, User, LogOut, Shield, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const getRoleInfo = () => {
        if (pathname.includes("admin/super")) return { name: "Super Admin", color: "text-secondary", icon: Shield };
        if (pathname.includes("admin/dept")) return { name: "Dept Admin", color: "text-primary", icon: Shield };
        if (pathname.includes("student")) return { name: "Student", color: "text-amber-400", icon: User };
        return { name: "Guest", color: "text-slate-400", icon: User };
    };

    const role = getRoleInfo();

    return (
        <nav className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-40">
            <div className="flex-1 max-w-xl hidden lg:block">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="Search grievances, policies, or departments..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-slate-300 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all font-outfit"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex flex-col items-end">
                    <div className="flex items-center gap-2">
                        <role.icon className={`w-3 h-3 ${role.color}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${role.color}`}>{role.name}</span>
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-tight">Falak Yadav</span>
                </div>

                <div className="flex items-center gap-2">
                    <button className="p-2.5 hover:bg-white/5 rounded-xl transition-all relative group">
                        <Bell className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-[#0F172A]" />
                    </button>

                    <div className="w-px h-6 bg-white/10 mx-2" />

                    <Link href="/auth/login" className="flex items-center gap-2 p-1.5 pr-3 hover:bg-white/5 rounded-xl transition-all group">
                        <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all overflow-hidden relative">
                            <User className="w-5 h-5 text-slate-400 group-hover:text-white" />
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
