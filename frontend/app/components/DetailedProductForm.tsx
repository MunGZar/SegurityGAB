"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/admin.module.css";
import { useAuth } from "@/app/context/AuthContext";

export default function DetailedProductForm({ product, onComplete }: any) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [longDescription, setLongDescription] = useState("");
  const [model, setModel] = useState("");

  useEffect(() => {
    if (product) {
      setLongDescription(product.long_description || "");
      setModel(product.model || "");
      if (product.image) {
        setPreview(`http://localhost:3001${product.image}`);
      }
    }
  }, [product]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        long_description: longDescription,
        model: model,
      };

      await fetch(`http://localhost:3001/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      onComplete();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createProductCard}>
      <h3 className={styles.formTitle}>
        Añadir/Editar Descripción Detallada
      </h3>
      <p style={{ marginBottom: "1rem" }}>
        <strong>Producto:</strong> {product.name}
      </p>

      {preview && (
        <div className={styles.imagePreview}>
          <img src={preview} alt="Vista previa" />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="model"
          placeholder="Modelo del producto"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className={styles.input}
        />

        <textarea
          name="longDescription"
          placeholder="Descripción larga y detallada"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          required
          className={styles.textarea}
          style={{ minHeight: "200px" }}
        />

        <div className={styles.actions}>
          <button type="submit" className={styles.buttonPrimary} disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button
            type="button"
            className={styles.buttonSecondary}
            onClick={onComplete}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
