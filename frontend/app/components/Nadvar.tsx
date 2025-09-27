"use client";
import Link from "next/link";
import styles from "@/styles/navbar.module.css";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Nadvar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
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

          {!user ? (
            <Link href="/login">Iniciar sesión</Link>
          ) : (
            <button onClick={handleLogout}>Cerrar sesión</button>
          )}
        </nav>
      </div>
    </header>
  );
}
