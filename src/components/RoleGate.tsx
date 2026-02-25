"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: "STUDENT" | "DEPT_ADMIN" | "SUPER_ADMIN";
}

export default function RoleGate({ children, allowedRole }: RoleGateProps) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAccess = () => {
            // Check localStorage for simulated 'session'
            const userRole = localStorage.getItem('userRole');

            if (!userRole || userRole !== allowedRole) {
                setIsAuthorized(false);
                // Delay redirect to show the security check UI
                setTimeout(() => {
                    router.push("/auth/login");
                }, 1500);
            } else {
                setIsAuthorized(true);
            }
        };

        const timer = setTimeout(checkAccess, 800);
        return () => clearTimeout(timer);
    }, [allowedRole, router]);

    if (isAuthorized === null) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F172A] text-slate-200 p-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                    <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
                </div>
                <h2 className="mt-8 text-xl font-bold font-jakarta tracking-tight">Verifying Access Credentials...</h2>
                <p className="mt-2 text-slate-500 text-sm font-medium uppercase tracking-widest">Aegis Security Protocol v4.2</p>

                <div className="mt-12 flex gap-4 grayscale opacity-30">
                    <div className="h-1 w-8 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/2 animate-[shimmer_2s_infinite]" />
                    </div>
                    <div className="h-1 w-8 bg-slate-700 rounded-full" />
                    <div className="h-1 w-8 bg-slate-700 rounded-full" />
                </div>
            </div>
        );
    }

    if (isAuthorized === false) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F172A] text-slate-200 p-6">
                <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20">
                    <ShieldAlert className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 font-jakarta">Security Breach Detected</h2>
                <p className="text-slate-400 text-center max-w-sm mb-8">
                    Your current credentials do not grant access to this command level. Redirecting to tactical authorization...
                </p>
                <div className="flex items-center gap-3 text-red-400 font-bold text-xs tracking-widest uppercase">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Re-authorizing
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
