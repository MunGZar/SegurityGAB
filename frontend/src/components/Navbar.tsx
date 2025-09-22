import Link from 'next/link'
import styles from '@/styles/navbar.module.css'

export default function Navbar() {
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
                    <Link href="/perfil">Perfil</Link>
                </nav>
            </div>
        </header>
    )
}
