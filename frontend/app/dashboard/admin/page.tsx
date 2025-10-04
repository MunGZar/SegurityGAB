"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "@/styles/admin.module.css";

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

interface UserFormState {
  name: string;
  email: string;
  role: "user" | "admin";
}

interface ProductFormState {
  name: string;
  description: string;
  price: string;
  image: string;
}

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [items, setItems] = useState<UserItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);

  const [formUser, setFormUser] = useState<UserFormState>({
    name: "",
    email: "",
    role: "user",
  });
  const [formProduct, setFormProduct] = useState<ProductFormState>({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const router = useRouter();

  // 🔹 Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw  Error("Error fetching users");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3001/admin/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error fetching products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Cargar datos
  useEffect(() => {
    if (token) {
      fetchUsers();
      fetchProducts();
    }
  }, [token]);

  // 🔹 Handlers Users
  const handleUserChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!token) return;
      if (editingUserId !== null) {
        await fetch(`http://localhost:3001/admin/users/${editingUserId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(formUser),
        });
      } else {
        await fetch("http://localhost:3001/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(formUser),
        });
      }
      setFormUser({ name: "", email: "", role: "user" });
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUserEdit = (item: UserItem) => {
    setFormUser({ name: item.name, email: item.email, role: item.role });
    setEditingUserId(item.id);
  };

  const handleUserDelete = async (id: number) => {
    if (!token) return;
    if (confirm("¿Deseas eliminar este usuario?")) {
      try {
        await fetch(`http://localhost:3001/admin/users/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // 🔹 Handlers Products
  const handleProductChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormProduct({ ...formProduct, [e.target.name]: e.target.value });
  };

  const handleProductSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!token) return;
      if (editingProductId !== null) {
        await fetch(`http://localhost:3001/admin/products/${editingProductId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ ...formProduct, price: Number(formProduct.price) }),
        });
      } else {
        await fetch("http://localhost:3001/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ ...formProduct, price: Number(formProduct.price) }),
        });
      }
      setFormProduct({ name: "", description: "", price: "", image: "" });
      setEditingProductId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleProductEdit = (item: ProductItem) => {
    setFormProduct({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      image: item.image,
    });
    setEditingProductId(item.id);
  };

  const handleProductDelete = async (id: number) => {
    if (!token) return;
    if (confirm("¿Deseas eliminar este producto?")) {
      try {
        await fetch(`http://localhost:3001/admin/products/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!user || user.role !== "admin")
    return <p className="text-red-500 text-center mt-10">No autorizado</p>;

  return (
    <div className={styles.container}>
      <br />
      <br />
      <br />
      <h1 className={styles.title}>Panel de Administración</h1>

      {/* 🔹 Usuarios */}
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Gestión de Usuarios</h2>
        <form className={styles.form} onSubmit={handleUserSubmit}>
          <input name="name" placeholder="Nombre" value={formUser.name} onChange={handleUserChange} required />
          <input name="email" placeholder="Email" value={formUser.email} onChange={handleUserChange} required />
          <select name="role" value={formUser.role} onChange={handleUserChange}>
            <option value="user">Usuario</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">{editingUserId ? "Actualizar" : "Crear"}</button>
        </form>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td><td>{item.email}</td><td>{item.role}</td>
                <td>
                  <button className={styles.edit} onClick={() => handleUserEdit(item)}>Editar</button>
                  <button className={styles.delete} onClick={() => handleUserDelete(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 🔹 Productos */}
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Gestión de Productos</h2>
        <form className={styles.form} onSubmit={handleProductSubmit}>
          <input name="name" placeholder="Nombre del producto" value={formProduct.name} onChange={handleProductChange} required />
          <textarea name="description" placeholder="Descripción" value={formProduct.description} onChange={handleProductChange} required />
          <input type="number" name="price" placeholder="Precio" value={formProduct.price} onChange={handleProductChange} required />
          <input name="image" placeholder="URL de la Imagen" value={formProduct.image} onChange={handleProductChange} required />
          <button type="submit">{editingProductId ? "Actualizar" : "Crear"}</button>
        </form>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span>${product.price}</span>
              <div className={styles.actions}>
                <button className={styles.edit} onClick={() => handleProductEdit(product)}>Editar</button>
                <button className={styles.delete} onClick={() => handleProductDelete(product.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
 
