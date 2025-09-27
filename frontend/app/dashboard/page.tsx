"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user, token } = useAuth();

  useEffect(() => {
    // Si no hay usuario o token → redirige a login
    if (!user || !token) {
      router.push("/login");
      return;
    }

    // Si es admin → redirige a dashboard de admin
    if (user.role === "admin") {
      router.push("/dashboard/admin");
      return;
    }

    // Usuario normal se queda en esta página
  }, [user, token, router]);

  if (!user || user.role === "admin") {
    return <p className="text-center mt-10">Redirigiendo...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard Usuario</h1>
      <p>Bienvenido al panel, solo usuarios autenticados pueden ver esto.</p>
    </div>
  );
}
