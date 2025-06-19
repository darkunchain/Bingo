const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  balls: { type: [Number], default: [] }, // Balotas que han salido
  pattern: { type: String, default: "FULL" }, // FULL, H, L, ESQUINAS, etc.
  started: { type: Boolean, default: false },
  finished: { type: Boolean, default: false },
  winners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BingoCard' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);
