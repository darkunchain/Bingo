const crypto = require('crypto');

// Genera un cartón único para bingo americano (75 bolas)
function generateCard() {
  const card = [];
  for (let col = 0; col < 5; col++) {
    let min = col * 15 + 1;
    let max = min + 14;
    let colNumbers = [];
    while (colNumbers.length < 5) {
      let n = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!colNumbers.includes(n)) colNumbers.push(n);
    }
    card.push(colNumbers);
  }
  card[2][2] = 'FREE';
  return card;
}

// Genera un hash como token único
function generateToken(card) {
  return crypto.createHash('sha256').update(JSON.stringify(card) + Date.now() + Math.random()).digest('hex').slice(0, 16);
}

module.exports = { generateCard, generateToken };
