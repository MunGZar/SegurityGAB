"use client";
import Link from "next/link";
import styles from "@/styles/checkout.module.css";

export default function CheckoutPage() {
  return (
    <div className={styles.checkout}>
      <h1>✅ ¡Gracias por tu compra!</h1>
      <p>Tu pedido ha sido procesado con éxito.</p>
      <p>Pronto recibirás un correo con los detalles.</p>

      <Link href="/" className={styles.homeBtn}>
        Volver al inicio
      </Link>
    </div>
  );
}
