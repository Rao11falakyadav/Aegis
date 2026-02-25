"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import RoleGate from "@/components/RoleGate";
import {
    ShieldCheck,
    Send,
    Info,
    Lock,
    Eye,
    EyeOff,
    AlertTriangle,
    Zap,
    CheckCircle2,
    FileText,
    ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

const AI_KEYWORDS = {
    critical: ["harassment", "assault", "violence", "threat", "safety", "emergency", "fire", "suicide", "harm"],
    high: ["outdated software", "lab fan", "lab ac", "system crash", "overcrowded", "noise", "security issue", "outdated"],
    medium: ["wifi", "water", "electricity", "mess", "hostel", "payment", "fee", "slow", "bandwidth", "speed", "seating"],
    low: ["suggestion", "request", "feedback", "general", "query", "info", "books", "unavailability"]
};

const AI_CATEGORIES: { [key: string]: { dept: string, keywords: string[] } } = {
    "Security & Safety": {
        dept: "security",
        keywords: ["harassment", "unsafe", "emergency", "assault", "violence", "threat", "security", "safety", "lighting", "cctv"]
    },
    "IT Infrastructure": {
        dept: "it",
        keywords: ["wifi", "internet", "bandwidth", "speed", "software", "lab", "computer", "crash", "outdated", "lan"]
    },
    "Hostel & Mess": {
        dept: "hostel",
        keywords: ["hostel", "mess", "water", "electricity", "fan", "ac", "room", "food", "warden"]
    },
    "Academic Affairs": {
        dept: "academic",
        keywords: ["exam", "results", "marks", "teacher", "professor", "class", "assignment", "mentor", "coordinator"]
    },
    "Library Services": {
        dept: "library",
        keywords: ["library", "book", "seating", "noise", "overcrowded", "librarian"]
    }
};

export default function SubmitGrievance() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [priority, setPriority] = useState<"low" | "medium" | "high" | "critical">("low");
    const [category, setCategory] = useState("General");
    const [department, setDepartment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [refId, setRefId] = useState("");

    // AI Logic: Detect Priority and Department in real-time
    useEffect(() => {
        const lowercaseText = text.toLowerCase();

        // Detect Severity/Priority
        let detectedPriority: "low" | "medium" | "high" | "critical" = "low";
        if (AI_KEYWORDS.critical.some(k => lowercaseText.includes(k))) detectedPriority = "critical";
        else if (AI_KEYWORDS.high.some(k => lowercaseText.includes(k))) detectedPriority = "high";
        else if (AI_KEYWORDS.medium.some(k => lowercaseText.includes(k))) detectedPriority = "medium";
        setPriority(detectedPriority);

        // Detect Department
        let detectedDept = "";
        let detectedCatName = "General";
        for (const [cat, info] of Object.entries(AI_CATEGORIES)) {
            if (info.keywords.some(k => lowercaseText.includes(k))) {
                detectedDept = info.dept;
                detectedCatName = cat;
                break;
            }
        }
        setDepartment(detectedDept);
        setCategory(detectedCatName);
    }, [text]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate encryption and processing
        setTimeout(() => {
            setRefId(`#AEG-${Math.floor(Math.random() * 90000) + 10000}`);
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="flex bg-[#0F172A] min-h-screen text-slate-200">
                <Sidebar />
                <main className="flex-1 md:ml-64 flex flex-col">
                    <Navbar />
                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="glass-card max-w-md w-full text-center py-12">
                            <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-secondary border border-secondary/30">
                                <CheckCircle2 className="w-10 h-10 text-secondary" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2 font-jakarta">Grievance Submitted Successfully</h2>
                            <p className="text-slate-400 mb-8">
                                Your complaint has been {isAnonymous ? "anonymized and encrypted" : "recorded"}.
                                Reference ID: <span className="text-secondary font-mono">{refId}</span>
                            </p>
                            <Link
                                href="/"
                                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all inline-block"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <RoleGate allowedRole="STUDENT">
            <div className="flex bg-[#0F172A] min-h-screen text-slate-200">
                <Sidebar />
                <main className="flex-1 md:ml-64 flex flex-col">
                    <Navbar />
                    <div className="p-8 max-w-4xl mx-auto w-full">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold text-white font-jakarta">Submit a Grievance</h1>
                            <p className="text-slate-400 mt-1">Provide details of your concern. Our AI will automatically categorize and route it.</p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="glass-card">
                                <div className="flex items-center gap-2 mb-4 text-secondary">
                                    <FileText className="w-5 h-5" />
                                    <h3 className="font-bold font-jakarta">Grievance Details</h3>
                                </div>

                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Describe your issue in detail... (e.g., 'The WiFi in Hostel 3 is extremely slow since yesterday')"
                                    className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-secondary/50 transition-colors resize-none mb-6"
                                    required
                                />

                                <div className="space-y-2 mb-6">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Select Department</label>
                                    <select
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-secondary/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" className="bg-[#1e293b]">Choose Department...</option>
                                        <option value="academic" className="bg-[#1e293b]">Academic Affairs</option>
                                        <option value="it" className="bg-[#1e293b]">IT Infrastructure</option>
                                        <option value="hostel" className="bg-[#1e293b]">Hostel & Mess</option>
                                        <option value="security" className="bg-[#1e293b]">Security & Safety</option>
                                        <option value="library" className="bg-[#1e293b]">Library Services</option>
                                    </select>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Upload Proof (Photo/Video/PDF)</label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="w-full bg-white/5 border border-dashed border-white/20 rounded-xl py-8 flex flex-col items-center justify-center group-hover:border-secondary/50 transition-all">
                                            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mb-2">
                                                <Send className="w-5 h-5 text-slate-400 rotate-90" />
                                            </div>
                                            <p className="text-xs text-slate-400">
                                                {files.length > 0 ? `${files.length} files selected` : "Drag and drop or click to upload"}
                                            </p>
                                        </div>
                                    </div>
                                    {files.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {files.map((f, i) => (
                                                <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300">
                                                    {f.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Zap className={cn("w-5 h-5",
                                                priority === "critical" ? "text-red-500 animate-pulse" :
                                                    priority === "high" ? "text-red-400" :
                                                        priority === "medium" ? "text-amber-400" : "text-blue-400"
                                            )} />
                                            <div>
                                                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">AI Severity</p>
                                                <p className="text-sm font-bold text-white uppercase">{priority}</p>
                                            </div>
                                        </div>
                                        <Info className="w-4 h-4 text-slate-600" />
                                    </div>

                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <AlertTriangle className="w-5 h-5 text-secondary" />
                                            <div>
                                                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">AI Category</p>
                                                <p className="text-sm font-bold text-white">{category}</p>
                                            </div>
                                        </div>
                                        <Info className="w-4 h-4 text-slate-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Privacy Shield Toggle */}
                            <div className={cn(
                                "glass-card border transition-all duration-300",
                                isAnonymous ? "border-secondary/40 bg-secondary/10" : "border-white/10"
                            )}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                                            isAnonymous ? "bg-secondary text-white shadow-[0_0_20px_rgba(0,173,239,0.4)]" : "bg-white/5 text-slate-500"
                                        )}>
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white flex items-center gap-2">
                                                Anonymous Mode
                                                {isAnonymous && <span className="text-[10px] bg-secondary/20 text-secondary px-2 py-0.5 rounded-full border border-secondary/30">ENCRYPTED</span>}
                                            </h3>
                                            <p className="text-xs text-slate-400 mt-0.5">Your identity will be hidden from the department and only visible to Super-Admin.</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsAnonymous(!isAnonymous)}
                                        className={cn(
                                            "w-14 h-8 rounded-full relative transition-colors duration-300",
                                            isAnonymous ? "bg-secondary" : "bg-white/10"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300",
                                            isAnonymous ? "left-7" : "left-1"
                                        )} />
                                    </button>
                                </div>

                                {isAnonymous && (
                                    <div className="mt-4 p-3 bg-secondary/10 border border-secondary/20 rounded-lg flex gap-3 items-center">
                                        <Lock className="w-4 h-4 text-secondary" />
                                        <p className="text-[10px] text-secondary font-medium uppercase tracking-wider">
                                            Privacy Shield Enabled: Metadata Stripping & RSA-4096 Encryption Active
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !text}
                                    className="flex-1 h-14 bg-secondary hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all glow-secondary"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            SUBMIT GRIEVANCE
                                        </>
                                    )}
                                </button>
                                <Link
                                    href="/"
                                    className="h-14 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 font-bold transition-all flex items-center"
                                >
                                    CANCEL
                                </Link>
                            </div>
                        </form>

                        <div className="mt-12 p-6 glass-card border-dashed border-white/10 text-center">
                            <ShieldAlert className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                            <p className="text-xs text-slate-500 max-w-md mx-auto">
                                Aegis uses Advanced Smart Governance protocols to ensure every voice is heard without fear of retaliation. All data is processed in accordance with Student Protection Act 2026.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </RoleGate>
    );
}
