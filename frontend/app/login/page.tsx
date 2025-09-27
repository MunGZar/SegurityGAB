"use client";
import { useRouter } from "next/navigation";
import FormLogin from "../components/FormLogin";

export default function LoginPage() {
  const router = useRouter();

  // Login con backend NestJS
  const handleLogin = async (email: string, pass: string) => {
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        router.push("/dashboard");
      } else {
        alert(data.message || "Correo o contraseña incorrectos");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor");
    }
  };

  // Registro (endpoint pendiente)
  const handleRegister = async (user: string, email: string, pass: string) => {
    alert(`Función de registro pendiente para ${user} (${email})`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <FormLogin />
    </div>
  );
}
