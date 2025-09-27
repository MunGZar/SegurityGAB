"use client";
import { useState } from "react";

interface Props {
  onLogin: (user: string, pass: string) => void;
  onRegister: (user: string, email: string, pass: string) => void;
}

export default function FormLogin({ onLogin, onRegister }: Props) {
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      onRegister(user, email, pass);
      setIsRegister(false);
    } else {
      onLogin(user, pass);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-80"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
      </h2>

      <input
        type="text"
        placeholder="Usuario"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      {isRegister && (
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
      )}
      <input
        type="password"
        placeholder="Contraseña"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isRegister ? "Registrar" : "Ingresar"}
      </button>

      <p className="text-sm text-center mt-4">
        {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
        <span
          onClick={() => setIsRegister(!isRegister)}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          {isRegister ? "Inicia sesión" : "Regístrate"}
        </span>
      </p>
    </form>
  );
}
