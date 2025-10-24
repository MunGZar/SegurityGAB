"use client";
import { useCart } from "../context/CartContext";
import styles from "@/styles/cart.module.css";

type Props = {
  modelo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  cantidad: number;
  nombre?: string;
};

export default function CartItem({ modelo, descripcion, precio, imagen, cantidad }: Props) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className={styles.cartItem}>
      <img src={imagen} alt={modelo} className={styles.cartImage} />

      <div className={styles.cartInfo}>
        <h4>{modelo}</h4>
        <p>{descripcion}</p>
       <p className={styles.cartPrice}>
      ${precio.toLocaleString("es-CO")}
      </p>

       
        <div className={styles.quantityControls}>
          <button 
            onClick={() => updateQuantity(modelo, cantidad - 1)} 
            disabled={cantidad <= 1}
          >
            –
          </button>
          <span>{cantidad}</span>
          <button onClick={() => updateQuantity(modelo, cantidad + 1)}>+</button>
        </div>
      </div>

      
      <button
        className={styles.removeBtn}
        onClick={() => removeFromCart(modelo)}
      >
        ❌
      </button>
    </div>
  );
}
