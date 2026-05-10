import { motion } from "framer-motion";
import { playArrivalSound } from "../../utils/sounds";

export default function FlyingItem({ item, endRect, onComplete, setShakeCart }) {
  if (!item || !endRect || !item.startRect) return null;

  const startRect = item.startRect;
  const targetLeft = endRect.left + endRect.width / 2 - 20;
  const targetTop = endRect.top + endRect.height / 2 - 20;

  return (
    <motion.div
      className="fixed z-50 pointer-events-none rounded-full bg-white/10 shadow-[0_0_40px_rgba(124,58,237,0.25)] backdrop-blur-md"
      initial={{
        left: startRect.left,
        top: startRect.top,
        width: startRect.width,
        height: startRect.height,
        opacity: 1,
        rotate: 0,
        filter: "blur(0px)"
      }}
      animate={{
        left: targetLeft,
        top: targetTop,
        width: 36,
        height: 36,
        opacity: 0.75,
        rotate: 25,
        filter: "blur(2px)"
      }}
      transition={{
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1]
      }}
      onAnimationComplete={() => {
        playArrivalSound();
        setShakeCart(true);
        onComplete();
      }}
      style={{
        willChange: "transform, width, height, filter"
      }}
    >
      <div className="relative h-full w-full flex items-center justify-center text-lg text-white">
        {item.image}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 via-violet-500/20 to-blue-400/20"
          animate={{ opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}