import Navbar from '@/components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head />
      <body>

        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
