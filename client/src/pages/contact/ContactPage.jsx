import { useEffect, useState } from "react";
import Navbar from "../../components/home/Navbar";
import ContactSection from "../../components/home/ContactSection";
import FooterSection from "../../components/home/FooterSection";

export default function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top on page mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="min-h-screen bg-white text-[#141414]">
      <Navbar isScrolled={isScrolled} />
      <div className="pt-20">
        <ContactSection />
      </div>
      <FooterSection />
    </main>
  );
}
