import { CgProfile } from "react-icons/cg";
import { Menu, X, UserRound, ChevronDown } from "lucide-react"; // ← ShoppingCart eliminado
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaPizzaSlice,
  FaTags,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Cerrar menú móvil al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }
    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  // Cerrar dropdown de perfil al hacer clic fuera
  useEffect(() => {
    function handleClickOutsideProfile(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutsideProfile);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideProfile);
    }
    return () => document.removeEventListener("mousedown", handleClickOutsideProfile);
  }, [profileOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#fff7e8] z-50 shadow-lg py-4 px-6 flex justify-between items-center transition-all duration-300">

      {/* LOGO — izquierda */}
      <Link to="/" className="flex items-center gap-3">
        <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-transform duration-300 hover:scale-105">
          <img
            src="/imgs/logo.png"
            alt="logo"
            className="w-12 h-12 object-contain"
          />
        </div>
        <span className="text-xl font-bold tracking-wider text-black drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:text-yellow-600">
          OHANA
        </span>
      </Link>

      {/* MENÚ CENTRAL (DESKTOP) */}
      <ul className="hidden lg:flex items-center gap-8 text-sm font-bold text-black justify-center">
        <li className="hover:text-yellow-600 transition-all duration-200">
          <Link to="/" onClick={() => setOpenMenu(false)}>Inicio</Link>
        </li>
        <li className="hover:text-yellow-600 transition-all duration-200">
          <Link to="/menu" onClick={() => setOpenMenu(false)}>Menú</Link>
        </li>
        <li className="hover:text-yellow-600 transition-all duration-200">
          <Link to="/promociones" onClick={() => setOpenMenu(false)}>Promociones</Link>
        </li>
        <li className="hover:text-yellow-600 transition-all duration-200">
          <Link to="/sobre-nosotros" onClick={() => setOpenMenu(false)}>Sobre Nosotros</Link>
        </li>
        <li className="hover:text-yellow-600 transition-all duration-200">
          <Link to="/contacto" onClick={() => setOpenMenu(false)}>Contacto</Link>
        </li>
      </ul>

      {/* DERECHA: Login + Perfil */}
      <div className="flex items-center gap-6">

        {/* INICIAR SESIÓN */}
        <Link
          to="/iniciar-sesion"
          className="font-medium text-black hover:text-yellow-600 transition-all duration-200 hidden lg:block"
        >
          Iniciar Sesión
        </Link>

        {/* PERFIL DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-1 text-black hover:text-yellow-600 transition-all duration-200"
            aria-label="Perfil"
          >
            <CgProfile size={22} />
            <ChevronDown
              size={22}
              className={`transition-transform duration-300 ${profileOpen ? "rotate-180" : "rotate-0"
                }`}
            />
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div
              ref={profileRef}
              className="absolute right-0 mt-2 w-48 bg-white border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden z-50"
            >
              <ul className="py-2">
                <li>
                  <Link
                    to="/perfil"
                    className="block px-4 py-2 text-black hover:bg-yellow-100 font-medium transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    <UserRound size={16} className="inline-block mr-2" />
                    Mi Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-black hover:bg-yellow-100 font-medium transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    <CgProfile size={16} className="inline-block mr-2" />
                    Admin Panel
                  </Link>
                </li>
                <li className="border-t-2 border-black/10 mt-1 pt-1">
                  <button
                    onClick={() => {
                      // Aquí puedes agregar lógica de logout
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-black hover:bg-yellow-100 font-medium transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* HAMBURGUESA (solo móvil) — alineado a la derecha */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="lg:hidden w-12 h-12 flex items-center justify-center bg-white border-4 border-black rounded-full shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-all duration-300 relative"
        >
          <span
            className={`absolute transition-all duration-300 ${openMenu ? "rotate-90 opacity-0" : "opacity-100 rotate-0"
              }`}
          >
            <Menu size={28} strokeWidth={3} />
          </span>
          <span
            className={`absolute transition-all duration-300 ${openMenu ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
              }`}
          >
            <X size={28} strokeWidth={3} />
          </span>
        </button>
      </div>

      {/* MENÚ MÓVIL (igual, pero sin carrito) */}
      {openMenu && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 lg:hidden"></div>

          <div
            ref={menuRef}
            className="fixed top-0 right-0 h-full w-[78%] bg-[#fff7e8] lg:hidden border-l-4 border-black shadow-[-8px_0px_0px_0px_rgba(0,0,0,1)] flex flex-col py-8 px-6 gap-6 transition-all duration-300 animate-slideLeft z-50"
          >
            {/* Botón cerrar X */}
            <button
              onClick={() => setOpenMenu(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white border-2 border-black rounded-full shadow-md"
            >
              <X size={24} />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-13.75 h-13.75 bg-white rounded-full flex items-center justify-center border-4 border-black shadow-[5px_5px_0px_rgba(0,0,0,1)] overflow-hidden">
                <img
                  src="/imgs/logo.png"
                  alt="logo"
                  className="w-11 h-11 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-black tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                OHANA
              </span>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-6">
              <Link to="/" onClick={() => setOpenMenu(false)} className="flex items-center gap-3 text-lg font-bold hover:text-yellow-600">
                <FaHome size={22} /> Inicio
              </Link>
              <Link to="/menu" onClick={() => setOpenMenu(false)} className="flex items-center gap-3 text-lg font-bold hover:text-yellow-600">
                <FaPizzaSlice size={22} /> Menú
              </Link>
              <Link to="/promociones" onClick={() => setOpenMenu(false)} className="flex items-center gap-3 text-lg font-bold hover:text-yellow-600">
                <FaTags size={22} /> Promociones
              </Link>
              <Link to="/sobre-nosotros" onClick={() => setOpenMenu(false)} className="flex items-center gap-3 text-lg font-bold hover:text-yellow-600">
                <FaInfoCircle size={22} /> Sobre Nosotros
              </Link>
              <Link to="/contacto" onClick={() => setOpenMenu(false)} className="flex items-center gap-3 text-lg font-bold hover:text-yellow-600">
                <FaPhoneAlt size={22} /> Contacto
              </Link>
            </div>

            {/* Iniciar sesión (móvil) */}
            <Link
              to="/iniciar-sesion"
              onClick={() => setOpenMenu(false)}
              className="mt-auto flex items-center justify-center gap-3 text-lg font-bold py-3 bg-black text-white rounded-xl border-4 border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
              hover:bg-yellow-500 hover:text-black transition-all duration-300 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:scale-95"
            >
              Iniciar Sesión
            </Link>
          </div>
        </>
      )}

      {/* Línea decorativa */}
      <div className="absolute bottom-0 left-0 w-full h-0.75 bg-black"></div>
    </nav>
  );
}

export default Navbar;