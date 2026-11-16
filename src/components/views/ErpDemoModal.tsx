"use client";

import React, { useState } from "react";
import {
  Boxes,
  FileCheck2,
  Users2,
  Hotel,
  X,
  Plus,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Building2,
} from "lucide-react";

interface ErpDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ErpDemoModal({ isOpen, onClose }: ErpDemoModalProps) {
  const [activeTab, setActiveTab] = useState<"inventory" | "invoicing" | "hr" | "hospitality">(
    "inventory"
  );

  // 1. Inventory State
  const [inventoryItems, setInventoryItems] = useState([
    { id: "SKU-101", name: "Dell Latitude 5440 Laptops", category: "Hardware", stock: 18, minStock: 5, warehouse: "Bole Depot" },
    { id: "SKU-102", name: "Cisco Catalyst 24P Switches", category: "Networking", stock: 4, minStock: 6, warehouse: "Mercato Hub" },
    { id: "SKU-103", name: "Cat6 Ethernet Spool (305m)", category: "Cables", stock: 42, minStock: 10, warehouse: "Bole Depot" },
    { id: "SKU-104", name: "HP Toner Cartridge 58A", category: "Consumables", stock: 2, minStock: 8, warehouse: "Kality Central" },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQty, setNewItemQty] = useState(10);

  // 2. Invoicing State
  const [invoiceCustomer, setInvoiceCustomer] = useState("National Trading Enterprise");
  const [invoiceTin, setInvoiceTin] = useState("0049281726");
  const [invoiceAmount, setInvoiceAmount] = useState(145000);
  const [invoiceTax, setInvoiceTax] = useState(21750); // 15% VAT

  // 3. HR State
  const [employees] = useState([
    { id: "EMP-01", name: "Abebe Kebede", role: "Senior Systems Engineer", dept: "Engineering", status: "Present", salary: "48,000 ETB" },
    { id: "EMP-02", name: "Hiwot Tadesse", role: "UI/UX Product Designer", dept: "Product", status: "Present", salary: "36,000 ETB" },
    { id: "EMP-03", name: "Kassahun Bekele", role: "Hardware Logistics Lead", dept: "Operations", status: "On Leave", salary: "30,000 ETB" },
    { id: "EMP-04", name: "Marta Girmay", role: "ERP Implementation Specialist", dept: "Solutions", status: "Remote", salary: "42,000 ETB" },
  ]);

  if (!isOpen) return null;

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;
    setInventoryItems([
      ...inventoryItems,
      {
        id: `SKU-${Math.floor(100 + Math.random() * 900)}`,
        name: newItemName,
        category: "General",
        stock: Number(newItemQty),
        minStock: 5,
        warehouse: "Bole Depot",
      },
    ]);
    setNewItemName("");
  };

  const handlePrintInvoice = () => {
    const printWin = window.open("", "_blank");
    if (printWin) {
      printWin.document.write(`
        <html>
          <head>
            <title>Faajji ERP - Tax Invoice</title>
            <style>
              body { font-family: -apple-system, sans-serif; padding: 40px; color: #111; font-size: 13px; }
              .header { display: flex; justify-content: space-between; border-bottom: 2px solid #091428; padding-bottom: 15px; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
              th { background: #f1f5f9; }
              .total-box { margin-top: 20px; float: right; width: 280px; }
              .total-box div { display: flex; justify-content: space-between; padding: 5px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <h2>FAAJJI TECHNOLOGIES PLC</h2>
                <p>Tax Identification Number (TIN): 0081928374</p>
                <p>Addis Ababa, Ethiopia &bull; +251 911 000 000</p>
              </div>
              <div style="text-align: right;">
                <h3>OFFICIAL COMMERCIAL INVOICE</h3>
                <p>Invoice #: FJ-INV-${Math.floor(100000 + Math.random() * 900000)}</p>
                <p>Date: ${new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <strong>Billed To:</strong> ${invoiceCustomer}<br>
              <strong>Customer TIN:</strong> ${invoiceTin}
            </div>

            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Unit Price (ETB)</th>
                  <th>Total (ETB)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Enterprise Management System License & Hardware Integration</td>
                  <td>1</td>
                  <td>${invoiceAmount.toLocaleString()}</td>
                  <td>${invoiceAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            <div class="total-box">
              <div><span>Subtotal:</span> <span>${invoiceAmount.toLocaleString()} ETB</span></div>
              <div><span>VAT (15%):</span> <span>${invoiceTax.toLocaleString()} ETB</span></div>
              <div style="border-top: 2px solid #222; font-weight: bold; font-size: 15px;">
                <span>Total Due:</span> <span>${(invoiceAmount + invoiceTax).toLocaleString()} ETB</span>
              </div>
            </div>
          </body>
        </html>
      `);
      printWin.document.close();
      printWin.focus();
      printWin.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-5xl max-h-[90vh] rounded-[32px] border border-sky-400/40 flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Top Bar */}
        <div className="p-5 px-6 border-b border-white/10 flex items-center justify-between bg-faajji-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">Faajji Enterprise ERP Suite</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  Live Interactive Demo
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Customizable business software built for Ethiopian companies and institutions.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Module Switcher Bar */}
        <div className="px-6 py-3 border-b border-white/10 bg-faajji-900/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "inventory"
                ? "bg-sky-500 text-slate-950 shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Inventory & Warehousing</span>
          </button>

