import React from 'react';
import styles from '../../styles/footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3>Sobre Nosotros</h3>
                    <p>Somos una empresa dedicada a la venta de componentes y accesorios de alta calidad para entusiastas de la tecnología.</p>
                </div>
                <div className={styles.column}>
                    <h3>Navegación</h3>
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/login">Mi Cuenta</a></li>
                        <li><a href="/contacto">Contacto</a></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h3>Contacto</h3>
                    <p>Email: info@seguritygab.com</p>
                    <p>Teléfono: +123 456 7890</p>
                </div>
                <div className={styles.column}>
                    <h3>Síguenos</h3>
                    <ul>
                        <li><a href="#" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="#" target="_blank" rel="noopener noreferrer">X</a></li>
                        <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} SegurityGAB. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
