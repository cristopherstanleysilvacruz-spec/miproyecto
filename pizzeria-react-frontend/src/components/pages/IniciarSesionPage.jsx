import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../organisms/Footer";
import { FaEnvelope, FaLock, FaExclamationTriangle } from "react-icons/fa";

function IniciarSesionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones básicas
    if (!email.trim() || !password.trim()) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, ingrese un correo válido.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // IMPORTANTE para cookies HttpOnly
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Usuario y/o contraseña incorrectos."
        );
      }

      // Redirección según rol
      switch (data.role) {
        case "A":
          navigate("/adashboard", { replace: true });
          break;
        case "V":
          navigate("/vdashboard", { replace: true });
          break;
        case "C":
          navigate("/cdashboard", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("[Login Error]", err);
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="py-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-yellow-600">Ohana</span> Pizzería
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          ¡Bienvenido de nuevo!
        </p>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-yellow-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Iniciar Sesión
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Accede a tu cuenta para continuar
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-5 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
              <FaExclamationTriangle />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium text-sm mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="ejemplo@ohana.com"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium text-sm mb-1">
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FaLock />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                isLoading
                  ? "bg-yellow-400 cursor-not-allowed"
                  : "bg-yellow-600 hover:bg-yellow-700 active:scale-95"
              }`}
            >
              {isLoading ? "Iniciando..." : "Iniciar Sesión"}
            </button>
          </form>

          {/* Registro */}
          <div className="mt-6 pt-5 border-t text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?
            </p>
            <Link
              to="/registrate-aqui"
              className="text-yellow-600 font-semibold hover:underline"
            >
              Regístrate aquí
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default IniciarSesionPage;
