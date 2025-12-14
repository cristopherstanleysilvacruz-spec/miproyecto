const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Rutas
const authRoutes = require("./routes/authRoutes");

const app = express();

/* =====================
   MIDDLEWARES
===================== */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

/* =====================
   CONFIGURACIÓN
===================== */
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pizzeria_db";

/* =====================
   CONEXIÓN A MONGODB
===================== */
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongoose conectado a la base de datos"))
  .catch((err) => console.error("Error de conexión a la base de datos:", err));

/* =====================
   MODELO PIZZA
===================== */
const PizzaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  categoria: { type: String, enum: ["Pizzas", "Pastas", "Bebidas"], required: true },
  precio: { type: Number, required: true, min: 0 },
  img: { type: String, required: true },
  descripcion: { type: String, default: "" },
  ingredientes: { type: [String], default: [] },
  extras: [{ nombre: String, precio: { type: Number, min: 0 } }],
  tamanos: [{ nombre: String, precio: { type: Number, min: 0 } }],
}, { timestamps: true });

const Pizza = mongoose.model("Pizza", PizzaSchema);

/* =====================
   MODELO PROMOCIÓN
===================== */
const PromocionSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true },
  duracion: { type: Number, required: true }, // duración en segundos
  precioAnterior: { type: Number, required: true, min: 0 },
  precioActual: { type: Number, required: true, min: 0 },
  descuento: { type: String, required: true },
  imagenUrl: { type: String, required: true },
  activo: { type: Boolean, default: true },
}, { timestamps: true });

const Promocion = mongoose.model("Promocion", PromocionSchema);

/* =====================
   RUTAS API - PIZZAS
===================== */
app.get("/api/pizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(200).json(pizzas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener pizzas" });
  }
});

app.post("/api/pizzas", async (req, res) => {
  try {
    const nuevaPizza = new Pizza(req.body);
    await nuevaPizza.save();
    res.status(201).json(nuevaPizza);
  } catch (err) {
    res.status(400).json({ error: "Datos inválidos al crear pizza", detalle: err.message });
  }
});

app.put("/api/pizzas/:id", async (req, res) => {
  try {
    const updated = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar pizza" });
  }
});

app.delete("/api/pizzas/:id", async (req, res) => {
  try {
    await Pizza.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Pizza eliminada" });
  } catch (err) {
    res.status(400).json({ error: "Error al eliminar pizza" });
  }
});

/* =====================
   RUTAS API - PROMOCIONES
===================== */
app.get("/api/promociones", async (req, res) => {
  try {
    const promociones = await Promocion.find({ activo: true });
    res.status(200).json(promociones);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener promociones" });
  }
});

app.post("/api/promociones", async (req, res) => {
  try {
    const nuevaPromo = new Promocion(req.body);
    await nuevaPromo.save();
    res.status(201).json(nuevaPromo);
  } catch (err) {
    res.status(400).json({ error: "Error al crear promoción", detalle: err.message });
  }
});

app.put("/api/promociones/:id", async (req, res) => {
  try {
    const updated = await Promocion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar promoción" });
  }
});

app.delete("/api/promociones/:id", async (req, res) => {
  try {
    await Promocion.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Promoción eliminada" });
  } catch (err) {
    res.status(400).json({ error: "Error al eliminar promoción" });
  }
});

/* =====================
   RUTAS AUTH
===================== */
app.use("/api/auth", authRoutes);

/* =====================
   TEST SERVER
===================== */
app.get("/", (req, res) => {
  res.send("Servidor backend corriendo correctamente");
});

/* =====================
   SERVIDOR
===================== */
app.listen(PORT, () => {
  console.log(`Backend en http://localhost:${PORT}`);
});
