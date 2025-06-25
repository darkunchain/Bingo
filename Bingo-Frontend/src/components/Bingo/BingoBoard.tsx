import type { BingoCard } from '../../types/bingo.d';

interface BingoBoardProps {
  card: BingoCard;
  markedNumbers: number[];
}

const BingoBoard = ({ card, markedNumbers }: BingoBoardProps) => (
  <div className="bg-white p-4 rounded shadow mx-auto my-4">
    <table className="border-collapse">
      <thead>
        <tr>
          {['B', 'I', 'N', 'G', 'O'].map(letter => (
            <th key={letter} className="p-2 text-xl">{letter}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {card.numbers.map((row, i) => (
          <tr key={i}>
            {row.map((num, j) => (
              <td
                key={j}
                className={`border w-12 h-12 text-center text-lg rounded
                  ${num === 'FREE' || markedNumbers.includes(Number(num))
                    ? 'bg-green-300 font-bold'
                    : 'bg-white'}`}
              >
                {num}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BingoBoard;
