import { productos, Producto } from '../../data/productos'
import ProductCard from './components/ProductCard'
import styles from '@/styles/productos.module.css'

export default function ProductosPage() {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Catálogo de Cámaras CCTV</h1>

            {/* Contenedor Grid */}
            <div className={styles.grid}>
                {productos.map((producto: Producto) => (
                    <ProductCard key={producto.id} {...producto} />
                ))}
            </div>
        </section>
    )
}
