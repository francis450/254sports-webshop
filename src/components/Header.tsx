import React from "react";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { MaasaiCrest } from "./BrandAssets";

interface HeaderProps {
  currentView: string;
  onNavigate: (view: "home" | "cart" | "checkout") => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Tiny top accent banner showing Kenyan Flag colors */}
      <div className="h-1.5 w-full flex">
        <div className="bg-brand-black w-[15%]" />
        <div className="bg-white w-[5%]" />
        <div className="bg-brand-red w-[60%]" />
        <div className="bg-white w-[5%]" />
        <div className="bg-brand-green w-[15%]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Side: Back button or Crest */}
        <div className="flex items-center gap-2">
          {currentView !== "home" ? (
            <button
              onClick={() => onNavigate("home")}
              className="p-2 cursor-pointer -ml-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
              aria-label="Back to home"
              id="btn-back-header"
            >
              <ArrowLeft className="w-5 h-5 text-brand-black" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 animate-pulse">
              <MaasaiCrest className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Center: Brand Name */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-1.5 cursor-pointer font-display"
          id="btn-logo-header"
        >
          <div className="bg-brand-black text-white px-2.5 py-0.5 font-black text-xl tracking-tighter">254</div>
          <span className="text-xs tracking-[0.3em] font-black uppercase pt-0.5">Runner</span>
        </button>

        {/* Right Side: Cart Trigger */}
        <button
          onClick={() => onNavigate("cart")}
          className="relative p-2.5 rounded-full cursor-pointer hover:bg-gray-50 flex items-center justify-center transition-all active:scale-95"
          aria-label="View Cart"
          id="btn-cart-header"
        >
          <ShoppingBag className="w-5 h-5 text-brand-black" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-[11px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
