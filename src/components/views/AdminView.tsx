"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  PackageCheck,
  MessageSquare,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Building,
  CreditCard,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { StorageService } from "@/lib/storage";
import { StoreOrder, ServiceInquiry, JobApplication } from "@/lib/types";

export function AdminView() {
  const [activeTab, setActiveTab] = useState<"orders" | "inquiries" | "applications">("orders");
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [inquiries, setInquiries] = useState<ServiceInquiry[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const refreshData = () => {
    setOrders(StorageService.getOrders());
    setInquiries(StorageService.getInquiries());
    setApplications(StorageService.getApplications());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleStatusChangeOrder = (id: string, status: StoreOrder["status"]) => {
    StorageService.updateOrderStatus(id, status);
    refreshData();
  };

  const handleStatusChangeInquiry = (id: string, status: ServiceInquiry["status"]) => {
    StorageService.updateInquiryStatus(id, status);
    refreshData();
  };

  const handleStatusChangeApp = (id: string, status: JobApplication["status"]) => {
    StorageService.updateApplicationStatus(id, status);
    refreshData();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 md:pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
            Faajji Technologies &bull; Executive Operations Portal
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Central Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time tracking of hardware sales, corporate software inquiries, and EthioGateway applicant pipeline.
          </p>
        </div>

        <button
          onClick={refreshData}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-sky-300 font-semibold flex items-center gap-2 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync Data</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="glass-panel p-5 rounded-3xl border border-sky-500/20 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gross Orders (ETB)</span>
            <h3 className="text-2xl font-black text-white mt-1">
              {totalRevenue.toLocaleString()}{" "}
              <span className="text-xs font-semibold text-sky-400">ETB</span>
            </h3>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> Live sales activity
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-300 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-sky-500/20 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hardware Orders</span>
            <h3 className="text-2xl font-black text-white mt-1">{orders.length}</h3>
            <span className="text-[10px] text-sky-300 font-semibold mt-1 block">
              {orders.filter((o) => o.status === "Processing" || o.status === "Pending").length} pending delivery
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
            <PackageCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-sky-500/20 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Corporate Inquiries</span>
            <h3 className="text-2xl font-black text-white mt-1">{inquiries.length}</h3>
            <span className="text-[10px] text-cyan-300 font-semibold mt-1 block">
              {inquiries.filter((i) => i.status === "New").length} new RFPs awaiting proposal
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-sky-500/20 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Job Candidates</span>
            <h3 className="text-2xl font-black text-white mt-1">{applications.length}</h3>
            <span className="text-[10px] text-indigo-300 font-semibold mt-1 block">
              EthioGateway talent pool
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs & Search */}
      <div className="glass-panel p-3 rounded-2xl border border-sky-500/20 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "orders"
                ? "bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Hardware Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "inquiries"
                ? "bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Software Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "applications"
                ? "bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Job Applications ({applications.length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full glass-input pl-9 pr-3 py-1.5 rounded-xl text-xs text-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* 1. ORDERS TABLE */}
      {activeTab === "orders" && (
        <div className="glass-panel rounded-3xl border border-sky-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Order Ref</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Items</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders
                  .filter(
                    (o) =>
                      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      o.customerName.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                        {order.orderNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{order.customerName}</span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {order.customerPhone}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                          <span>{order.deliverySubcity}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-xs">
                        {order.items.map((it, i) => (
                          <div key={i} className="truncate">
                            &bull; {it.quantity}x {it.name}
                          </div>
                        ))}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        {order.totalAmount.toLocaleString()} ETB
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChangeOrder(
                              order.id,
                              e.target.value as StoreOrder["status"]
                            )
                          }
                          className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all ${
                            order.status === "Delivered"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : order.status === "Out for Delivery"
                              ? "bg-sky-500/20 text-sky-300 border-sky-500/30"
                              : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          } bg-faajji-950`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. INQUIRIES TABLE */}
      {activeTab === "inquiries" && (
        <div className="glass-panel rounded-3xl border border-sky-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Client / Organization</th>
                  <th className="py-3.5 px-4">Service Required</th>
                  <th className="py-3.5 px-4">Budget</th>
                  <th className="py-3.5 px-4">Project Brief</th>
                  <th className="py-3.5 px-4">Received</th>
                  <th className="py-3.5 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inquiries
                  .filter(
                    (i) =>
                      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      i.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((inq) => (
                    <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{inq.name}</span>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            {inq.email}
                          </span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {inq.phone}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-sky-300">
                        {inq.serviceType}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        {inq.budget}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-sm">
                        <p className="line-clamp-2 leading-relaxed">{inq.details}</p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {inq.createdAt}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            handleStatusChangeInquiry(
                              inq.id,
                              e.target.value as ServiceInquiry["status"]
                            )
                          }
                          className="px-2.5 py-1 rounded-xl text-[11px] font-bold border border-sky-400/30 bg-faajji-950 text-white"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. APPLICATIONS TABLE */}
      {activeTab === "applications" && (
        <div className="glass-panel rounded-3xl border border-sky-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Candidate</th>
                  <th className="py-3.5 px-4">Position</th>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Cover Statement</th>
                  <th className="py-3.5 px-4">Applied</th>
                  <th className="py-3.5 px-4">Pipeline Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {applications
                  .filter(
                    (a) =>
                      a.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      a.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((app) => (
                    <tr key={app.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white block">{app.applicantName}</span>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{app.email}</span>
                          <span>&bull;</span>
                          <span>{app.phone}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-sky-300">
                        {app.jobTitle}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {app.company}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-sm">
                        <p className="line-clamp-2 leading-relaxed">{app.coverNote}</p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {app.createdAt}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChangeApp(
                              app.id,
                              e.target.value as JobApplication["status"]
                            )
                          }
                          className="px-2.5 py-1 rounded-xl text-[11px] font-bold border border-sky-400/30 bg-faajji-950 text-white"
                        >
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Interviewing">Interviewing</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
