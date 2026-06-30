import React from "react";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types";
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";

const WA_NUMBER = "254725507764";

function buildWhatsAppUrl(cart: CartItem[], subtotal: number): string {
  const lines = cart.map(
    (i) =>
      `• ${i.item_name} | Size: ${i.size} | Qty: ${i.quantity} | KES ${(i.price * i.quantity).toLocaleString("en-KE")}`
  );
  const msg = [
    "Hi 254 Runner! I'd like to place an order:",
    "",
    ...lines,
    "",
    `Total: KES ${subtotal.toLocaleString("en-KE")}`,
    "",
    "Please confirm availability and delivery details. Thank you!",
  ].join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

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
            <a
              href={buildWhatsAppUrl(cart, subtotal)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] cursor-pointer text-xs text-white uppercase font-display font-black tracking-widest flex items-center justify-center gap-2 rounded-none shadow-md transition-all"
              id="btn-cart-whatsapp"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order via WhatsApp
            </a>
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
