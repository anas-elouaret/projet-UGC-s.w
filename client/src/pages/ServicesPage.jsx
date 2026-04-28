import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import SectionHeading from "../components/common/SectionHeading";
import ServiceCard from "../components/services/ServiceCard";

const services = [
  {
    title: "Web Development",
    description: "Custom websites built for speed, accessibility, and elegant conversion flows.",
    iconPath: "M4 7h16M4 12h16M4 17h16",
  },
  {
    title: "Branding",
    description: "Meaningful visual systems, messaging, and identity that position your brand to lead.",
    iconPath: "M12 3l7 4.2v7.6L12 21 5 14.8V6.2L12 3z",
  },
  {
    title: "Content Creation",
    description: "UGC and campaign creative that feels modern, authentic, and built for social attention.",
    iconPath: "M5 3v18l15-9L5 3z",
  },
  {
    title: "Social Media Marketing",
    description: "Strategy, paid, and organic campaigns that help brands grow with intentional storytelling.",
    iconPath: "M12 8v8m-4-4h8",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#05030d] text-white">
      <Navbar />
      <main className="px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          pretitle="Services"
          title="Strategy, design, and content for modern brands."
          description="We combine digital craftsmanship with brand thinking to build work that feels premium and performs."
        />

        <div className="mx-auto mt-16 grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
