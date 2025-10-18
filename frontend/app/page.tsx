"use client"; // Needed for hooks

import { useState, useEffect } from 'react';
import styles from '@/styles/productos.module.css';
import ProductCard from './components/ProductCard';
import { productos as localProductos } from './data/productos'; // Keep local products

// Define the structure for backend products
interface DbProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export default function ProductosPage() {
  const [dbProducts, setDbProducts] = useState<DbProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/products');
        if (res.ok) {
          const data = await res.json();
          setDbProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products from DB:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once on mount

  return (
    <section className={styles.section}>
      <br />
      <br />
      <h1 className={styles.title}>Catálogo de Cámaras CCTV</h1>
      <div className={styles.grid}>
        {/* Render local products */}
        {localProductos.map(producto => (
          <ProductCard key={`local-${producto.id}`} {...producto} />
        ))}

        {/* Render database products, adapting their structure */}
        {dbProducts.map(product => (
          <ProductCard
            key={`db-${product.id}`}
            id={product.id}
            modelo={product.name} // Adapt name to modelo
            descripcion={product.description} // Adapt description to descripcion
            precio={product.price} // Adapt price to precio
            imagen={`http://localhost:3001${product.image}`} // Adapt image to imagen and create full URL
          />
        ))}
      </div>
    </section>
  );
}
