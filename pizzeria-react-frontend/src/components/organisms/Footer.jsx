import React from "react";
import { Link } from "react-router-dom";

// ICONOS
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
        {/* INFORMACIÓN */}
        <div className="w-full sm:w-auto flex-1 min-w-45">
          <h4 className="text-lg font-bold text-yellow-500 mb-4">
            Información
          </h4>

          <p className="mb-2 text-gray-300 flex items-center gap-2">
            <FaMapMarkerAlt className="text-yellow-500" />
            Jr. Ayacucho 399, Celendín, Perú.
          </p>

          <p className="mb-2 text-gray-300 flex items-center gap-2">
            <FaPhoneAlt className="text-yellow-500" />
            +51 910 151 588
          </p>

          <p className="mb-2 text-gray-300 flex items-center gap-2">
            <FaWhatsapp className="text-yellow-500" />
            <a
              href="https://wa.me/51910151588?text=Hola%20Pizzería%20Ohana,%20quisiera%20más%20información%20sobre%20sus%20pizzas."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              WhatsApp: +51 910 151 588
            </a>
          </p>
        </div>

        {/* LINKS RÁPIDOS */}
        <div className="w-full sm:w-auto flex-1 min-w-45">
          <h4 className="text-lg font-bold text-yellow-500 mb-4">
            Links Rápidos
          </h4>

          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-300 hover:text-white">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/menu" className="text-gray-300 hover:text-white">
                Menú
              </Link>
            </li>
            <li>
              <Link
                to="/promociones"
                className="text-gray-300 hover:text-white"
              >
                Promociones
              </Link>
            </li>
            <li>
              <Link
                to="/sobre-nosotros"
                className="text-gray-300 hover:text-white"
              >
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="text-gray-300 hover:text-white">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* REDES SOCIALES */}
        <div className="w-full sm:w-auto min-w-45">
          <h4 className="text-lg font-bold text-yellow-500 mb-4">Síguenos</h4>

          <div className="flex space-x-4 text-2xl">
            <a
              href="https://www.facebook.com/share/17kzjs83wg/"
              className="text-white hover:text-yellow-500"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com"
              className="text-white hover:text-yellow-500"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://tiktok.com/@ohanapizza"
              className="text-white hover:text-yellow-500"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-700 max-w-7xl mx-auto" />

      <div className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Pizzería Ohana. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}

export default Footer;
