import { motion } from "framer-motion";

const socialLinks = [
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07030e] py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Agencia</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">
              Premium creative strategy, digital campaigns and crafted brand systems for ambitious teams.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2 }}
                className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60 transition hover:text-white"
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-sm text-white/50">
          © {new Date().getFullYear()} Agencia. Designed for digital-first brands.
        </div>
      </div>
    </footer>
  );
}
