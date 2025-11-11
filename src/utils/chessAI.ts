import { Chess } from "chess.js";
import type { Move, PieceSymbol } from "chess.js";
import { getBookMove as getBookMoveFromLib } from "./openingBook";

export type DifficultyLevel = "easy" | "medium" | "hard";

interface EvaluatedMove {
  move: Move;
  score: number;
}

/**
 * Transposition Table Entry
 * Stores previously evaluated positions to avoid recalculation
 */
interface TTEntry {
  score: number;      // Evaluation score
  depth: number;      // Depth at which this position was searched
  flag: 'exact' | 'alpha' | 'beta';  // Type of score
  bestMove?: Move;    // Best move found (for move ordering)
}

/**
 * Global Transposition Table
 * Maps FEN positions to their evaluations
 * Cleared at the start of each AI move calculation
 */
const transpositionTable = new Map<string, TTEntry>();

/**
 * Clear the transposition table
 * Should be called at the start of each new search
 */
function clearTT(): void {
  transpositionTable.clear();
}

const PIECE_VALUES: { [key: string]: number } = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Helper to get piece value safely
function getPieceValue(piece: PieceSymbol): number {
  return PIECE_VALUES[piece] || 0;
}

const POSITION_BONUS = {
  p: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5, 5, 10, 25, 25, 10, 5, 5],
    [0, 0, 0, 20, 20, 0, 0, 0],
    [5, -5, -10, 0, 0, -10, -5, 5],
    [5, 10, 10, -20, -20, 10, 10, 5],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  n: [
    [-50, -40, -30, -30, -30, -30, -40, -50],
    [-40, -20, 0, 0, 0, 0, -20, -40],
    [-30, 0, 10, 15, 15, 10, 0, -30],
    [-30, 5, 15, 20, 20, 15, 5, -30],
    [-30, 0, 15, 20, 20, 15, 0, -30],
    [-30, 5, 10, 15, 15, 10, 5, -30],
    [-40, -20, 0, 5, 5, 0, -20, -40],
    [-50, -40, -30, -30, -30, -30, -40, -50],
  ],
  b: [
    [-20, -10, -10, -10, -10, -10, -10, -20],
    [-10, 0, 0, 0, 0, 0, 0, -10],
    [-10, 0, 5, 10, 10, 5, 0, -10],
    [-10, 5, 5, 10, 10, 5, 5, -10],
    [-10, 0, 10, 10, 10, 10, 0, -10],
    [-10, 10, 10, 10, 10, 10, 10, -10],
    [-10, 5, 0, 0, 0, 0, 5, -10],
    [-20, -10, -10, -10, -10, -10, -10, -20],
  ],
  r: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [5, 10, 10, 10, 10, 10, 10, 5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [0, 0, 0, 5, 5, 0, 0, 0],
  ],
  q: [
    [-20, -10, -10, -5, -5, -10, -10, -20],
    [-10, 0, 0, 0, 0, 0, 0, -10],
    [-10, 0, 5, 5, 5, 5, 0, -10],
    [-5, 0, 5, 5, 5, 5, 0, -5],
    [0, 0, 5, 5, 5, 5, 0, -5],
    [-10, 5, 5, 5, 5, 5, 0, -10],
    [-10, 0, 5, 0, 0, 0, 0, -10],
    [-20, -10, -10, -5, -5, -10, -10, -20],
  ],
  k: [
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-20, -30, -30, -40, -40, -30, -30, -20],
    [-10, -20, -20, -20, -20, -20, -20, -10],
    [20, 20, 0, 0, 0, 0, 20, 20],
    [20, 30, 10, 0, 0, 10, 30, 20],
  ],
};

/**
 * Get a move from the opening book using the comprehensive external library
 * Returns null if position not in book
 */
function getBookMove(game: Chess): Move | null {
  const fen = game.fen();
  const bookMoveStr = getBookMoveFromLib(fen);

  if (bookMoveStr) {
    const moves = game.moves({ verbose: true });
    const move = moves.find(m => `${m.from}${m.to}` === bookMoveStr);
    return move || null;
  }

  return null;
}

