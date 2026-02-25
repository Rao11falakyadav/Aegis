"use client";

import { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import RoleGate from "@/components/RoleGate";
import { Shield, Users, LayoutDashboard, Database, TrendingUp, AlertTriangle, PieChart, UserPlus, Trash2, ShieldCheck, HeartPulse } from "lucide-react";

export default function SuperAdminDashboard() {
    const [showIdentities, setShowIdentities] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <RoleGate allowedRole="SUPER_ADMIN">
            <div className="flex bg-[#0F172A] min-h-screen text-slate-200 font-outfit">
                <Sidebar />
                <main className="flex-1 md:ml-64 flex flex-col">
                    <Navbar />
                    <div className="p-8 space-y-8">
                        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Shield className="w-5 h-5 text-secondary" />
                                    <span className="text-xs font-bold text-secondary tracking-widest uppercase">System Authority</span>
                                </div>
                                <h1 className="text-3xl font-bold text-white tracking-tight">Central Governance Command</h1>
                            </div>
                            <div className="flex flex-wrap gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl">
                                {["overview", "analytics", "admins"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-secondary text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </header>

                        {activeTab === "overview" && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="glass-card flex flex-col items-center">
                                        <p className="text-sm text-slate-400 font-medium mb-1">Total Users</p>
                                        <p className="text-3xl font-bold text-white tracking-tight">12,402</p>
                                        <div className="flex items-center gap-1 text-[10px] text-green-400 mt-2 font-bold">
                                            <TrendingUp className="w-3 h-3" /> +24% YoY
                                        </div>
                                    </div>
                                    <div className="glass-card flex flex-col items-center">
                                        <p className="text-sm text-slate-400 font-medium mb-1">Total Complaints</p>
                                        <p className="text-3xl font-bold text-white tracking-tight">1,540</p>
                                    </div>
                                    <div className="glass-card flex flex-col items-center border-red-500/20">
                                        <p className="text-sm text-slate-400 font-medium mb-1 text-red-400">Escalated L2</p>
                                        <p className="text-3xl font-bold text-white tracking-tight uppercase">14 Cases</p>
                                        <div className="flex items-center gap-1 text-[10px] text-red-500 mt-2 font-bold">
                                            <AlertTriangle className="w-3 h-3" /> Requires Action
                                        </div>
                                    </div>
                                    <div className="glass-card flex flex-col items-center border-amber-500/20 text-center">
                                        <p className="text-sm text-slate-400 font-medium mb-1 font-bold text-amber-500">Critical Pending</p>
                                        <p className="text-3xl font-bold text-white tracking-tight">08</p>
                                        <p className="text-[8px] text-slate-500 uppercase mt-2 font-bold tracking-widest">SLA Alert</p>
                                    </div>
                                    <div className="glass-card flex flex-col items-center text-center">
                                        <p className="text-sm text-slate-400 font-medium mb-1 font-bold text-secondary">Avg Res. Time</p>
                                        <p className="text-3xl font-bold text-white tracking-tight">3.2 Days</p>
                                        <div className="flex items-center gap-1 text-[10px] text-green-400 mt-2 font-bold">
                                            <TrendingUp className="w-3 h-3" /> -12% Improved
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                    <div className="glass-card">
                                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                            <Users className="w-5 h-5 text-slate-400" /> Department Leaderboard
                                        </h3>
                                        <div className="space-y-4">
                                            {[
                                                { name: "Academic Affairs", score: 98, status: "EXCELLENT", color: "text-green-400" },
                                                { name: "IT Infrastructure", score: 85, status: "GOOD", color: "text-blue-400" },
                                                { name: "Library Services", score: 92, status: "EXCELLENT", color: "text-green-400" },
                                            ].map((dept, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-secondary/20 transition-all">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
                                                            #{i + 1}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-white">{dept.name}</p>
                                                            <p className={`text-[10px] font-bold ${dept.color}`}>{dept.status}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-white">{dept.score}%</p>
                                                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Responsiveness</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="glass-card">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                <Database className="w-5 h-5 text-slate-400" /> Grievance Intelligence
                                            </h3>
                                            <button
                                                onClick={() => setShowIdentities(!showIdentities)}
                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${showIdentities ? 'bg-secondary text-white' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'}`}
                                            >
                                                {showIdentities ? "HIDE IDENTITIES" : "REVEAL IDENTITIES"}
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { id: "AEG-2819", student: "Falak Yadav", studentId: "2024CS101", issue: "Hostel Water Leakage", dept: "Facility" },
                                                { id: "AEG-3012", student: "Rahul Verma", studentId: "2024IT052", issue: "WiFi Signal Drop", dept: "IT" },
                                            ].map((report, i) => (
                                                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col gap-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs font-bold text-slate-400">REPORT #{report.id}</span>
                                                        <span className="text-[8px] opacity-60 font-bold uppercase">{report.dept} Dept</span>
                                                    </div>
                                                    <h4 className="font-bold text-white text-sm">{report.issue}</h4>
                                                    {showIdentities && (
                                                        <div className="mt-2 py-2 px-3 bg-secondary/10 border border-secondary/20 rounded-lg flex justify-between items-center animate-in slide-in-from-top-2 duration-300">
                                                            <div>
                                                                <p className="text-[8px] text-secondary font-bold uppercase tracking-wider">Student Name</p>
                                                                <p className="text-xs font-bold text-white">{report.student}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[8px] text-secondary font-bold uppercase tracking-wider">Student ID</p>
                                                                <p className="text-xs font-bold text-white">{report.studentId}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "analytics" && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="glass-card h-[400px] flex flex-col">
                                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                        <HeartPulse className="w-5 h-5 text-red-400" /> Student Sentiment Analysis
                                    </h3>
                                    <div className="flex-1 flex items-end gap-3 pb-8 px-4">
                                        {[65, 40, 85, 30, 95, 70, 50, 80].map((h, i) => (
                                            <div key={i} className="flex-1 group relative">
                                                <div
                                                    className={`w-full rounded-t-lg transition-all duration-500 hover:scale-x-110 ${h > 70 ? 'bg-green-400/30 border-green-400/50' : h > 40 ? 'bg-amber-400/30 border-amber-400/50' : 'bg-red-400/30 border-red-400/50'} border-t-2`}
                                                    style={{ height: `${h}%` }}
                                                />
                                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500 uppercase">W{i + 1}</div>
                                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white text-[#0F172A] px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {h}% Positive
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-500 italic px-4 pb-4">AI-generated sentiment score based on textual grievance tone and resolution feedback.</p>
                                </div>

                                <div className="glass-card flex flex-col items-center justify-center p-12">
                                    <PieChart className="w-16 h-16 text-secondary mb-6 opacity-20" />
                                    <h3 className="text-xl font-bold text-white mb-2">Category Distribution</h3>
                                    <p className="text-slate-400 text-sm text-center">Detailed breakdown of grievances by category and severity is being processed...</p>
                                    <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4">
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-400" /> <span className="text-[10px] text-slate-400 font-bold uppercase">Academic: 42%</span></div>
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary" /> <span className="text-[10px] text-slate-400 font-bold uppercase">IT Infrastructure: 28%</span></div>
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400" /> <span className="text-[10px] text-slate-400 font-bold uppercase">Hostel: 15%</span></div>
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-400" /> <span className="text-[10px] text-slate-400 font-bold uppercase">Security: 10%</span></div>
                                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-400" /> <span className="text-[10px] text-slate-400 font-bold uppercase">Library: 5%</span></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "admins" && (
                            <div className="glass-card">
                                <div className="flex justify-between items-center mb-10">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Administrator Management</h3>
                                        <p className="text-slate-500 text-xs">Assign roles and govern department access points.</p>
                                    </div>
                                    <button className="px-5 py-2.5 bg-secondary text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:scale-105 transition-all">
                                        <UserPlus className="w-4 h-4" /> ADD NEW ADMIN
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/5 text-left">
                                                <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4">Name</th>
                                                <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4">Role</th>
                                                <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4">Dept</th>
                                                <th className="pb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {[
                                                { name: "Dr. Sandeep Singh", role: "HOD", dept: "Computer Science", email: "s.singh@uni.edu" },
                                                { name: "Prof. Anjali Gupta", role: "DEAN", dept: "Student Welfare", email: "a.gupta@uni.edu" },
                                                { name: "Vikram Malhotra", role: "DEPT_ADMIN", dept: "IT Infrastructure", email: "v.mal@uni.edu" },
                                            ].map((admin, i) => (
                                                <tr key={i} className="hover:bg-white/5 transition-colors group">
                                                    <td className="py-4 px-4">
                                                        <p className="text-sm font-bold text-white">{admin.name}</p>
                                                        <p className="text-[10px] text-slate-500">{admin.email}</p>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="px-2 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold rounded uppercase">{admin.role}</span>
                                                    </td>
                                                    <td className="py-4 px-4 text-xs text-slate-400">{admin.dept}</td>
                                                    <td className="py-4 px-4 text-right">
                                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white"><ShieldCheck className="w-4 h-4" /></button>
                                                            <button className="p-2 hover:bg-red-400/10 rounded-lg text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </RoleGate>
    );
}
