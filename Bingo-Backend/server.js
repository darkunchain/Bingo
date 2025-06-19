require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bingoRoutes = require('./routes/bingoRoutes');   // NUEVO
const gameRoutes = require('./routes/gameRoutes');     // NUEVO

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bingo', bingoRoutes);  // NUEVO
app.use('/api/game', gameRoutes);    // NUEVO

// --- SOCKET.IO CONFIG ---
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('Usuario conectado al bingo');

  // Unirse a un juego específico
  socket.on('joinGame', (gameId) => {
    socket.join(gameId);
  });

  // Aquí puedes poner eventos adicionales para notificar balotas nuevas, ganadores, etc.
});

// Iniciar servidor (ahora con server en vez de app)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
