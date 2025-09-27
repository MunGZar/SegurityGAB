"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

interface UserItem {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface FormState {
  name: string;
  email: string;
  role: "user" | "admin";
}

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [items, setItems] = useState<UserItem[]>([]);
  const [form, setForm] = useState<FormState>({ name: "", email: "", role: "user" });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Cargar datos al iniciar
  useEffect(() => {
    if (token) fetchItems();
  }, [token]);

  const router = useRouter();
  
  const fetchItems = async () => {
    try {
      const res = await fetch("http://localhost:3001/admin/items", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error fetching data');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!token) return;

      if (editingId !== null) {
        await fetch(`http://localhost:3001/admin/items/${editingId}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("http://localhost:3001/admin/items", {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify(form),
        });
      }

      setForm({ name: "", email: "", role: "user" });
      setEditingId(null);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item: UserItem) => {
    setForm({ name: item.name, email: item.email, role: item.role });
    setEditingId(item.id);
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (confirm("¿Deseas eliminar este registro?")) {
      try {
        await fetch(`http://localhost:3001/admin/items/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        fetchItems();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!user || user.role !== "admin")
    return <p className="text-red-500 text-center mt-10">No autorizado</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Admin</h1>

      {/* Formulario CRUD */}
      <div className="mb-6 p-4 border rounded shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Actualizar Usuario" : "Crear Usuario"}
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="user">Usuario</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {editingId ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>

      {/* Tabla de registros */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Nombre</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Rol</th>
              <th className="p-3 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="p-3 border">{item.name}</td>
                <td className="p-3 border">{item.email}</td>
                <td className="p-3 border">{item.role}</td>
                <td className="p-3 border flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