/**
 * Move Ordering: Prioritize promising moves for better alpha-beta pruning
 * MVV-LVA: Most Valuable Victim - Least Valuable Attacker
 * Optimized version - removed expensive check detection
 */
function orderMoves(_game: Chess, moves: Move[]): Move[] {
  return moves.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // Prioritize captures (MVV-LVA)
    if (a.captured) {
      scoreA += getPieceValue(a.captured) * 10 - getPieceValue(a.piece);
    }
    if (b.captured) {
      scoreB += getPieceValue(b.captured) * 10 - getPieceValue(b.piece);
    }

    // Prioritize promotions
    if (a.promotion) scoreA += 800;
    if (b.promotion) scoreB += 800;

    return scoreB - scoreA;
  });
}

/**
 * Fast Evaluation Function with:
 * - Material and positional values
 * - King safety (check penalty)
 */
function evaluateBoard(game: Chess, forColor: "w" | "b"): number {
  // Checkmate and draw detection
  if (game.isCheckmate()) {
    return game.turn() === forColor ? -999999 : 999999;
  }
  if (game.isDraw() || game.isStalemate() || game.isThreefoldRepetition()) {
    return 0;
  }

  let score = 0;
  const board = game.board();

  // Material and positional values
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const piece = board[rank][file];
      if (!piece) continue;

      let pieceScore = PIECE_VALUES[piece.type];

      const positionTable = POSITION_BONUS[piece.type];
      if (positionTable) {
        const posRank = piece.color === "w" ? rank : 7 - rank;
        pieceScore += positionTable[posRank][file];
      }

      if (piece.color === forColor) {
        score += pieceScore;
      } else {
        score -= pieceScore;
      }
    }
  }

  // King safety: penalize being in check
  if (game.inCheck()) {
    const currentTurn = game.turn();
    score += currentTurn === forColor ? -50 : 50;
  }

  return score;
}

/**
 * Quiescence Search: Search only tactical moves (captures) until position is quiet
 * Limited depth to prevent excessive branching
 * Uses negamax perspective (always from current player's view)
 */
function quiescence(
  game: Chess,
  alpha: number,
  beta: number,
  qDepth: number = 0
): number {
  // Stand pat: current position evaluation from current player's perspective
  const currentPlayer = game.turn();
  const standPat = evaluateBoard(game, currentPlayer);

  // Beta cutoff: position is too good, opponent won't allow this
  if (standPat >= beta) {
    return beta;
  }

  // Update alpha if standing pat is better
  if (alpha < standPat) {
    alpha = standPat;
  }

  // Limit quiescence depth to prevent explosion
  if (qDepth >= 3) {
    return alpha;
  }

  // Only search captures (tactical moves)
  const allMoves = game.moves({ verbose: true });
  const captures = allMoves.filter(m => m.captured);

  // Simple ordering: just sort by captured piece value (no need for full orderMoves)
  captures.sort((a, b) => {
    const aValue = a.captured ? getPieceValue(a.captured) : 0;
    const bValue = b.captured ? getPieceValue(b.captured) : 0;
    return bValue - aValue;
  });

  for (const move of captures) {
    game.move(move);
    const score = -quiescence(game, -beta, -alpha, qDepth + 1);
    game.undo();

    if (score >= beta) {
      return beta;
    }
    if (score > alpha) {
      alpha = score;
    }
  }

  return alpha;
}

/**
 * Negamax algorithm with alpha-beta pruning and transposition table
 * Simpler and more correct than separate max/min logic
 * Always evaluates from the perspective of the player to move
 *
 * Transposition table provides massive speedup by caching positions
 */
