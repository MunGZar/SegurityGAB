"use client"

import { LogOut, User, ShoppingCart } from "lucide-react"
import Link from "next/link"
import styles from "@/styles/navbar.module.css"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useState } from "react"
import Cart from "./Cart" 

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

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
                <span className="text-sm">
                  {user.name} ({user.role})
                </span>
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
