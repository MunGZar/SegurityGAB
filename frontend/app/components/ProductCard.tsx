"use client";
import styles from '@/styles/productCard.module.css'
import { Producto } from '../data/productos'
import { useCart } from '../context/CartContext'
import Link from 'next/link'

export default function ProductCard({ id, modelo, descripcion, precio, imagen }: Producto) {
  const { addToCart } = useCart()

  return (
    <div className={styles.card}>
      <Link href={`/productos/${id}`} className="flex flex-col h-full">
        <img src={imagen} alt={descripcion} className={styles.image} />
        <h2 className={styles.title}>{modelo}</h2>
        <p className={styles.description}>{descripcion}</p>

        
        <p className={styles.price}>
          ${Number(precio).toLocaleString("es-CO")}
        </p>
      </Link>

   <button
  className={styles.button}
  onClick={(event) => {
    event.stopPropagation(); // Prevent the click from propagating to the Link
    addToCart({
      modelo,
      descripcion,
      precio: Number(precio), 
      imagen,
      id,
    });
  }}
>
  Añadir al carrito
    </button>

    </div>  )
}
