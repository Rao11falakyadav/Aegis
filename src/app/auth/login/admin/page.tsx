"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Shield, Lock, ArrowRight, ArrowLeft, Loader2, Mail, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialRole = searchParams.get("role") || "dept_admin";

    const [role, setRole] = useState(initialRole);

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
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Persist role for simulation
        const normalizedRole = role === 'super_admin' ? 'SUPER_ADMIN' : 'DEPT_ADMIN';
        localStorage.setItem('userRole', normalizedRole);

        // Role-based routing
        setTimeout(() => {
            if (role === "super_admin") {
                router.push("/dashboard/admin/super");
            } else if (role === "dept_admin") {
                router.push("/dashboard/admin/dept");
            } else {
                // For HOD/Dean, we can use a generic admin portal or shared logic
                router.push("/dashboard/admin/dept");
            }
        }, 1500);
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(46,49,146,0.1),transparent_50%)]" />

            <Link href="/auth/login" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Portal Selection
            </Link>

            <div className="login-form w-full max-w-md">
                <div className="glass-card p-8 border-white/5 shadow-2xl relative overflow-hidden">
                    {/* Subtle accent line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                            {role === 'super_admin' ? <ShieldCheck className="w-8 h-8 text-primary" /> : <Shield className="w-8 h-8 text-primary" />}
                        </div>
                        <h1 className="text-2xl font-bold text-white uppercase tracking-tight">
                            {role === 'super_admin' ? 'Super Admin Portal' : 'Dept Admin Portal'}
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">Authorized Command Access</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Access Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                            >
                                <option value="dept_admin" className="bg-[#1e293b]">Department Admin</option>
                                <option value="hod" className="bg-[#1e293b]">Head of Department (HOD)</option>
                                <option value="dean" className="bg-[#1e293b]">Dean</option>
                                <option value="super_admin" className="bg-[#1e293b]">Super Admin</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Admin ID / Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="admin@aegis.edu"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Security Key</label>
                                <Link href="#" className="text-[10px] font-bold text-primary hover:underline">Reset access?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-primary/80 hover:bg-primary text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(46,49,146,0.2)]"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Verify Credentials <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-xs text-slate-500">
                            Not an admin? <Link href="/auth/login/student" className="text-primary font-bold hover:underline">Login as Student</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-4 text-slate-600">
                    <div className="flex items-center gap-1.5 grayscale opacity-50">
                        <Shield className="w-3 h-3" />
                        <span className="text-[10px] font-bold tracking-widest">TLS 1.3</span>
                    </div>
                    <div className="w-1 h-1 bg-slate-800 rounded-full" />
                    <div className="flex items-center gap-1.5 grayscale opacity-50">
                        <Lock className="w-3 h-3" />
                        <span className="text-[10px] font-bold tracking-widest">AES-256</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdminLogin() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0F172A] flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>}>
            <LoginContent />
        </Suspense>
    );
}
