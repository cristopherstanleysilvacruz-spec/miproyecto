import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="w-full bg-white flex flex-col min-h-screen">
      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-left order-2 md:order-1">
          <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-500 mb-6">
            Las Mejores Pizzas{" "}
            <span className="text-black">Artesanales de la Ciudad</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-800 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Preparadas con ingredientes frescos, amor familiar y tradición
            italiana en cada bocado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
            <button
              onClick={() => navigate("/menu")}
              className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-yellow-500 transition-all"
            >
              Ver Menú
            </button>
            <button
              onClick={() => navigate("/promociones")}
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

      {/* FOOTER */}
      <footer className="bg-black text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
            <h3 className="text-xl font-bold mb-2 text-yellow-500">
              Pizzería Ohana
            </h3>
            <p className="text-gray-300 text-sm">
              Pizzas artesanales con sabor auténtico y fresco.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2 text-yellow-500">Contacto</h3>
            <p className="text-gray-300 text-sm">Tel: +51 910 151 588</p>
          </div>

          <div className="flex justify-center md:justify-end gap-6">
            <a
              href="https://www.facebook.com/share/17kzjs83wg/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-yellow-500 transform hover:scale-110 transition-all"
            >
              <FaFacebook />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-yellow-500 transform hover:scale-110 transition-all"
            >
              <FaInstagram />
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-yellow-500 transform hover:scale-110 transition-all"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        <hr className="my-8 border-gray-700 max-w-7xl mx-auto" />

        <div className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Pizzería Ohana. Todos los derechos
          reservados.
        </div>
      </footer>
    </main>
  );
}

export default HomePage;
