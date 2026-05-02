import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ item, className = "" }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    setShowFeedback(true);
    setIsCartOpen(true);

    setTimeout(() => {
      setShowFeedback(false);
    }, 2000);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={handleAddToCart}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          borderRadius: "9999px",
          backgroundColor: "#7CFF5B",
          padding: "0.625rem 1.5rem",
          fontSize: "0.875rem",
          fontWeight: "bold",
          color: "rgb(6, 18, 7)",
          border: "none",
          cursor: "pointer",
        }}
        className={className}
      >
        <ShoppingCart size={16} />
        Add to Cart
      </button>
      {showFeedback && (
        <span
          style={{
            position: "absolute",
            top: "-2rem",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "0.25rem",
            backgroundColor: "rgb(34, 197, 94)",
            padding: "0.25rem 0.75rem",
            fontSize: "0.75rem",
            fontWeight: "600",
            color: "white",
            whiteSpace: "nowrap",
          }}
        >
          Added to cart!
        </span>
      )}
    </div>
  );
}
