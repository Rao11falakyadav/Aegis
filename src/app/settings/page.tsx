"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import RoleGate from "@/components/RoleGate";
import { Settings, User, Bell, Shield, Moon, ChevronRight } from "lucide-react";

export default function SettingsPage() {
    return (
        <RoleGate allowedRole="DEPT_ADMIN">
            <div className="flex bg-[#0F172A] min-h-screen text-slate-200">
                <Sidebar />
                <main className="flex-1 md:ml-64 flex flex-col">
                    <Navbar />
                    <div className="p-8 max-w-4xl mx-auto w-full">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold text-white font-jakarta">Account Settings</h1>
                            <p className="text-slate-400 mt-1">Manage your profile, notification preferences, and privacy protocols.</p>
                        </header>

                        <div className="space-y-6">
                            <div className="glass-card">
                                <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                                    <User className="w-5 h-5 text-secondary" />
                                    Profile Information
                                </h3>
                                <div className="space-y-4">
                                    {["Full Name", "Student ID", "Email Address", "Department"].map((label, i) => (
                                        <div key={i} className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-white/5 last:border-0 pt-0 first:pt-0">
                                            <span className="text-sm font-medium text-slate-400">{label}</span>
                                            <span className="text-sm font-bold text-white mt-1 md:mt-0">
                                                {label === "Full Name" ? "Falak Yadav" :
                                                    label === "Student ID" ? "#2024CS012" :
                                                        label === "Email Address" ? "f.yadav@university.edu" : "Computer Science"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="glass-card">
                                    <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
                                        <Bell className="w-4 h-4 text-secondary" />
                                        Notifications
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                            <span className="text-xs font-medium">Push Notifications</span>
                                            <div className="w-10 h-5 bg-secondary rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                            <span className="text-xs font-medium">Email Alerts</span>
                                            <div className="w-10 h-5 bg-secondary rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" /></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card">
                                    <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
                                        <Shield className="w-4 h-4 text-secondary" />
                                        Security
                                    </h3>
                                    <button className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-between">
                                        Two-Factor Authentication
                                        <ChevronRight className="w-4 h-4 text-slate-600" />
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
