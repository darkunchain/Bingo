import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import type { Game, BingoCard } from '../types/bingo.d';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Game = () => {
  const { gameId } = useParams();
  const socket = useSocket();
  const [balls, setBalls] = useState<number[]>([]);
  const [lastBall, setLastBall] = useState<number | null>(null);
  const [carton, setCarton] = useState<BingoCard | null>(null);

  // Cargar datos iniciales del cartón y balotas
  useEffect(() => {
    // Puedes guardar el token de cartón en localStorage o contexto después del login o reclamo
    const tokenCarton = localStorage.getItem('cartonToken');
    if (tokenCarton) {
      axios.post<BingoCard>(`${API}/bingo/claim`, { token: tokenCarton })
        .then(res => setCarton(res.data));
    }
    // Carga las balotas iniciales del juego
    axios.get<Game>(`${API}/game/${gameId}`)
      .then(res => setBalls(res.data.balls));
  }, [gameId]);

  // Escuchar balotas nuevas en tiempo real por socket
  useEffect(() => {
    if (!socket || !gameId) return;
    socket.emit('joinGame', gameId);

    socket.on('newBall', (ball: number) => {
      setBalls(prev => [...prev, ball]);
      setLastBall(ball);
    });

    return () => {
      socket.off('newBall');
    };
  }, [socket, gameId]);

  return (
    <div className="flex flex-col items-center py-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Juego de Bingo</h2>
      {lastBall && (
        <div className="text-6xl font-bold text-blue-700 mb-4">
          Última balota: {lastBall}
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-xl mb-2">Historial de balotas</h3>
        <div className="flex flex-wrap gap-2">
          {balls.map((ball, idx) => (
            <span
              key={idx}
              className="w-10 h-10 flex items-center justify-center bg-green-200 rounded-full font-semibold"
            >
              {ball}
            </span>
          ))}
        </div>
      </div>
      {carton && (
        <div className="bg-white p-6 rounded shadow">
          <h4 className="text-lg font-semibold mb-2">Mi cartón</h4>
          <table>
            <tbody>
              {carton.numbers.map((row, i) => (
                <tr key={i}>
                  {row.map((num, j) => (
                    <td
                      key={j}
                      className={`border p-2 text-center text-lg rounded
                        ${balls.includes(Number(num)) || num === 'FREE'
                          ? 'bg-blue-200 font-bold'
                          : ''}`}
                    >
                      {num}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!carton && (
        <p className="text-gray-500">No se encontró cartón asociado. Por favor, ingresa con tu token.</p>
      )}
    </div>
  );
};

export default Game;
