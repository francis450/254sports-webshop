import React, { useState, useEffect } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import { CatalogItem } from "./types";
import { getCatalog } from "./lib/catalog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import ProductDetail from "./components/ProductDetail";
import CartView from "./components/CartView";
import Checkout from "./components/Checkout";
import { MaasaiCrest, SpeedSash } from "./components/BrandAssets";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, BadgeCheck, PhoneCall, CheckCircle2 } from "lucide-react";

type ViewState = "home" | "product" | "cart" | "checkout" | "order-success";

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewState>("home");
  const [selectedProductCode, setSelectedProductCode] = useState<string | null>(null);
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  // Load the catalog
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getCatalog();
        setCatalog(data);
      } catch (error) {
        console.error("Failed to load catalog", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSelectProduct = (itemCode: string) => {
    setSelectedProductCode(itemCode);
    setCurrentView("product");
    // Scroll to top of window for optimal detailed viewing
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (view: "home" | "cart" | "checkout") => {
    setCurrentView(view);
    window.scrollTo({ top: 0 });
  };

  const selectedProduct = catalog.find((p) => p.item_code === selectedProductCode);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 selection:bg-brand-red selection:text-white" id="main-app-container">
      {/* Sticky Mobilized Header */}
      <Header currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Container with Animated View State switches */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading-spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32"
              id="global-loading"
            >
              <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-black font-extrabold">
                Syncing catalog from ERPNext...
              </p>
            </motion.div>
          ) : (
            <>
              {currentView === "home" && (
                <motion.div
                  key="home-screen"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-7xl mx-auto px-4 py-8 lg:py-12"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* LEFT STICKY PANEL: Hero section + Brand info (col-span-5) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
                      <Hero />
                    </div>

                    {/* RIGHT PANEL: Product Grid (col-span-12, lg:col-span-7) */}
                    <div className="lg:col-span-7 space-y-6">
                      {/* Elite athlete spotlight widgets inside right content flow */}
                      <div className="bg-brand-black text-white py-3 px-4 overflow-hidden border border-brand-black/20 shadow-md rounded-none">
                        <div className="flex flex-col sm:flex-row items-center justify-around gap-4 text-[9px] font-mono tracking-widest text-[#D4D4D4] text-center">
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-brand-green-emerald animate-pulse" />
                            <span>PREMIUM ATHLETIC CUTS</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-brand-red" />
                            <span>TESTED IN HIGH-ALTITUDE ITEN</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <BadgeCheck className="w-3.5 h-3.5 text-brand-green-emerald" />
                            <span>WHATSAPP CHANNEL READY</span>
                          </div>
                        </div>
                      </div>

                      {/* The grid list */}
                      <ProductGrid products={catalog} onSelectProduct={handleSelectProduct} />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentView === "product" && selectedProduct && (
                <motion.div
                  key="product-detail-screen"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProductDetail
                    product={selectedProduct}
                    onBack={() => setCurrentView("home")}
                    onGoToCart={() => setCurrentView("cart")}
                  />
                </motion.div>
              )}

              {currentView === "cart" && (
                <motion.div
                  key="cart-screen"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <CartView
                    onBackToShop={() => setCurrentView("home")}
                    onProceedToCheckout={() => setCurrentView("checkout")}
                  />
                </motion.div>
              )}

              {currentView === "checkout" && (
                <motion.div
                  key="checkout-screen"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <Checkout
                    onBackToCart={() => setCurrentView("cart")}
                    onOrderSuccess={(orderId) => { setLastOrderId(orderId); setCurrentView("order-success"); }}
                  />
                </motion.div>
              )}

              {currentView === "order-success" && (
                <motion.div
                  key="order-success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-xl mx-auto px-4 py-20 text-center"
                  id="checkout-success"
                >
                  <div className="bg-white border border-gray-100 rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col items-center">
                    
                    {/* Tiny visual speed-sash at success frame */}
                    <div className="absolute top-0 inset-x-0 h-2">
                      <SpeedSash className="h-2" />
                    </div>

                    <div className="w-20 h-20 bg-brand-green/10 border border-brand-green/20 rounded-full flex items-center justify-center text-brand-green mb-6 shadow-sm">
                      <CheckCircle2 className="w-10 h-10 stroke-[2.5px]" />
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-display font-black uppercase text-brand-black mb-3">
                      ORDER PLACED!
                    </h1>
                    <p className="text-gray-400 text-xs font-mono uppercase tracking-widest text-brand-red font-semibold mb-6">
                      BORN KENYAN, BORN TO RUN
                    </p>

                    {lastOrderId && (
                      <div className="bg-brand-black text-white px-5 py-3 mb-6 w-full text-center">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">Order Reference</p>
                        <p className="text-lg font-black font-mono tracking-wider">{lastOrderId}</p>
                      </div>
                    )}

                    <div className="bg-gray-50 border border-gray-150 p-5 rounded-lg text-left text-sm text-gray-600 mb-8 w-full leading-relaxed space-y-3">
                      <p className="font-bold text-brand-black flex items-center gap-1.5 font-mono text-xs uppercase text-center pb-2.5 border-b border-gray-255">
                        <PhoneCall className="w-4 h-4 text-brand-green-emerald" /> Next Steps
                      </p>
                      <p>
                        <strong>1. Order Recorded:</strong> Your order is now saved in our system. Keep your order reference above.
                      </p>
                      <p>
                        <strong>2. Confirmation:</strong> Our team will call or WhatsApp you to confirm delivery details and arrange payment.
                      </p>
                      <p>
                        <strong>3. Delivery:</strong> Items dispatched once payment is confirmed. Contact us at <strong>+254 725 507 764</strong>.
                      </p>
                    </div>

                    <button
                      onClick={() => setCurrentView("home")}
                      className="w-full py-4 bg-brand-black hover:bg-brand-red text-white text-xs font-display font-extrabold uppercase tracking-widest rounded-sm cursor-pointer transition-all active:scale-95"
                      id="btn-success-back-home"
                    >
                      Return to Main Store
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      {/* Styled Footer with Maasai Shield markings */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
