import React, { useEffect, useState } from "react";
import Footer from "../organisms/Footer";

function MenuPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const categorias = ["Todas", "Pizzas", "Pastas", "Bebidas"];

  // 🔥 CARGA DESDE BACKEND (POSTMAN / MONGODB)
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/pizzas");
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar el menú:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  const filtrarProductos = productos.filter((p) => {
    const coincideCategoria =
      activeCategory === "Todas" || p.categoria === activeCategory;
    const coincideBusqueda =
      p.nombre.toLowerCase().includes(query.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  if (loading) {
    return <p className="text-center mt-20">Cargando menú...</p>;
  }

  return (
    <div className="px-6 pt-12 pb-20 max-w-7xl mx-auto flex-1">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Nuestro Menú
      </h1>

      {/* BUSCADOR */}
      <div className="max-w-md mx-auto mb-12">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-100 border border-gray-300 rounded-xl p-3 shadow-sm
          focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* CATEGORÍAS */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-xl font-semibold transition shadow-md
              ${
                activeCategory === cat
                  ? "bg-yellow-500 text-black"
                  : "bg-white border border-yellow-500 text-gray-700 hover:bg-yellow-500 hover:text-black"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTOS DESDE MONGODB */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filtrarProductos.map((p) => (
          <div
            key={p._id}
            className="bg-white border border-yellow-500 shadow-2xl rounded-2xl p-5
            flex flex-col items-center text-center hover:scale-[1.02] transition-all"
          >
            <img
              src={p.img}
              alt={p.nombre}
              className="w-full h-40 object-cover rounded-xl mb-4 shadow"
            />

            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {p.nombre}
            </h3>
            <p className="text-gray-600 mb-3">{p.categoria}</p>

            <p className="text-xl font-bold text-yellow-600 mb-4">
              S/ {p.precio}
            </p>

            <button className="w-full bg-yellow-500 text-black py-2 rounded-xl font-semibold hover:bg-yellow-600 transition shadow-md">
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* MENSAJE CUANDO NO HAY PRODUCTOS */}
      {filtrarProductos.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No hay productos registrados aún
        </p>
      )}

      <footer className="w-full mt-10">
        <Footer />
      </footer>
    </div>
  );
}

export default MenuPage;
