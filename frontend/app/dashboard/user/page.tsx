"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

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

export default function DashboardModern() {
  const { user, token, loading, logout, updateUser } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Esperar a que AuthContext cargue
  useEffect(() => {
    if (!loading) {
      if (!token) {
        router.push("/login");
      } else {
        loadUserData();
        fetchOrders();
        fetchWishlist();
      }
    }
  }, [loading, token]);

  // Cargar datos del usuario desde backend
  const loadUserData = async () => {
    try {
      const res = await fetch("http://localhost:3001/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        logout();
        router.push("/login");
        return;
      }

      const data = await res.json();
      updateUser({ name: data.name, email: data.email, role: data.role });
    } catch (err) {
      logout();
      router.push("/login");
    }
  };

  // Traer pedidos
  const fetchOrders = async () => {
    if (!token) return;
    setLoadingOrders(true);
    try {
      const res = await fetch("http://localhost:3001/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener pedidos");
      const data = await res.json();
      setOrders(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Traer lista de deseos
  const fetchWishlist = async () => {
    if (!token) return;
    setLoadingWishlist(true);
    try {
      const res = await fetch("http://localhost:3001/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener lista de deseos");
      const data = await res.json();
      setWishlist(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingWishlist(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-slate-600 text-lg">Cargando sesión...</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-600">Usuario no autorizado</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Topbar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                aria-label="Toggle sidebar"
                onClick={() => setSidebarOpen((s) => !s)}
                className="p-2 rounded-md hover:bg-slate-100"
              >
                <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <div className="font-semibold text-lg">SecurityGAB</div>
                <span className="text-sm text-slate-500 hidden sm:inline">Panel de usuario</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center bg-slate-100 rounded-md px-3 py-2 gap-2">
                <input className="bg-transparent outline-none text-sm" placeholder="Buscar cámaras, accesorios..." />
              </div>
              <div className="flex items-center gap-3">
                <button className="text-sm text-slate-600 hover:text-slate-900">Inicio</button>
                <button className="text-sm text-slate-600 hover:text-slate-900">Mi carrito</button>
                <div className="flex items-center gap-2">
                  <img src="/default-avatar.png" alt="avatar" className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                  <span className="text-sm hidden sm:inline">{user.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "col-span-3 xl:col-span-2" : "hidden md:block col-span-2"} bg-white rounded-2xl p-5 shadow-sm border border-slate-100 h-fit`}>
          <div className="flex flex-col items-center text-center gap-3">
            <img src="/default-avatar.png" alt="avatar" className="w-20 h-20 rounded-full border-2 border-slate-100 object-cover" />
            <div>
              <div className="font-semibold">{user.name || "Usuario"}</div>
              <div className="text-sm text-slate-500">{user.email}</div>
            </div>
          </div>
          <nav className="mt-6">
            <ul className="space-y-2">
              <li><a href="#resumen" className="block px-3 py-2 rounded-md hover:bg-slate-50">Resumen</a></li>
              <li><a href="#perfil" className="block px-3 py-2 rounded-md hover:bg-slate-50">Mi perfil</a></li>
              <li><a href="#pedidos" className="block px-3 py-2 rounded-md hover:bg-slate-50">Mis pedidos</a></li>
              <li><a href="#deseos" className="block px-3 py-2 rounded-md hover:bg-slate-50">Lista de deseos</a></li>
              <li><button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50">Cerrar sesión</button></li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="col-span-12 md:col-span-9 xl:col-span-10 space-y-6">
          {/* Resumen */}
          <section id="resumen" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h1 className="text-2xl font-semibold">Hola, {user.name || "Usuario"} 👋</h1>
            <p className="text-slate-500 mt-1">Este es tu resumen rápido.</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-indigo-50 rounded-lg">
                <div className="text-sm text-slate-500">Pedidos totales</div>
                <div className="text-2xl font-semibold mt-1">{orders.length}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-500">Último pedido</div>
                <div className="text-2xl font-semibold mt-1">{orders[0] ? `#${orders[0].id}` : "Sin pedidos"}</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-500">Productos guardados</div>
                <div className="text-2xl font-semibold mt-1">{wishlist.length}</div>
              </div>
            </div>
          </section>

          {/* Perfil */}
          <section id="perfil" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-semibold">Mi perfil</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-50">
                <div className="text-sm text-slate-500">Nombre</div>
                <div className="font-medium mt-1">{user.name}</div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <div className="text-sm text-slate-500">Correo</div>
                <div className="font-medium mt-1">{user.email}</div>
              </div>
            </div>
            <button
              onClick={() => router.push("/dashboard/edit")}
              className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
            >
              Editar perfil
            </button>
          </section>

          {/* Pedidos */}
          <section id="pedidos" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Mis pedidos</h2>
              <div className="text-sm text-slate-500">{loadingOrders ? "Cargando..." : "Últimos 10 pedidos"}</div>
            </div>

            {error && <div className="mt-4 text-red-600">{error}</div>}

            {orders.length === 0 ? (
              <div className="mt-6 text-slate-500">No tienes pedidos aún.</div>
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm table-auto">
                  <thead className="text-slate-600 text-left">
                    <tr>
                      <th className="pb-3">ID</th>
                      <th className="pb-3">Fecha</th>
                      <th className="pb-3">Estado</th>
                      <th className="pb-3">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.slice(0, 10).map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50">
                        <td className="py-3">#{o.id}</td>
                        <td className="py-3">{o.date}</td>
                        <td className="py-3">{o.status}</td>
                        <td className="py-3 font-medium">${o.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Lista de deseos */}
          <section id="deseos" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Lista de deseos</h2>
              <div className="text-sm text-slate-500">Productos guardados: {wishlist.length}</div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlist.length === 0 ? (
                <div className="text-slate-500">No tienes productos guardados.</div>
              ) : (
                wishlist.map((item) => (
                  <article key={item.id} className="rounded-lg bg-slate-50 overflow-hidden shadow-sm">
                    <div className="h-44 bg-gradient-to-b from-slate-100 to-white">
                      <img
                        src={`http://localhost:3001${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-slate-700 font-semibold">${item.price}</div>
                        <button className="text-xs px-3 py-1 rounded-md bg-indigo-600 text-white">Añadir</button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
