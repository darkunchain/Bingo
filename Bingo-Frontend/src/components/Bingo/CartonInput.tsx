import { useState } from 'react';
import { claimCardByToken } from '../../api/bingo';
import { useNavigate } from 'react-router-dom';
import CartonQRReader from './CartonQRReader';
import type { BingoCard } from '../../types/bingo.d';

const CartonInput = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  <CartonQRReader onTokenRead={setToken} />

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await claimCardByToken(token) as { data: BingoCard };
      // Puedes guardar el cartón en el estado global o localStorage, según tu flujo
      // Redirige al juego correspondiente:
      navigate(`/game/${res.data.game}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Token inválido');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Ingresa el código de tu cartón</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <input
          type="text"
          placeholder="Token del cartón"
          value={token}
          onChange={e => setToken(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />
        {/* Aquí podrías agregar un lector de QR */}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Acceder a mi cartón
        </button>
      </form>
    </div>
  );
};


export default CartonInput;
