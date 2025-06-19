
type Player = "X" | "O" | null;
type Board = Player[];

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export const checkWinner = (board: Board): Player => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export const getAvailableMoves = (board: Board): number[] => {
  return board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
};

export const minimax = (board: Board, depth: number, isMaximizing: boolean): number => {
  const winner = checkWinner(board);
  
  if (winner === "O") return 1; // AI wins
  if (winner === "X") return -1; // Player wins
  if (getAvailableMoves(board).length === 0) return 0; // Draw

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const move of getAvailableMoves(board)) {
      board[move] = "O";
      const score = minimax(board, depth + 1, false);
      board[move] = null;
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const move of getAvailableMoves(board)) {
      board[move] = "X";
      const score = minimax(board, depth + 1, true);
      board[move] = null;
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
};

export const getBestMove = (board: Board): number => {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (const move of getAvailableMoves(board)) {
    board[move] = "O";
    const score = minimax(board, 0, false);
    board[move] = null;
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};
