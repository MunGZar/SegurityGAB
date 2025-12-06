"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { user, token } = useAuth();

  useEffect(() => {
   
    if (!user || !token) {
      router.push("/login");
      return;
    }

    
    if (user.role === "admin") {
      router.push("/dashboard/admin");
      return;
    }

   
    if (user.role === "user") {
      router.push("/dashboard/user");
      return;
    }
  }, [user, token, router]);

  if (!user || user.role === "admin" || user.role === "user") {
    return <p className="text-center mt-10">Redirigiendo...</p>;
  }
}
