"use client";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import styles from "@/styles/cart.module.css";
import { useRouter } from "next/navigation";

export default function CarritoPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const total = cart.reduce(
    (acc, item) => acc + Number(item.precio) * Number(item.cantidad),
    0
  );

  const finalizarCompra = () => {
    
    router.push("/checkout"); 
  };

  return (
    <div className={styles.cartPage}>
      <h1>🛒 Mi Carrito</h1>

      {cart.length === 0 ? (
        <p className={styles.empty}>Tu carrito está vacío</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cart.map((item) => (
              <CartItem
                key={item.modelo}
                {...item}
                precio={Number(item.precio)}
              />
            ))}
          </ul>

          <div className={styles.cartFooter}>
            <p>
              <strong>Total:</strong> ${total.toLocaleString("es-CO")}
            </p>
            <div>
              <button onClick={clearCart} className={styles.clearBtn}>
                Vaciar carrito
              </button>
              <button onClick={finalizarCompra} className={styles.checkoutBtn}>

                Pagar pedido

              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
