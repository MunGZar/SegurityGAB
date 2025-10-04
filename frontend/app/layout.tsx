
import "../styles/globals.css";
import Nadvar from "./components/Nadvar";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "SecurityGAB",
  description: "Sistema de seguridad electrónica con carrito de compras",
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <AuthProvider>
          <CartProvider>
                
            <Nadvar />
            <main className="max-w-7xl mx-auto">{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
