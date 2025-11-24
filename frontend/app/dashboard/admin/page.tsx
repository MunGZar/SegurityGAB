"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "@/styles/admin.module.css";
import UserForm from "./../../components/UserForm";
import ProductForm from "./../../components/ProductForm";




// Interfaces
interface UserItem {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface ProductItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const router = useRouter();

  const [items, setItems] = useState<UserItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Redirect if not admin



  useEffect(() => {
    if (!token || !user || user.role !== "admin") {
      router.push("/login");
    }
  }, [token, user, router]);



  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al obtener usuarios");
      const data = await res.json();
      setItems(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al obtener productos");
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos
  useEffect(() => {
    if (token) {
      fetchUsers();
      fetchProducts();
    }
  }, [token]);

  if (!user || user.role !== "admin") {
    return <p className="text-red-500 text-center mt-10">No autorizado</p>;
  }

  return (
    <div className={styles.container}><br /><br />
      <h1 className={styles.title}>Panel de Administración</h1>

      {loading && <p className={styles.loading}>Cargando...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* 🔹 Gestión de Usuarios */}
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Gestión de Usuarios</h2>
        {/* Formulario para crear nuevo usuario */}
        <UserForm fetchUsers={fetchUsers} />

        {/* Formulario de edición */}
        {editingUser && (
          <UserForm fetchUsers={fetchUsers} editingItem={editingUser} />
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button onClick={() => setEditingUser(item)} className={styles.buttonPrimary}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 🔹 Gestión de Productos */}
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Gestión de Productos</h2>


        {editingProduct ? (

          <ProductForm
            fetchProducts={fetchProducts}
            editingItem={editingProduct}
            onUpdateComplete={() => setEditingProduct(null)}
          />

        ) : (
          <ProductForm fetchProducts={fetchProducts} />

        )}

        <div className={styles.productGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img src={`http://localhost:3001${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span>${product.price}</span>

              <div className={styles.productCardActions}>
                <button onClick={() => setEditingProduct(product)} className={styles.buttonPrimary}>Editar</button>
                <button onClick={() => router.push(`/dashboard/admin/products/${product.id}`)} className={styles.buttonTertiary}>Añadir Información</button>

              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
