"use client";

import React, { useState } from "react";
import { TopHeader } from "@/components/navigation/TopHeader";
import { BottomNav, NavTab } from "@/components/navigation/BottomNav";
import { HomeView } from "@/components/views/HomeView";
import { ServicesView } from "@/components/views/ServicesView";
import { HardwareView, HardwareProduct, CartItem } from "@/components/views/HardwareView";
import { JobsView } from "@/components/views/JobsView";
import { AdminView } from "@/components/views/AdminView";

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product: HardwareProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-tech-gradient text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Header */}
      <TopHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === "home" && <HomeView onTabChange={setActiveTab} />}
        {activeTab === "services" && <ServicesView />}
        {activeTab === "hardware" && (
          <HardwareView
            onAddToCart={handleAddToCart}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
          />
        )}
        {activeTab === "digital-ethiopia" && <JobsView />}
        {activeTab === "admin" && <AdminView />}
      </main>

      {/* Persistent Mobile Bottom Navigation (Matching User's Mockup) */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={totalCartCount}
      />
    </div>
  );
}
