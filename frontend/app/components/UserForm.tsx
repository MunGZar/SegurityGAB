"use client";
import { useState } from "react";
import styles from "@/styles/admin.module.css";

export default function UserForm({ fetchUsers, editingItem }: any) {
  const [form, setForm] = useState(
    editingItem || { name: "", email: "", password: "", role: "user" }
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
        ? `http://localhost:3001/admin/users/${editingItem.id}`
        : "http://localhost:3001/admin/users";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      fetchUsers();
      setForm({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!editingItem) return;
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;
    setLoading(true);
    try {
      await fetch(`http://localhost:3001/admin/users/${editingItem.id}`, {
        method: "DELETE",
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.createUserCard} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>
        {editingItem ? "✏️ Editar Usuario" : "➕ Crear Usuario"}
      </h3>

      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        required
        className={styles.input}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
        className={styles.input}
      />
      {!editingItem && (
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
          className={styles.input}
        />
      )}
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>

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
