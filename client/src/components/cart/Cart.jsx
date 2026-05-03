import { X, Edit2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceDetailModal from "../services/ServiceDetailModal";
import { servicesData } from "../../data/servicesData";

export default function Cart() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          total: getTotalPrice(),
          createdAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderSuccess(true);
        clearCart();
        setTimeout(() => {
          setOrderSuccess(false);
          setIsCartOpen(false);
        }, 2000);
      } else {
        alert("Order failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Error placing order: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditService = (item) => {
    const serviceData = servicesData.find((s) => s.id === item.serviceId);
    setEditingService({ ...item, ...serviceData });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      setEditingService(null);
    }, 300);
  };

  if (!isCartOpen) {
    return null;
  }

  return (
    <div>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      {/* Sidebar */}
      <motion.aside
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        exit={{ x: 300 }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed right-0 top-0 z-50 h-screen w-full max-w-sm bg-gradient-to-b from-slate-950 via-slate-900 to-black flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-500/20 px-6 py-4 backdrop-blur">
          <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(false)}
            className="rounded-full p-2 hover:bg-purple-500/10 transition-colors text-gray-400 hover:text-white"
          >
            <X size={24} />
          </motion.button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p className="text-center">
                <div className="text-3xl mb-2">🛒</div>
                Your cart is empty
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <motion.div
                  key={item.cartItemId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-purple-900/5 p-4 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  {/* Item Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.serviceName}</h3>
                      <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <X size={18} />
                    </motion.button>
                  </div>

                  {/* Base Price */}
                  <div className="text-sm text-gray-400 mb-2">
                    Base: <span className="text-[#7CFF5B] font-semibold">{item.basePrice.toLocaleString()} MAD</span>
                  </div>

                  {/* Selected Options */}
                  {item.selectedChoicesData && item.selectedChoicesData.length > 0 && (
                    <div className="border-t border-purple-500/10 pt-2 mt-2 space-y-1">
                      {item.selectedChoicesData
                        .filter((choice) => choice.price > 0)
                        .map((choice) => (
                          <div key={choice.id} className="flex justify-between text-xs text-gray-400">
                            <span>→ {choice.label}</span>
                            <span className="text-[#7CFF5B]">+{choice.price.toLocaleString()} MAD</span>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Price & Edit */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-purple-500/10">
                    <span className="text-lg font-bold text-[#7CFF5B]">
                      {item.finalPrice.toLocaleString()} MAD
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditService(item)}
                      className="flex items-center gap-1 rounded-lg border border-[#7CFF5B]/30 bg-[#7CFF5B]/10 px-3 py-1 text-xs font-medium text-[#7CFF5B] hover:bg-[#7CFF5B]/20 transition-all"
                    >
                      <Edit2 size={12} />
                      Edit
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-purple-500/20 bg-gradient-to-t from-black via-slate-900/50 to-transparent px-6 py-4 space-y-4">
          {orderSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-green-500/10 border border-green-500/30 px-4 py-3 text-sm font-medium text-green-400 flex items-center gap-2"
            >
              <span className="text-lg">✓</span>
              Order placed successfully!
            </motion.div>
          )}

          {/* Total */}
          <div className="rounded-lg bg-gradient-to-r from-purple-900/30 to-purple-900/10 border border-purple-500/20 px-4 py-4">
            <div className="flex items-baseline justify-between">
              <span className="text-gray-300">Total:</span>
              <span className="text-3xl font-bold text-[#7CFF5B]">
                {getTotalPrice().toLocaleString()} MAD
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={handlePlaceOrder}
              disabled={isLoading || cartItems.length === 0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 rounded-full bg-gradient-to-r from-[#7CFF5B] to-lime-400 px-6 py-3 font-bold text-black shadow-lg hover:shadow-[#7CFF5B]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? "Processing..." : "Place Order"}
            </motion.button>
            <motion.button
              onClick={() => setIsCartOpen(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full border border-purple-500/30 px-6 py-3 font-semibold text-white hover:bg-purple-500/10 transition-all duration-200"
            >
              Continue Shopping
            </motion.button>
          </div>
        </div>
      </motion.aside>
      {/* Edit Modal */}
      {editingService && (
        <ServiceDetailModal
          service={editingService}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}

