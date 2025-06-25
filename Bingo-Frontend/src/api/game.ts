import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const createGame = (name: string, pattern: string, token: string) =>
  axios.post(
    `${API}/game/create`,
    { name, pattern },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const startGame = (gameId: string, token: string) =>
  axios.post(
    `${API}/game/${gameId}/start`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const drawBall = (gameId: string, token: string) =>
  axios.post(
    `${API}/game/${gameId}/draw`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
