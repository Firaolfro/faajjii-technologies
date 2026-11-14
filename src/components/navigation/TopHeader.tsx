"use client";

import React from "react";
import { FaajjiLogo } from "@/components/brand/FaajjiLogo";
import { NavTab } from "./BottomNav";
import { ShoppingCart, Sparkles, MapPin, ShieldCheck } from "lucide-react";

interface TopHeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export function TopHeader({
  activeTab,
  onTabChange,
  cartCount = 0,
  onOpenCart,
}: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-faajji-950/85 backdrop-blur-xl border-b border-sky-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div
          onClick={() => onTabChange("home")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <FaajjiLogo size="sm" showText={false} variant="orbit" />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
              Faajji Technologies
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-sky-400 font-medium">
              <MapPin className="w-2.5 h-2.5 text-sky-400" />
              <span>Addis Ababa, Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onTabChange("home")}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === "home"
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onTabChange("services")}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === "services"
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Software & Services
          </button>
          <button
            onClick={() => onTabChange("hardware")}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === "hardware"
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            Hardware Store
          </button>
          <button
            onClick={() => onTabChange("digital-ethiopia")}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "digital-ethiopia"
                ? "bg-sky-500/20 text-sky-300 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.25)]"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>EthioGatewayJobs</span>
          </button>
          <button
            onClick={() => onTabChange("admin")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "admin"
                ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Admin</span>
          </button>
        </nav>

        {/* Right Actions: Cart & Quick Action */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-xl bg-slate-900/60 border border-sky-500/20 text-slate-200 hover:text-sky-300 hover:border-sky-400/50 transition-all"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange("services")}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-900 bg-gradient-to-r from-sky-300 to-blue-400 hover:from-sky-200 hover:to-blue-300 transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)]"
          >
            Request A Quote
          </button>
        </div>
      </div>
    </header>
  );
}
