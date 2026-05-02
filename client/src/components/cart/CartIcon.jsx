import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartIcon() {
  const { getCartCount, setIsCartOpen } = useCart();
  const count = getCartCount();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      style={{
        position: "relative",
        padding: "0.5rem",
        color: "white",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        borderRadius: "9999px",
      }}
    >
      <ShoppingCart size={24} />
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-0.25rem",
            right: "-0.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "1.25rem",
            width: "1.25rem",
            borderRadius: "9999px",
            backgroundColor: "#7CFF5B",
            fontSize: "0.75rem",
            fontWeight: "bold",
            color: "rgb(6, 18, 7)",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
