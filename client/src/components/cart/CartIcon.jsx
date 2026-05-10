import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { playPopSound, playHoverSound } from "../../utils/sounds";

export default function CartIcon() {
  const { getCartCount, setIsCartOpen, newItemAdded, setEndRect, shakeCart, setShakeCart, muted } = useCart();
  const count = getCartCount();
  const [displayedCount, setDisplayedCount] = useState(count);
  const [shake, setShake] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const cartRef = useRef();
  const prevCount = useRef(count);

  useEffect(() => {
    if (displayedCount === count) return;
    const direction = count > displayedCount ? 1 : -1;
    const timer = setInterval(() => {
      setDisplayedCount((prev) => {
        const next = prev + direction;
        if ((direction > 0 && next >= count) || (direction < 0 && next <= count)) {
          clearInterval(timer);
          return count;
        }
        return next;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [count, displayedCount]);

  useEffect(() => {
    if (cartRef.current) {
      setEndRect(cartRef.current.getBoundingClientRect());
    }
  }, [setEndRect]);

  useEffect(() => {
    if (count !== prevCount.current) {
      if (count > prevCount.current) {
        setIsBouncing(true);
        if (!muted) playPopSound();
        setTimeout(() => setIsBouncing(false), 500);
      }
      prevCount.current = count;
    }
  }, [count, muted]);

  useEffect(() => {
    if (shakeCart) {
      setShake(true);
      setShakeCart(false);
      setTimeout(() => setShake(false), 500);
    }
  }, [shakeCart, setShakeCart]);

  const baseAnimate = {
    y: [0, -2, 0],
    boxShadow: [
      "0 0 10px rgba(147, 51, 234, 0.3)",
      "0 0 15px rgba(59, 130, 246, 0.3)",
      "0 0 10px rgba(147, 51, 234, 0.3)"
    ]
  };

  const animate = shake ? { ...baseAnimate, x: [0, -5, 5, -5, 0] } : baseAnimate;

  return (
    <motion.button
      ref={cartRef}
      onClick={() => setIsCartOpen(true)}
      onMouseEnter={() => { if (!muted) playHoverSound(); }}
      className="relative p-2 text-white bg-black/20 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      animate={animate}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 20px rgba(147, 51, 234, 0.6), 0 0 25px rgba(59, 130, 246, 0.4)"
      }}
      whileTap={{ scale: 0.9 }}
      transition={{
        y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
      style={{
        willChange: "transform, box-shadow"
      }}
    >
      <ShoppingCart size={24} />

      {count > 0 && (
        <motion.span
          className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-gradient-to-r from-red-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-[0_0_20px_rgba(236,72,153,0.45)]"
          animate={{
            scale: isBouncing ? [1, 1.35, 1] : 1,
            boxShadow: [
              "0 0 12px rgba(239, 68, 68, 0.5)",
              "0 0 18px rgba(147, 51, 234, 0.75)",
              "0 0 12px rgba(239, 68, 68, 0.5)"
            ]
          }}
          whileHover={{ scale: 1.1 }}
          transition={{
            scale: { duration: 0.4, ease: "easeOut" },
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          key={count}
          initial={{ scale: 0, y: -10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0, y: 10, opacity: 0 }}
        >
          {displayedCount}
        </motion.span>
      )}

      {/* Pulse Glow on New Item */}
      {newItemAdded && (
        <motion.div
          className="absolute inset-0 rounded-full bg-red-500/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 0.8, repeat: 1 }}
        />
      )}

      {/* Subtle light reflection */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent"
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </motion.button>
  );
}
