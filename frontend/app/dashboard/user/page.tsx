"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import styles from "@/styles/userDashboard.module.css";

interface Order {
  id: number;
  date: string;
  status: string;
  total: number;
}

interface WishlistItem {
  id: number;
  name: string;
  image: string;
  price: number;
}

export default function UserDashboard() {
  const { user, token } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !user || user.role !== "user") {
      router.push("/login");
    } else {
      fetchOrders();
      fetchWishlist();
    }
  }, [token, user, router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al obtener pedidos");
      const data = await res.json();
      setOrders(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await fetch("http://localhost:3001/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al obtener lista de deseos");
      const data = await res.json();
      setWishlist(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!user || user.role !== "user") {
    return <p className={styles.notAuthorized}>No autorizado</p>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.userInfo}>
          <img src="/default-avatar.png" alt="Avatar" className={styles.avatar} />
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
        <nav>
          <ul>
            <li><a href="#resumen">Resumen</a></li>
            <li><a href="#perfil">Mi perfil</a></li>
            <li><a href="#pedidos">Mis pedidos</a></li>
            <li><a href="#deseos">Lista de deseos</a></li>
            <li><a href="/logout">Cerrar sesión</a></li>
          </ul>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        {/* --- SECCIÓN RESUMEN --- */}
        <section id="resumen" className={styles.section}>
          <h2>👋 Hola, {user.name}</h2>
          <p>Este es tu panel personal. Aquí puedes ver tus pedidos, editar tu perfil y más.</p>

          <div className={styles.cardsContainer}>
            <div className={styles.card}>
              <h3>Pedidos totales</h3>
              <p>{orders.length}</p>
            </div>
            <div className={styles.card}>
              <h3>Último pedido</h3>
              <p>{orders[0] ? `#${orders[0].id} - ${orders[0].status}` : "Sin pedidos"}</p>
            </div>
            <div className={styles.card}>
              <h3>Productos guardados</h3>
              <p>{wishlist.length}</p>
            </div>
          </div>
        </section>

        {/* --- SECCIÓN PERFIL --- */}
        <section id="perfil" className={styles.section}>
          <h2>Mi perfil</h2>
          <div className={styles.profileBox}>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo:</strong> {user.email}</p>
            <button className={styles.buttonPrimary}>Editar perfil</button>
          </div>
        </section>

        {/* --- SECCIÓN PEDIDOS --- */}
        <section id="pedidos" className={styles.section}>
          <h2>Mis pedidos</h2>
          {loading && <p>Cargando pedidos...</p>}
          {error && <p className={styles.error}>{error}</p>}
          {orders.length === 0 ? (
            <p>No tienes pedidos aún.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr><th>ID</th><th>Fecha</th><th>Estado</th><th>Total</th></tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.status}</td>
                    <td>${order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* --- SECCIÓN LISTA DE DESEOS --- */}
        <section id="deseos" className={styles.section}>
          <h2>Lista de deseos</h2>
          <div className={styles.wishlistGrid}>
            {wishlist.length === 0 ? (
              <p>No tienes productos guardados.</p>
            ) : (
              wishlist.map((item) => (
                <div key={item.id} className={styles.wishlistItem}>
                  <img src={`http://localhost:3001${item.image}`} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <button className={styles.buttonPrimary}>Añadir al carrito</button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
