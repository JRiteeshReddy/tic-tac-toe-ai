
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GameBoard from "./GameBoard";
import { checkWinner, getAvailableMoves, getBestMove } from "../utils/gameUtils";
import { useToast } from "@/hooks/use-toast";

type Player = "X" | "O" | null;
type Board = Player[];

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Player>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [draws, setDraws] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const gameWinner = checkWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      if (gameWinner === "X") {
        setPlayerScore(prev => prev + 1);
        toast({
          title: "🎉 You Won!",
          description: "Great job beating the AI!",
        });
      } else {
        setAiScore(prev => prev + 1);
        toast({
          title: "🤖 AI Wins",
          description: "Better luck next time!",
          variant: "destructive",
        });
      }
    } else if (getAvailableMoves(board).length === 0) {
      setGameOver(true);
      setDraws(prev => prev + 1);
      toast({
        title: "🤝 It's a Draw!",
        description: "Well played by both sides!",
      });
    }
  }, [board, toast]);

  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove(board);
        if (bestMove !== -1) {
          const newBoard = [...board];
          newBoard[bestMove] = "O";
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
      }, 500); // Add slight delay for better UX
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, gameOver]);

  const handleCellClick = (index: number) => {
    if (board[index] || !isPlayerTurn || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
  };

  const resetScore = () => {
    setPlayerScore(0);
    setAiScore(0);
    setDraws(0);
    resetGame();
  };

  return (
    <Card className="w-full shadow-2xl bg-slate-800 border-slate-700">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">
          {gameOver 
            ? winner 
              ? `${winner === "X" ? "You" : "AI"} Win${winner === "X" ? "" : "s"}!`
              : "It's a Draw!"
            : isPlayerTurn 
              ? "Your Turn" 
              : "AI Thinking..."
          }
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <GameBoard board={board} onCellClick={handleCellClick} />
        
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="bg-blue-900/50 p-3 rounded-lg border border-blue-700">
            <div className="font-bold text-blue-300">You</div>
            <div className="text-2xl font-bold text-blue-100">{playerScore}</div>
          </div>
          <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
            <div className="font-bold text-slate-300">Draws</div>
            <div className="text-2xl font-bold text-slate-100">{draws}</div>
          </div>
          <div className="bg-orange-900/50 p-3 rounded-lg border border-orange-700">
            <div className="font-bold text-orange-300">AI</div>
            <div className="text-2xl font-bold text-orange-100">{aiScore}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={resetGame} 
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
            variant="outline"
          >
            New Game
          </Button>
          <Button 
            onClick={resetScore} 
            className="flex-1 bg-red-900 hover:bg-red-800 text-white"
            variant="destructive"
          >
            Reset Score
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicTacToe;
