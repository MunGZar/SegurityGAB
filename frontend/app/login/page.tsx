"use client";
import { useRouter } from "next/navigation";
import FormLogin from "../components/FormLogin";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (user: string, pass: string) => {
    if (user === "admin" && pass === "1234") {
      router.push("/dashboard");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const handleRegister = (user: string, email: string, pass: string) => {
    alert(`Cuenta creada para ${user} con correo ${email}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <FormLogin onLogin={handleLogin} onRegister={handleRegister} />
    </div>
  );
}
