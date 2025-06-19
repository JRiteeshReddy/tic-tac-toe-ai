
import TicTacToe from "../components/TicTacToe";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Tic Tac Toe</h1>
          <p className="text-slate-300">Play against the AI</p>
        </div>
        <TicTacToe />
      </div>
    </div>
  );
};

export default Index;
