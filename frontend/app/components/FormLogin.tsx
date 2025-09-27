"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message);
        return;
      }

      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error de conexión al backend');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Iniciar Sesión</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
        >
          Iniciar Sesión
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿No tienes cuenta? <span className="text-blue-600 cursor-pointer">Regístrate</span>
        </p>
      </div>
    </div>
  );
}
