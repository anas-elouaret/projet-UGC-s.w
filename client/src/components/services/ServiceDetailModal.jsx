import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart } from "lucide-react";
import OptionSelector from "./OptionSelector";
import PricingBreakdown from "./PricingBreakdown";
import ReviewSection from "./ReviewSection";
import { useCart } from "../../context/CartContext";

export default function ServiceDetailModal({ service, isOpen, onClose }) {
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

  // Initialize with defaults when modal opens
  useEffect(() => {
    if (isOpen && selectedChoices.length === 0) {
      const defaults = [];
      service.options?.forEach((option) => {
        if (option.default) {
          const defaultChoice = option.choices.find((c) => c.id === option.default);
          if (defaultChoice) {
            defaults.push({
              ...defaultChoice,
              optionId: option.id,
              type: option.type,
            });
          }
        }
      });
      if (defaults.length > 0) {
        setSelectedChoices(defaults);
      }
    }
  }, [isOpen, service]);

  // Calculate final price
  const finalPrice = useMemo(() => {
    let total = service.basePrice;
    selectedChoices.forEach((choice) => {
      total += choice.price || 0;
    });
    return total;
  }, [service.basePrice, selectedChoices]);

  const handleAddToCart = () => {
    setIsAdding(true);

    const cartItem = {
      serviceId: service.id,
      serviceName: service.title,
      basePrice: service.basePrice,
      finalPrice: finalPrice,
      selectedOptions: selectedChoices,
      selectedChoicesData: selectedChoices,
      image: service.image,
      category: service.category,
    };

    setTimeout(() => {
      addToCart(cartItem);
      setIsCartOpen(true);
      setIsAdding(false);
      onClose();
      setSelectedChoices([]);
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              layoutId={`modal-${service.id}`}
              className="w-full max-w-2xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a0a0f] via-[#121218] to-[#0a0a0f] shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-start justify-between border-b border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 sm:p-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{service.image}</span>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        {service.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                        {service.category.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={24} className="text-white/70" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Description */}
                  <div>
                    <p className="text-base text-zinc-300 leading-relaxed">
                      {service.details || service.description}
                    </p>
                  </div>

                  {/* Base Price */}
                  <div className="rounded-xl bg-gradient-to-r from-[#7CFF5B]/20 to-[#7CFF5B]/5 border border-[#7CFF5B]/30 p-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-zinc-400">
                        Base Price:
                      </span>
                      <span className="text-3xl font-bold text-[#7CFF5B]">
                        {service.basePrice.toLocaleString()} MAD
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3">
                        What's Included
                      </h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-zinc-300"
                          >
                            <span className="text-[#7CFF5B] font-bold mt-1">
                              ✓
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Options */}
                  {service.options && service.options.length > 0 && (
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="text-lg font-semibold text-white mb-6">
                        Customize Your Package
                      </h3>
                      <div className="space-y-4">
                        {service.options.map((option) => (
                          <OptionSelector
                            key={option.id}
                            option={option}
                            selectedChoices={selectedChoices}
                            onSelect={setSelectedChoices}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pricing Breakdown */}
                  <PricingBreakdown
                    basePrice={service.basePrice}
                    selectedOptions={service.options}
                    selectedChoices={selectedChoices}
                  />

                  {/* Reviews Section */}
                  <div className="border-t border-white/10 pt-6">
                    <ReviewSection
                      serviceId={service.id}
                      reviews={service.reviews || []}
                      onAddReview={(review) => {
                        // Update service reviews in data (for demo purposes)
                        service.reviews = [...(service.reviews || []), review];
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 border-t border-white/10 bg-gradient-to-t from-white/5 to-white/[0.02] p-6 sm:p-8">
                <div className="space-y-3">
                  {/* Price Summary */}
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300">Final Price:</span>
                    <span className="text-3xl font-bold text-[#7CFF5B]">
                      {finalPrice.toLocaleString()} MAD
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-3">
                    <motion.button
                      onClick={handleAddToCart}
                      disabled={isAdding}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(124, 255, 91, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#7CFF5B] px-6 py-3 sm:py-4 text-base sm:text-lg font-bold text-black transition-all disabled:opacity-50 shadow-lg hover:shadow-[#7CFF5B]/25"
                    >
                      <ShoppingCart size={20} />
                      {isAdding ? "Adding..." : "Add to Cart"}
                    </motion.button>
                    <motion.button
                      onClick={onClose}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 py-3 sm:py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
