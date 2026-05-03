import { X, Edit2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { motion } from "framer-motion";
import ServiceDetailModal from "../services/ServiceDetailModal";
import { servicesData } from "../../data/servicesData";

export default function Cart() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          total: getTotalPrice(),
          createdAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderSuccess(true);
        clearCart();
        setTimeout(() => {
          setOrderSuccess(false);
          setIsCartOpen(false);
        }, 2000);
      } else {
        alert("Order failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Error placing order: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditService = (item) => {
    const serviceData = servicesData.find((s) => s.id === item.serviceId);
    setEditingService({ ...item, ...serviceData });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      setEditingService(null);
    }, 300);
  };

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  const asideStyle = {
    position: "fixed",
    right: 0,
    top: 0,
    zIndex: 50,
    height: "100%",
    width: "100%",
    maxWidth: "28rem",
    backgroundColor: "rgb(10, 10, 15)",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
  };

  if (!isCartOpen) {
    return null;
  }

  return (
    <>
      <div style={overlayStyle} onClick={() => setIsCartOpen(false)} />
      <aside style={asideStyle}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "white" }}>Shopping Cart</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ color: "rgb(161, 140, 116)", cursor: "pointer" }}>
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
          {cartItems.length === 0 ? (
            <p style={{ textAlign: "center", color: "rgb(161, 140, 116)" }}>Your cart is empty</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {cartItems.map((item) => (
                <motion.div
                  key={item.cartItemId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {/* Item Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: "600", color: "white", marginBottom: "0.25rem" }}>
                        {item.serviceName}
                      </h3>
                      <p style={{ fontSize: "0.75rem", color: "rgb(113, 113, 122)" }}>
                        {item.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      style={{ color: "rgb(113, 113, 122)", cursor: "pointer", padding: "0.25rem" }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Base Price */}
                  <div style={{ fontSize: "0.875rem", color: "rgb(161, 140, 116)", marginBottom: "0.5rem" }}>
                    Base: {item.basePrice.toLocaleString()} MAD
                  </div>

                  {/* Selected Options */}
                  {item.selectedChoicesData && item.selectedChoicesData.length > 0 && (
                    <div style={{ fontSize: "0.75rem", color: "rgb(226, 232, 240)", marginBottom: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                      {item.selectedChoicesData
                        .filter((choice) => choice.price > 0)
                        .map((choice) => (
                          <div key={choice.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                            <span>→ {choice.label}</span>
                            <span style={{ color: "rgb(124, 255, 91)" }}>+{choice.price.toLocaleString()} MAD</span>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Price & Edit */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <span style={{ fontSize: "1.125rem", fontWeight: "bold", color: "rgb(124, 255, 91)" }}>
                      {item.finalPrice.toLocaleString()} MAD
                    </span>
                    <button
                      onClick={() => handleEditService(item)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.375rem 0.75rem",
                        fontSize: "0.75rem",
                        borderRadius: "0.375rem",
                        border: "1px solid rgba(124, 255, 91, 0.3)",
                        backgroundColor: "rgba(124, 255, 91, 0.1)",
                        color: "rgb(124, 255, 91)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "rgba(124, 255, 91, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "rgba(124, 255, 91, 0.1)";
                      }}
                    >
                      <Edit2 size={12} />
                      Edit
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.02)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {orderSuccess && (
            <div style={{ borderRadius: "0.5rem", backgroundColor: "rgba(34, 197, 94, 0.2)", border: "1px solid rgba(34, 197, 94, 0.4)", padding: "1rem" }}>
              <p style={{ fontSize: "0.875rem", fontWeight: "600", color: "rgb(134, 239, 172)" }}>✓ Order placed!</p>
            </div>
          )}

          {cartItems.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "1rem" }}>
              <span style={{ fontSize: "1.125rem", fontWeight: "600", color: "white" }}>Total:</span>
              <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#7CFF5B" }}>{getTotalPrice().toLocaleString()} MAD</span>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0 || isLoading}
              style={{
                width: "100%",
                borderRadius: "9999px",
                backgroundColor: "#7CFF5B",
                padding: "0.75rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: "bold",
                color: "rgb(6, 18, 7)",
                opacity: cartItems.length === 0 || isLoading ? 0.5 : 1,
                cursor: cartItems.length === 0 || isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {isLoading ? "Processing..." : "Place Order"}
            </button>
            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                width: "100%",
                borderRadius: "9999px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backgroundColor: "transparent",
                padding: "0.75rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: "bold",
                color: "white",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </aside>

      {/* Edit Modal */}
      {editingService && (
        <ServiceDetailModal
          service={editingService}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
}

