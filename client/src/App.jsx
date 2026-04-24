import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import HomePage from "./pages/home/HomePage";
import CatalogPage from "./pages/catalog/CatalogPage";
import ContactPage from "./pages/contact/ContactPage";
import BlogPage from "./pages/blog/BlogPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
