"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import RoleGate from "@/components/RoleGate";
import { User, Mail, Shield, Camera, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function StudentProfile() {
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState({
        name: "Falak Yadav",
        id: "2024CS012",
        email: "f.yadav@university.edu",
        dept: "Computer Science",
        joined: "August 2024",
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <RoleGate allowedRole="STUDENT">
            <div className="flex bg-[#0F172A] min-h-screen text-slate-200 font-outfit">
                <Sidebar />
                <main className="flex-1 md:ml-64 flex flex-col">
                    <Navbar />
                    <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
                        <header className="flex items-center gap-4">
                            <Link href="/dashboard/student" className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-white tracking-tight">Student Profile</h1>
                                <p className="text-slate-400 mt-1">Manage your identity and security settings.</p>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Profile Card */}
                            <div className="md:col-span-1 space-y-6">
                                <div className="glass-card text-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-secondary/40 to-primary/40 -z-10" />
                                    <div className="pt-8 pb-6 flex flex-col items-center">
                                        <div className="relative mb-4">
                                            <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-[#0F172A] flex items-center justify-center overflow-hidden">
                                                <User className="w-12 h-12 text-slate-600" />
                                            </div>
                                            <button className="absolute bottom-0 right-0 p-2 bg-secondary rounded-full text-white shadow-lg hover:scale-110 transition-transform">
                                                <Camera className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                                        <p className="text-sm text-slate-400 font-medium">{profile.id}</p>
                                        <div className="mt-4 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full">
                                            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Active Student</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-white/5 px-6 py-4 flex flex-col gap-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">Department</span>
                                            <span className="text-slate-300 font-medium">{profile.dept}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">Member Since</span>
                                            <span className="text-slate-300 font-medium">{profile.joined}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card bg-primary/5 border-primary/20">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Shield className="w-5 h-5 text-primary" />
                                        <h3 className="font-bold text-white">Trust Score</h3>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[92%] shadow-[0_0_10px_rgba(46,49,146,0.5)]" />
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Credibility</span>
                                        <span className="text-xs font-bold text-primary">High (92)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Settings Form */}
                            <div className="md:col-span-2">
                                <form onSubmit={handleSave} className="glass-card space-y-6">
                                    <h3 className="text-lg font-bold text-white mb-2">Account Details</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-secondary/50 focus:bg-white/10 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Student ID</label>
                                            <input
                                                type="text"
                                                value={profile.id}
                                                disabled
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-slate-500 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-secondary transition-colors" />
                                            <input
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-secondary/50 focus:bg-white/10 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <p className="text-[10px] text-slate-500">Last updated: 3 hours ago</p>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full sm:w-auto px-8 py-3 bg-secondary/80 hover:bg-secondary text-white rounded-xl font-bold transition-all glow-secondary flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {isLoading ? "Saving..." : <><Save className="w-4 h-4" /> SAVE CHANGES</>}
                                        </button>
                                    </div>
                                </form>

                                <div className="glass-card mt-6 border-red-500/10 hover:border-red-500/30 transition-all">
                                    <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-2">Danger Zone</h3>
                                    <p className="text-xs text-slate-500 mb-4">Deleting your account will permanently remove all your grievance history and security tokens.</p>
                                    <button className="px-5 py-2 text-[10px] font-bold border border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                                        PERMANENTLY DELETE ACCOUNT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </RoleGate>
    );
}
