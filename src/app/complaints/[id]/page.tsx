"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import RoleGate from "@/components/RoleGate";
import {
    ChevronLeft,
    MessageSquare,
    FileText,
    Image as ImageIcon,
    Clock,
    Shield,
    ArrowUpCircle,
    History,
    Send,
    Download,
    Eye
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GrievanceDetail({ params }: { params: { id: string } }) {
    const [comment, setComment] = useState("");
    const [historyVisible, setHistoryVisible] = useState(false);

    const grievance = {
        id: params.id || "#AEG-82912",
        title: "WiFi Connectivity in Block A Hostel",
        department: "IT Infrastructure",
        date: "2024-02-18",
        status: "Escalated",
        priority: "high",
        escalationLevel: 2, // Dean
        isAnonymous: false,
        description: "The WiFi speed in Block A is consistently below 1Mbps. It&apos;s impossible to attend online lectures or download study materials. This has been happening for the last 5 days.",
        proofs: [
            { name: "speedtest_result.png", type: "image", size: "1.2 MB" },
            { name: "room_router_photo.jpg", type: "image", size: "2.4 MB" }
        ],
        logs: [
            { date: "2024-02-18 10:00", event: "Grievance Submitted", actor: "Student" },
            { date: "2024-02-18 10:15", event: "Auto-Assigned to IT Department", actor: "System" },
            { date: "2024-02-20 10:00", event: "Auto-Escalated to HOD", actor: "System", note: "SLA (48h) exceeded" },
            { date: "2024-02-22 10:00", event: "Auto-Escalated to Dean", actor: "System", note: "SLA (48h) exceeded at L1" },
        ],
        comments: [
            { user: "IT Support (Vikram)", role: "Dept Admin", text: "We are checking the backend logs for router 42-A.", time: "2 days ago" },
            { user: "Student", role: "Owner", text: "The issue persists even after the router reboot.", time: "1 day ago" }
        ]
    };

    const escalationSteps = [
        { label: "Warden / Mentor", role: "Primary" },
        { label: "HOD / Hostel Incharge", role: "Level 1" },
        { label: "Dean / DSW", role: "Level 2" },
        { label: "Director", role: "Final" }
    ];

    return (
        <RoleGate allowedRole="STUDENT">
            <div className="flex bg-[#0F172A] min-h-screen text-slate-200">
                <Sidebar />
                <main className="flex-1 md:ml-64 flex flex-col">
                    <Navbar />

                    <div className="p-8">
                        <Link href="/complaints" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm font-bold">
                            <ChevronLeft className="w-4 h-4" /> BACK TO LIST
                        </Link>

                        <div className="flex flex-col xl:flex-row gap-8">
                            {/* Left Column: Complaint Data */}
                            <div className="flex-1 space-y-8">
                                <section className="glass-card">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-xs font-mono text-secondary">{grievance.id}</span>
                                        <span className={cn(
                                            "text-[10px] px-3 py-1 rounded-full font-bold uppercase",
                                            grievance.priority === "high" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                        )}>
                                            {grievance.priority} Severity
                                        </span>
                                    </div>
                                    <h1 className="text-3xl font-bold text-white font-jakarta mb-4">{grievance.title}</h1>
                                    <div className="flex flex-wrap gap-6 text-slate-400 mb-8 border-b border-white/5 pb-6">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="w-4 h-4" /> Submitted {grievance.date}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-secondary font-bold">
                                            <Shield className="w-4 h-4" /> {grievance.department}
                                        </div>
                                    </div>

                                    <div className="space-y-4 text-slate-300 leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <p>{grievance.description}</p>
                                    </div>
                                </section>

                                <section className="glass-card">
                                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                        <ImageIcon className="w-5 h-5 text-secondary" /> Uploaded Proofs
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {grievance.proofs.map((proof, i) => (
                                            <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                                                        <FileText className="w-5 h-5 text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-white truncate w-32">{proof.name}</p>
                                                        <p className="text-[10px] text-slate-500">{proof.size}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="glass-card">
                                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-secondary" /> Communication Thread
                                    </h3>
                                    <div className="space-y-6 mb-8">
                                        {grievance.comments.map((c, i) => (
                                            <div key={i} className={cn(
                                                "p-4 rounded-2xl border",
                                                c.role === "Owner" ? "bg-secondary/5 border-secondary/20 ml-12" : "bg-white/5 border-white/10 mr-12"
                                            )}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs font-bold text-white">{c.user}</span>
                                                    <span className="text-[10px] text-slate-500">{c.time}</span>
                                                </div>
                                                <p className="text-sm text-slate-300">{c.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder="Write a reply or add meeting notes..."
                                            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-secondary/50 transition-colors resize-none"
                                        />
                                        <button className="absolute bottom-4 right-4 p-3 bg-secondary rounded-xl text-white shadow-lg hover:scale-105 active:scale-95 transition-all">
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </section>
                            </div>

                            {/* Right Column: Escalation & Timeline */}
                            <div className="xl:w-80 space-y-6">
                                <section className="glass-card overflow-hidden">
                                    <div className="bg-red-500/10 -m-8 p-8 mb-6 border-b border-red-500/20">
                                        <div className="flex items-center gap-3 text-red-400 mb-2">
                                            <ArrowUpCircle className="w-5 h-5 animate-bounce" />
                                            <h3 className="font-bold uppercase text-xs tracking-widest">Active Escalation</h3>
                                        </div>
                                        <p className="text-2xl font-bold text-white font-jakarta">Level {grievance.escalationLevel}</p>
                                        <p className="text-[10px] text-red-300 font-medium italic mt-1">Escalated to Office of the Dean</p>
                                    </div>

                                    <div className="mt-6 space-y-8 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                                        {escalationSteps.map((step, i) => (
                                            <div key={i} className="flex gap-6 relative z-10">
                                                <div className={cn(
                                                    "w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 shadow-[0_0_10px_rgba(0,0,0,0.5)]",
                                                    i < grievance.escalationLevel ? "bg-secondary border-secondary shadow-[0_0_15px_rgba(0,173,239,0.3)]" :
                                                        i === grievance.escalationLevel ? "bg-[#0F172A] border-secondary animate-pulse" : "bg-white/10 border-white/20"
                                                )} />
                                                <div>
                                                    <p className={cn(
                                                        "text-xs font-bold font-jakarta",
                                                        i <= grievance.escalationLevel ? "text-white" : "text-slate-500"
                                                    )}>{step.label}</p>
                                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{step.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="glass-card">
                                    <button
                                        onClick={() => setHistoryVisible(!historyVisible)}
                                        className="w-full flex items-center justify-between text-white font-bold text-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <History className="w-4 h-4 text-slate-400" />
                                            STATUS LOGS
                                        </div>
                                        <ChevronLeft className={cn("w-4 h-4 transition-transform", historyVisible ? "-rotate-90" : "")} />
                                    </button>

                                    {historyVisible && (
                                        <div className="mt-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
                                            {grievance.logs.map((log, i) => (
                                                <div key={i} className="border-l-2 border-white/10 pl-4 py-1">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase">{log.date}</p>
                                                    <p className="text-xs text-white my-0.5 font-bold">{log.event}</p>
                                                    <p className="text-[10px] text-slate-400 italic">By: {log.actor}</p>
                                                    {log.note && <p className="text-[9px] text-red-400 mt-1 font-bold">⚠️ {log.note}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>

                                <div className="p-6 bg-secondary/5 border border-secondary/20 rounded-2xl">
                                    <h4 className="text-secondary font-bold text-xs uppercase tracking-widest mb-2">Policy Note</h4>
                                    <p className="text-[10px] text-slate-400 leading-relaxed italic">
                                        This grievance underwent auto-escalation based on institutional resolution windows (SLA). All logs are immutable.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </RoleGate>
    );
}
