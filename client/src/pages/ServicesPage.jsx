import { useState } from "react";
import HybridNavbar from "../components/hybrid/HybridNavbar";
import { servicesData } from "../data/servicesData";
import ServiceCardEnhanced from "../components/services/ServiceCardEnhanced";
import ServiceDetailModal from "../components/services/ServiceDetailModal";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedService(null);
    }, 300);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <HybridNavbar />
      
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7CFF5B] mb-4">
            Services
          </p>
          <h1 className="max-w-3xl text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Agency-grade services with flexible delivery.
          </h1>
          <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-300">
            Customize each service with options that matter to your business. Choose exactly what you need, 
            see real-time pricing, and launch with confidence. Every service is configurable—no hidden costs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {servicesData.map((service, idx) => (
            <ServiceCardEnhanced
              key={service.id}
              service={service}
              onSelect={handleServiceSelect}
              index={idx}
            />
          ))}
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 sm:mt-20 grid gap-6 md:grid-cols-3"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-2xl font-bold text-[#7CFF5B] mb-2">100%</div>
            <p className="text-sm text-zinc-300">
              Transparent pricing with no hidden fees
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-2xl font-bold text-[#7CFF5B] mb-2">Real-time</div>
            <p className="text-sm text-zinc-300">
              See price updates as you customize options
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-2xl font-bold text-[#7CFF5B] mb-2">Flexible</div>
            <p className="text-sm text-zinc-300">
              Edit your selections before checkout
            </p>
          </div>
        </motion.div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
