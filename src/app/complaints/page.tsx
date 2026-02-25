"use client";

import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import RoleGate from "@/components/RoleGate";
import {
    History,
    MapPin,
    Calendar,
    ChevronRight,
    BadgeCheck,
    Clock,
    AlertCircle,
    Building2,
    Lock,
    ArrowUpCircle,
    TrendingDown,
    Timer
} from "lucide-react";
import { cn } from "@/lib/utils";

const complaints = [
    {
        id: "#AEG-82912",
        title: "Harassment by Senior Students near Canteen",
        department: "Security & Safety",
        date: "2024-02-14",
        status: "Escalated",
        priority: "high",
        escalationLevel: 3, // Director
        isAnonymous: true,
        ageDays: 8
    },
    {
        id: "#AEG-71023",
        title: "WiFi Connectivity in Block A Hostel",
        department: "IT Infrastructure",
        date: "2024-02-18",
        status: "Escalated",
        priority: "medium",
        escalationLevel: 1, // HOD
        isAnonymous: false,
        ageDays: 4
    },
    {
        id: "#AEG-90112",
        title: "Water Dispenser Malfunction (Floor 2)",
        department: "Academic Affairs",
        date: "2024-02-21",
        status: "In Progress",
        priority: "low",
        escalationLevel: 0,
        isAnonymous: false,
        ageDays: 1
    }
];

const EscalationLevel = ({ level }: { level: number }) => {
    const levels = ["Dept. Admin", "HOD", "Dean", "Director"];
    return (
        <div className="flex items-center gap-1">
            {levels.map((name, i) => (
                <div key={i} className="flex items-center">
                    <div className={cn(
                        "h-1.5 w-8 rounded-full transition-all duration-500",
                        i <= level
                            ? (level === 3 ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-secondary")
                            : "bg-white/10"
                    )} />
                    {i < levels.length - 1 && <div className="w-1" />}
                </div>
            ))}
            <span className="ml-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {level === 0 ? "Initial" : `L${level} : ${levels[level]}`}
            </span>
        </div>
    );
};

export default function MyComplaints() {
    return (
        <RoleGate allowedRole="STUDENT">
            <div className="flex bg-[#0F172A] min-h-screen text-slate-200">
                <Sidebar />
                <main className="flex-1 md:ml-64 flex flex-col">
                    <Navbar />

                    <div className="p-8">
                        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white font-jakarta">My Grievances</h1>
                                <p className="text-slate-400 mt-1">Track the status and escalation of your submissions.</p>
                            </div>

                            <div className="flex gap-4">
                                <div className="glass-card py-2 px-4 flex items-center gap-3">
                                    <Timer className="w-4 h-4 text-secondary" />
                                    <div className="text-xs">
                                        <span className="text-slate-400">Avg. Resolution:</span>
                                        <span className="text-white font-bold ml-2">3.2 Days</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div className="space-y-4">
                            {complaints.map((c, i) => (
                                <div key={i} className="glass-card hover:bg-white/8 transition-all group overflow-hidden relative">
                                    {c.isAnonymous && (
                                        <div className="absolute top-0 right-0 py-1 px-4 bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest border-l border-b border-secondary/20 rounded-bl-xl flex items-center gap-2">
                                            <Lock className="w-3 h-3" />
                                            Anonymous Mode
                                        </div>
                                    )}

                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs font-mono text-secondary">{c.id}</span>
                                                <span className={cn(
                                                    "text-[10px] px-2 py-0.5 rounded-md font-bold uppercase",
                                                    c.priority === "high" ? "bg-red-500/20 text-red-400" :
                                                        c.priority === "medium" ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/20 text-blue-400"
                                                )}>
                                                    {c.priority} Priority
                                                </span>
                                            </div>
                                            <h2 className="text-xl font-bold text-white font-jakarta mb-3 group-hover:text-secondary transition-colors">
                                                {c.title}
                                            </h2>

                                            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-slate-400 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="w-4 h-4" />
                                                    {c.department}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    {c.date} ({c.ageDays} days ago)
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:w-72 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                                            <div className="mb-4">
                                                <p className="text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Auto Escalation</p>
                                                <EscalationLevel level={c.escalationLevel} />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn(
                                                        "w-2 h-2 rounded-full animate-pulse",
                                                        c.status === "Escalated" ? "bg-red-500" : "bg-amber-500"
                                                    )} />
                                                    <span className="text-sm font-bold text-white">{c.status}</span>
                                                </div>
                                                <Link
                                                    href={`/complaints/${c.id.replace('#', '')}`}
                                                    className="text-secondary text-xs font-bold flex items-center gap-1 hover:underline hover:scale-105 transition-all"
                                                >
                                                    VIEW FULL DETAILS
                                                    <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {c.escalationLevel > 0 && (
                                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                                            <ArrowUpCircle className="w-4 h-4 text-red-400" />
                                            <p className="text-xs text-red-300 font-medium italic">
                                                System Note: Auto-escalated to {["HOD", "Dean", "Director"][c.escalationLevel - 1]} due to resolution delay.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 glass-card border-dashed border-white/10 p-8 text-center max-w-2xl mx-auto">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <History className="text-slate-500 w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-white mb-2">Governance Transparency</h3>
                            <p className="text-sm text-slate-400">
                                Aegis automatically tracks the time spent at each level of authority. If your grievance is not addressed within stipulated timelines, the system bypasses human intervention to escalate the matter to higher authorities.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </RoleGate>
    );
}
