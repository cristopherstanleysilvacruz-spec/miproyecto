const mongoose = require("mongoose");

const PromocionSchema = new mongoose.Schema(
  {
    titulo: String,
    descripcion: String,
    precioActual: Number,
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promocion", PromocionSchema);
