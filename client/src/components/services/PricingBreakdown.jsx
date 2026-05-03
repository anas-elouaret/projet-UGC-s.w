import { motion } from "framer-motion";

export default function PricingBreakdown({ basePrice, selectedOptions, selectedChoices }) {
  // Calculate add-ons total
  const addOnsTotal = selectedChoices
    .filter(choice => choice.type === "checkbox")
    .reduce((sum, choice) => sum + choice.price, 0);

  // Calculate required options
  const requiredOptionsTotal = selectedChoices
    .filter(choice => choice.type === "radio" && choice.price > 0)
    .reduce((sum, choice) => sum + choice.price, 0);

  const subtotal = basePrice + requiredOptionsTotal + addOnsTotal;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const hasAddOns = addOnsTotal > 0 || requiredOptionsTotal > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Pricing Breakdown</h3>
      
      <div className="space-y-3 text-sm">
        {/* Base Price */}
        <div className="flex justify-between text-zinc-300">
          <span>Base Service</span>
          <span>{basePrice.toLocaleString()} MAD</span>
        </div>

        {/* Required Options */}
        {selectedChoices
          .filter(choice => choice.type === "radio" && choice.price > 0)
          .map((choice) => (
            <div key={choice.id} className="flex justify-between text-zinc-300">
              <span className="text-xs">{choice.label}</span>
              <span className="text-[#7CFF5B]">+{choice.price.toLocaleString()} MAD</span>
            </div>
          ))}

        {/* Add-ons */}
        {selectedChoices
          .filter(choice => choice.type === "checkbox")
          .map((choice) => (
            <div key={choice.id} className="flex justify-between text-zinc-300">
              <span className="text-xs">{choice.label}</span>
              <span className="text-[#7CFF5B]">+{choice.price.toLocaleString()} MAD</span>
            </div>
          ))}

        {/* Divider */}
        {hasAddOns && (
          <div className="my-3 border-t border-white/10" />
        )}

        {/* Subtotal */}
        {hasAddOns && (
          <div className="flex justify-between text-sm font-medium text-white">
            <span>Subtotal</span>
            <span>{subtotal.toLocaleString()} MAD</span>
          </div>
        )}

        {/* Tax */}
        {hasAddOns && (
          <div className="flex justify-between text-sm text-zinc-400">
            <span>Tax (10%)</span>
            <span>{tax.toLocaleString()} MAD</span>
          </div>
        )}

        {/* Divider */}
        {hasAddOns && (
          <div className="my-3 border-t border-white/10" />
        )}

        {/* Total */}
        <div className="flex justify-between items-center pt-2 border-t border-white/10">
          <span className="text-base font-semibold text-white">Total</span>
          <span className="text-2xl font-bold text-[#7CFF5B]">{total.toLocaleString()} MAD</span>
        </div>
      </div>
    </motion.div>
  );
}
