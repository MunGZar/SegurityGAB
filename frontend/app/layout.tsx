import "../styles/globals.css";
import Nadvar from "./components/Nadvar";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";

export const metadata = {
  title: "SecurityGAB",
  description: "Sistema de seguridad electrónica con carrito de compras",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-gray-100 min-h-screen antialiased">
        <AuthProvider>
          <CartProvider>
            <Nadvar />
            
            <main className="max-w-7xl mx-auto min-h-screen pt-4 pb-10">
              {children}
            </main>

            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
