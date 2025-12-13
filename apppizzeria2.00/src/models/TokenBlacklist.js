const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, index: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

// Índice TTL para eliminar automáticamente tokens expirados
tokenBlacklistSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

module.exports = mongoose.model(
  "TokenBlacklist",
  tokenBlacklistSchema
);
