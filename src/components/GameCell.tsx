
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
        "aspect-square bg-slate-800 rounded-lg shadow-sm border-2 border-slate-600",
        "flex items-center justify-center text-4xl font-bold",
        "transition-all duration-200 hover:shadow-lg hover:scale-105",
        !value && "hover:bg-slate-700 cursor-pointer hover:border-slate-500",
        value && "cursor-not-allowed"
      )}
      disabled={!!value}
    >
      {value && (
        <span
          className={cn(
            "animate-scale-in",
            value === "X" && "text-blue-400",
            value === "O" && "text-orange-400"
          )}
        >
          {value}
        </span>
      )}
    </button>
  );
};

export default GameCell;
