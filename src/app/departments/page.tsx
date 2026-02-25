"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import RoleGate from "@/components/RoleGate";
import { Building2, Users, Search, ChevronRight } from "lucide-react";

export default function DepartmentsPage() {
    return (
        <RoleGate allowedRole="STUDENT">
            <div className="flex bg-[#0F172A] min-h-screen text-slate-200">
                <Sidebar />
                <main className="flex-1 md:ml-64 flex flex-col">
                    <Navbar />
                    <div className="p-8">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold text-white font-jakarta">Department Directory</h1>
                            <p className="text-slate-400 mt-1">Direct contact and performance metrics for university governance units.</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {["Academic Affairs", "IT Infrastructure", "Hostel & Mess", "Security & Safety", "Library Services", "Finance Office"].map((dept, i) => (
                                <div key={i} className="glass-card group cursor-pointer hover:border-secondary/30 transition-all">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:text-secondary transition-colors">
                                            <Building2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white font-jakarta">{dept}</h3>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">University Unit</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-xs text-slate-400">View performance</span>
                                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </RoleGate>
    );
}
