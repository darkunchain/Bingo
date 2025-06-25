import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const createBingoCards = (
  quantity: number, 
  gameId: string, 
  token: string
) =>
  axios.post(
    `${API}/bingo/create`,
    { quantity, gameId },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const claimCardByToken = (token: string) =>
  axios.post(`${API}/bingo/claim`, { token });
