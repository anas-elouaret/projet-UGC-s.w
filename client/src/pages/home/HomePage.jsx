import Footer from "../../components/layout/Footer";
import HeroSection from "../../components/home/HeroSection";
import ServicesSection from "../../components/home/ServicesSection";
import PortfolioSection from "../../components/home/PortfolioSection";
import AboutSection from "../../components/home/AboutSection";
import ContactSection from "../../components/home/ContactSection";
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
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        await getCurrentUser(token);
        if (!isMounted) {
          return;
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [navigate, token]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".js-reveal");
    if (!revealElements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    revealElements.forEach((node) => {
      observer.observe(node);
    });

    return () => {
      revealElements.forEach((node) => {
        observer.unobserve(node);
      });
      observer.disconnect();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore network failures on logout
    }

    localStorage.removeItem(TOKEN_KEY);
    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-screen bg-[#efefef] text-[#141414]">
      <Navbar isScrolled={isScrolled} onLogout={token ? handleLogout : undefined} />

      <HeroSection loading={loading} />
      <PortfolioSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
