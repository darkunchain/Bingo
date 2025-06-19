const mongoose = require('mongoose');

const BingoCardSchema = new mongoose.Schema({
  numbers: [[mongoose.Schema.Types.Mixed]], // 5x5 (usa 'FREE' en el centro)
  token: { type: String, required: true, unique: true },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BingoCard', BingoCardSchema);
