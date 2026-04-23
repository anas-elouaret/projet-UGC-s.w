const footerLinks = ["Home", "Services", "Portfolio", "About", "Contact"];

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: "M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm4.5 4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm5.1-.6h.01",
  },
  {
    label: "Dribbble",
    href: "#",
    icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm-6.8-5.3c2-.8 4.2-1.2 6.6-1.1.3 1 .6 2 .8 3m6.2-1.3c-1.5-1-3.3-1.6-5.4-1.8m3.8-7.6c-1.5 1.2-3.6 2-6.3 2.4m-5-4c1.2 1.4 2.1 3.2 2.8 5.3",
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: "M7 8.7V19M7 5.3a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zM12 19v-5.3c0-1.5.8-2.7 2.4-2.7 1.4 0 2.1 1 2.1 2.7V19",
  },
];

export default function FooterSection() {
  return (
    <footer className="border-t border-black/10 bg-[#efefef]">
      <div className="mx-auto grid w-full max-w-400 gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 md:items-start lg:px-8">
        <div>
          <p className="text-2xl font-extrabold tracking-[-0.02em] text-[#111111]">creato.</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#666666]">
            © 2026 creato. Designed for the creator economy.
          </p>
        </div>

        <nav className="justify-self-start md:justify-self-center">
          <ul className="space-y-2 text-sm text-[#555555]">
            {footerLinks.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="transition hover:text-[#111111]">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="justify-self-start md:justify-self-end">
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/16 text-black/70 transition hover:border-black/42 hover:text-black"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[18px] w-[18px]"
                >
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
