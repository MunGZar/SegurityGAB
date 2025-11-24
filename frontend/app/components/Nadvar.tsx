"use client"

import { LogOut, User, ShoppingCart } from "lucide-react"
import Link from "next/link"
import styles from "@/styles/navbar.module.css"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Cart from "./Cart"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const handleProfileClick = () => {
    if (!user) return

    switch (user.role) {
      case "admin":
        router.push("/dashboard/admin") // Ruta para admin
        break
      case "user":
        router.push("/dashboard/user") // Ruta para usuario estándar
        break
      default:
        router.push("/perfil") // Ruta genérica por defecto
        break
    }
  }

  const handleSearch = () => {
    router.push(`/?search=${searchTerm}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="Logo" />
        </Link>

        <div className={styles.search}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>

        <nav className={styles.nav}>
          <Link href="/">Inicio</Link>


          <button
            className={`${styles.navLink} ${styles.cart}`}
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={20} />
            <span className={styles.badge}>{cart.length}</span>
            Mi Carrito
          </button>

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

             
                <button
                  onClick={handleProfileClick}
                  className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
                >
                  Perfil
                </button>


                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm flex items-center gap-2"
                >
                  <LogOut size={16} /> Salir
                </button>
              </>
            )}
          </div>
        </nav>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}
