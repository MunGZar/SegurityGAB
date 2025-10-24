"use client";
import React, { useState } from "react";
import styles from "@/styles/checkout.module.css";
import { useCart } from "@/app/context/CartContext";
import { FaTruck, FaShoppingBag } from "react-icons/fa"; // íconos

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [metodoEntrega, setMetodoEntrega] = useState("envio");
  const [metodoFacturacion, setMetodoFacturacion] = useState("mismo");
  const [showMore, setShowMore] = useState(false);

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.precio) * item.cantidad,
    0
  );
  const envio = 14000;
  const total = subtotal + envio;

  const handlePago = () => {
    alert("✅ Simulación de pago: Compra realizada con éxito.");
    clearCart();
  };

  return (
    <div className={styles.checkoutContainer}>
      {/* IZQUIERDA */}
      <div className={styles.checkoutForm}>
        {/* CONTACTO */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Contacto</h2>
          </div>
          <input
            type="email"
            placeholder="Email o número de teléfono móvil"
            className={styles.inputField}
          />
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Autorizo Tratamiento de datos Personales
          </label>
        </div>

        {/* ENTREGA */}
        <div className={styles.section}>
          <h2>Entrega</h2>

          <div>
            <label
              className={`${styles.billingOption} ${
                metodoEntrega === "envio" ? styles.billingOptionActive : ""
              }`}
              onClick={() => setMetodoEntrega("envio")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="radio"
                  name="entrega"
                  checked={metodoEntrega === "envio"}
                  onChange={() => setMetodoEntrega("envio")}
                />
                <span>Envío</span>
              </div>
              <FaTruck
                size={20}
                color={metodoEntrega === "envio" ? "#0070f3" : "#999"}
              />
            </label>

            <label
              className={`${styles.billingOption} ${
                metodoEntrega === "retiro" ? styles.billingOptionActive : ""
              }`}
              onClick={() => setMetodoEntrega("retiro")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="radio"
                  name="entrega"
                  checked={metodoEntrega === "retiro"}
                  onChange={() => setMetodoEntrega("retiro")}
                />
                <span>Retiro</span>
              </div>
              <FaShoppingBag
                size={20}
                color={metodoEntrega === "retiro" ? "#0070f3" : "#999"}
              />
            </label>
          </div>

          <select className={styles.inputField}>
            <option>Colombia</option>
          </select>

          <div className={styles.grid2}>
            <input className={styles.inputField} placeholder="Nombre" />
            <input className={styles.inputField} placeholder="Apellidos" />
          </div>

          <input className={styles.inputField} placeholder="Documento de Identidad" />
          <input className={styles.inputField} placeholder="Dirección" />
          <input
            className={styles.inputField}
            placeholder="Casa, apartamento, etc. (opcional)"
          />

          <div className={styles.grid3}>
            <input className={styles.inputField} placeholder="Ciudad" />
            <select className={styles.inputField}>
              <option>Putumayo</option>
            </select>
            <input
              className={styles.inputField}
              placeholder="Código postal (opcional)"
            />
          </div>

          <input className={styles.inputField} placeholder="Teléfono" />
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Guardar mi información para la próxima vez
          </label>
        </div>

        {/* MÉTODOS DE ENVÍO */}
        <div className={styles.section}>
          <h2>Métodos de envío</h2>
          <div className={`${styles.card} ${styles.cardActive}`}>
            <div className={styles.shippingMethod}>
              <div className={styles.shippingLeft}>
                <strong>Envío Nacional</strong>
                <span className={styles.shippingSubtext}>Envío asegurado</span>
              </div>
              <span>$ 14.000,00</span>
            </div>
          </div>
        </div>

        {/* MÉTODO DE PAGO */}
        <div className={styles.section}>
          <h2>Pago</h2>
          <p className={styles.subtext}>
            Todas las transacciones son seguras y están encriptadas.
          </p>

          <div className={`${styles.paymentCard} ${styles.paymentCardActive}`}>
            <div className={styles.paymentHeader}>
              <span>Wompi</span>

              <div className={styles.paymentIcons}>
                <img src="/payments/visa.png" alt="Visa" />
                <img src="/payments/mastercard.png" alt="Mastercard" />
                <img src="/payments/american express.png" alt="American Express" />

                   {/* Botón +4 desplegable */}
    <div className={`${styles.moreMethod}`}>
  <span className={styles.moreBtn}>+4 </span>

  <div className={styles.moreDropdown}>
                      <img src="/payments/nequi.png" alt="Nequi" />
                      <img src="/payments/pse.png" alt="PSE" />
                      <img src="/payments/daviplata.png" alt="Daviplata" />
                      <img src="/payments/bancolombia.png" alt="Bancolombia" />
                      <div className={styles.triangle}></div>
                    </div>
                  
                </div>
              </div>
            </div>

            <div className={styles.browserIllustration}>
              <img src="/payments/browser.png" alt="Redirección" />
            </div>
            <p className={styles.paymentDescription}>
              Después de hacer clic en <strong>“Pagar ahora”</strong>, serás
              redirigido a Wompi para completar tu compra de forma segura.
            </p>
          </div>
        </div>

        {/* DIRECCIÓN DE FACTURACIÓN */}
        <div className={styles.section}>
          <h2>Dirección de facturación</h2>

          <label
            className={`${styles.billingOption} ${
              metodoFacturacion === "mismo" ? styles.billingOptionActive : ""
            }`}
          >
            <input
              type="radio"
              name="facturacion"
              checked={metodoFacturacion === "mismo"}
              onChange={() => setMetodoFacturacion("mismo")}
            />{" "}
            La misma dirección de envío
          </label>

          <label
            className={`${styles.billingOption} ${
              metodoFacturacion === "distinta" ? styles.billingOptionActive : ""
            }`}
          >
            <input
              type="radio"
              name="facturacion"
              checked={metodoFacturacion === "distinta"}
              onChange={() => setMetodoFacturacion("distinta")}
            />{" "}
            Usar una dirección distinta
          </label>
        </div>

        {/* BOTÓN PAGO */}
        <button onClick={handlePago} className={styles.payButton}>
          Pagar ahora
        </button>

        {/* LINKS */}
        <div className={styles.footerLinks}>
          <a>Política de reembolso</a>
          <a>Envío</a>
          <a>Política de privacidad</a>
          <a>Términos del servicio</a>
          <a>Contacto</a>
        </div>
      </div>

      {/* DERECHA */}
      <div className={styles.checkoutSummary}>
        {cart.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.modelo} className={styles.cartItem}>
                <img src={item.imagen} alt={item.modelo} />
                <div>
                  <h4>{item.modelo}</h4>
                  <p>{item.descripcion}</p>
                </div>
                <span>
                  ${item.precio.toLocaleString("es-CO")} x {item.cantidad}
                </span>
              </div>
            ))}

            <div className={styles.totalBox}>
              <div>
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString("es-CO")}</span>
              </div>
              <div>
                <span>Envío</span>
                <span>${envio.toLocaleString("es-CO")}</span>
              </div>
              <hr />
              <div className={styles.total}>
                <strong>Total</strong>
                <strong>COP ${total.toLocaleString("es-CO")}</strong>
              </div>
              <p className={styles.impuesto}>
                Incluye $
                {Math.round(total * 0.16).toLocaleString("es-CO")} de impuestos
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
