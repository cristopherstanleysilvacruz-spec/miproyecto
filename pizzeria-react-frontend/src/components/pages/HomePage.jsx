import { useNavigate, useLocation } from 'react-router-dom'; 
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { useEffect, useState } from 'react';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showWhatsApp, setShowWhatsApp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowWhatsApp(false);
      } else {
        setShowWhatsApp(true);
      }

  
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, location.pathname]);

  return (
    <main className="w-full bg-white flex flex-col min-h-screen">

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-left order-2 md:order-1">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6">
            Las Mejores Pizzas Artesanales de la Ciudad
          </h2>
          <p className="text-lg md:text-xl text-gray-800 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Preparadas con ingredientes frescos, amor familiar y tradición italiana en cada bocado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
            <button
              onClick={() => navigate('/menu')}
              className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-yellow-500 transition-all"
            >
              Ver Menú
            </button>
            <button
              onClick={() => navigate('/promociones')}
              className="px-6 py-3 bg-white border-2 border-black text-black rounded-xl font-semibold hover:bg-yellow-500 transition-all"
            >
              Ver Ofertas
            </button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full shadow-xl border-4 border-black overflow-hidden bg-gray-100">
            <img
              src="/imgs/logo.png"
              alt="Pizza Ohana"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* BOTÓN WHATSAPP (YA USA showWhatsApp) */}
      {showWhatsApp && (
        <a
          href="https://wa.me/51910151588"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaWhatsapp size={28} />
        </a>
      )}

      {/* FOOTER */}
      <footer className="bg-black text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Pizzería Ohana</h3>
            <p className="text-gray-300 text-sm">Pizzas artesanales con sabor auténtico y fresco.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Contacto</h3>
            <p className="text-gray-300 text-sm">Tel: +51 910 151 588</p>
          </div>
          <div className="flex items-center gap-4">
            <FaFacebook />
            <FaInstagram />
            <FaTiktok />
          </div>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;
