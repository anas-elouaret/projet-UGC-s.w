import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import ContactForm from "../components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#05030d] text-white">
      <Navbar />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
