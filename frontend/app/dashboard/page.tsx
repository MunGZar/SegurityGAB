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
      router.push("/page");
      return;
    }

    // Si es admin → redirige a dashboard de admin
    if (user.role === "admin") {
      router.push("/admin");
      return;
    }

    // Usuario normal → redirige a la página principal de productos
    if (user.role === "user") {
      router.push("/productos");
      return;
    }
  }, [user, token, router]);

  if (!user || user.role === "admin" || user.role === "user") {
    return <p className="text-center mt-10">Redirigiendo...</p>;
  }
}
