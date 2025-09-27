import "../styles/globals.css";
import Nadvar from "./components/Nadvar";

export const metadata = {
  title: "SegurityGab",
  description: "App de seguridad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Nadvar />
        <main>{children}</main>
      </body>
    </html>
  );
}
