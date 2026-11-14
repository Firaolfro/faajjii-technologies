"use client";

import React, { useState } from "react";
import {
  Globe,
  Smartphone,
  Bot,
  CheckCircle,
  Send,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { StorageService } from "@/lib/storage";
import { ErpDemoModal } from "./ErpDemoModal";

export function ServicesView() {
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [isErpOpen, setIsErpOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "Business Management System (ERP)",
    budget: "50,000 - 150,000 ETB",
    details: "",
  });

  const businessSystems = [
    {
      title: "Inventory Management",
      desc: "Manage stock, warehouses, barcode tracking, and product movement in real-time.",
      badge: "Supply Chain",
    },
    {
      title: "Sales Management",
      desc: "Manage customer leads, invoices, quotations, orders, and sales commissions.",
      badge: "Commerce",
    },
    {
      title: "Accounting Support Systems",
      desc: "Organize financial records, Ethiopian tax-ready reporting, expense tracking, and cash flow.",
      badge: "Finance",
    },
    {
      title: "HR & Payroll Management",
      desc: "Employee profiles, attendance, leave management, and automated salary processing.",
      badge: "Human Resources",
    },
    {
      title: "School Management System",
      desc: "Academic administration, student registration, grading, tuition fees, and parent portal.",
      badge: "Education",
    },
    {
      title: "Hotel & Hospitality Systems",
      desc: "Room reservations, guest check-in/out, billing, dining, and housekeeping coordination.",
      badge: "Hospitality",
    },
    {
      title: "Custom Enterprise ERP",
      desc: "Complete end-to-end integration connecting all company departments into one dashboard.",
      badge: "Enterprise",
    },
  ];

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceType: formData.serviceType,
      budget: formData.budget,
      details: formData.details || "Custom system requested via portal.",
    });
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "Business Management System (ERP)",
        budget: "50,000 - 150,000 ETB",
        details: "",
      });
    }, 4000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 md:pb-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
          Division 01 &bull; Software & Digital Solutions
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Enterprise Software & Intelligent Systems
        </h1>
        <p className="mt-3 text-base text-slate-300">
          Engineered for Ethiopian businesses, institutions, and startups with world-class quality, reliability, and security.
        </p>
      </div>

      {/* 5 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {/* A: Website Development */}
        <div className="glass-panel p-6 rounded-3xl border border-sky-500/20 hover:border-sky-400/40 transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-300 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Website & Web Applications</h3>
            <p className="text-xs text-slate-400 mt-1">High-performance digital presence</p>
            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Corporate & Brand Websites
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> E-commerce Portals & Marketplaces
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Educational & University Portals
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Booking & Reservation Platforms
              </li>
            </ul>
          </div>
        </div>

        {/* B: Mobile Apps */}
        <div className="glass-panel p-6 rounded-3xl border border-sky-500/20 hover:border-sky-400/40 transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Mobile Applications</h3>
            <p className="text-xs text-slate-400 mt-1">Native iOS and Android Experiences</p>
            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Android & iOS Mobile Development
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> E-commerce & Delivery Tracking Apps
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Business Field Agent & Sales Tools
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Customer Service & Notification Apps
              </li>
            </ul>
          </div>
        </div>

        {/* D: AI & Automation */}
        <div className="glass-panel p-6 rounded-3xl border border-sky-500/20 hover:border-sky-400/40 transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Artificial Intelligence & Automation</h3>
            <p className="text-xs text-slate-400 mt-1">Modernize operations with AI</p>
            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> AI-Assisted Customer Support Chatbots
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Document & Invoice OCR Processing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Intelligent Knowledge Search Tools
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Automated Business Workflows
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Business Management Systems (Table / Showcase from Proposal Page 3) */}
      <div className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Business Management Systems
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Ready-to-deploy, customizable ERP modules tailored for Ethiopian companies.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-semibold">
              7 Specialized Modules
            </span>
            <button
              onClick={() => setIsErpOpen(true)}
              className="btn-metallic px-4 py-2 rounded-xl text-xs font-extrabold uppercase flex items-center gap-1.5 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch ERP Demo</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {businessSystems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setIsErpOpen(true)}
              className="glass-panel p-5 rounded-2xl hover:border-sky-400/40 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-sky-400 uppercase tracking-wider">
                  {item.badge}
                </span>
                <h3 className="text-base font-bold text-white mt-2.5">{item.title}</h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-sky-400 font-medium">
                <span>Request Custom Demo</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Project Quote / Inquiry Form */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-sky-400/30 max-w-4xl mx-auto shadow-[0_15px_50px_rgba(0,0,0,0.6)]">
        <div className="text-center max-w-xl mx-auto mb-8">
          <Sparkles className="w-8 h-8 text-sky-400 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white">Start Your Project with Faajji</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Tell us about your organization and requirements. Our engineering team will prepare a structured proposal and consultation.
          </p>
        </div>

        {quoteSubmitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <CheckCircle className="w-16 h-16 text-emerald-400 mb-3 animate-pulse" />
            <h4 className="text-xl font-bold text-white">Inquiry Received Successfully!</h4>
            <p className="text-sm text-slate-300 mt-2 max-w-md">
              Thank you for reaching out to Faajji Technologies. Our team will review your project details and contact you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleQuoteSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name / Company
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Abebe Bikila"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="company@domain.et"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+251 911 000 000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Service Interested In
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white bg-faajji-900"
                >
                  <option value="Business Management System (ERP)">Business Management System (ERP)</option>
                  <option value="Custom Corporate Website">Custom Corporate Website</option>
                  <option value="Mobile App (Android/iOS)">Mobile App (Android / iOS)</option>
                  <option value="AI Workflow & Chatbot">AI Workflow Automation & Chatbots</option>
                  <option value="School / Hotel Management">School / Hotel Management System</option>
                  <option value="Hardware Bulk Procurement">Hardware Bulk Procurement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Estimated Budget (ETB)
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white bg-faajji-900"
                >
                  <option value="Under 50,000 ETB">Under 50,000 ETB</option>
                  <option value="50,000 - 150,000 ETB">50,000 - 150,000 ETB</option>
                  <option value="150,000 - 400,000 ETB">150,000 - 400,000 ETB</option>
                  <option value="400,000+ ETB (Enterprise)">400,000+ ETB (Enterprise)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Project Requirements & Description
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe what your organization needs..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white placeholder-slate-500"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-metallic py-3 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Request For Proposal</span>
            </button>
          </form>
        )}
      </div>

      {/* Interactive ERP Demo System */}
      <ErpDemoModal isOpen={isErpOpen} onClose={() => setIsErpOpen(false)} />
    </div>
  );
}
