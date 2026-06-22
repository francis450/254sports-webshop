import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { MessageSquare, ArrowLeft, ShieldAlert } from "lucide-react";
import { GreekMazePattern } from "./BrandAssets";

interface CheckoutProps {
  onBackToCart: () => void;
  onOrderSuccess: () => void; // call on submit
}

export default function Checkout({ onBackToCart, onOrderSuccess }: CheckoutProps) {
  const { cart, subtotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState<string>("");
  const [deliveryArea, setDeliveryArea] = useState<string>("");
  const [errors, setErrors] = useState<{ customerName?: string; deliveryArea?: string }>({});

  const validate = () => {
    const tempErrors: { customerName?: string; deliveryArea?: string } = {};
    if (!customerName.trim()) {
      tempErrors.customerName = "Name is required for the order details.";
    }
    if (!deliveryArea.trim()) {
      tempErrors.deliveryArea = "Please specify a delivery area in Kenya (e.g., Nairobi Kilimani, Eldoret town, etc.)";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Build the formatted order text template
    // Template:
    // Hi 254 Runner! I'd like to order:
    // - {item_name} ({colorway}) — Size {size} × {qty} — KSh {line_total}
    // - ...
    // Subtotal: KSh {subtotal}
    // Name: {customer_name}
    // Delivery area: {delivery_area}

    let message = "Hi 254 Runner! I'd like to order:\n\n";

    cart.forEach((cartItem) => {
      const lineTotal = cartItem.price * cartItem.quantity;
      message += `- ${cartItem.item_name} (${cartItem.colorway}) — Size ${
        cartItem.size
      } × ${cartItem.quantity} — KSh ${lineTotal.toLocaleString("en-KE")}\n\n`;
    });

    message += `Subtotal: KSh ${subtotal.toLocaleString("en-KE")}\n\n`;
    message += `Name: ${customerName.trim()}\n`;
    message += `Delivery area: ${deliveryArea.trim()}`;

    // URL Encode the message
    const urlEncodedMessage = encodeURIComponent(message);
    const whatsAppNumber = "254725507764";
    const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${urlEncodedMessage}`;

    // Open WhatsApp link in a new tab
    window.open(whatsAppLink, "_blank");

    // Invoke success transition/feedback
    onOrderSuccess();
    clearCart();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="checkout-view">
      {/* Back to Cart link */}
      <button
        onClick={onBackToCart}
        className="mb-8 flex items-center gap-2 cursor-pointer text-xs font-mono uppercase tracking-widest font-black text-brand-black hover:text-brand-red transition-colors"
        id="btn-checkout-to-cart"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to running pack
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (7 Columns) */}
        <form
          onSubmit={handleWhatsAppOrder}
          className="lg:col-span-7 bg-white border border-brand-black/20 rounded-none p-6 sm:p-8 shadow-sm text-left relative overflow-hidden"
          id="checkout-form"
        >
          {/* Subtle greek key branding */}
          <GreekMazePattern className="opacity-[0.015] text-[#111]" color="#111" />

          <h2 className="text-xl font-black uppercase font-display text-brand-black mb-1 leading-none tracking-tight">
            SHIPPING & CONTACT DETAILS
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Provide your details below. We use these to automatically populate the merchant order form.
          </p>

          <div className="space-y-5 relative z-10">
            {/* Customer Name */}
            <div className="flex flex-col gap-1.5 font-sans">
              <label htmlFor="customer-name" className="text-xs font-mono font-extrabold uppercase tracking-wider text-brand-black flex items-center justify-between">
                Your Full Name
                <span className="text-brand-red text-sm font-sans">*</span>
              </label>
              <input
                id="customer-name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Kipchoge Kamau"
                className={`w-full px-4 py-3 rounded-none border text-brand-black text-sm outline-none transition-all ${
                  errors.customerName
                    ? "border-brand-red bg-red-50 focus:bg-white"
                    : "border-brand-black/20 bg-[#F8F8F8] focus:bg-white focus:border-brand-black"
                }`}
              />
              {errors.customerName && (
                <p className="text-brand-red text-[11px] font-mono mt-1 font-semibold flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {errors.customerName}
                </p>
              )}
            </div>

            {/* Delivery Area */}
            <div className="flex flex-col gap-1.5 font-sans">
              <label htmlFor="delivery-area" className="text-xs font-mono font-extrabold uppercase tracking-wider text-brand-black flex items-center justify-between">
                Delivery Area / Town
                <span className="text-brand-red text-sm font-sans">*</span>
              </label>
              <textarea
                id="delivery-area"
                rows={3}
                value={deliveryArea}
                onChange={(e) => setDeliveryArea(e.target.value)}
                placeholder="e.g. Kilimani, Wood Avenue, Apartment 3B, Nairobi OR Eldoret High Altitude Camp"
                className={`w-full px-4 py-3 rounded-none border text-brand-black text-sm outline-none transition-all resize-none ${
                  errors.deliveryArea
                    ? "border-brand-red bg-red-50 focus:bg-white"
                    : "border-brand-black/20 bg-[#F8F8F8] focus:bg-white focus:border-brand-black"
                }`}
              />
              {errors.deliveryArea && (
                <p className="text-brand-red text-[11px] font-mono mt-1 font-semibold flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {errors.deliveryArea}
                </p>
              )}
            </div>

            {/* Checkout Notification badge */}
            <div className="p-4 bg-brand-green/5 border border-brand-green/20 rounded-none flex items-start gap-2.5 text-xs text-brand-black mt-2">
              <span className="w-2.5 h-2.5 rounded-none bg-brand-green mt-1 shrink-0 animate-pulse" />
              <div className="text-left leading-relaxed font-sans">
                <span className="font-bold text-brand-green uppercase font-mono block">Instant WhatsApp Checkout Line</span>
                On submission, this app compiles your cart with your Name & Area into a pre-filled WhatsApp click-to-chat message pointing directly to our order processing desk at <strong className="font-extrabold text-brand-black">+254 725 507 764</strong>.
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-4 px-6 cursor-pointer bg-[#25D366] hover:bg-[#1ebd50] text-white font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 rounded-none shadow-xl transition-all"
              id="btn-whatsapp-checkout-submit"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              PLACE WA ORDER • KSh {subtotal.toLocaleString("en-KE")}
            </button>
          </div>
        </form>

        {/* Order Items Summary (5 Columns) */}
        <div className="lg:col-span-5 bg-brand-black text-white rounded-none p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col justify-between border border-white/10">
          <div>
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-3 text-left">
              Order Summary
            </h3>

            {/* Line items list */}
            <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
              {cart.map((cartItem) => {
                const lineTotal = cartItem.price * cartItem.quantity;
                return (
                  <div
                    key={`${cartItem.item_code}-${cartItem.size}`}
                    className="flex items-center justify-between gap-4 text-xs"
                    id={`summary-row-${cartItem.item_code}-${cartItem.size}`}
                  >
                    <div className="text-left">
                      <p className="font-bold text-gray-200 line-clamp-1">{cartItem.item_name}</p>
                      <p className="text-gray-400 text-[10px] uppercase font-mono mt-0.5">
                        Size: {cartItem.size} | Qty: {cartItem.quantity}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono font-bold text-gray-200">
                        KSh {lineTotal.toLocaleString("en-KE")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing aggregate overview */}
          <div className="border-t border-white/10 pt-5 mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-xs">Total items:</span>
              <span className="font-mono text-gray-200 text-xs">{cart.reduce((s, i) => s + i.quantity, 0)} Units</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-405 text-xs">Delivery Fee:</span>
              <span className="font-mono text-brand-green-emerald font-bold text-xs uppercase tracking-wider">Manual Quote</span>
            </div>
            <div className="flex justify-between items-baseline pt-4 border-t border-dashed border-white/10">
              <span className="text-xs uppercase font-mono tracking-widest text-[#cfcfcf]">GRAND TOTAL</span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono">
                KSh {subtotal.toLocaleString("en-KE")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
