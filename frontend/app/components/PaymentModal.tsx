"use client";
import React from "react";
import Image from "next/image";
import styles from "@/styles/checkout.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  method: string;
  amount: number;
  reference?: string;
  qrSrc?: string; // ruta de la imagen qr en /public
};

export default function PaymentModal({ open, onClose, method, amount, reference, qrSrc }: Props) {
  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Cerrar">✖</button>

        <div className={styles.modalHeader}>
          <h3>Pagar con {method}</h3>
          <p>Monto: <strong>${amount.toLocaleString("es-CO")}</strong></p>
        </div>

        <div className={styles.modalBody}>
          {qrSrc ? (
            <div className={styles.qrWrapper}>
              <Image src={qrSrc} alt={`${method} QR`} width={260} height={260} />
              <p className={styles.qrHint}>Escanea el QR con tu app de {method}</p>
            </div>
          ) : (
            <p>No hay QR disponible para este método.</p>
          )}

          {reference && (
            <div className={styles.referenceBox}>
              <label>Referencia / Cuenta:</label>
              <div className={styles.referenceText}>{reference}</div>
            </div>
          )}

          <p className={styles.modalNote}>
            Después de realizar el pago, presiona <strong>He pagado</strong> para confirmar.
          </p>

          <div className={styles.modalActions}>
            <button className={styles.confirmButton} onClick={() => { alert("Pago registrado. Pendiente de verificación."); onClose(); }}>
              He pagado
            </button>
            <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
