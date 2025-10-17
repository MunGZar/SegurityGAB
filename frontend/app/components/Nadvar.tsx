"use client";

import { LogOut, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/styles/navbar.module.css";
import { useAuth } from "../context/AuthContext";
import Cart from "./Cart";
import { link } from "fs";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();          // Cierra la sesión
    router.push("/");  // Redirige al inicio
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="Logo" />
        </Link>

        <div className={styles.search}>
          <input type="text" placeholder="Buscar..." />
          <button>Buscar</button>
        </div>

        <nav className={styles.nav}>
          <Link href="/">Inicio</Link>
          <Link href="/productos">Productos</Link>
          <Link href="/carrito">Mi carrito</Link>

          <div className="flex items-center space-x-4">
            {!user ? (
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center gap-2"
              >
                <User size={20} /> Iniciar Sesión
              </Link>
            ) : (
              <>
                <span className="text-sm">
                  {user.email} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm flex items-center gap-2"
                >
                  <LogOut size={16} /> Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </nav>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
