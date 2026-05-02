import { Navigate, Route, Routes } from "react-router-dom";
import BackgroundScene from "./components/common/BackgroundScene";
import Cart from "./components/cart/Cart";
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import CatalogPage from "./pages/catalog/CatalogPage";
import ServicesPage from "./pages/ServicesPage";
import PackagesPage from "./pages/pricing/PackagesPage";
import PrintingPage from "./pages/printing/PrintingPage";
import ClientDashboardPage from "./pages/dashboard/ClientDashboardPage";
import CreatorDashboardPage from "./pages/dashboard/CreatorDashboardPage";
import StartProjectPage from "./pages/startProject/StartProjectPage";

export default function App() {
  return (
    <>
      <BackgroundScene />
      <Cart />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/marketplace" element={<CatalogPage />} />
        <Route path="/catalog" element={<Navigate to="/marketplace" replace />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/printing" element={<PrintingPage />} />
        <Route path="/dashboard/client" element={<ClientDashboardPage />} />
        <Route path="/dashboard/creator" element={<CreatorDashboardPage />} />
        <Route path="/start-project" element={<StartProjectPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
