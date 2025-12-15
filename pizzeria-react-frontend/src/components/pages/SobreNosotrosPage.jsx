import Footer from "../organisms/Footer";
import { FaLeaf, FaHandHoldingHeart, FaUsers, FaRecycle } from "react-icons/fa";

export default function SobreNosotrosPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      {/* HERO — ahora con sombra más definida para destacar sobre fondo blanco */}
      <section className="py-16 px-4 sm:px-6 md:px-8 text-center bg-linear-to-r from-amber-50 to-amber-100 shadow-sm">
        <h1 className="text-3xl md:text-5xl font-extrabold text-black mb-3">
          Sobre <span className="text-yellow-500">Nosotros</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed">
          Donde cada pizza cuenta una historia de familia, tradición y sabor
          auténtico.
        </p>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 px-4 sm:px-6 md:px-8 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* 🔷 SECCIÓN 1: NUESTRA HISTORIA */}
          <section className="bg-white rounded-3xl shadow-sm border-2 border-amber-500 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="w-full max-w-lg shrink-0">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Nuestra Historia
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Pizzería Ohana nace en Celendín como un emprendimiento
                    familiar inspirado en un valor fundamental: la familia.
                  </p>
                  <p>
                    La palabra Ohana significa <em>familia</em>, y representa la
                    unión, el cariño y la importancia de compartir momentos
                    juntos. Desde nuestros inicios, hemos buscado ofrecer pizzas
                    artesanales elaboradas con dedicación, ingredientes frescos
                    y recetas tradicionales, creando un espacio donde amigos y
                    familias se reúnen para disfrutar no solo de una buena
                    pizza, sino también de una experiencia cálida y cercana.
                  </p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                  <div className="absolute inset-0 rounded-full border-4 border-amber-500 shadow-lg overflow-hidden">
                    <img
                      src="/imgs/ohana_historia.png"
                      alt="El inicio de nuestra historia"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 🔷 SECCIÓN 2: PASIÓN POR EL SABOR */}
          <section className="bg-white rounded-3xl shadow-sm border-2 border-amber-500 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="w-full max-w-lg shrink-0">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Pasión por el Sabor
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    En Pizzería Ohana, la pasión por el sabor se refleja en cada
                    detalle.
                  </p>
                  <p>
                    Cada pizza es elaborada con ingredientes cuidadosamente
                    seleccionados, masas preparadas al momento y una atención
                    especial en cada combinación. Más que vender pizzas,
                    buscamos brindar una experiencia auténtica, donde el sabor,
                    la calidad y el cariño en la preparación se sienten en cada
                    bocado.
                  </p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                  <div className="absolute inset-0 rounded-full border-4 border-amber-500 shadow-lg overflow-hidden">
                    <img
                      src="/imgs/ohana_sabor.png"
                      alt="Pasión en cada detalle"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* LÍNEA HORIZONTAL SUAVE */}
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full my-8"></div>

          {/* VALORES CLAVE */}
          <section className="pt-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
              Lo que nos define
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <FaLeaf className="text-amber-600 text-3xl" />,
                  title: "Frescura",
                  desc: "Ingredientes locales y de temporada, cada día.",
                },
                {
                  icon: (
                    <FaHandHoldingHeart className="text-amber-600 text-3xl" />
                  ),
                  title: "Artesanal",
                  desc: "Masa hecha a mano, sin congelar ni acelerantes.",
                },
                {
                  icon: <FaUsers className="text-amber-600 text-3xl" />,
                  title: "Familia",
                  desc: "Trato cercano, como en casa de un ser querido.",
                },
                {
                  icon: <FaRecycle className="text-amber-600 text-3xl" />,
                  title: "Sostenible",
                  desc: "Envases biodegradables y reducción de desperdicio.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-amber-50 rounded-xl p-6 text-center border border-amber-200 
                             hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex justify-center mb-3">{item.icon}</div>
                  <h3 className="font-bold text-amber-800 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <div className="mt-16 pb-8">
        <Footer />
      </div>
    </div>
  );
}