          <button
            onClick={() => setActiveTab("invoicing")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "invoicing"
                ? "bg-sky-500 text-slate-950 shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Billing & Ethiopian VAT Invoice</span>
          </button>

          <button
            onClick={() => setActiveTab("hr")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "hr"
                ? "bg-sky-500 text-slate-950 shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Users2 className="w-4 h-4" />
            <span>HR, Attendance & Payroll</span>
          </button>

          <button
            onClick={() => setActiveTab("hospitality")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
              activeTab === "hospitality"
                ? "bg-sky-500 text-slate-950 shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Hotel className="w-4 h-4" />
            <span>Hotel & School Administration</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: INVENTORY */}
          {activeTab === "inventory" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Total Tracked SKUs</span>
                  <h4 className="text-2xl font-black text-white mt-1">{inventoryItems.length}</h4>
                  <span className="text-[10px] text-emerald-400">All depots synced</span>
                </div>
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[10px] text-amber-300 font-bold uppercase">Low Stock Alerts</span>
                  <h4 className="text-2xl font-black text-amber-400 mt-1">
                    {inventoryItems.filter((i) => i.stock <= i.minStock).length} Items
                  </h4>
                  <span className="text-[10px] text-amber-300">Requires restocking</span>
                </div>
                <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20">
                  <span className="text-[10px] text-sky-300 font-bold uppercase">Active Warehouses</span>
                  <h4 className="text-2xl font-black text-sky-400 mt-1">3 Locations</h4>
                  <span className="text-[10px] text-sky-300">Bole, Mercato & Kality</span>
                </div>
              </div>

              {/* Add Stock Quick Form */}
              <form onSubmit={handleAddStock} className="p-4 rounded-2xl bg-faajji-900 border border-white/10 flex flex-wrap gap-3 items-center">
                <span className="text-xs font-bold text-white shrink-0">Quick Stock Intake:</span>
                <input
                  type="text"
                  placeholder="Product / Item Name..."
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="glass-input px-3 py-2 rounded-xl text-xs text-white flex-1 min-w-[180px]"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={newItemQty}
                  onChange={(e) => setNewItemQty(Number(e.target.value))}
                  className="glass-input px-3 py-2 rounded-xl text-xs text-white w-20 text-center"
                />
                <button
                  type="submit"
                  className="btn-metallic px-4 py-2 rounded-xl text-xs font-extrabold uppercase flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add To Inventory</span>
                </button>
              </form>

              {/* Table */}
              <div className="rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Item Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Warehouse</th>
                      <th className="p-3 text-center">Stock Level</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {inventoryItems.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5">
                        <td className="p-3 font-mono font-bold text-sky-400">{item.id}</td>
                        <td className="p-3 font-bold text-white">{item.name}</td>
                        <td className="p-3 text-slate-300">{item.category}</td>
                        <td className="p-3 text-slate-400">{item.warehouse}</td>
                        <td className="p-3 text-center font-bold text-white">{item.stock} units</td>
                        <td className="p-3 text-right">
                          {item.stock <= item.minStock ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold inline-flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Reorder
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Adequate
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: INVOICING */}
          {activeTab === "invoicing" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">Create Official Ethiopian Tax Invoice</h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Customer / Organization Name</label>
                  <input
                    type="text"
                    value={invoiceCustomer}
                    onChange={(e) => setInvoiceCustomer(e.target.value)}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Customer Tax ID (TIN Number)</label>
                  <input
                    type="text"
                    value={invoiceTin}
                    onChange={(e) => setInvoiceTin(e.target.value)}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subtotal Amount (ETB)</label>
                  <input
                    type="number"
                    value={invoiceAmount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setInvoiceAmount(val);
                      setInvoiceTax(Math.round(val * 0.15));
                    }}
                    className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>15% Standard Ethiopian VAT:</span>
                    <span className="font-bold text-white">{invoiceTax.toLocaleString()} ETB</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-sky-400 border-t border-white/10 pt-1">
                    <span>Total Invoice Payable:</span>
                    <span>{(invoiceAmount + invoiceTax).toLocaleString()} ETB</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePrintInvoice}
                  className="w-full btn-metallic py-2.5 rounded-xl text-xs font-extrabold uppercase flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Generate & Print Tax Invoice</span>
                </button>
              </div>

              {/* Invoice Preview Sheet */}
              <div className="bg-white text-slate-900 p-6 rounded-3xl shadow-xl flex flex-col justify-between text-xs">
                <div>
                  <div className="border-b pb-3 mb-3 flex justify-between items-baseline">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-950">FAAJJI TECHNOLOGIES PLC</h3>
                      <p className="text-[10px] text-slate-500">TIN: 0081928374 &bull; Addis Ababa</p>
                    </div>
                    <span className="font-bold text-sky-700 text-[10px] uppercase">Official Tax Invoice</span>
                  </div>

                  <div className="mb-4 text-[11px]">
                    <span className="text-slate-500 block">Billed To:</span>
                    <span className="font-bold text-slate-900">{invoiceCustomer}</span>
                    <span className="text-slate-500 block">TIN: {invoiceTin}</span>
                  </div>

                  <table className="w-full border-t border-b text-[11px] my-2">
                    <thead>
                      <tr className="text-slate-500 border-b">
                        <th className="py-1 text-left">Description</th>
                        <th className="py-1 text-right">Amount (ETB)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2">Enterprise Software & Hardware Setup</td>
                        <td className="py-2 text-right font-semibold">{invoiceAmount.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="space-y-1 text-right text-[11px] mt-4">
                    <div>Subtotal: {invoiceAmount.toLocaleString()} ETB</div>
                    <div>VAT (15%): {invoiceTax.toLocaleString()} ETB</div>
                    <div className="font-bold text-sm text-slate-950 border-t pt-1">
                      Total: {(invoiceAmount + invoiceTax).toLocaleString()} ETB
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t text-[10px] text-slate-400 text-center">
                  Certified Compliant with Ethiopian Revenue and Customs Authority (ERCA).
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HR & ATTENDANCE */}
          {activeTab === "hr" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Active Headcount</span>
                  <h4 className="text-2xl font-black text-white mt-1">{employees.length} Staff</h4>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] text-emerald-300 font-bold uppercase">Today Attendance</span>
                  <h4 className="text-2xl font-black text-emerald-400 mt-1">94% Present</h4>
                </div>
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <span className="text-[10px] text-blue-300 font-bold uppercase">Monthly Payroll (ETB)</span>
                  <h4 className="text-2xl font-black text-blue-400 mt-1">156,000 ETB</h4>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Staff ID</th>
                      <th className="p-3">Full Name</th>
                      <th className="p-3">Position</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Compensation</th>
                      <th className="p-3 text-right">Attendance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-white/5">
                        <td className="p-3 font-mono font-bold text-sky-400">{emp.id}</td>
                        <td className="p-3 font-bold text-white">{emp.name}</td>
                        <td className="p-3 text-slate-300">{emp.role}</td>
                        <td className="p-3 text-slate-400">{emp.dept}</td>
                        <td className="p-3 font-semibold text-white">{emp.salary}</td>
                        <td className="p-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              emp.status === "Present"
                                ? "bg-emerald-500/20 text-emerald-300"
                                : emp.status === "Remote"
                                ? "bg-sky-500/20 text-sky-300"
                                : "bg-amber-500/20 text-amber-300"
                            }`}
                          >
                            {emp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: HOSPITALITY & SCHOOL */}
          {activeTab === "hospitality" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-sky-400" />
                  <h4 className="text-base font-bold text-white">Hotel Room Management</h4>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <span className="font-bold text-emerald-400 block text-lg">14</span>
                    <span className="text-[10px] text-slate-300">Occupied Rooms</span>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30">
                    <span className="font-bold text-sky-400 block text-lg">8</span>
                    <span className="text-[10px] text-slate-300">Available</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <span className="font-bold text-amber-400 block text-lg">2</span>
                    <span className="text-[10px] text-slate-300">Cleaning</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Integrates front-desk reservations, kitchen POS orders, and guest billing under one unified local database.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-base font-bold text-white">School Academic Administration</h4>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-white block text-lg">640</span>
                    <span className="text-[10px] text-slate-300">Enrolled Students</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-white block text-lg">32</span>
                    <span className="text-[10px] text-slate-300">Teachers</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <span className="font-bold text-emerald-400 block text-lg">98%</span>
                    <span className="text-[10px] text-slate-300">Tuition Paid</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Digital student records, report card generation, exam grading, and parent SMS notification integration.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
