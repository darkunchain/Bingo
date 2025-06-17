// Tipos para el componente BingoCard
export type BingoNumber = {
  value: number;
  isMarked: boolean;
};

export type BingoCardProps = {
  numbers: BingoNumber[][]; // Matriz 5x5
  onCellClick?: (row: number, col: number) => void;
};