"use client";
import { useState, useEffect } from "react";
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (editingItem && editingItem.image) {
      setPreview(`http://localhost:3001${editingItem.image}`);
    }
  }, [editingItem]);

  const handleChange = (e: any) => {
    if (e.target.name === "imageFile") {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = form.image;

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadRes = await fetch("http://localhost:3001/products/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Error al subir la imagen");
        }

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.path;
      }

      const productData = { ...form, image: imageUrl };

      const method = editingItem ? "PUT" : "POST";
      const url = editingItem
        ? `http://localhost:3001/products/${editingItem.id}`
        : "http://localhost:3001/products";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      fetchProducts();
      setForm({ name: "", description: "", price: "", stock: "", image: "" });
      setSelectedFile(null);
      setPreview(null);
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

      {preview && (
        <div className={styles.imagePreview}>
          <img src={preview} alt="Vista previa" />
        </div>
      )}
      <label htmlFor="imageFile" className={styles.fileLabel}>
        Seleccionar Imagen
      </label>
      <input
        type="file"
        id="imageFile"
        name="imageFile"
        onChange={handleChange}
        className={styles.fileInput}
      />

      <div className={styles.actions}>
        <button type="submit" className={styles.buttonPrimary} disabled={loading}>
          {loading ? "Guardando..." : editingItem ? "Actualizar" : "Crear"}
        </button>
        {editingItem && (
          <>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={handleDelete}
              disabled={loading}
            >
              Eliminar
            </button>
            <button
              type="button"
              className={styles.buttonSecondary}
              onClick={onUpdateComplete}
              disabled={loading}
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </form>
  );
}