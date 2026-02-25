"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import RoleGate from "@/components/RoleGate";
import { ShieldCheck, Lock, EyeOff, ShieldAlert } from "lucide-react";

export default function PrivacyPage() {
    return (
        <RoleGate allowedRole="STUDENT">
            <div className="flex bg-[#0F172A] min-h-screen text-slate-200">
                <Sidebar />
                <main className="flex-1 md:ml-64 flex flex-col">
                    <Navbar />
                    <div className="p-8 flex items-center justify-center flex-1">
                        <div className="glass-card max-w-2xl w-full text-center py-12">
                            <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-secondary border border-secondary/30">
                                <ShieldCheck className="w-10 h-10 text-secondary" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4 font-jakarta">Privacy Vault</h2>
                            <p className="text-slate-400 mb-8 max-w-md mx-auto">
                                This area contains your encrypted identity keys and secure communication logs. For your protection, advanced metadata shredding is active.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <Lock className="w-5 h-5 text-secondary mb-2" />
                                    <h3 className="font-bold text-white text-sm">Identity Masking</h3>
                                    <p className="text-[10px] text-slate-500 mt-1">RSA-4096 rotational keys are used to obfuscate your student ID during anonymous submissions.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <ShieldAlert className="w-5 h-5 text-secondary mb-2" />
                                    <h3 className="font-bold text-white text-sm">Zero Knowledge</h3>
                                    <p className="text-[10px] text-slate-500 mt-1">Aegis admins cannot access your raw identity without a digital warrant from the Director.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </RoleGate>
    );
}
