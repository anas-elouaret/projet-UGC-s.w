import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../api/auth";
import Navbar from "../../components/home/Navbar";
import HeroSection from "../../components/home/HeroSection";
import ServicesSection from "../../components/home/ServicesSection";
import PortfolioSection from "../../components/home/PortfolioSection";
import AboutSection from "../../components/home/AboutSection";
import FooterSection from "../../components/home/FooterSection";

const TOKEN_KEY = "auth_token";

export default function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem(TOKEN_KEY);
  const [loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadUser = async () => {
      if (!token) { setLoading(false); return; }
      setLoading(true);
      try {
        await getCurrentUser(token);
        if (!isMounted) return;
      } catch {
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadUser();
    return () => { isMounted = false; };
  }, [navigate, token]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try { await logout(); } catch { /* ignore */ }
    localStorage.removeItem(TOKEN_KEY);
    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-screen bg-white text-[#141414]">
      <Navbar isScrolled={isScrolled} onLogout={token ? handleLogout : undefined} />
      <div className="pt-20">
        <HeroSection loading={loading} />
        <ServicesSection />
        <PortfolioSection />
        <AboutSection />
      </div>
      <FooterSection />
    </main>
  );
}
