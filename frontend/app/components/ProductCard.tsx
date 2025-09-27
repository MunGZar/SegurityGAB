import styles from '@/styles/productCard.module.css'
import { Producto } from '../data/productos'

export default function ProductCard({ modelo, descripcion, precio, imagen }: Producto) {
    return (
        <div className={styles.card}>
            <img src={imagen} alt={descripcion} className={styles.image} />
            <h2 className={styles.title}>{modelo}</h2>
            <p className={styles.description}>{descripcion}</p>
            <p className={styles.price}>${precio}</p>
            <button className={styles.button}>Añadir al carrito</button>
        </div>
    )
}