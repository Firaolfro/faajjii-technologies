"use client";

import React, { useState } from "react";
import { FaajjiLogo } from "@/components/brand/FaajjiLogo";
import { NavTab } from "../navigation/BottomNav";
import {
  Code2,
  Cpu,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
} from "lucide-react";

interface HomeViewProps {
  onTabChange: (tab: NavTab) => void;
}

export function HomeView({ onTabChange }: HomeViewProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSuccess(true);
    setTimeout(() => {
      setLoginSuccess(false);
      setShowLoginModal(false);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24 md:pb-16 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden py-12 md:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-sky-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[250px] h-[250px] bg-blue-600/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Brand Hero Element */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Logo variant with orbit / 3D branding */}
          <FaajjiLogo size="lg" variant="orbit" showText={false} />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/25 text-sky-300 text-xs font-semibold uppercase tracking-widest mt-6 mb-3">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            Ethiopia 2026 &bull; Digital Innovation
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.15] drop-shadow-lg">
            Technology for a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-cyan-300">
              Better Tomorrow
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            Faajji Technologies combines <span className="text-white font-medium">Software Development</span>,{" "}
            <span className="text-white font-medium">Hardware Online Sales</span>, and{" "}
            <span className="text-sky-300 font-medium">EthioGatewayJobs</span> under one unified powerhouse for Ethiopia.
          </p>

          {/* Quick Action Buttons matching mockup */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full max-w-md">
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full sm:w-auto flex-1 btn-metallic py-3.5 px-8 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onTabChange("services")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold text-slate-200 bg-faajji-900/80 hover:bg-faajji-800/80 border border-sky-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Services</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Core Business Divisions Grid (From Proposal Page 2) */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Integrated Business Ecosystem
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Three complementary pillars powering digital transformation in Ethiopia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Software */}
          <div
            onClick={() => onTabChange("services")}
            className="group glass-panel p-6 rounded-3xl hover:border-sky-400/50 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300 mb-5 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest">
                Division 01
              </span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-sky-300 transition-colors">
                Software & AI Systems
              </h3>
              <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                Custom enterprise ERPs, school management, websites, mobile applications, and AI-assisted workflow automation.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition-transform">
              <span>View Solutions & Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Pillar 2: Hardware */}
          <div
            onClick={() => onTabChange("hardware")}
            className="group glass-panel p-6 rounded-3xl hover:border-sky-400/50 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300 mb-5 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
                Division 02
              </span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                Hardware Sales & Delivery
              </h3>
              <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                Laptops, networking equipment, peripherals, and printers with verified warranty and doorstep Addis Ababa delivery.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Browse Tech Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Pillar 3: EthioGatewayJobs */}
          <div
            onClick={() => onTabChange("digital-ethiopia")}
            className="group glass-panel p-6 rounded-3xl hover:border-sky-400/50 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300 mb-5 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-sky-300 uppercase tracking-widest">
                Division 03 &bull; Digital Ethiopia
              </span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-sky-300 transition-colors">
                EthioGatewayJobs
              </h3>
              <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                Career platform connecting graduates and employers with AI interview preparation, ATS CV builder, and internships.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-sky-300 group-hover:translate-x-1 transition-transform">
              <span>Find Jobs & AI Interview</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Philosophy & Trust Section (Proposal Pages 2-3) */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-sky-500/20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
                Faajji Philosophy
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Technology Built for Real Local Impact
              </h3>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                Faajji Technologies believes technology should solve real problems, improve productivity, and support national economic development in Ethiopia.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Innovation & Quality</h4>
                    <p className="text-xs text-slate-400">Reliable products with enterprise security and maintainability.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Transparent Local Commerce</h4>
                    <p className="text-xs text-slate-400">Clear pricing in ETB, warranty support, and reliable logistics.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Youth & Career Opportunity</h4>
                    <p className="text-xs text-slate-400">Equipping students with modern tools, AI interview prep, and tech jobs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View Preview Teaser Card matching the User's Screenshot */}
            <div className="flex justify-center">
              <div className="w-full max-w-xs bg-gradient-to-b from-faajji-900 to-faajji-950 p-6 rounded-3xl border border-sky-400/30 shadow-[0_10px_40px_rgba(0,0,0,0.7)] flex flex-col items-center text-center">
                <FaajjiLogo size="md" variant="orbit" showText={false} />
                <h4 className="text-base font-bold text-white mt-3">Faajji Mobile Portal</h4>
                <p className="text-[11px] text-sky-300/80">Innovation &bull; Opportunity &bull; Digital Ethiopia</p>

                <div className="w-full mt-5 space-y-2.5">
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setShowLoginModal(true);
                    }}
                    className="w-full btn-metallic py-2.5 rounded-xl text-xs uppercase"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("register");
                      setShowLoginModal(true);
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold text-sky-300 bg-sky-500/10 border border-sky-400/30 hover:bg-sky-500/20 transition-all uppercase"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Login/Register Modal (Replicating Image 2 exactly!) */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-[32px] bg-gradient-to-b from-[#0e2144] via-[#09152b] to-[#040813] border border-sky-400/30 p-7 shadow-[0_0_50px_rgba(56,189,248,0.25)] flex flex-col items-center">
            {/* Close button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-5 text-slate-400 hover:text-white text-sm"
            >
              ✕
            </button>

            {/* Logo from mockup */}
            <FaajjiLogo size="md" variant="orbit" showText={false} />

            <h3 className="text-xl font-bold text-white mt-3">Faajji Technologies</h3>
            <p className="text-[11px] text-slate-300 text-center font-medium mt-0.5">
              Innovation &bull; Technology &bull; Opportunity<br />
              <span className="text-sky-400 font-semibold">&bull; Digital Ethiopia &bull;</span>
            </p>

            {loginSuccess ? (
              <div className="my-8 text-center flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce mb-2" />
                <p className="text-sm font-bold text-white">Welcome to Faajji!</p>
                <p className="text-xs text-slate-300 mt-1">Authenticated successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleAuthSubmit} className="w-full mt-6 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 pl-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400/60" />
                    <input
                      type="email"
                      required
                      placeholder="user@faajji.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 pl-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400/60" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    className="w-full btn-metallic py-3 rounded-xl text-xs uppercase tracking-wider font-extrabold"
                  >
                    {authMode === "login" ? "Login" : "Create Account"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
                    className="w-full py-3 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-slate-700 transition-all uppercase tracking-wider"
                  >
                    {authMode === "login" ? "Register" : "Already have an account? Login"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
