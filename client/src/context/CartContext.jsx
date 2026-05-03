import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    // Generate a unique ID for each service configuration
    const cartItemId = `${item.serviceId}-${Date.now()}-${Math.random()}`;
    
    // Add new item with configuration
    setCartItems([...cartItems, { 
      ...item, 
      cartItemId,
      addedAt: new Date().toISOString()
    }]);
  };

  const updateCartItem = (cartItemId, updatedItem) => {
    setCartItems(cartItems.map((item) =>
      item.cartItemId === cartItemId ? { ...item, ...updatedItem } : item
    ));
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(cartItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.finalPrice || item.price || 0;
      return total + (typeof price === "number" ? price : parseFloat(price) || 0);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
