import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BackgroundScene from "./components/common/BackgroundScene";
import Cart from "./components/cart/Cart";
import PageTransition from "./components/common/PageTransition";
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import CatalogPage from "./pages/catalog/CatalogPage";
import ServicesPage from "./pages/services/ServicesPageNew";
import PackagesPage from "./pages/pricing/PackagesPage";
import PrintingPage from "./pages/printing/PrintingPage";
import ClientDashboardPage from "./pages/dashboard/ClientDashboardPage";
import CreatorDashboardPage from "./pages/dashboard/CreatorDashboardPage";
import StartProjectPage from "./pages/startProject/StartProjectPage";

export default function App() {
  const location = useLocation();

  return (
    <>
      <BackgroundScene />
      <Cart />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
          <Route path="/marketplace" element={<PageTransition><CatalogPage /></PageTransition>} />
          <Route path="/catalog" element={<Navigate to="/marketplace" replace />} />
          <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
          <Route path="/packages" element={<PageTransition><PackagesPage /></PageTransition>} />
          <Route path="/printing" element={<PageTransition><PrintingPage /></PageTransition>} />
          <Route path="/dashboard/client" element={<PageTransition><ClientDashboardPage /></PageTransition>} />
          <Route path="/dashboard/creator" element={<PageTransition><CreatorDashboardPage /></PageTransition>} />
          <Route path="/start-project" element={<PageTransition><StartProjectPage /></PageTransition>} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
