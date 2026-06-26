import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ArrowLeft, ShieldAlert, ShoppingBag, Loader2 } from "lucide-react";
import { GreekMazePattern } from "./BrandAssets";
import { createOrder } from "../lib/orders";

interface CheckoutProps {
  onBackToCart: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export default function Checkout({ onBackToCart, onOrderSuccess }: CheckoutProps) {
  const { cart, subtotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!customerName.trim()) e.customerName = "Name is required.";
    if (!phone.trim()) e.phone = "Phone number is required.";
    else if (!/^(?:\+?254|0)[17]\d{8}$/.test(phone.replace(/\s/g, ""))) {
      e.phone = "Enter a valid Kenyan phone number (e.g. 0712 345678).";
    }
    if (!deliveryArea.trim()) e.deliveryArea = "Delivery area is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const { order_id } = await createOrder({
        items: cart,
        customer_name: customerName.trim(),
        phone: phone.replace(/\s/g, ""),
        delivery_area: deliveryArea.trim(),
      });
      clearCart();
      onOrderSuccess(order_id);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Order failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" id="checkout-view">
      <button
        onClick={onBackToCart}
        className="mb-8 flex items-center gap-2 cursor-pointer text-xs font-mono uppercase tracking-widest font-black text-brand-black hover:text-brand-red transition-colors"
        id="btn-checkout-to-cart"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to running pack
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 bg-white border border-brand-black/20 rounded-none p-6 sm:p-8 shadow-sm text-left relative overflow-hidden"
          id="checkout-form"
        >
          <GreekMazePattern className="opacity-[0.015] text-[#111]" color="#111" />

          <h2 className="text-xl font-black uppercase font-display text-brand-black mb-1 leading-none tracking-tight">
            SHIPPING & CONTACT DETAILS
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Your order will be saved directly to our store system.
          </p>

          <div className="space-y-5 relative z-10">
            {/* Customer Name */}
            <div className="flex flex-col gap-1.5 font-sans">
              <label htmlFor="customer-name" className="text-xs font-mono font-extrabold uppercase tracking-wider text-brand-black flex items-center justify-between">
                Your Full Name <span className="text-brand-red text-sm font-sans">*</span>
              </label>
              <input
                id="customer-name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Kipchoge Kamau"
                className={`w-full px-4 py-3 rounded-none border text-brand-black text-sm outline-none transition-all ${
                  errors.customerName
                    ? "border-brand-red bg-red-50"
                    : "border-brand-black/20 bg-[#F8F8F8] focus:bg-white focus:border-brand-black"
                }`}
              />
              {errors.customerName && <FieldError msg={errors.customerName} />}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5 font-sans">
              <label htmlFor="phone" className="text-xs font-mono font-extrabold uppercase tracking-wider text-brand-black flex items-center justify-between">
                Phone Number <span className="text-brand-red text-sm font-sans">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0712 345 678"
                className={`w-full px-4 py-3 rounded-none border text-brand-black text-sm outline-none transition-all ${
                  errors.phone
                    ? "border-brand-red bg-red-50"
                    : "border-brand-black/20 bg-[#F8F8F8] focus:bg-white focus:border-brand-black"
                }`}
              />
              {errors.phone && <FieldError msg={errors.phone} />}
            </div>

            {/* Delivery Area */}
            <div className="flex flex-col gap-1.5 font-sans">
              <label htmlFor="delivery-area" className="text-xs font-mono font-extrabold uppercase tracking-wider text-brand-black flex items-center justify-between">
                Delivery Area / Town <span className="text-brand-red text-sm font-sans">*</span>
              </label>
              <textarea
                id="delivery-area"
                rows={3}
                value={deliveryArea}
                onChange={(e) => setDeliveryArea(e.target.value)}
                placeholder="e.g. Kilimani, Wood Avenue, Apartment 3B, Nairobi"
                className={`w-full px-4 py-3 rounded-none border text-brand-black text-sm outline-none transition-all resize-none ${
                  errors.deliveryArea
                    ? "border-brand-red bg-red-50"
                    : "border-brand-black/20 bg-[#F8F8F8] focus:bg-white focus:border-brand-black"
                }`}
              />
              {errors.deliveryArea && <FieldError msg={errors.deliveryArea} />}
            </div>

            {submitError && (
              <div className="p-4 bg-red-50 border border-brand-red/30 text-brand-red text-xs font-mono rounded-none">
                <span className="font-bold">Order failed:</span> {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 cursor-pointer bg-brand-black hover:bg-brand-red disabled:opacity-60 disabled:cursor-not-allowed text-white font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 rounded-none shadow-xl transition-all"
              id="btn-checkout-submit"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  PLACING ORDER...
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  PLACE ORDER • KSh {subtotal.toLocaleString("en-KE")}
                </>
              )}
            </button>
          </div>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-5 bg-brand-black text-white rounded-none p-6 sm:p-8 shadow-md relative overflow-hidden flex flex-col justify-between border border-white/10">
          <div>
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-3 text-left">
              Order Summary
            </h3>
            <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
              {cart.map((cartItem) => {
                const lineTotal = cartItem.price * cartItem.quantity;
                return (
                  <div
                    key={`${cartItem.item_code}-${cartItem.size}`}
                    className="flex items-center justify-between gap-4 text-xs"
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

          <div className="border-t border-white/10 pt-5 mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-xs">Total items:</span>
              <span className="font-mono text-gray-200 text-xs">{cart.reduce((s, i) => s + i.quantity, 0)} Units</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-xs">Delivery Fee:</span>
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

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="text-brand-red text-[11px] font-mono mt-1 font-semibold flex items-center gap-1">
      <ShieldAlert className="w-3.5 h-3.5" />
      {msg}
    </p>
  );
}
