import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const hoverVariants = {
  hover: {
    y: -12,
    scale: 1.02,
    boxShadow: "0 25px 50px rgba(139, 92, 246, 0.15), 0 0 30px rgba(124, 255, 91, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function ServiceCard({ service, onSelect, index = 0 }) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ delay: index * 0.1 }}
      onClick={() => onSelect(service)}
      className="group cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:border-purple-500/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <motion.span
            className="text-4xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            {service.image}
          </motion.span>
          <div>
            <h3 className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest">
              {service.category}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-300 mb-6 line-clamp-2 group-hover:text-zinc-200 transition-colors duration-300">
        {service.description}
      </p>

      {/* Features List */}
      <ul className="space-y-2 mb-6">
        {service.features.slice(0, 3).map((feature, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (index * 0.1) + (idx * 0.05) }}
            className="flex items-center gap-2 text-sm text-zinc-200 group-hover:text-zinc-100 transition-colors duration-300"
          >
            <motion.span
              className="text-[#7CFF5B] font-bold"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              •
            </motion.span>
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* Price & CTA */}
      <div className="flex items-end justify-between pt-6 border-t border-white/10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-xs text-zinc-400 mb-1">Starting from</p>
          <p className="text-3xl font-bold text-[#7CFF5B] group-hover:text-[#8CFF6B] transition-colors duration-300">
            {service.basePrice.toLocaleString()} MAD
          </p>
        </motion.div>
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(service);
          }}
          whileHover={{
            scale: 1.05,
            gap: "0.75rem",
            boxShadow: "0 0 20px rgba(124, 255, 91, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:from-[#7CFF5B] hover:to-[#6CFF4B] hover:text-black border border-white/20 hover:border-[#7CFF5B]/50"
        >
          Customize
          <motion.div
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={16} />
          </motion.div>
        </motion.button>
      </div>
    </motion.article>
  );
}
