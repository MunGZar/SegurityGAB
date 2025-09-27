
import Nadvar from "./components/Nadvar";
import { AuthProvider } from "./context/AuthContext";
import "../styles/globals.css";
export const metadata = {
  title: "SecurityGab",
  description: "Sistema de seguridad electrónica",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <AuthProvider>
          <Nadvar />
          <main className="max-w-7xl mx-auto">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
