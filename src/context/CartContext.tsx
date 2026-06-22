import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { CartItem, CatalogItem } from "../types";

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CatalogItem, size: string, quantity: number) => void;
  removeFromCart: (itemCode: string, size: string) => void;
  updateQuantity: (itemCode: string, size: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CatalogItem, size: string, quantity: number) => {
    setCart((prevCart) => {
      // Find if item of the exact same code and size is already present
      const existingIndex = prevCart.findIndex(
        (cartItem) => cartItem.item_code === item.item_code && cartItem.size === size
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }

      return [
        ...prevCart,
        {
          item_code: item.item_code,
          item_name: item.item_name,
          colorway: item.colorway,
          gender: item.gender,
          size: size,
          quantity: quantity,
          price: item.price,
          image: item.image,
          is_set: item.is_set,
        },
      ];
    });
  };

  const removeFromCart = (itemCode: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => !(cartItem.item_code === itemCode && cartItem.size === size))
    );
  };

  const updateQuantity = (itemCode: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemCode, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.item_code === itemCode && cartItem.size === size
          ? { ...cartItem, quantity }
          : cartItem
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const itemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
