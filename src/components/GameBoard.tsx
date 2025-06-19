
import GameCell from "./GameCell";

type Player = "X" | "O" | null;
type Board = Player[];

interface GameBoardProps {
  board: Board;
  onCellClick: (index: number) => void;
}

const GameBoard = ({ board, onCellClick }: GameBoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-slate-700 rounded-lg border border-slate-600">
      {board.map((cell, index) => (
        <GameCell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          index={index}
        />
      ))}
    </div>
  );
};

export default GameBoard;
