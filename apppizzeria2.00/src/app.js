const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Rutas
const authRoutes = require("./routes/authRoutes");

const app = express();

// ==================
// MIDDLEWARES
// ==================
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend Vite
    credentials: true,               // Permitir cookies
  })
);

app.use(express.json());
app.use(cookieParser());

// ==================
// CONFIGURACIÓN
// ==================
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pizzeria_db";

// ==================
// CONEXIÓN MONGODB
// ==================
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongoose conectado a la base de datos"))
  .catch((err) =>
    console.error("Error de conexión a MongoDB:", err)
  );

// ==================
// RUTAS
// ==================
app.use("/api/auth", authRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor backend corriendo correctamente");
});

// ==================
// SERVIDOR
// ==================
app.listen(PORT, () => {
  console.log(`Backend en http://localhost:${PORT}`);
});
