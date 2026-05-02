import { X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatMAD } from "../../utils/currency";
import { useState } from "react";

export default function Cart() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "white" }}>Shopping Cart</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ color: "rgb(161, 140, 116)", cursor: "pointer" }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
          {cartItems.length === 0 ? (
            <p style={{ textAlign: "center", color: "rgb(161, 140, 116)" }}>Your cart is empty</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "0.5rem", padding: "1rem", backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: "600", color: "white" }}>{item.name}</h3>
                      <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "rgb(161, 140, 116)" }}>
                        {formatMAD(item.price)}
                      </p>
                      {item.quantity && item.quantity > 1 && (
                        <p style={{ marginTop: "0.25rem", fontSize: "0.75rem", color: "rgb(113, 113, 122)" }}>Qty: {item.quantity}</p>
                      )}
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ color: "rgb(113, 113, 122)", cursor: "pointer" }}>
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(255, 255, 255, 0.02)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {orderSuccess && (
            <div style={{ borderRadius: "0.5rem", backgroundColor: "rgba(34, 197, 94, 0.2)", border: "1px solid rgba(34, 197, 94, 0.4)", padding: "1rem" }}>
              <p style={{ fontSize: "0.875rem", fontWeight: "600", color: "rgb(134, 239, 172)" }}>✓ Order placed!</p>
            </div>
          )}

          {cartItems.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "1rem" }}>
              <span style={{ fontSize: "1.125rem", fontWeight: "600", color: "white" }}>Total:</span>
              <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#7CFF5B" }}>{formatMAD(getTotalPrice())}</span>
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
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                padding: "0.75rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "white",
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

