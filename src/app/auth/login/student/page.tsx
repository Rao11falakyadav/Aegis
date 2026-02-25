"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { User, Lock, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentLogin() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<"login" | "register">("login");
    const router = useRouter();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".login-form", {
                scale: 0.95,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, [mode]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Persist role for simulation
        localStorage.setItem('userRole', 'STUDENT');

        // Simulate auth process
        setTimeout(() => {
            router.push("/dashboard/student");
        }, 1500);
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,173,239,0.1),transparent_50%)]" />

            <Link href="/auth/login" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Portal Selection
            </Link>

            <div className="login-form w-full max-w-md">
                <div className="glass-card p-8 border-white/5 shadow-2xl relative overflow-hidden">
                    {/* Subtle accent line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />

                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 border border-secondary/20">
                            <User className="w-8 h-8 text-secondary" />
                        </div>
                        <h1 className="text-2xl font-bold text-white uppercase tracking-tight">
                            {mode === "login" ? "Student Login" : "Student Registration"}
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            {mode === "login" ? "Enter your credentials to access Aegis" : "Create your secure student account"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {mode === "register" && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-secondary transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="e.g. Falak Yadav"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-secondary/50 focus:bg-white/10 transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Student ID / Email</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-secondary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="e.g. 2024CS012"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-secondary/50 focus:bg-white/10 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
                                {mode === "login" && <Link href="#" className="text-[10px] font-bold text-secondary hover:underline">Forgot password?</Link>}
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-secondary transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-secondary/50 focus:bg-white/10 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-secondary/80 hover:bg-secondary text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed glow-secondary"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {mode === "login" ? "Enter Portal" : "Join Aegis"}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center flex flex-col gap-3">
                        <button
                            onClick={() => setMode(mode === "login" ? "register" : "login")}
                            className="text-xs text-slate-500 hover:text-white transition-colors underline decoration-secondary/30 underline-offset-4"
                        >
                            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                            <span className="text-secondary font-bold">
                                {mode === "login" ? "Register Now" : "Login Instead"}
                            </span>
                        </button>
                        <p className="text-xs text-slate-500">
                            Not a student? <Link href="/auth/login/admin" className="text-secondary font-bold hover:underline">Login as Admin</Link>
                        </p>
                    </div>
                </div>

                <p className="text-center mt-8 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                    Protected by Aegis Security Protocol v4.2
                </p>
            </div>
        </div>
    );
}
