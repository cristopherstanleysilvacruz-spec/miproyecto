import React, { useState, useEffect } from "react";
import Footer from "../organisms/Footer";
import {
  FaSearch,
  FaStar,
  FaShoppingCart,
  FaTrash,
  FaInfoCircle,
  FaPlusCircle,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

function MenuPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openCategorias, setOpenCategorias] = useState(false);
  const [openInfo, setOpenInfo] = useState(null); // Pizza seleccionada para Info
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openCarrito, setOpenCarrito] = useState(false);

  const [selectedPizza, setSelectedPizza] = useState(null);
  const [carrito, setCarrito] = useState([]);

  const [tamano, setTamano] = useState(null);
  const [extras, setExtras] = useState([]);
  const [cantidad, setCantidad] = useState(1);

  const categorias = ["Todas", "Pizzas", "Pastas", "Bebidas"];

  useEffect(() => {
    fetch("http://localhost:3000/api/pizzas")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .finally(() => setLoading(false));
  }, []);

  const filtrarProductos = productos.filter((p) => {
    const catOk = activeCategory === "Todas" || p.categoria === activeCategory;
    const searchOk = p.nombre.toLowerCase().includes(query.toLowerCase());
    return catOk && searchOk;
  });

  const calcularTotal = () => {
    if (!selectedPizza) return 0;
    let total = selectedPizza.precio;
    if (tamano) total += tamano.precio;
    extras.forEach((e) => (total += e.precio));
    return total * cantidad;
  };

  const agregarAlCarrito = () => {
    setCarrito([
      {
        id: Date.now(),
        nombre: selectedPizza.nombre,
        tamano: tamano?.nombre || "Normal",
        extras: extras.map((e) => e.nombre),
        cantidad,
        total: calcularTotal(),
      },
      ...carrito,
    ]);

    setOpenAgregar(false);
    setTamano(null);
    setExtras([]);
    setCantidad(1);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((p) => p.id !== id));
  };

  const totalPedido = carrito.reduce((acc, p) => acc + p.total, 0);

  const mensajeWhatsapp = encodeURIComponent(
    carrito
      .map(
        (p, i) =>
          `🍕 ${i + 1}. ${p.nombre}
Cantidad: ${p.cantidad}
Subtotal: S/ ${p.total}`
      )
      .join("\n\n") + `\n\nTOTAL: S/ ${totalPedido}`
  );

  if (loading) {
    return <p className="text-center mt-20">Cargando...</p>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* HERO */}
      <section className="text-center py-14 px-6">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Nuestro <span className="text-yellow-500">Menú</span>
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Pizzas artesanales hechas con ingredientes frescos y tradición
        </p>
      </section>

      {/* FILTROS */}
      <div className="max-w-6xl mx-auto px-6 w-full space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full pl-12 py-3 border rounded-xl bg-gray-50"
              placeholder="Buscar pizzas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="relative w-full md:w-56">
            <button
              onClick={() => setOpenCategorias(!openCategorias)}
              className="w-full py-3 px-4 border rounded-xl flex justify-between items-center"
            >
              {activeCategory} <span>▾</span>
            </button>

            {openCategorias && (
              <div className="absolute w-full bg-white border rounded-xl mt-2 shadow">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setOpenCategorias(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-yellow-50"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TARJETAS */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {filtrarProductos.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden"
            >
              <img
                src={p.img}
                alt={p.nombre}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{p.nombre}</h3>
                  <span className="flex items-center gap-1 text-sm bg-yellow-100 px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-500 text-xs" /> 4.8
                  </span>
                </div>

                <p className="text-yellow-600 font-extrabold text-xl mt-2">
                  S/ {p.precio}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {/* BOTÓN INFO */}
                  <button
                    onClick={() => setOpenInfo(p)}
                    className="border py-2 rounded-lg flex justify-center items-center gap-1"
                  >
                    <FaInfoCircle /> Info
                  </button>

                  {/* BOTÓN AGREGAR */}
                  <button
                    onClick={() => {
                      setSelectedPizza(p);
                      setOpenAgregar(true);
                    }}
                    className="bg-yellow-500 text-white py-2 rounded-lg flex justify-center items-center gap-1"
                  >
                    <FaPlusCircle /> Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL INFO */}
      {openInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 space-y-4">
            <img
              src={openInfo.img}
              alt={openInfo.nombre}
              className="h-48 w-full object-cover rounded-xl"
            />
            <h3 className="font-bold text-xl">{openInfo.nombre}</h3>
            <p className="text-gray-700">{openInfo.descripcion}</p>
            {openInfo.ingredientes?.length > 0 && (
              <p className="text-gray-600">
                Ingredientes: {openInfo.ingredientes.join(", ")}
              </p>
            )}

            <button
              onClick={() => setOpenInfo(null)}
              className="w-full mt-2 border py-2 rounded-xl flex justify-center items-center"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

     {/* MODAL AGREGAR */}
{openAgregar && selectedPizza && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl w-96 space-y-4">
      <h3 className="font-bold text-xl text-center">{selectedPizza.nombre}</h3>

      {/* SELECCIÓN DE TAMAÑO */}
      {selectedPizza.tamanos?.length > 0 && (
        <div className="mt-2">
          <p className="font-semibold mb-1">Tamaños:</p>
          {selectedPizza.tamanos.map((t) => (
            <label key={t.nombre} className="block">
              <input
                type="radio"
                name="tamano"
                className="mr-2"
                onChange={() => setTamano(t)}
              />
              {t.nombre} (+S/ {t.precio})
            </label>
          ))}
        </div>
      )}

      {/* SELECCIÓN DE EXTRAS */}
      {selectedPizza.extras?.length > 0 && (
        <div className="mt-2">
          <p className="font-semibold mb-1">Extras:</p>
          {selectedPizza.extras.map((e) => (
            <label key={e.nombre} className="block">
              <input
                type="checkbox"
                className="mr-2"
                onChange={(ev) =>
                  ev.target.checked
                    ? setExtras([...extras, e])
                    : setExtras(extras.filter((x) => x.nombre !== e.nombre))
                }
              />
              {e.nombre} (+S/ {e.precio})
            </label>
          ))}
        </div>
      )}

      {/* CANTIDAD */}
      <div className="flex items-center gap-4 justify-center mt-4">
        <button
          onClick={() => setCantidad(Math.max(1, cantidad - 1))}
          className="p-2 border rounded-full flex items-center justify-center"
        >
          <FaMinus />
        </button>
        <span className="font-semibold">{cantidad}</span>
        <button
          onClick={() => setCantidad(cantidad + 1)}
          className="p-2 border rounded-full flex items-center justify-center"
        >
          <FaPlus />
        </button>
      </div>

      <p className="font-bold text-center mt-2">Total: S/ {calcularTotal()}</p>

      {/* BOTONES AGREGAR Y CERRAR */}
      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={agregarAlCarrito}
          className="w-full bg-yellow-500 text-white py-2 rounded-xl flex items-center justify-center gap-2"
        >
          <FaPlusCircle /> Agregar al pedido
        </button>

        <button
          onClick={() => setOpenAgregar(false)}
          className="w-full border py-2 rounded-xl flex items-center justify-center gap-2"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}


      {/* BOTÓN CARRITO */}
      <button
        onClick={() => setOpenCarrito(true)}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full flex justify-center items-center"
      >
        <FaShoppingCart />
      </button>

      {/* CARRITO */}
      {openCarrito && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="bg-white w-96 p-6">
            <h3 className="font-bold text-xl mb-4">Tu pedido</h3>

            {carrito.map((p) => (
              <div key={p.id} className="border-b py-2">
                <div className="flex justify-between">
                  <span>{p.nombre}</span>
                  <button onClick={() => eliminarDelCarrito(p.id)}>
                    <FaTrash />
                  </button>
                </div>
                <p className="text-sm">Tamaño: {p.tamano}</p>
                <p className="text-sm">
                  Extras: {p.extras.join(", ") || "Ninguno"}
                </p>
                <p className="font-bold">S/ {p.total}</p>
              </div>
            ))}

            <p className="font-bold mt-4">TOTAL: S/ {totalPedido}</p>

            <a
              href={`https://wa.me/51914068562?text=${mensajeWhatsapp}`}
              target="_blank"
              className="block bg-green-500 text-white text-center py-2 rounded-xl mt-4"
            >
              Enviar pedido
            </a>

            <button
              onClick={() => setOpenCarrito(false)}
              className="w-full mt-2 border py-2 rounded-xl"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default MenuPage;
