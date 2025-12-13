const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pizzeria_db";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongoose conectado a la base de datos"))
  .catch((err) =>
    console.error("Error de conexión a la base de datos:", err)
  );

// ==================
// MODELO DE PIZZA
// ==================
const PizzaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    categoria: {
      type: String,
      enum: ["Pizzas", "Pastas", "Bebidas"],
      required: true,
    },
    precio: { type: Number, required: true },
    ingredientes: { type: [String], default: [] },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const Pizza = mongoose.model("Pizza", PizzaSchema);

// ==================
// RUTAS CRUD
// ==================
app.get("/api/pizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(200).json(pizzas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pizzas" });
  }
});

app.post("/api/pizzas", async (req, res) => {
  try {
    const nuevaPizza = new Pizza(req.body);
    await nuevaPizza.save();
    res.status(201).json(nuevaPizza);
  } catch (error) {
    res.status(400).json({ error: "Datos inválidos al crear pizza" });
  }
});

app.put("/api/pizzas/:id", async (req, res) => {
  try {
    const updated = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar pizza" });
  }
});

app.delete("/api/pizzas/:id", async (req, res) => {
  try {
    await Pizza.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Pizza eliminada" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar pizza" });
  }
});

// Ruta test navegador
app.get("/", (req, res) => {
  res.send("Servidor backend corriendo correctamente");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Backend en http://localhost:${PORT}`);
});
