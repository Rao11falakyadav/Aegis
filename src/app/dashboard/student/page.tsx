"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import RoleGate from "@/components/RoleGate";
import { Activity, Clock, CheckCircle2, AlertCircle, Plus, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const studentStats = [
    { label: "Submitted", value: "03", icon: Activity, color: "text-blue-400" },
    { label: "Pending", value: "01", icon: Clock, color: "text-amber-400" },
    { label: "Resolved", value: "02", icon: CheckCircle2, color: "text-green-400" },
    { label: "Escalated", value: "00", icon: AlertCircle, color: "text-red-400" },
];

const mockComplaints = [
    { id: "AEG-84291", category: "Infrastructure", priority: "Medium", status: "Resolved", date: "2 days ago", color: "text-green-400", bg: "bg-green-400/10", rated: false },
    { id: "AEG-91023", category: "Security", priority: "High", status: "Pending", date: "5h ago", color: "text-amber-400", bg: "bg-amber-400/10", rated: false },
    { id: "AEG-73812", category: "Academic", priority: "Low", status: "Resolved", date: "1 week ago", color: "text-green-400", bg: "bg-green-400/10", rated: true, rating: 5 },
];

export default function StudentDashboard() {
    const [ratings, setRatings] = useState<{ [key: string]: number }>({});

    const handleRate = (id: string, rating: number) => {
        setRatings(prev => ({ ...prev, [id]: rating }));
    };

    return (
        <RoleGate allowedRole="STUDENT">
            <div className="flex bg-[#0F172A] min-h-screen text-slate-200 font-outfit">
                <Sidebar />
                <main className="flex-1 md:ml-64 flex flex-col">
                    <Navbar />
                    <div className="p-8 space-y-8">
                        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white tracking-tight">Student Dashboard</h1>
                                <p className="text-slate-400 mt-1">Submit and track your grievances securely.</p>
                            </div>
                            <Link href="/submit" className="px-6 py-3 bg-secondary/80 hover:bg-secondary text-white rounded-xl font-bold transition-all glow-secondary flex items-center justify-center gap-2">
                                <Plus className="w-5 h-5" /> NEW COMPLAINT
                            </Link>
                        </header>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {studentStats.map((stat, i) => (
                                <div key={i} className="glass-card group hover:border-secondary/30 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color} group-hover:bg-white/10`}>
                                            <stat.icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <p className="text-4xl font-bold text-white mb-1 tracking-tight">{stat.value}</p>
                                    <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="glass-card">
                            <h2 className="text-xl font-bold text-white mb-6">Grievance Tracking & Feedback</h2>
                            <div className="space-y-4">
                                {mockComplaints.map((comp, i) => (
                                    <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all flex flex-col gap-4">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-bold text-slate-400 border border-white/5">
                                                    #{comp.id.split('-')[1]}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white">{comp.category}</h4>
                                                    <p className="text-xs text-slate-500">Submitted {comp.date}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="px-3 py-1 bg-white/5 text-slate-400 text-[10px] font-bold rounded-full border border-white/10">
                                                    PRIORITY: {comp.priority.toUpperCase()}
                                                </span>
                                                <span className={`px-3 py-1 ${comp.bg} ${comp.color} text-[10px] font-bold rounded-full border border-white/10`}>
                                                    STATUS: {comp.status.toUpperCase()}
                                                </span>
                                                <Link
                                                    href={`/complaints/${comp.id}`}
                                                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>

                                        {comp.status === "Resolved" && (
                                            <div className="mt-2 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div>
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Rate Resolution Experience</p>
                                                    <p className="text-[10px] text-slate-500">Your feedback helps us improve department accountability.</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            onClick={() => handleRate(comp.id, star)}
                                                            className="transition-transform active:scale-95"
                                                        >
                                                            <Star
                                                                className={`w-5 h-5 ${(ratings[comp.id] || comp.rating || 0) >= star
                                                                    ? "text-yellow-400 fill-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]"
                                                                    : "text-slate-600 hover:text-slate-400"
                                                                    } transition-all`}
                                                            />
                                                        </button>
                                                    ))}
                                                    {(ratings[comp.id] || comp.rating) && (
                                                        <span className="ml-2 text-xs font-bold text-green-400">Feedback Submitted</span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </RoleGate>
    );
}
