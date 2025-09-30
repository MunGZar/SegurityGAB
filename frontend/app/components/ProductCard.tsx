"use client";
import styles from '@/styles/productCard.module.css'
import { Producto } from '../data/productos'
import { useCart } from '../context/CartContext'

export default function ProductCard({ id, modelo, descripcion, precio, imagen }: Producto) {
  const { addToCart } = useCart()

  return (
    <div className={styles.card}>
      <img src={imagen} alt={descripcion} className={styles.image} />
      <h2 className={styles.title}>{modelo}</h2>
      <p className={styles.description}>{descripcion}</p>

      
      <p className={styles.price}>
        ${Number(precio).toLocaleString("es-CO")}
      </p>

   <button
  className={styles.button}
  onClick={() =>
    addToCart({
      modelo,
      descripcion,
      precio: Number(precio), 
      imagen,
      id: 0,
    })
  }
>
  Añadir al carrito
</button>

    </div>
  )
}
