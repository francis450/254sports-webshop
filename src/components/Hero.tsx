import React, { useState, useEffect } from "react";
import { SpeedSash, GreekMazePattern, MaasaiCrest } from "./BrandAssets";
import { Sparkles, Calendar, BadgeCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface HeroProps {
  onShopNow?: () => void;
}

const LOOKBOOK_IMAGES = [
  {
    src: "/images/IMG-20260427-WA0003.jpg",
    title: "Men's Running T-Shirt — Red",
    desc: "Premium quick-dry tee engineered for high-altitude training in Iten.",
  },
  {
    src: "/images/IMG-20260427-WA0009.jpg",
    title: "Women's Running Vest — White",
    desc: "Featherweight women's vest for optimal race-day performance.",
  },
  {
    src: "/images/IMG-20260427-WA0005.jpg",
    title: "Men's Running Vest — Red",
    desc: "Racerback singlet with superior airflow for elite training.",
  },
  {
    src: "/images/IMG-20260427-WA0008.jpg",
    title: "Women's Running T-Shirt — Red",
    desc: "Scarlet red tee with moisture management fabric for women.",
  },
];

const ATHLETE_QUOTES = [
  "No human is limited. — Eliud Kipchoge",
  "Speed only comes from consistent, humble work in the high hills.",
  "Run with your heart, not just your legs. This is Iten wisdom.",
  "When you feel pain, keep running. The mountain always yields."
];

export default function Hero({ onShopNow }: HeroProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Auto scroll lookbook images
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % LOOKBOOK_IMAGES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Auto cycle wisdom quotes
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % ATHLETE_QUOTES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % LOOKBOOK_IMAGES.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + LOOKBOOK_IMAGES.length) % LOOKBOOK_IMAGES.length);
  };

  return (
    <section 
      className="relative w-full text-white overflow-hidden border-2 border-brand-black/20 shadow-2xl bg-brand-black flex flex-col justify-between"
      id="brand-hero-sidebar"
    >
      {/* Signature speed sash background as high-altitude identity */}
      <div className="absolute inset-0 vibrant-speed-sash z-0 opacity-95" />
      
      {/* Elegant dark gray overlay to ensure peak readability of white typography and contrast elements */}
      <div className="absolute inset-0 bg-brand-black/45 backdrop-blur-[1px] z-0 pointer-events-none" />
      
      {/* Decorative repeating maze pattern overlay */}
      <div className="absolute inset-0 vibrant-maze-overlay opacity-[0.12] z-0 pointer-events-none" />

      {/* Main Column Layout */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full min-h-[580px] lg:min-h-[640px]">
        
        {/* TOP BLOCK: Tagline and Culture Badge */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-6">
            <span className="bg-white/15 backdrop-blur-md text-[9px] font-mono tracking-widest font-extrabold px-3 py-1.5 uppercase rounded-none border border-white/10">
              KENYAN HERITAGE APPAREL
            </span>
            <div className="flex items-center gap-1.5 text-xs text-brand-green-emerald font-bold font-mono">
              <span className="w-2 h-2 bg-brand-green-emerald rounded-full animate-pulse" />
              <span>ACTIVE</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black leading-[0.95] tracking-tight uppercase mb-4 text-white">
            Born Kenyan,<br />
            Born to Run
          </h1>

          <p className="text-white/90 text-sm leading-relaxed font-sans max-w-md mb-6">
            Engineered for high heart rates. Premium-caliber training cut designs tested by international champions at <strong>2,400 meters of elevation</strong> in Iten, Kenya.
          </p>
        </div>

        {/* MIDDLE BLOCK: Beautiful Live Sports Carousel (solving blank space perfectly) */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] bg-brand-black/40 border border-white/20 mb-6 group overflow-hidden shadow-lg">
          
          <img
            src={LOOKBOOK_IMAGES[slideIndex].src}
            alt={LOOKBOOK_IMAGES[slideIndex].title}
            className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Transparent Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/20" />

          {/* Sizing description bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 text-left z-20">
            <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-brand-green-emerald font-black">
              254 ACTIVE LOOKBOOK
            </span>
            <h3 className="text-md sm:text-lg font-display font-black leading-tight text-white uppercase line-clamp-1">
              {LOOKBOOK_IMAGES[slideIndex].title}
            </h3>
            <p className="text-xs text-white/80 line-clamp-1">
              {LOOKBOOK_IMAGES[slideIndex].desc}
            </p>
          </div>

          {/* Micro-carousel navigation controllers */}
          <div className="absolute right-3 top-3 flex items-center gap-1.5 z-20">
            <button
              onClick={prevSlide}
              className="p-1.5 bg-brand-black/60 backdrop-blur-md rounded-none border border-white/10 text-white hover:bg-brand-red cursor-pointer transition-colors"
              aria-label="Previous image"
              id="btn-hero-prev"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1.5 bg-brand-black/60 backdrop-blur-md rounded-none border border-white/10 text-white hover:bg-brand-red cursor-pointer transition-colors"
              aria-label="Next image"
              id="btn-hero-next"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dot Indicator bar */}
          <div className="absolute left-4 top-4 flex gap-1 z-20">
            {LOOKBOOK_IMAGES.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  slideIndex === i ? "bg-white w-4" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* BOTTOM BLOCK: Dynamic Culture Quote Block & Call-to-action */}
        <div className="space-y-4">
          
          {/* Wisdom Quote Box */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-none flex items-start gap-2.5 relative min-h-[64px]">
            <Quote className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[11px] font-sans italic text-white/90 leading-relaxed font-medium">
                "{ATHLETE_QUOTES[quoteIndex]}"
              </p>
            </div>
            
            {/* Tiny ornament greek motif inside quotes */}
            <div className="absolute right-2 bottom-1 text-[8px] font-mono text-white/15 uppercase font-bold tracking-widest select-none">
              ITEN ACCORD
            </div>
          </div>

          {/* Secondary reassurance */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/70">
            <BadgeCheck className="w-4 h-4 text-brand-green-emerald" />
            <span>M-Pesa Checkout & Air Cargo Shipping ready</span>
          </div>
        </div>

      </div>

      {/* Decorative Speed Sash Divider running along the bottom */}
      <div className="h-2 w-full mt-auto relative z-20">
        <SpeedSash className="h-2" />
      </div>
    </section>
  );
}
