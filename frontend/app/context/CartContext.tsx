"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Producto } from "../data/productos";



type CartItem = Producto & { cantidad: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (producto: Producto) => void;
  removeFromCart: (modelo: string) => void;
  clearCart: () => void;
  updateQuantity: (modelo: string, cantidad: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🧠 Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // 💾 Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto: Producto) => {
    setCart((prevCart) => {
      const itemExistente = prevCart.find(
        (item) => item.modelo === producto.modelo
      );
      if (itemExistente) {
        return prevCart.map((item) =>
          item.modelo === producto.modelo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCart, { ...producto, cantidad: 1 }];
    });
  };

  const removeFromCart = (modelo: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.modelo !== modelo));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // 🧹 limpiar del almacenamiento también
  };

  const updateQuantity = (modelo: string, cantidad: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.modelo === modelo
          ? { ...item, cantidad: Math.max(1, cantidad) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
}
