"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import RoleGate from "@/components/RoleGate";
import { ListFilter, MessageSquare, Clock, BarChart3, TrendingUp, AlertTriangle, CheckCircle2, X } from "lucide-react";
import { useState } from "react";

export default function DeptAdminDashboard() {
    const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState("Pending");
    const [remarks, setRemarks] = useState("");
    const [isEscalating, setIsEscalating] = useState(false);

    const handleUpdateClick = (comp: any) => {
        setSelectedComplaint(comp);
        setStatus(comp.priority === "CRITICAL" ? "In Progress" : "Pending");
        setIsModalOpen(true);
    };

    const handleSave = () => {
        // Simulate save
        setIsModalOpen(false);
        setRemarks("");
    };

    return (
        <RoleGate allowedRole="DEPT_ADMIN">
            <div className="flex bg-[#0F172A] min-h-screen text-slate-200">
                <Sidebar />
                <main className="flex-1 md:ml-64 flex flex-col">
                    <Navbar />
                    <div className="p-8 space-y-8">
                        <header className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Dept. Management Portal</h1>
                                <p className="text-slate-400 mt-1">Manage department grievances and resolution timelines.</p>
                            </div>
                        </header>

                        {/* Performance Summary Widget */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="glass-card bg-primary/5 border-primary/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <BarChart3 className="w-5 h-5 text-primary" />
                                    <h3 className="font-bold text-white text-sm">Resolution Score</h3>
                                </div>
                                <p className="text-3xl font-bold text-primary">84%</p>
                                <div className="mt-2 flex items-center gap-1 text-[10px] text-green-400 font-bold">
                                    <TrendingUp className="w-3 h-3" /> +2% from last week
                                </div>
                            </div>

                            <div className="glass-card">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="w-5 h-5 text-amber-500" />
                                    <h3 className="font-bold text-white text-sm">Avg. Res. Time</h3>
                                </div>
                                <p className="text-3xl font-bold text-white">4.2d</p>
                                <p className="text-xs text-slate-500 mt-2">Target: &lt; 3.0 days</p>
                            </div>

                            <div className="glass-card">
                                <div className="flex items-center gap-3 mb-4">
                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                    <h3 className="font-bold text-white text-sm">Escalations</h3>
                                </div>
                                <p className="text-3xl font-bold text-white">03</p>
                                <p className="text-xs text-slate-500 mt-2">Critical intervention needed</p>
                            </div>

                            <div className="glass-card bg-secondary/5 border-secondary/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                                    <h3 className="font-bold text-white text-sm">Responsiveness</h3>
                                </div>
                                <p className="text-3xl font-bold text-secondary">A+</p>
                                <p className="text-xs text-slate-500 mt-2">Top 5% in University</p>
                            </div>
                        </div>

                        <div className="glass-card">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <h2 className="text-xl font-bold text-white">Departmental Grievance Queue</h2>
                                <div className="flex gap-2">
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white transition-colors">
                                        <ListFilter className="w-3 h-3" /> ALL ISSUES
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-red-400/10 border border-red-400/20 rounded-lg text-[10px] font-bold text-red-500 hover:bg-red-400/20 transition-colors">
                                        URGENT ONLY
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { id: "1082", user: "Anonymous Student", type: "Facility Maintenance", time: "2h ago", priority: "HIGH", escalates: "2 days" },
                                    { id: "1083", user: "Aryan Sharma", type: "IT Infrastructure", time: "5h ago", priority: "MEDIUM", escalates: "4 days" },
                                    { id: "1084", user: "Anonymous Student", type: "Security Alert", time: "12m ago", priority: "CRITICAL", escalates: "12h" },
                                ].map((comp) => (
                                    <div key={comp.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-primary/30 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-bold text-slate-400 border border-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                #{comp.id}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-bold text-white">{comp.user}</h4>
                                                    {comp.user === "Anonymous Student" && <span className="text-[8px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded border border-secondary/20 font-bold tracking-widest uppercase">Privacy Enforced</span>}
                                                </div>
                                                <p className="text-xs text-slate-500">{comp.type} • {comp.time}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="text-right mr-4 hidden xl:block">
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Escalation Threat</p>
                                                <p className="text-xs font-bold text-red-400">Escalates in {comp.escalates}</p>
                                            </div>
                                            <span className={`px-3 py-1 ${comp.priority === 'CRITICAL' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'} text-[10px] font-bold rounded-full border`}>
                                                {comp.priority}
                                            </span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleUpdateClick(comp)}
                                                    className="px-4 py-2 bg-primary/80 hover:bg-primary text-white text-[10px] font-bold rounded-lg transition-all"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => setIsEscalating(true)}
                                                    className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold rounded-lg hover:bg-red-500/20 transition-all"
                                                >
                                                    Escalate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Status Update Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                        <div className="glass-card w-full max-w-lg p-8 relative overflow-hidden animate-in fade-in zoom-in duration-300">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Update Grievance Status</h2>
                                    <p className="text-slate-400 text-xs mt-1">Grievance ID: #{selectedComplaint?.id}</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-500 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">New Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Pending" className="bg-[#1e293b]">Pending Review</option>
                                        <option value="In Progress" className="bg-[#1e293b]">In Progress</option>
                                        <option value="Resolved" className="bg-[#1e293b]">Resolved</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Remarks</label>
                                    <textarea
                                        placeholder="Enter action taken or internal notes..."
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all min-h-[120px]"
                                    />
                                </div>

                                <button
                                    onClick={handleSave}
                                    className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-[0_0_20px_rgba(46,49,146,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    SAVE STATUS UPDATE
                                </button>

                                <button className="w-full py-3 bg-white/5 border border-white/10 text-slate-400 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">
                                    REASSIGN DEPARTMENT
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </RoleGate>
    );
}
