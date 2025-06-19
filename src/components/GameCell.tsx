
import { cn } from "@/lib/utils";

type Player = "X" | "O" | null;

interface GameCellProps {
  value: Player;
  onClick: () => void;
  index: number;
}

const GameCell = ({ value, onClick, index }: GameCellProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "aspect-square bg-white rounded-lg shadow-sm border-2 border-transparent",
        "flex items-center justify-center text-4xl font-bold",
        "transition-all duration-200 hover:shadow-md hover:scale-105",
        !value && "hover:bg-slate-50 cursor-pointer",
        value && "cursor-not-allowed"
      )}
      disabled={!!value}
    >
      {value && (
        <span
          className={cn(
            "animate-scale-in",
            value === "X" && "text-blue-600",
            value === "O" && "text-orange-600"
          )}
        >
          {value}
        </span>
      )}
    </button>
  );
};

export default GameCell;
