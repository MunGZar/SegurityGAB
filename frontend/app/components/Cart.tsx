"use client";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import styles from "@/styles/cart.module.css";
import { useRouter } from "next/navigation";

export default function Cart({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce(
    (acc, item) => acc + Number(item.precio) * Number(item.cantidad),
    0
  );

  const finalizarCompra = () => {
    clearCart();
    onClose();
    router.push("/checkout"); 
  };

  return (
    <div className={`${styles.cartPanel} ${isOpen ? styles.open : ""}`}>
      <button className={styles.closeBtn} onClick={onClose}>
        ✖
      </button>
      <h2>🛒 Carrito</h2>

      {cart.length === 0 ? (
        <p className={styles.empty}>Tu carrito está vacío</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cart.map((item) => (
              <CartItem
                key={item.modelo}
                {...item}
                precio={typeof item.precio === "string" ? Number(item.precio) : item.precio}
              />
            ))}
          </ul>

          <div className={styles.cartPanelFooter}>
            <p>
              <strong>Total:</strong> ${total.toLocaleString("es-CO")}
            </p>
            <button onClick={clearCart} className={styles.clearBtn}>
              Vaciar carrito
            </button>
            <button onClick={finalizarCompra} className={styles.checkoutBtn}>
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}
