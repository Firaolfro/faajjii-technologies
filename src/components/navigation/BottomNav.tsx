"use client";

import React from "react";
import { Home, Wrench, Monitor } from "lucide-react";
import { LionBadge } from "@/components/brand/FaajjiLogo";

export type NavTab = "home" | "services" | "hardware" | "digital-ethiopia" | "admin";

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  cartCount?: number;
}

export function BottomNav({ activeTab, onTabChange, cartCount = 0 }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-faajji-950/90 backdrop-blur-xl border-t border-sky-500/20 px-3 py-2 pb-5 shadow-[0_-5px_25px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto grid grid-cols-4 items-center">
        {/* 1. HOME */}
        <button
          onClick={() => onTabChange("home")}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === "home" ? "text-sky-400 scale-105" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="relative p-1">
            <Home className="w-5 h-5" />
            {activeTab === "home" && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-wider uppercase mt-0.5">Home</span>
        </button>

        {/* 2. SERVICES */}
        <button
          onClick={() => onTabChange("services")}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === "services" ? "text-sky-400 scale-105" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="relative p-1">
            <Wrench className="w-5 h-5" />
            {activeTab === "services" && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-wider uppercase mt-0.5">Services</span>
        </button>

        {/* 3. HARDWARE */}
        <button
          onClick={() => onTabChange("hardware")}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === "hardware" ? "text-sky-400 scale-105" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="relative p-1">
            <Monitor className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
            {activeTab === "hardware" && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-wider uppercase mt-0.5">Hardware</span>
        </button>

        {/* 4. DIGITAL ETHIOPIA */}
        <button
          onClick={() => onTabChange("digital-ethiopia")}
          className={`flex flex-col items-center justify-center transition-all ${
            activeTab === "digital-ethiopia" ? "text-sky-400 scale-105" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className="relative p-1">
            <LionBadge className="w-5 h-5" />
            {activeTab === "digital-ethiopia" && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
            )}
          </div>
          <span className="text-[9px] font-bold tracking-tight uppercase mt-0.5 leading-tight text-center">
            Digital<br />Ethiopia
          </span>
        </button>
      </div>
    </nav>
  );
}
