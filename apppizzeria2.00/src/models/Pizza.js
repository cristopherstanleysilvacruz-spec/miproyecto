const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema(
  {
    nombre: String,
    categoria: String,
    precio: Number,
    img: String,
    descripcion: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pizza", PizzaSchema);
