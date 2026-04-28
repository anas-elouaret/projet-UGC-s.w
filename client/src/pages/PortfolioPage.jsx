import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#05030d] text-white">
      <Navbar />
      <main>
        <PortfolioGrid />
      </main>
      <Footer />
    </div>
  );
}
