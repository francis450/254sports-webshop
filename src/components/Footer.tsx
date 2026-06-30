import React from "react";
import { MaasaiCrest } from "./BrandAssets";
import { ShieldCheck, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white relative overflow-hidden border-t-4 border-brand-red">
      {/* Decorative Top Speed Line */}
      <div className="h-1 bg-brand-green w-full" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col items-center">
        {/* Emblem footer mark */}
        <div className="mb-6 flex flex-col items-center">
          <MaasaiCrest className="w-16 h-16 mb-2 border border-white/10 rounded-full p-1 bg-white/5" />
          <h3 className="font-display font-extrabold text-lg tracking-widest text-center mt-2">
            254 RUNNER
          </h3>
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand-red font-semibold">
            Born Kenyan, Born to Run
          </p>
        </div>

        {/* Brand Mission */}
        <p className="text-center text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
          Premium athletic wear designed, tested, and proven in the high-altitude training camps of Iten and Eldoret. Rooted in Kenyan running heritage.
        </p>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl border-t border-b border-gray-800 py-8 mb-8 text-xs text-gray-400">
          <div className="flex flex-col items-center text-center px-4">
            <MapPin className="w-5 h-5 text-brand-green-emerald mb-2" />
            <span className="font-bold text-gray-200 uppercase tracking-widest mb-1">HQ & TRAINING</span>
            <span>Karura Forest, Nyahururu, Nanyuki,Iten Altitude Hills & Eldoret, Kenya</span>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <Mail className="w-5 h-5 text-brand-red mb-2" />
            <span className="font-bold text-gray-200 uppercase tracking-widest mb-1">INQUIRIES</span>
            <span>run@sports254.co.ke</span>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <ShieldCheck className="w-5 h-5 text-gray-300 mb-2" />
            <span className="font-bold text-gray-200 uppercase tracking-widest mb-1">PROTOTYPE DEPLOYMENT</span>
            <span>Secured via local catalog decoupled from ERPNext.</span>
          </div>
        </div>

        {/* Copyright and signature */}
        <div className="text-center text-[11px] text-gray-500 font-mono flex flex-col items-center gap-1">
          <p>© {new Date().getFullYear()} 254 Sports Apparel Line. All rights reserved.</p>
          <p className="uppercase tracking-[0.1em] text-brand-green-emerald">
            Made with Pride in Kenya 🇰🇪
          </p>
        </div>
      </div>
    </footer>
  );
}