function negamax(
  game: Chess,
  depth: number,
  alpha: number,
  beta: number
): number {
  const originalAlpha = alpha;

  // Probe transposition table
  const fen = game.fen();
  const ttEntry = transpositionTable.get(fen);

  if (ttEntry && ttEntry.depth >= depth) {
    // We've seen this position before at equal or greater depth
    if (ttEntry.flag === 'exact') {
      return ttEntry.score;
    }
    if (ttEntry.flag === 'alpha' && ttEntry.score <= alpha) {
      return alpha;
    }
    if (ttEntry.flag === 'beta' && ttEntry.score >= beta) {
      return beta;
    }
  }

  // At depth 0 or game over, evaluate position
  if (depth === 0 || game.isGameOver()) {
    if (game.isGameOver()) {
      // Checkmate or draw
      if (game.isCheckmate()) {
        // If it's our turn and we're checkmated, return worst score
        return -999999;
      }
      // Draw
      return 0;
    }
    // Use quiescence search to avoid horizon effect
    const qScore = quiescence(game, alpha, beta);

    // Store in transposition table
    transpositionTable.set(fen, {
      score: qScore,
      depth: 0,
      flag: 'exact'
    });

    return qScore;
  }

  // Order moves for better alpha-beta pruning
  const moves = orderMoves(game, game.moves({ verbose: true }));

  let maxScore = -Infinity;
  let bestMove: Move | undefined;

  for (const move of moves) {
    game.move(move);
    const score = -negamax(game, depth - 1, -beta, -alpha);
    game.undo();

    if (score > maxScore) {
      maxScore = score;
      bestMove = move;
    }

    alpha = Math.max(alpha, score);

    if (alpha >= beta) {
      // Beta cutoff - store in transposition table
      transpositionTable.set(fen, {
        score: beta,
        depth,
        flag: 'beta',
        bestMove
      });
      return beta;
    }
  }

  // Store result in transposition table
  const flag = maxScore <= originalAlpha ? 'alpha' : 'exact';
  transpositionTable.set(fen, {
    score: maxScore,
    depth,
    flag,
    bestMove
  });

  return maxScore;
}

function getBestMove(game: Chess, depth: number): Move | null {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  // Clear transposition table for new search
  clearTT();

  const startTime = performance.now();
  const evaluatedMoves: EvaluatedMove[] = [];

  for (const move of moves) {
    game.move(move);
    // Negamax: negate the score from opponent's perspective
    const score = -negamax(game, depth - 1, -Infinity, Infinity);
    game.undo();
    evaluatedMoves.push({ move, score });
  }

  evaluatedMoves.sort((a, b) => b.score - a.score);

  const elapsedTime = (performance.now() - startTime).toFixed(0);
  const bestMove = evaluatedMoves[0];

  console.log(`🤖 AI Move: ${bestMove.move.san} (score: ${bestMove.score})`);
  console.log(`⏱️  Time: ${elapsedTime}ms | Depth: ${depth}`);
  console.log(`💾 Transposition Table: ${transpositionTable.size.toLocaleString()} positions cached`);
  console.log(`📊 Cache efficiency: ${(transpositionTable.size / (transpositionTable.size + moves.length) * 100).toFixed(1)}%`);
  console.log('---');

  return bestMove.move;
}

/**
 * Get AI move based on difficulty level
 * All modes use opening book for strong, instant opening play:
 * - Easy: depth 1 + quiescence (max 3) + opening book
 * - Medium: depth 2 + quiescence (max 3) + opening book
 * - Hard: depth 3 + quiescence (max 3) + opening book
 */
export function getAIMove(game: Chess, difficulty: DifficultyLevel): Move | null {
  // Use opening book for ALL difficulty levels (instant, strong opening play)
  const bookMove = getBookMove(game);
  if (bookMove) {
    return bookMove; // Instant response from book
  }

  // Fall back to calculated moves when out of book
  switch (difficulty) {
    case "easy":
      return getBestMove(game, 1);
    case "medium":
      return getBestMove(game, 2);
    case "hard":
      return getBestMove(game, 3);
    default:
      return getBestMove(game, 2);
  }
}
