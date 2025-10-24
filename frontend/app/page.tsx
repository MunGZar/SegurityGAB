"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '@/styles/productos.module.css';
import ProductCard from './components/ProductCard';
import { productos as localProductos } from './data/productos';
import FilterSidebar from './components/FilterSidebar';

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
  const [cameraTypeFilter, setCameraTypeFilter] = useState<string>('');
  const [resolutionFilter, setResolutionFilter] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

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
  }, []);

  const filterProducts = (product: any) => {
    const matchesSearchTerm = 
      (product.modelo && product.modelo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.descripcion && product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCameraType = 
      !cameraTypeFilter || 
      (product.modelo && product.modelo.toLowerCase().includes(cameraTypeFilter.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(cameraTypeFilter.toLowerCase()));

    const matchesResolution = 
      !resolutionFilter || 
      (product.modelo && product.modelo.toLowerCase().includes(resolutionFilter.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(resolutionFilter.toLowerCase()));

    return matchesSearchTerm && matchesCameraType && matchesResolution;
  };

  const filteredLocalProducts = localProductos.filter(filterProducts);
  const filteredDbProducts = dbProducts.filter(filterProducts);

  return (
    <section className={styles.section}>
      <br />
      <br />
      <h1 className={styles.title}>Catálogo de Cámaras CCTV</h1>
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="absolute top-20 left-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <div className={styles.grid}>
        {filteredLocalProducts.map(producto => (
          <ProductCard key={`local-${producto.id}`} {...producto} />
        ))}

        {filteredDbProducts.map(product => (
          <ProductCard
            key={`db-${product.id}`}
            id={product.id}
            modelo={product.name} 
            descripcion={product.description} 
            precio={product.price} 
            imagen={`http://localhost:3001${product.image}`}
          />
        ))}
      </div>
      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        cameraTypeFilter={cameraTypeFilter}
        setCameraTypeFilter={setCameraTypeFilter}
        resolutionFilter={resolutionFilter}
        setResolutionFilter={setResolutionFilter}
      />
    </section>
  );
}
