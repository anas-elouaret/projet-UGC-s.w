import { motion } from "framer-motion";

export default function ServiceCard({ title, description, iconPath }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="card-glass rounded-[2rem] border border-white/10 p-8"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/8 text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-7 w-7">
          <path d={iconPath} />
        </svg>
      </div>
      <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/70">{description}</p>
    </motion.article>
  );
}
