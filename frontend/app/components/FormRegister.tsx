"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (msg) setMsg(null);
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      return setMsg({ type: "error", text: "Todos los campos son obligatorios" });
    }

    if (password !== confirmPassword) {
      return setMsg({ type: "error", text: "Las contraseñas no coinciden" });
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg({ type: "error", text: data.message || "Error al registrar usuario" });
        setLoading(false);
        return;
      }

      setMsg({ type: "success", text: "Registro exitoso. Redirigiendo..." });

      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "Error de conexión con el servidor" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center">
      <img src="/logo2.png" alt="Logo" height={60} width={60} className="mb-2" />

      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        Crear Cuenta
      </h2>

      {msg && (
        <p
          className={`mb-4 text-center font-semibold ${
            msg.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {msg.text}
        </p>
      )}

      <input
        type="text"
        name="name"
        placeholder="Nombre completo"
        value={form.name}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirmar contraseña"
        value={form.confirmPassword}
        onChange={handleChange}
        className="w-full mb-6 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-700 hover:bg-blue-800"
        }`}
      >
        {loading ? "Registrando..." : "Registrarme"}
      </button>

      <div className="mt-4">
        <a href="/login" className="text-blue-700 hover:underline">
          ¿Ya tienes una cuenta? Inicia sesión
        </a>
      </div>
    </div>
  );
}
