"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DetailedProductForm from "../../../../components/DetailedProductForm";
import { useAuth } from "../../../../context/AuthContext";

// Interface for product data
interface ProductItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  long_description?: string;
  model?: string;
}

export default function DetailedProductPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { token } = useAuth();

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && token) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`http://localhost:3001/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) {
            throw new Error("Error al obtener el producto");
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
  }, [id, token]);

  if (loading) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!product) {
    return <p className="text-center mt-10">Producto no encontrado.</p>;
  }

  return (
    <div style={{ padding: "2rem", marginTop: "80px" }}>
      <DetailedProductForm
        product={product}
        onComplete={() => router.push("/dashboard/admin")}
      />
    </div>
  );
}