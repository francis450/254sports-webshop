import React from "react";
import { useCart } from "../context/CartContext";
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";

interface CartViewProps {
  onBackToShop: () => void;
  onProceedToCheckout: () => void;
}

export default function CartView({ onBackToShop, onProceedToCheckout }: CartViewProps) {
  const { cart, updateQuantity, removeFromCart, subtotal, itemCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center" id="empty-cart-view">
        <div className="max-w-md mx-auto bg-white border border-brand-black/20 rounded-none p-8 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-none bg-[#F8F8F8] flex items-center justify-center text-brand-black mb-4 border border-brand-black/15">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold uppercase font-display text-brand-black mb-2 select-none tracking-tight">
            YOUR PACK IS EMPTY
          </h2>
          <p className="text-gray-400 text-sm mb-8 font-sans">
            You don't have any 254 Runner athletic wear in your cart yet. Gear up with our high-ventilation singlets.
          </p>
          <button
            onClick={onBackToShop}
            className="w-full py-4 bg-brand-black hover:bg-brand-red text-white text-xs font-display font-bold uppercase tracking-widest rounded-none cursor-pointer transition-all duration-300"
            id="btn-empty-cart-back"
          >
            Explore Athletics
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="active-cart-view">
      {/* Title & Path */}
      <div className="flex items-center justify-between border-b border-brand-black/10 pb-5 mb-8">
        <div className="text-left">
          <h1 className="text-2xl font-black uppercase font-display text-brand-black leading-none">
            YOUR RUNNING PACK
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            {itemCount} {itemCount === 1 ? "Apparel Item" : "Apparel Items"} Selected
          </p>
        </div>
        <button
          onClick={onBackToShop}
          className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red hover:text-brand-black cursor-pointer flex items-center gap-1"
          id="btn-cart-back-shop"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
        </button>
      </div>

      {/* Cart Container */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Item List */}
        <div className="space-y-4">
          {cart.map((cartItem) => {
            const lineTotal = cartItem.price * cartItem.quantity;
            return (
              <div
                key={`${cartItem.item_code}-${cartItem.size}`}
                className="bg-white border border-brand-black/10 rounded-none p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:border-brand-black transition-all"
                id={`cart-row-${cartItem.item_code}-${cartItem.size}`}
              >
                
                {/* Left Side: Image & details */}
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full sm:w-auto">
                  <div className="w-20 h-20 rounded-none border border-brand-black/10 overflow-hidden shrink-0 bg-[#F8F8F8] flex items-center justify-center">
                    <img
                      src={cartItem.image}
                      alt={cartItem.item_name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-gray-400 block uppercase mb-0.5">
                      {cartItem.item_code}
                    </span>
                    <h3 className="text-base font-bold text-brand-black font-display leading-tight uppercase line-clamp-1">
                      {cartItem.item_name}
                    </h3>
                    
                    {/* Item configuration labels */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mt-2">
                      <span className="bg-brand-black text-white text-[9px] font-mono font-bold uppercase py-0.5 px-2 rounded-none">
                        SIZE: {cartItem.size}
                      </span>
                      <span className="bg-brand-red text-white text-[9px] font-mono font-bold uppercase py-0.5 px-2 rounded-none">
                        {cartItem.colorway} Colorway
                      </span>
                      {cartItem.is_set && (
                        <span className="bg-brand-green text-white text-[9px] font-mono font-extrabold uppercase py-0.5 px-2 rounded-none">
                          Apparel Set
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side: Price, quantity selector, total and deletes */}
                <div className="flex flex-row sm:flex-row items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                  
                  {/* Single Item rate */}
                  <div className="text-left sm:text-right hidden sm:block font-mono">
                    <span className="text-[9px] uppercase font-mono text-gray-400 block">Unit price</span>
                    <span className="text-xs text-gray-500 font-bold">
                      KES {cartItem.price.toLocaleString("en-KE")}
                    </span>
                  </div>

                  {/* Quantity adjustment buttons */}
                  <div className="flex items-center gap-2 bg-white p-1 rounded-none border border-brand-black/20">
                    <button
                      onClick={() => updateQuantity(cartItem.item_code, cartItem.size, cartItem.quantity - 1)}
                      className="w-7 h-7 bg-brand-black hover:bg-brand-red text-white cursor-pointer rounded-none flex items-center justify-center font-bold text-sm"
                      id={`btn-quantity-minus-${cartItem.item_code}`}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-mono font-black text-sm text-brand-black">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(cartItem.item_code, cartItem.size, cartItem.quantity + 1)}
                      className="w-7 h-7 bg-brand-black hover:bg-brand-red text-white cursor-pointer rounded-none flex items-center justify-center font-bold text-sm"
                      id={`btn-quantity-plus-${cartItem.item_code}`}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right">
                    <span className="text-[9px] uppercase font-mono text-gray-400 block">Line Total</span>
                    <span className="font-mono text-sm font-black text-brand-black">
                      KES {lineTotal.toLocaleString("en-KE")}
                    </span>
                  </div>

                  {/* Trash Delete button */}
                  <button
                    onClick={() => removeFromCart(cartItem.item_code, cartItem.size)}
                    className="p-2 text-gray-400 cursor-pointer hover:text-brand-red rounded-none hover:bg-red-50 transition-colors"
                    id={`btn-remove-item-${cartItem.item_code}`}
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Subtotal summary */}
        <div className="bg-brand-black text-white p-6 rounded-none text-left mt-4 border border-white/5 relative overflow-hidden shadow-lg">
          
          {/* Subtle logo/crest in background of receipt cards */}
          <div className="absolute right-4 bottom-4 w-24 h-24 opacity-5 bg-white rounded-none flex items-center justify-center pointer-events-none scale-150" />

          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-xs font-mono font-extrabold uppercase tracking-widest text-brand-red mb-1">
                Kenyan Store Order Subtotal
              </h4>
              <p className="text-xs text-gray-400 max-w-sm">
                Excludes local delivery fees. Your total order is converted to our WhatsApp instant-buy deeplink on checkout.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#a1a1a1] block">ESTIMATED TOTAL</span>
              <span className="font-mono text-2xl font-black text-white">
                KSh {subtotal.toLocaleString("en-KE")}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center border-t border-white/10 pt-6">
            <button
              onClick={onBackToShop}
              className="w-full sm:w-auto px-6 py-3 cursor-pointer border border-white/20 hover:border-white hover:bg-white/5 text-xs text-white uppercase font-display font-bold tracking-widest text-center transition-all rounded-none"
              id="btn-cart-back-list"
            >
              ← Back To Store
            </button>
            <button
              onClick={onProceedToCheckout}
              className="w-full sm:flex-grow py-3.5 bg-brand-red hover:bg-brand-black cursor-pointer text-xs text-white uppercase font-display font-black tracking-widest flex items-center justify-center gap-2 rounded-none shadow-md transition-all"
              id="btn-cart-to-checkout"
            >
              Proceed to Shipping details <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
