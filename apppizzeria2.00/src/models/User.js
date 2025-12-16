const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    nombreUsuario: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["A", "V", "C"],
      default: "C"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
