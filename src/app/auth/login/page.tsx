"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { User, Shield, ArrowRight, ShieldCheck } from "lucide-react";

export default function AuthLanding() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".auth-card", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });

            gsap.from(".auth-header", {
                y: -20,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] -z-10" />

            <div className="auth-header text-center mb-12 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                    <ShieldCheck className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-bold tracking-widest uppercase text-slate-300">Secure Access Point</span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Welcome to Aegis</h1>
                <p className="text-slate-400 text-lg">Select your portal to continue. Your security is our priority.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {/* Student Card */}
                <Link href="/auth/login/student" className="auth-card group relative">
                    <div className="glass-card h-full flex flex-col items-center text-center p-8 border-white/5 hover:border-secondary/50 hover:bg-white/10 transition-all duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <User className="w-8 h-8 text-secondary" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-3">Student Portal</h2>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                            Submit grievances, track resolution status, and provide feedback securely.
                        </p>
                        <div className="mt-auto flex items-center gap-2 text-secondary text-sm font-bold">
                            Enter Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>

                {/* Dept Admin Card */}
                <Link href="/auth/login/admin?role=dept_admin" className="auth-card group relative">
                    <div className="glass-card h-full flex flex-col items-center text-center p-8 border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-3">Dept Admin</h2>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                            Resolve departmental issues, manage status updates, and track escalation timelines.
                        </p>
                        <div className="mt-auto flex items-center gap-2 text-primary text-sm font-bold">
                            Enter Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>

                {/* Super Admin Card */}
                <Link href="/auth/login/admin?role=super_admin" className="auth-card group relative">
                    <div className="glass-card h-full flex flex-col items-center text-center p-8 border-white/5 border-secondary/20 hover:border-secondary/50 hover:bg-white/10 transition-all duration-500">
                        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <ShieldCheck className="w-8 h-8 text-secondary" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-3">Super Admin</h2>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                            System-wide oversight, department leaderboards, and identity disclosure authority.
                        </p>
                        <div className="mt-auto flex items-center gap-2 text-secondary text-sm font-bold">
                            Enter Command Center <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>
            </div>

            <footer className="mt-16 text-slate-500 text-sm flex items-center gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <span>© 2024 Aegis Governance</span>
            </footer>
        </div>
    );
}
