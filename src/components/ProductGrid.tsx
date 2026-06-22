import React, { useState, useMemo } from "react";
import { CatalogItem } from "../types";
import { SlidersHorizontal, ArrowUpRight, Check, X } from "lucide-react";
import { GreekMazePattern } from "./BrandAssets";

interface ProductGridProps {
  products: CatalogItem[];
  onSelectProduct: (itemCode: string) => void;
}

type GenderFilter = "All" | "Men" | "Women";
type ColorFilter = "All" | "White" | "Red";

export default function ProductGrid({ products, onSelectProduct }: ProductGridProps) {
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("All");
  const [colorFilter, setColorFilter] = useState<ColorFilter>("All");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchGender = genderFilter === "All" || p.gender === genderFilter;
      const matchColor = colorFilter === "All" || p.colorway === colorFilter;
      return matchGender && matchColor;
    });
  }, [products, genderFilter, colorFilter]);

  return (
    <div className="w-full" id="shop-catalog-section">
      {/* Title & Slogan matching Vibrant Palette */}
      <div className="flex items-center justify-between mb-8 border-b border-brand-black/10 pb-4">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2 text-brand-black">
          <span className="w-8 h-[1.5px] bg-brand-black"></span>
          254 RUNNER • FEATURED ITEMS
        </h2>
        <div className="hidden sm:flex gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-black">
          <span className="border-b-2 border-brand-red pb-1 font-extrabold">GRID</span>
          <span className="opacity-40 font-bold">ERPNext Live</span>
        </div>
      </div>

      {/* Grid Filters Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-red" />
          <span className="font-mono text-xs uppercase tracking-widest font-black text-brand-black">
            Filter Catalog
          </span>
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap gap-4">
          
          {/* Gender Filter Buttons */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Gender cut</span>
            <div className="flex rounded-sm bg-gray-100 p-0.5 border border-gray-200">
              {(["All", "Men", "Women"] as GenderFilter[]).map((genderVal) => (
                <button
                  key={genderVal}
                  onClick={() => setGenderFilter(genderVal)}
                  className={`px-4 py-1.5 cursor-pointer text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                    genderFilter === genderVal
                      ? "bg-brand-black text-white shadow-sm"
                      : "text-gray-500 hover:text-brand-black hover:bg-gray-50"
                  }`}
                  id={`btn-filter-gender-${genderVal}`}
                >
                  {genderVal}
                </button>
              ))}
            </div>
          </div>

          {/* Colorway Filter Buttons */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Base Colorway</span>
            <div className="flex rounded-sm bg-gray-100 p-0.5 border border-gray-200">
              {(["All", "White", "Red"] as ColorFilter[]).map((colorVal) => (
                <button
                  key={colorVal}
                  onClick={() => setColorFilter(colorVal)}
                  className={`px-4 py-1.5 cursor-pointer text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 ${
                    colorFilter === colorVal
                      ? "bg-brand-black text-white shadow-sm"
                      : "text-gray-500 hover:text-brand-black hover:bg-gray-50"
                  }`}
                  id={`btn-filter-color-${colorVal}`}
                >
                  {colorVal === "Red" && <span className="w-2.5 h-2.5 rounded-full bg-brand-red border border-white" />}
                  {colorVal === "White" && <span className="w-2.5 h-2.5 rounded-full bg-white border border-gray-300" />}
                  {colorVal}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid List */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <p className="text-gray-500 mb-2 font-mono text-sm uppercase font-bold text-center">No Matching Items</p>
          <p className="text-xs text-gray-400">Try loosening your filter selections.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredProducts.map((product) => {
            return (
              <div
                key={product.item_code}
                onClick={() => onSelectProduct(product.item_code)}
                className="group relative bg-white border border-brand-black/10 rounded-none overflow-hidden flex flex-col justify-between shadow-sm cursor-pointer hover:shadow-md hover:border-brand-black transition-all duration-300"
                id={`product-card-${product.item_code}`}
              >
                {/* Image Section */}
                <div className="relative aspect-square w-full bg-[#F8F8F8] overflow-hidden flex items-center justify-center">
                  
                  {/* Subtle repeating maze pattern inside background as a motif */}
                  <GreekMazePattern className="opacity-[0.02] text-brand-black" color="#111111" />

                  <img
                    src={product.image}
                    alt={product.item_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback if image fails to render
                      (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${product.item_code}/600/600`;
                    }}
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {/* Stock status tag */}
                    {product.in_stock ? (
                      <span className="bg-brand-green text-white text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-none flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3 stroke-[3px]" /> In Stock
                      </span>
                    ) : (
                      <span className="bg-brand-red text-white text-[9px] font-mono font-semibold uppercase tracking-widest px-2.5 py-1 rounded-none flex items-center gap-1 shadow-sm animate-pulse">
                        <X className="w-3 h-3 stroke-[3px]" /> SOLD OUT
                      </span>
                    )}

                    {/* Set tag (e.g. top + shorts combined) */}
                    {product.is_set && (
                      <span className="bg-brand-black text-white text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-none shadow-sm border border-white/10">
                        TOP + SHORTS SET
                      </span>
                    )}
                  </div>

                  {/* Gender Tag bottom right */}
                  <div className="absolute bottom-3 right-3 bg-white border border-brand-black/20 text-brand-black text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-none shadow-sm">
                    {product.gender} Cut
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-5 flex-grow flex flex-col justify-between border-t border-brand-black/5">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-gray-400">
                        {product.item_code}
                      </span>
                      <span className={`text-[9px] font-mono uppercase tracking-widest font-black py-0.5 px-2.5 rounded-none ${
                        product.colorway === "Red" ? "bg-brand-red text-white" : "bg-brand-black text-white"
                      }`}>
                        {product.colorway}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-brand-black leading-snug group-hover:text-brand-red transition-colors font-display line-clamp-1 uppercase">
                      {product.item_name}
                    </h3>

                    <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-brand-black/5">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">PRICE</span>
                      <span className="text-lg font-extrabold text-brand-black font-mono">
                        {product.currency} {product.price.toLocaleString("en-KE")}
                      </span>
                    </div>

                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-none bg-white border border-brand-black text-brand-black group-hover:bg-brand-black group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
