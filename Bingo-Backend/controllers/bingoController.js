const BingoCard = require('../models/BingoCard');
const { generateCard, generateToken } = require('../utils/bingoCardGenerator');

// Crear N cartones de bingo únicos
exports.createCards = async (req, res) => {
  try {
    const { quantity, gameId, owner } = req.body;
    if (!quantity || quantity < 20 || quantity > 200) return res.status(400).json({ error: "Cantidad fuera de rango" });

    const tokens = new Set();
    const cards = [];
    for (let i = 0; i < quantity; i++) {
      let card, token;
      do {
        card = generateCard();
        token = generateToken(card);
      } while (tokens.has(token));
      tokens.add(token);
      cards.push({ numbers: card, token, game: gameId, owner: owner || null });
    }
    const docs = await BingoCard.insertMany(cards);
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reclamar cartón por token
exports.getCardByToken = async (req, res) => {
  try {
    const { token } = req.body;
    const card = await BingoCard.findOne({ token });
    if (!card) return res.status(404).json({ error: "Cartón no encontrado" });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
