const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["A", "V", "C"], // Admin, Vendedor, Cliente
    default: "C", // Cliente solo compra
  },
});

module.exports = mongoose.model("User", userSchema);
