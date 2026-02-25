"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import RoleGate from "@/components/RoleGate";
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    Smile,
    Frown,
    Meh,
    Target,
    Award,
    ChevronRight,
    PieChart,
    Activity,
    ShieldCheck,
    Building2,
    FileSearch
} from "lucide-react";
import { cn } from "@/lib/utils";

const sentimentData = [
    { day: "Mon", score: 65 },
    { day: "Tue", score: 58 },
    { day: "Wed", score: 72 },
    { day: "Thu", score: 85 },
    { day: "Fri", score: 78 },
    { day: "Sat", score: 92 },
    { day: "Sun", score: 88 }
];

const departmentMetrics = [
    { name: "Academic Affairs", resolutionTime: "1.2d", escalations: 2, satisfaction: 4.8, score: 96 },
    { name: "IT Infrastructure", resolutionTime: "2.4d", escalations: 5, satisfaction: 4.2, score: 88 },
    { name: "Security & Safety", resolutionTime: "0.8d", escalations: 1, satisfaction: 4.9, score: 98 },
    { name: "Hostel & Mess", resolutionTime: "5.1d", escalations: 12, satisfaction: 3.1, score: 62 },
];

export default function Analytics() {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);

        const ctx = gsap.context(() => {
            gsap.from(".sentiment-bar", {
                height: 0,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "elastic.out(1, 0.5)",
                delay: 0.2
            });

            gsap.from(".metric-row", {
                x: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.5
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <RoleGate allowedRole="DEPT_ADMIN">
            <div ref={containerRef} className="flex bg-[#0F172A] min-h-screen text-slate-200 font-outfit">
                <Sidebar />
                <main className="flex-1 md:ml-64 flex flex-col">
                    <Navbar />

                    <div className="p-8 space-y-8">
                        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white font-jakarta">Governance Analytics</h1>
                                <p className="text-slate-400 mt-1">Data-driven insights for student protection and system efficiency.</p>
                            </div>

                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
                                <button className="px-4 py-2 bg-secondary/20 text-secondary text-sm font-bold rounded-lg border border-secondary/20">WEEKLY</button>
                                <button className="px-4 py-2 text-slate-400 text-sm font-bold hover:text-white transition-colors">MONTHLY</button>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Sentiment Analysis WOW Feature */}
                            <div className="lg:col-span-2 glass-card flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-xl font-bold text-white font-jakarta flex items-center gap-3">
                                            <Activity className="w-5 h-5 text-secondary" />
                                            Student Sentiment Pulse
                                        </h2>
                                        <p className="text-xs text-slate-400 mt-1">Mood tracking based on grievance descriptions and feedback sentiment.</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-[10px] font-bold">
                                        <TrendingUp className="w-3 h-3" />
                                        +12.4% POSITIVE
                                    </div>
                                </div>

                                {/* Custom CSS/GSAP Graph */}
                                <div className="flex-1 min-h-[250px] flex items-end justify-between gap-4 pt-10 px-4 relative">
                                    {/* Horizontal Grid lines */}
                                    <div className="absolute inset-x-0 top-10 border-t border-white/5 h-0 w-full" />
                                    <div className="absolute inset-x-0 top-1/2 border-t border-white/5 h-0 w-full" />
                                    <div className="absolute inset-x-0 bottom-12 border-t border-white/10 h-0 w-full" />

                                    {sentimentData.map((d, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center group relative z-10">
                                            <div
                                                className="w-full max-w-[40px] sentiment-bar bg-secondary/20 border-t-4 border-secondary/60 rounded-t-xl transition-all duration-1000 ease-out hover:bg-secondary/40 hover:scale-105 group-cursor-pointer relative"
                                                style={{ height: mounted ? `${d.score}%` : '0%' }}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                                    Score: {d.score}
                                                </div>
                                            </div>
                                            <span className="mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{d.day}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Metrics */}
                            <div className="space-y-6">
                                <div className="glass-card">
                                    <h3 className="font-bold text-white font-jakarta mb-6 flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-secondary" />
                                        Transparency Check
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400">Total Validations</span>
                                            <span className="text-white font-bold">1,402</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400">Metadata Stripped</span>
                                            <span className="text-white font-bold">428 (100%)</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400">Privacy Score</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-secondary font-bold">9.8/10</span>
                                                <ShieldCheck className="w-3 h-3 text-secondary" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card border-secondary/20 bg-secondary/5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Award className="w-16 h-16 text-secondary" />
                                    </div>
                                    <h3 className="font-bold text-white font-jakarta mb-2">Top Performer</h3>
                                    <p className="text-xs text-slate-400 mb-4 font-medium uppercase tracking-widest">Security & Safety Dept.</p>
                                    <div className="text-4xl font-black text-secondary font-jakarta mb-1">98%</div>
                                    <p className="text-[10px] text-slate-500">Highest responsiveness and student satisfaction this month.</p>
                                </div>
                            </div>
                        </div>

                        {/* Department Accountability Table */}
                        <div className="glass-card overflow-hidden">
                            <div className="flex items-center justify-between p-6 bg-white/5 border-b border-white/10">
                                <div>
                                    <h2 className="text-xl font-bold text-white font-jakarta">Department Accountability Dashboard</h2>
                                    <p className="text-sm text-slate-400">Comparative governance metrics and responsiveness rankings.</p>
                                </div>
                                <Building2 className="w-5 h-5 text-slate-500" />
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/5 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                                            <th className="px-6 py-4">Department Name</th>
                                            <th className="px-6 py-4">Avg. Resolution</th>
                                            <th className="px-6 py-4">Auto-Escalations</th>
                                            <th className="px-6 py-4">Student Rating</th>
                                            <th className="px-6 py-4">Accountability Score</th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {departmentMetrics.map((dept, i) => (
                                            <tr key={i} className="metric-row hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn(
                                                            "w-2 h-2 rounded-full",
                                                            dept.score > 90 ? "bg-green-500" : dept.score > 80 ? "bg-blue-500" : "bg-amber-500"
                                                        )} />
                                                        <span className="text-sm font-bold text-white">{dept.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm text-slate-400 font-medium">{dept.resolutionTime}</td>
                                                <td className="px-6 py-5">
                                                    <span className={cn(
                                                        "text-xs px-2 py-1 rounded-md font-bold",
                                                        dept.escalations < 3 ? "text-green-400 bg-green-500/10" : "text-amber-400 bg-amber-500/10"
                                                    )}>
                                                        {dept.escalations}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-sm font-bold text-white">{dept.satisfaction}</span>
                                                        <Smile className="w-3.5 h-3.5 text-secondary" />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-1.5 flex-1 max-w-[100px] bg-white/5 rounded-full overflow-hidden">
                                                            <div
                                                                className={cn(
                                                                    "h-full rounded-full transition-all duration-1000",
                                                                    dept.score > 90 ? "bg-secondary" : dept.score > 80 ? "bg-blue-500" : "bg-amber-500"
                                                                )}
                                                                style={{ width: `${dept.score}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-black text-white">{dept.score}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <button className="text-slate-500 group-hover:text-white transition-colors">
                                                        <ChevronRight className="w-5 h-5 ml-auto" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Research Insight Footer */}
                        <div className="p-8 glass bg-[#0F172A] border-dashed border-white/10 rounded-2xl flex flex-col items-center text-center">
                            <div className="p-4 bg-secondary/10 rounded-2xl mb-4 border border-secondary/20">
                                <FileSearch className="w-8 h-8 text-secondary" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 font-jakarta tracking-tight">Governance Intelligence Report</h3>
                            <p className="text-sm text-slate-400 max-w-2xl">
                                Research Abstract: Aegis utilizes the Sentiment Graph to monitor the "Structural Health" of student governance. By correlating resolution times with sentiment scores, the platform predicts potential systemic failures before they escalate.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </RoleGate>
    );
}
