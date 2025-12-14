import React, { useEffect, useState } from "react";
import Footer from "../organisms/Footer";
import { FaCheckCircle } from "react-icons/fa";

/* =====================
   Formatear tiempo
===================== */
const formatearTiempo = (segundos) => {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = segundos % 60;
  return `${h}h ${m}m ${s}s`;
};

/* =====================
   Card Promoción
===================== */
const OfertaCard = ({ promo, onAdd, selected, disabled, tiempoRestante }) => (
  <div
    className={`flex flex-col md:flex-row max-w-5xl mx-auto my-6 bg-white border-2 rounded-xl shadow-lg overflow-hidden
      ${selected ? "border-green-500" : "border-yellow-500"}
      ${disabled && !selected ? "opacity-50" : ""} transition-all duration-300`}
  >
    <div className="relative w-full md:w-2/5 h-64 md:h-auto flex-shrink-0">
      <img
        src={promo.imagenUrl}
        alt={promo.titulo}
        className="w-full h-full object-cover"
      />
      <span className="absolute top-4 right-4 bg-yellow-400 px-3 py-1 font-bold rounded shadow">
        {promo.descuento}
      </span>
    </div>

    <div className="flex-1 p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-2xl md:text-3xl font-semibold flex items-center gap-2 mb-2">
          {promo.titulo}
          {selected && <FaCheckCircle className="text-green-500 text-xl md:text-2xl" />}
        </h3>
        <p className="text-gray-600 mb-3 text-sm md:text-base">{promo.descripcion}</p>

        {selected && tiempoRestante > 0 ? (
          <p className="text-red-500 font-semibold mt-2 text-sm md:text-base">
            Tiempo restante: {formatearTiempo(tiempoRestante)}
          </p>
        ) : selected && tiempoRestante <= 0 ? (
          <p className="text-gray-500 font-semibold mt-2 text-sm md:text-base">Promoción expirada</p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-center sm:text-left">
          <span className="line-through text-gray-400 mr-2 text-sm md:text-base">S/ {promo.precioAnterior}</span>
          <span className="text-2xl md:text-3xl font-bold">S/ {promo.precioActual}</span>
        </div>

        <button
          disabled={disabled}
          onClick={() => onAdd(promo)}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300
            ${selected
              ? "bg-green-500 text-white cursor-not-allowed"
              : disabled
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600 text-gray-900"}`}
        >
          {selected ? "Promoción en curso" : "Pedir promoción"}
        </button>
      </div>
    </div>
  </div>
);

/* =====================
   Page Promociones
===================== */
export default function PromocionesPage() {
  const [promociones, setPromociones] = useState([]);
  const [promoElegida, setPromoElegida] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [contadorActivo, setContadorActivo] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/promociones")
      .then((res) => res.json())
      .then(setPromociones)
      .catch(console.error);

    const guardada = localStorage.getItem("promoElegida");
    if (guardada) {
      const parsed = JSON.parse(guardada);
      const ahora = Date.now();
      const fin = parsed.inicio + parsed.duracion * 1000;
      const restante = Math.max(Math.floor((fin - ahora) / 1000), 0);

      if (restante > 0) {
        setTimeout(() => {
          setPromoElegida(parsed);
          setTiempoRestante(restante);
          setContadorActivo(true);
        }, 0);
      } else {
        localStorage.removeItem("promoElegida");
      }
    }
  }, []);

  useEffect(() => {
    if (!contadorActivo) return;

    const timer = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPromoElegida(null);
          setContadorActivo(false);
          localStorage.removeItem("promoElegida");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [contadorActivo]);

  const pedirPromocion = (promo) => {
    if (contadorActivo) return;

    const mensaje = `Hola,
He elegido esta promoción:

Título: ${promo.titulo}
Descripción: ${promo.descripcion}
Precio: S/ ${promo.precioActual}
Descuento: ${promo.descuento}

Quisiera confirmar mi pedido.`;

    const whatsappUrl = `https://api.whatsapp.com/send/?phone=51914068562&text=${encodeURIComponent(mensaje)}&type=phone_number&app_absent=0`;
    const nuevaVentana = window.open(whatsappUrl, "_blank");

    if (nuevaVentana) {
      setTimeout(() => {
        nuevaVentana.close();
      }, 1000);
    }

    const data = { ...promo, inicio: Date.now() };
    localStorage.setItem("promoElegida", JSON.stringify(data));
    setTimeout(() => {
      setPromoElegida(data);
      setTiempoRestante(promo.duracion);
      setContadorActivo(true);
    }, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="pt-10 pb-16 px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-3">Promociones Especiales</h1>
        <p className="text-center text-gray-600 text-sm md:text-base mb-8">Solo una promoción por cliente</p>

        {promociones.map((promo) => (
          <OfertaCard
            key={promo._id}
            promo={promo}
            onAdd={pedirPromocion}
            selected={promoElegida?._id === promo._id}
            disabled={promoElegida && promoElegida._id !== promo._id}
            tiempoRestante={promoElegida?._id === promo._id ? tiempoRestante : null}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}
