import React, { useState } from "react";
import { CatalogItem } from "../types";
import { useCart } from "../context/CartContext";
import { ShoppingBag, ArrowLeft, Check, Plus, Minus, ShieldCheck, HelpCircle, Image, Shirt } from "lucide-react";
import { GreekMazePattern, SpeedSash } from "./BrandAssets";
import ApparelBlueprint from "./ApparelBlueprint";

interface ProductDetailProps {
  product: CatalogItem;
  onBack: () => void;
  onGoToCart: () => void;
}

export default function ProductDetail({ product, onBack, onGoToCart }: ProductDetailProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "M");
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [viewType, setViewType] = useState<"photo" | "front" | "back">("photo");

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const isSinglet =
    product.item_code.includes("SING") ||
    product.item_name.toLowerCase().includes("singlet") ||
    product.item_name.toLowerCase().includes("vest") ||
    product.item_name.toLowerCase().includes("set");

  const handleAddToCart = () => {
    if (!product.in_stock) return;
    addToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12" id={`product-detail-${product.item_code}`}>
      {/* Dynamic back navigation bar */}
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 cursor-pointer text-xs font-mono uppercase tracking-widest font-black text-brand-black hover:text-brand-red transition-colors group"
        id="btn-back-detail"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Championship Collection
      </button>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white border border-gray-100 rounded-xl p-4 sm:p-8 shadow-sm relative overflow-hidden">
        
        {/* Gallery Column (5 columns on large screen) */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-none bg-[#F8F8F8] border border-brand-black/10 overflow-hidden flex items-center justify-center">
            
            {/* Background design motif */}
            <GreekMazePattern className="opacity-[0.03] text-brand-black" color="#111111" />

            {viewType === "photo" ? (
              <img
                src={product.image}
                alt={product.item_name}
                className="w-full h-full object-cover transition-opacity duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${product.item_code}/800/800`;
                }}
              />
            ) : (
              <div className="w-full h-full p-6 flex items-center justify-center animate-fade-in bg-white">
                <ApparelBlueprint
                  colorway={product.colorway as "Red" | "White"}
                  isSinglet={isSinglet}
                  view={viewType}
                  className="w-full h-full max-h-[340px]"
                />
              </div>
            )}
            
            {/* Float tag */}
            {!product.in_stock && (
              <div className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
                <span className="bg-brand-red text-white text-xs font-mono font-extrabold uppercase tracking-widest px-4 py-2 rounded-none shadow-xl">
                  SOLD OUT TEMPORARILY
                </span>
                <p className="text-gray-300 text-xs mt-2 max-w-xs font-sans">
                  This Olympic-grade running vest is currently being restocked via ERPNext.
                </p>
              </div>
            )}
          </div>

          {/* Blueprint selector buttons */}
          <div className="grid grid-cols-3 gap-2 bg-[#F8F8F8] border border-brand-black/5 p-1 rounded-none shadow-inner">
            <button
              onClick={() => setViewType("photo")}
              className={`py-2 px-1 text-[10px] font-mono tracking-wider font-extrabold uppercase rounded-none transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                viewType === "photo"
                  ? "bg-brand-red text-white shadow-md font-black"
                  : "bg-white text-gray-500 hover:text-brand-black hover:bg-gray-100 border border-transparent"
              }`}
              id="btn-view-photo"
            >
              <Image className="w-3.5 h-3.5" />
              Photo
            </button>
            <button
              onClick={() => setViewType("front")}
              className={`py-2 px-1 text-[10px] font-mono tracking-wider font-extrabold uppercase rounded-none transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                viewType === "front"
                  ? "bg-brand-red text-white shadow-md font-black"
                  : "bg-white text-gray-500 hover:text-brand-black hover:bg-gray-100 border border-transparent"
              }`}
              id="btn-view-front"
            >
              <Shirt className="w-3.5 h-3.5" />
              Blue. Front
            </button>
            <button
              onClick={() => setViewType("back")}
              className={`py-2 px-1 text-[10px] font-mono tracking-wider font-extrabold uppercase rounded-none transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                viewType === "back"
                  ? "bg-brand-red text-white shadow-md font-black"
                  : "bg-white text-gray-500 hover:text-brand-black hover:bg-gray-100 border border-transparent"
              }`}
              id="btn-view-back"
            >
              <Shirt className="w-3.5 h-3.5 rotate-180" />
              Blue. Back
            </button>
          </div>

          {/* Quick specs banner */}
          <div className="grid grid-cols-3 gap-3 text-center text-[10px] sm:text-xs">
            <div className="bg-white border border-brand-black/10 p-3 rounded-none flex flex-col justify-center">
              <span className="text-gray-400 font-mono uppercase">Gender</span>
              <span className="font-bold text-brand-black uppercase mt-1">{product.gender} Cut</span>
            </div>
            <div className="bg-white border border-brand-black/10 p-3 rounded-none flex flex-col justify-center">
              <span className="text-gray-400 font-mono uppercase">Colorway</span>
              <span className="font-bold text-brand-black uppercase mt-1">{product.colorway} Base</span>
            </div>
            <div className="bg-white border border-brand-black/10 p-3 rounded-none flex flex-col justify-center">
              <span className="text-gray-400 font-mono uppercase">Origin</span>
              <span className="font-bold text-brand-green uppercase mt-1">Made in KE 🇰🇪</span>
            </div>
          </div>
        </div>

        {/* Configurations Column (7 columns on large screen) */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col">
          {/* Header detail */}
          <div className="border-b border-gray-100 pb-5 mb-5 text-left">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#9c9c9c] uppercase">
                ITEM_CODE: {product.item_code}
              </span>
              <span className="bg-brand-red text-white font-mono text-[9px] font-extrabold uppercase px-2 py-0.5 tracking-widest rounded-sm">
                ERPNext Tracked
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-brand-black uppercase font-display leading-tight">
              {product.item_name}
            </h1>
            
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-2xl sm:text-3xl font-black text-brand-black font-mono">
                {product.currency} {product.price.toLocaleString("en-KE")}
              </span>
              <span className="text-gray-400 text-xs uppercase font-bold tracking-widest">
                KES Base Rate
              </span>
            </div>
          </div>

          {/* Descriptions */}
          <div className="mb-6 text-left">
            <h4 className="text-xs font-mono font-extrabold uppercase tracking-wider text-brand-black mb-2">
              Product Overview
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Size Selectors Section */}
          <div className="mb-6 text-left">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-mono font-extrabold uppercase tracking-wider text-brand-black">
                Select Your Size
              </h4>
              <span className="text-[10px] font-mono text-gray-400 uppercase font-black">
                Kenyan standard fits
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={!product.in_stock}
                  className={`min-w-14 h-12 cursor-pointer font-mono font-extrabold text-sm rounded-none flex items-center justify-center transition-all ${
                    !product.in_stock
                      ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                      : selectedSize === size
                      ? "bg-brand-black text-white border-2 border-brand-black font-black"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-brand-black"
                  }`}
                  id={`btn-size-select-${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantities Selector & Action triggers */}
          {product.in_stock ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4">
              {/* Quantity Changer */}
              <div className="flex items-center justify-between bg-white border border-brand-black rounded-none p-1.5 min-w-32">
                <button
                  onClick={decrementQty}
                  className="w-10 h-10 rounded-none cursor-pointer bg-brand-black text-white hover:bg-brand-red flex items-center justify-center transition-all font-black"
                  aria-label="Decrease quantity"
                  id="btn-qty-minus"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono font-black text-lg text-brand-black px-4">
                  {quantity}
                </span>
                <button
                  onClick={incrementQty}
                  className="w-10 h-10 rounded-none cursor-pointer bg-brand-black text-white hover:bg-brand-red flex items-center justify-center transition-all font-black"
                  aria-label="Increase quantity"
                  id="btn-qty-plus"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add To Cart Trigger */}
              <button
                onClick={handleAddToCart}
                className="flex-grow py-4 cursor-pointer bg-brand-red hover:bg-brand-black transition-all text-white font-display font-bold uppercase text-xs tracking-widest rounded-none flex items-center justify-center gap-2.5 shadow-lg relative overflow-hidden"
                id="btn-add-to-cart"
              >
                <ShoppingBag className="w-4 h-4" />
                ADD TO PACK • {product.currency} {(product.price * quantity).toLocaleString("en-KE")}
              </button>
            </div>
          ) : (
            <div className="mt-4 p-4 bg-white border border-brand-black/25 rounded-none flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-none bg-brand-red animate-pulse mt-1" />
              <div className="text-left">
                <p className="text-xs font-bold text-brand-black uppercase tracking-wider">Out of Stock Notification</p>
                <p className="text-gray-500 text-xs mt-1 leading-normal">
                  Our apparel runs sell out very fast. Tap the Back button above to browse available runner sets.
                </p>
              </div>
            </div>
          )}

          {/* Toast / Positive Feedback Indicator */}
          {addedSuccess && (
            <div className="mt-4 px-4 py-3 border border-brand-green bg-brand-green/5 text-brand-black text-xs font-mono font-semibold rounded-none flex items-center justify-between animate-fade-in shadow-sm">
              <span className="flex items-center gap-2 text-brand-green">
                <Check className="w-4 h-4 stroke-[3.5px]" />
                ADDED {quantity} × {product.item_name} ({selectedSize}) TO CART!
              </span>
              <button
                onClick={onGoToCart}
                className="underline text-brand-black uppercase font-black hover:text-[#008753] font-sans cursor-pointer ml-4"
                id="btn-go-to-cart-toast"
              >
                View Cart & Order
              </button>
            </div>
          )}

          {/* Secure Trust indicators */}
          <div className="border-t border-gray-100 mt-8 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-brand-black/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4.5 h-4.5 text-brand-green-emerald" />
              <span>Real ERPNext Price Standard guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4.5 h-4.5 text-brand-red" />
              <span>Direct WhatsApp Order Processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
