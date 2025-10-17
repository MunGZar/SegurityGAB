"use client";
import { useState } from "react";
import styles from "@/styles/admin.module.css";

export default function ProductForm({
  fetchProducts,
  editingItem,
  onUpdateComplete,
}: any) {
  const [form, setForm] = useState(
    editingItem || { name: "", description: "", price: "", stock: "", image: "" }
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem
        ? `http://localhost:3001/products/${editingItem.id}`
        : "http://localhost:3001/products";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      fetchProducts();
      setForm({ name: "", description: "", price: "", stock: "", image: "" });
      if (onUpdateComplete) {
        onUpdateComplete();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!editingItem) return;
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    setLoading(true);
    try {
      await fetch(`http://localhost:3001/products/${editingItem.id}`, {
        method: "DELETE",
      });
      fetchProducts();
      if (onUpdateComplete) {
        onUpdateComplete();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.createProductCard} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>
        {editingItem ? "✏️ Editar Producto" : "➕ Crear Producto"}
      </h3>

      <input
        type="text"
        name="name"
        placeholder="Nombre del producto"
        value={form.name}
        onChange={handleChange}
        required
        className={styles.input}
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={handleChange}
        required
        className={styles.textarea}
      />
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
        required
        className={styles.input}
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        required
        className={styles.input}
      />
      <input
        type="text"
        name="image"
        placeholder="URL de la imagen"
        value={form.image}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <div className={styles.actions}>
        <button type="submit" className={styles.buttonPrimary} disabled={loading}>
          {loading ? "Guardando..." : editingItem ? "Actualizar" : "Crear"}
        </button>
        {editingItem && (
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={handleDelete}
            disabled={loading}
          >
            Eliminar
          </button>
        )}
      </div>
    </form>
  );
}
