"use client";

import React, { useState } from "react";
import {
  Laptop,
  Printer,
  Wifi,
  Headphones,
  ShoppingCart,
  Search,
  CheckCircle,
  Truck,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  Plus,
  Minus,
  X,
} from "lucide-react";
import { StorageService } from "@/lib/storage";

export interface HardwareProduct {
  id: string;
  name: string;
  category: "laptops" | "peripherals" | "networking" | "printers";
  price: number; // in ETB
  originalPrice?: number;
  specs: string;
  warranty: string;
  inStock: boolean;
  imageIcon: string;
}

export interface CartItem {
  product: HardwareProduct;
  quantity: number;
}

interface HardwareViewProps {
  onAddToCart: (product: HardwareProduct) => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onClearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export const sampleProducts: HardwareProduct[] = [
  {
    id: "p1",
    name: "Dell Latitude 5440 (13th Gen Intel Core i7)",
    category: "laptops",
    price: 118000,
    originalPrice: 125000,
    specs: "16GB DDR5 RAM, 512GB NVMe SSD, 14\" FHD IPS Anti-Glare Display",
    warranty: "1 Year Official Warranty",
    inStock: true,
    imageIcon: "laptop",
  },
  {
    id: "p2",
    name: "HP LaserJet Pro MFP M428fdw Wireless Printer",
    category: "printers",
    price: 74500,
    specs: "Duplex Printing, Scan to Cloud, Ethernet & Wi-Fi, 40ppm Fast Output",
    warranty: "1 Year Official Warranty",
    inStock: true,
    imageIcon: "printer",
  },
  {
    id: "p3",
    name: "Cisco Catalyst 24-Port Gigabit Managed Switch",
    category: "networking",
    price: 68000,
    specs: "24x 10/100/1000 Ports, 4x SFP+ Uplinks, Enterprise VLAN & QoS",
    warranty: "2 Years Enterprise Warranty",
    inStock: true,
    imageIcon: "wifi",
  },
  {
    id: "p4",
    name: "Lenovo ThinkPad E16 (AMD Ryzen 7 7730U)",
    category: "laptops",
    price: 104000,
    originalPrice: 112000,
    specs: "16GB RAM, 512GB SSD, Fingerprint Reader, Aluminum Chassis",
    warranty: "1 Year Official Warranty",
    inStock: true,
    imageIcon: "laptop",
  },
  {
    id: "p5",
    name: "MikroTik Cloud Router Switch (CRS326-24G-2S+RM)",
    category: "networking",
    price: 36500,
    specs: "Dual Boot SwOS/RouterOS, 24 Gigabit RJ45, 2 SFP+ Cages",
    warranty: "1 Year Warranty",
    inStock: true,
    imageIcon: "wifi",
  },
  {
    id: "p6",
    name: "Logitech MX Master 3S Wireless Performance Mouse",
    category: "peripherals",
    price: 14800,
    specs: "8K DPI Any-surface Tracking, Quiet Clicks, USB-C Quick Recharge",
    warranty: "1 Year Warranty",
    inStock: true,
    imageIcon: "headphones",
  },
  {
    id: "p7",
    name: "Epson EcoTank L3250 All-in-One Ink Tank System",
    category: "printers",
    price: 38900,
    specs: "Ultra-low cost printing, Wi-Fi Direct, Mobile App Support",
    warranty: "1 Year Warranty",
    inStock: true,
    imageIcon: "printer",
  },
  {
    id: "p8",
    name: "Samsung 27\" Curved 75Hz Business Monitor",
    category: "peripherals",
    price: 32000,
    specs: "1800R Curvature, Eye Saver Mode, HDMI & VGA, Slim Bezel",
    warranty: "1 Year Warranty",
    inStock: true,
    imageIcon: "laptop",
  },
];

export function HardwareView({
  onAddToCart,
  cart,
  onUpdateQuantity,
  onClearCart,
  isCartOpen,
  setIsCartOpen,
}: HardwareViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "address" | "success">("cart");
  const [deliverySubcity, setDeliverySubcity] = useState("Bole, Addis Ababa");
  const [paymentMethod, setPaymentMethod] = useState("chapa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [lastOrderRef, setLastOrderRef] = useState("FJ-948211");

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const renderIcon = (type: string) => {
    switch (type) {
      case "printer":
        return <Printer className="w-8 h-8 text-sky-400" />;
      case "wifi":
        return <Wifi className="w-8 h-8 text-cyan-400" />;
      case "headphones":
        return <Headphones className="w-8 h-8 text-blue-400" />;
      default:
        return <Laptop className="w-8 h-8 text-sky-400" />;
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder = StorageService.addOrder({
      customerName: customerName || "Customer",
      customerPhone: phoneNumber || "+251 911 000 000",
      deliverySubcity,
      paymentMethod: paymentMethod === "chapa" ? "Chapa (Telebirr/CBE)" : "Cash on Delivery",
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      totalAmount: cartTotal,
      status: "Pending",
    });
    setLastOrderRef(newOrder.orderNumber);
    setCheckoutStep("success");
    setTimeout(() => {
      onClearCart();
    }, 1000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-28 md:pb-16">
      {/* Division Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
          Division 02 &bull; Hardware Online Sales & Delivery
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Authentic IT Hardware & Fast Delivery
        </h1>
        <p className="mt-3 text-base text-slate-300">
          Laptops, networking gear, office printers, and peripherals sourced from authorized distributors with local Ethiopian warranty.
        </p>

        {/* Value Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Truck className="w-4 h-4 text-sky-400" />
            <span>Doorstep Addis Ababa Delivery</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Genuine with Warranty</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <CreditCard className="w-4 h-4 text-cyan-400" />
            <span>Telebirr, CBE & Cash on Delivery</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-sky-500/20 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {[
            { id: "all", label: "All Hardware" },
            { id: "laptops", label: "Laptops & PCs" },
            { id: "networking", label: "Networking" },
            { id: "printers", label: "Printers & Office" },
            { id: "peripherals", label: "Peripherals" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search laptops, switches, printers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-input pl-10 pr-4 py-2 rounded-xl text-xs text-white placeholder-slate-400"
          />
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="glass-panel rounded-3xl p-5 border border-white/10 hover:border-sky-400/40 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Product Visual Box */}
              <div className="w-full h-36 rounded-2xl bg-gradient-to-br from-faajji-900 to-faajji-950 border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold uppercase tracking-wider">
                    In Stock
                  </span>
                </div>
                {renderIcon(product.imageIcon)}
              </div>

              {/* Info */}
              <div className="mt-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400">
                  {product.category}
                </span>
                <h3 className="text-sm font-bold text-white mt-1 line-clamp-2 leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                  {product.specs}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
                  <ShieldCheck className="w-3 h-3 text-sky-400" />
                  <span>{product.warranty}</span>
                </div>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block -mb-0.5">Price</span>
                <span className="text-base font-extrabold text-white">
                  {product.price.toLocaleString()} <span className="text-xs font-semibold text-sky-400">ETB</span>
                </span>
              </div>

              <button
                onClick={() => onAddToCart(product)}
                className="btn-metallic p-2.5 rounded-xl hover:scale-105 transition-transform flex items-center justify-center text-slate-900"
                title="Add to Cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Drawer & Checkout Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-faajji-950 border-l border-sky-500/20 h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-sky-400" />
                  <h3 className="text-lg font-bold text-white">Your Shopping Cart</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {checkoutStep === "cart" && (
                <div className="mt-5 space-y-4">
                  {cart.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-sm">
                      Your cart is currently empty.
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="glass-panel p-3.5 rounded-2xl flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-xs font-semibold text-sky-400">
                            {(item.product.price * item.quantity).toLocaleString()} ETB
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-faajji-900 rounded-lg p-1 border border-white/10">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:text-sky-300 text-slate-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:text-sky-300 text-slate-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {checkoutStep === "address" && (
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="mt-5 space-y-4">
                  <h4 className="text-sm font-bold text-white">Delivery & Payment Information</h4>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number (For Delivery Confirmation)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+251 911 000000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Delivery Sub-City (Addis Ababa)
                    </label>
                    <select
                      value={deliverySubcity}
                      onChange={(e) => setDeliverySubcity(e.target.value)}
                      className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-white bg-faajji-900"
                    >
                      <option value="Bole, Addis Ababa">Bole Sub-City, Addis Ababa</option>
                      <option value="Kirkos, Addis Ababa">Kirkos Sub-City, Addis Ababa</option>
                      <option value="Yeka, Addis Ababa">Yeka Sub-City, Addis Ababa</option>
                      <option value="Nifas Silk-Lafto, Addis Ababa">Nifas Silk-Lafto, Addis Ababa</option>
                      <option value="Arada, Addis Ababa">Arada Sub-City, Addis Ababa</option>
                      <option value="Gullele, Addis Ababa">Gullele Sub-City, Addis Ababa</option>
                      <option value="Outside Addis Ababa">Outside Addis Ababa (Regional Delivery)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Payment Gateway
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("chapa")}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                          paymentMethod === "chapa"
                            ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-md"
                            : "bg-white/5 border-white/10 text-slate-300"
                        }`}
                      >
                        <span className="block font-bold">Chapa Pay</span>
                        <span className="text-[10px] text-slate-400">Telebirr & CBE Birr</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                          paymentMethod === "cod"
                            ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-md"
                            : "bg-white/5 border-white/10 text-slate-300"
                        }`}
                      >
                        <span className="block font-bold">Cash On Delivery</span>
                        <span className="text-[10px] text-slate-400">Pay at Doorstep</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {checkoutStep === "success" && (
                <div className="py-10 text-center flex flex-col items-center">
                  <CheckCircle className="w-16 h-16 text-emerald-400 mb-3 animate-bounce" />
                  <h4 className="text-lg font-bold text-white">Order Confirmed!</h4>
                  <p className="text-xs text-slate-300 mt-2 max-w-xs">
                    Your hardware order has been registered in the Faajji dispatch system. Our delivery team will call you shortly.
                  </p>
                  <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-sky-300 font-mono">
                    Order Ref: {lastOrderRef}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10">
              {checkoutStep === "cart" && cart.length > 0 && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-slate-300">Total:</span>
                    <span className="text-xl font-extrabold text-white">
                      {cartTotal.toLocaleString()} <span className="text-xs text-sky-400">ETB</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setCheckoutStep("address")}
                    className="w-full btn-metallic py-3 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2"
                  >
                    <span>Proceed To Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {checkoutStep === "address" && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("cart")}
                    className="w-1/3 py-3 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 border border-white/10"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="w-2/3 btn-metallic py-3 rounded-xl text-xs uppercase tracking-wider font-extrabold"
                  >
                    Complete Order
                  </button>
                </div>
              )}

              {checkoutStep === "success" && (
                <button
                  onClick={() => {
                    setCheckoutStep("cart");
                    setIsCartOpen(false);
                  }}
                  className="w-full btn-metallic py-3 rounded-xl text-xs uppercase tracking-wider font-extrabold"
                >
                  Continue Shopping
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
