interface BallHistoryProps {
  balls: number[];
}

const BallHistory = ({ balls }: BallHistoryProps) => (
  <div className="bg-gray-100 p-4 rounded shadow mt-4">
    <h3 className="text-lg font-semibold mb-2">Historial de balotas</h3>
    <div className="flex flex-wrap gap-2">
      {balls.map((ball, idx) => (
        <span
          key={idx}
          className="w-10 h-10 flex items-center justify-center bg-blue-200 rounded-full font-semibold"
        >
          {ball}
        </span>
      ))}
    </div>
  </div>
);

export default BallHistory;
