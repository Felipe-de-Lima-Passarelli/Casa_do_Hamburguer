"use client";

//Next
import { createContext, useContext, useState, ReactNode } from "react";

//Interface
import { CartItemType, CartItemsContextType } from "@/types/CarItem";

const CartItemContext = createContext<CartItemsContextType>({
  cartItems: [],
  setCartItems: () => {},
});

export const CartItemProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  return (
    <CartItemContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartItemContext.Provider>
  );
};

export const useCartItem = () => {
  const context = useContext(CartItemContext);

  if (!context) {
    throw new Error("useCartItem precisa estar dentro do Provider");
  }

  return context;
};
