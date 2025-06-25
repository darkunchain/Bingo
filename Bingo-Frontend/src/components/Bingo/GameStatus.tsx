interface GameStatusProps {
  started: boolean;
  finished: boolean;
  winners: string[];
}

const GameStatus = ({ started, finished, winners }: GameStatusProps) => (
  <div className="my-4">
    <div className="text-lg">
      Estado del juego:{" "}
      <span className={started ? 'text-green-700' : 'text-gray-600'}>
        {started ? (finished ? 'Finalizado' : 'En curso') : 'No iniciado'}
      </span>
    </div>
    {winners.length > 0 && (
      <div className="text-xl text-green-700 mt-2 font-bold">
        ¡Bingo! Ganador(es): {winners.join(', ')}
      </div>
    )}
  </div>
);

export default GameStatus;
