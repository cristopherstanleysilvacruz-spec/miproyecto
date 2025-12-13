import { Routes, Route } from "react-router-dom";

// COMPONENTES GLOBALES
import Navbar from "./components/organisms/Navbar";

// PÁGINAS
import HomePage from "./components/pages/HomePage";
import MenuPage from "./components/pages/MenuPage";
import PromocionesPage from "./components/pages/PromocionesPage";
import SobreNosotrosPage from "./components/pages/SobreNosotrosPage";
import ContactoPage from "./components/pages/ContactoPage";
import IniciarSesionPage from "./components/pages/IniciarSesionPage";
import PedirAhoraPage from "./components/pages/PedirAhoraPage";
import RegistrateAqui from "./components/pages/RegistrateAqui";
import CarritoPage from "./components/pages/CarritoPage";
import CDashboard from "./components/pages/CDashboard";
import ProtectedRoute from "./components/routes/ProtectedRoute";

// APP PRINCIPAL
function App() {
  return (
    <div className="w-full">
      <Navbar />

      <div className="pt-28 px-2">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/promociones" element={<PromocionesPage />} />
          <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/iniciar-sesion" element={<IniciarSesionPage />} />
          <Route path="/registrate-aqui" element={<RegistrateAqui />} />
          <Route path="/pedir-ahora" element={<PedirAhoraPage />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/cdashboard" element={ <ProtectedRoute><CDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
