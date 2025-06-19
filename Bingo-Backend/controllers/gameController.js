const Game = require('../models/Game');
const BingoCard = require('../models/BingoCard');

// Crear un juego nuevo
exports.createGame = async (req, res) => {
  try {
    const { name, pattern } = req.body;
    const game = new Game({ name, pattern });
    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Iniciar el juego
exports.startGame = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findByIdAndUpdate(id, { started: true }, { new: true });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Extraer una balota
exports.drawBall = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);
    if (!game || game.finished) return res.status(400).json({ error: "Juego no encontrado o finalizado" });

    // Números del 1 al 75 no repetidos
    const allBalls = Array.from({ length: 75 }, (_, i) => i + 1);
    const remaining = allBalls.filter(b => !game.balls.includes(b));
    if (remaining.length === 0) return res.status(400).json({ error: "Ya salieron todas las balotas" });

    const nextBall = remaining[Math.floor(Math.random() * remaining.length)];
    game.balls.push(nextBall);
    await game.save();

    // Aquí puedes agregar lógica de detección de ganador...
    res.json({ ball: nextBall, balls: game.balls });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
