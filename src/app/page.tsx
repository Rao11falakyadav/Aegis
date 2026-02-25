"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import {
  Activity,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  ChevronRight
} from "lucide-react";

const stats = [
  { label: "Active Grievances", value: "124", icon: Activity, trend: "+12%", color: "text-blue-400" },
  { label: "Resolved Today", value: "18", icon: CheckCircle2, trend: "+5%", color: "text-green-400" },
  { label: "Avg. Response", value: "4.2h", icon: Clock, trend: "-0.5h", color: "text-amber-400" },
  { label: "Auto Escalated", value: "03", icon: AlertCircle, trend: "0", color: "text-red-400" },
];

const departments = [
  { name: "Academic Affairs", score: 92, status: "excellent", color: "bg-green-500" },
  { name: "IT Infrastructure", score: 85, status: "good", color: "bg-blue-500" },
  { name: "Hostel & Mess", score: 64, status: "warning", color: "bg-amber-500" },
  { name: "Security & Safety", score: 98, status: "excellent", color: "bg-emerald-500" },
  { name: "Library Services", score: 42, status: "critical", color: "bg-red-500" },
];

export default function Home() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(".stat-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2
      });

      gsap.from(".leaderboard-item", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex bg-[#0F172A] min-h-screen text-slate-200">
      <Sidebar />

      <main className="flex-1 md:ml-64 flex flex-col">
        <Navbar />

        <div className="p-8 space-y-8">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 ref={titleRef} className="text-3xl font-bold text-white font-jakarta tracking-tight">Governance Overview</h1>
              <p className="text-slate-400 mt-1">Real-time performance metrics across all departments.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/analytics" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors">
                Export Data
              </Link>
              <Link href="/submit" className="px-4 py-2 bg-secondary/80 hover:bg-secondary text-white rounded-xl text-sm font-bold glow-secondary transition-all">
                New Action
              </Link>
            </div>
          </header>

          {/* Stat Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Link href="/complaints" key={i} className="glass-card stat-card group relative overflow-hidden block hover:border-secondary/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-green-400">
                    {stat.trend}
                    <TrendingUp className="w-3 h-3" />
                  </div>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white mb-1 font-jakarta tracking-tight">{stat.value}</p>
                  <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Department Leaderboard */}
            <Link href="/departments" className="xl:col-span-2 glass-card hover:border-secondary/30 transition-all block">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-white font-jakarta">Department Responsiveness</h2>
                  <p className="text-sm text-slate-400 mt-1">Efficiency scores based on resolution time and feedback.</p>
                </div>
                <Building2 className="w-6 h-6 text-slate-500" />
              </div>

              <div className="space-y-6">
                {departments.map((dept, i) => (
                  <div key={i} className="leaderboard-item relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-slate-200">{dept.name}</span>
                      <span className="text-sm font-bold text-white">{dept.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${dept.color} transition-all duration-1000 ease-out rounded-full opacity-80`}
                        style={{ width: `${dept.score}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Tier: {dept.status}</span>
                      <span className="text-[10px] text-slate-500">Last updated: 2h ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </Link>

            {/* Quick Actions / Activity Feed */}
            <div className="space-y-6">
              <div className="glass-card bg-secondary/10 border border-secondary/20 stat-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-bold text-white font-jakarta">Privacy Shield</h3>
                </div>
                <p className="text-sm text-slate-300 mb-6">
                  Your identity is protected by end-to-end encryption. Department heads only see grievance IDs.
                </p>
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5">
                  <span className="text-xs font-medium text-slate-400">Current Status:</span>
                  <span className="text-xs font-bold text-secondary flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    ENABLED
                  </span>
                </div>
              </div>

              <div className="glass-card stat-card">
                <h3 className="font-bold text-white font-jakarta mb-4">Urgent Actions</h3>
                <div className="space-y-4">
                  {[1, 2].map((_, i) => (
                    <Link href="/complaints" key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 flex gap-4 hover:border-white/20 transition-all cursor-pointer group">
                      <div className="w-10 h-10 rounded-lg bg-red-400/10 border border-red-400/20 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-white group-hover:text-secondary transition-colors">Safety Alert #829</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Escalated to Dean (L2)</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 self-center" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
