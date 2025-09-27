import styles from '@/styles/productos.module.css'
import ProductCard from './components/ProductCard'
import { productos } from './data/productos'


export default function ProductosPage() {
  return (
    <section className={styles.section}>
      <br />
      <br />
      <h1 className={styles.title}>Catálogo de Cámaras CCTV</h1>
      <div className={styles.grid}>
        {productos.map(producto => (
          <ProductCard key={producto.id} {...producto} />
        ))}
      </div>
    </section>
  )
}