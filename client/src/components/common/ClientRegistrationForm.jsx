import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Briefcase, Send } from "lucide-react";

export default function ClientRegistrationForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    phone: "",
    niche: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const niches = [
    "gym",
    "restaurant",
    "ecommerce",
    "personal brand",
    "technology",
    "healthcare",
    "education",
    "finance",
    "real estate",
    "other",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.niche) newErrors.niche = "Please select a niche";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Store in localStorage for now (can be replaced with API call)
      const existingClients = JSON.parse(localStorage.getItem("clients") || "[]");
      const newClient = {
        id: Date.now(),
        ...formData,
        registeredAt: new Date().toISOString(),
      };
      existingClients.push(newClient);
      localStorage.setItem("clients", JSON.stringify(existingClients));

      onSubmit?.(newClient);
      onClose?.();
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Form */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="relative bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-2xl p-8 w-full max-w-md shadow-2xl"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Join Our Agency</h2>
          <p className="text-gray-400 text-sm">Register to get started with premium services</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* First Name */}
          <motion.div variants={fieldVariants}>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              First Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <motion.input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.2)" }}
                transition={{ duration: 0.2 }}
                className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.firstName ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Enter your first name"
              />
            </div>
            {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
          </motion.div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Last Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.lastName ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Enter your last name"
              />
            </div>
            {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              City
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.city ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="Your city"
              />
            </div>
            {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.email ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.phone ? "border-red-500" : "border-gray-600"
                }`}
                placeholder="+212 6XX XXX XXX"
              />
            </div>
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Niche */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Business Niche
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <select
                value={formData.niche}
                onChange={(e) => handleChange("niche", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.niche ? "border-red-500" : "border-gray-600"
                }`}
              >
                <option value="">Select your niche</option>
                {niches.map(niche => (
                  <option key={niche} value={niche} className="bg-gray-800">
                    {niche.charAt(0).toUpperCase() + niche.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            {errors.niche && <p className="text-red-400 text-xs mt-1">{errors.niche}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            variants={fieldVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(139, 92, 246, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Register Now
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}