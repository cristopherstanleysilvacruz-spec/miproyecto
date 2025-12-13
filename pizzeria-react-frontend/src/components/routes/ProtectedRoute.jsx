import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) setAuthorized(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return authorized ? children : <Navigate to="/iniciar-sesion" replace />;
}
