import Footer from "../../components/layout/Footer";
import HeroSection from "../../components/home/HeroSection";
import FeaturedProjects from "../../components/home/FeaturedProjects";
import Navbar from "../../components/layout/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#06030f] text-white">
      <Navbar />
      <main className="overflow-hidden">
        <HeroSection />
        <FeaturedProjects />
      </main>
      <Footer />
    </div>
  );
}
