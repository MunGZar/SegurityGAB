"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "@/styles/productCard.module.css"; // Reusing some styles

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`http://localhost:3001/products/${id}`);
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }
          const data = await res.json();
          setProduct(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>Error al cargar el producto: {error}</p>;
  }

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="container mx-auto px-4 pt-2 mt-25">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={`http://localhost:3001${product.image}`}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          {product.long_description && (
            <p className="text-gray-600 mb-4">{product.long_description}</p>
          )}
          <p className="text-2xl font-semibold text-blue-600 mb-6">
            ${Number(product.price).toLocaleString("es-CO")}
          </p>
          <p className="text-gray-500 mb-6">Stock: {product.stock}</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => alert("Funcionalidad de añadir al carrito pendiente")}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}