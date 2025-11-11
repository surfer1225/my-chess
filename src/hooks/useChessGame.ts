import { useState, useEffect, useMemo, useCallback } from "react";
import { Chess } from "chess.js";
import type { Square, Move, ChessPiece, PromotionDialogState, PromotionPiece, GameMode, DifficultyLevel } from "../types/chess.types";
import { getAIMove } from "../utils/chessAI";

interface UseChessGameProps {
  gameMode: GameMode;
  difficulty: DifficultyLevel;
}

export const useChessGame = ({ gameMode, difficulty }: UseChessGameProps) => {
  const [game] = useState<Chess>(() => new Chess());
  const [board, setBoard] = useState<(ChessPiece | null)[][]>(game.board());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [history, setHistory] = useState<Move[]>([]);
  const [flip, setFlip] = useState<boolean>(false);
  const [promotionDialog, setPromotionDialog] = useState<PromotionDialogState | null>(null);
  const [isAIThinking, setIsAIThinking] = useState<boolean>(false);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);

  /**
   * Update game state from current game instance
   * Centralized helper to avoid duplication
   */
  const updateGameState = useCallback(() => {
    setBoard(game.board());
    setHistory(game.history({ verbose: true }));
  }, [game]);

  useEffect(() => {
    updateGameState();
  }, [updateGameState]);

  const squareName = (rankIdx: number, fileIdx: number): Square => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const file = files[fileIdx];
    const rank = 8 - rankIdx;
    return `${file}${rank}` as Square;
  };

  const onSquareClick = (rankIdx: number, fileIdx: number): void => {
    const sq = squareName(rankIdx, fileIdx);

    if (selectedSquare === sq) {
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    const piece = game.get(sq);

    if (selectedSquare) {
      const moves = game.moves({ square: selectedSquare, verbose: true });
      const isLegal = moves.some((m) => m.to === sq);

      if (isLegal) {
        const movingPiece = game.get(selectedSquare);
        const isPromotion =
          movingPiece?.type === "p" &&
          ((movingPiece.color === "w" && sq[1] === "8") ||
            (movingPiece.color === "b" && sq[1] === "1"));

        if (isPromotion) {
          setPromotionDialog({ from: selectedSquare, to: sq });
          return;
        }

        try {
          game.move({ from: selectedSquare, to: sq });
          updateGameState();
          setLastMove({ from: selectedSquare, to: sq });
          setSelectedSquare(null);
          setLegalMoves([]);
        } catch (error) {
          console.error("Move failed:", error);
        }
        return;
      }
    }

    if (piece && piece.color === game.turn()) {
      setSelectedSquare(sq);
      const moves = game.moves({ square: sq, verbose: true });
      setLegalMoves(moves.map((m) => m.to));
    } else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };

  const reset = (): void => {
    game.reset();
    updateGameState();
    setSelectedSquare(null);
    setLegalMoves([]);
    setLastMove(null);
  };

  const undo = (): void => {
    game.undo();
    updateGameState();
    setSelectedSquare(null);
    setLegalMoves([]);

    const newHistory = game.history({ verbose: true });
    if (newHistory.length > 0) {
      const lastHistoryMove = newHistory[newHistory.length - 1];
      setLastMove({ from: lastHistoryMove.from, to: lastHistoryMove.to });
    } else {
      setLastMove(null);
    }
  };

  const handlePromotion = (piece: PromotionPiece): void => {
    if (!promotionDialog) return;

    try {
      game.move({ from: promotionDialog.from, to: promotionDialog.to, promotion: piece });
      updateGameState();
      setSelectedSquare(null);
      setLegalMoves([]);
      setPromotionDialog(null);
    } catch (error) {
      console.error("Promotion failed:", error);
      setPromotionDialog(null);
    }
  };

  const exportPGN = (): string => {
    return game.pgn();
  };

  const importFEN = (fen: string): void => {
    try {
      game.load(fen);
      setBoard(game.board());
      setHistory(game.history({ verbose: true }));
      setSelectedSquare(null);
      setLegalMoves([]);
    } catch (error) {
      alert("Invalid FEN");
      console.error("FEN import error:", error);
    }
  };

  const makeAIMove = useCallback(() => {
    if (gameMode !== "human-vs-bot" || isAIThinking || game.isGameOver()) return;
    if (game.turn() !== "b") return;

    setIsAIThinking(true);

    setTimeout(() => {
      const aiMove = getAIMove(game, difficulty);
      if (aiMove) {
        game.move(aiMove);
        setBoard(game.board());
        setHistory(game.history({ verbose: true }));
        setLastMove({ from: aiMove.from, to: aiMove.to });
      }
      setIsAIThinking(false);
    }, 300);
  }, [game, gameMode, difficulty, isAIThinking]);

  useEffect(() => {
    makeAIMove();
  }, [board, makeAIMove]);

  const sideToMove = game.turn() === "w" ? "White" : "Black";

  const status = useMemo(() => {
    if (isAIThinking) return "AI is thinking...";
    if (game.isCheckmate()) {
      return `Checkmate — ${game.turn() === "w" ? "Black" : "White"} wins!`;
    }
    if (game.isDraw()) return "Draw";
    if (game.isStalemate()) return "Stalemate";
    if (game.isThreefoldRepetition()) return "Draw by threefold repetition";
    if (game.isInsufficientMaterial()) return "Draw by insufficient material";
    if (game.inCheck()) return `${sideToMove} in check`;
    return `${sideToMove} to move`;
  }, [board, sideToMove, game, isAIThinking]);

  return {
    game,
    board,
    selectedSquare,
    legalMoves,
    history,
    flip,
    promotionDialog,
    status,
    squareName,
    onSquareClick,
    reset,
    undo,
    setFlip,
    handlePromotion,
    exportPGN,
    importFEN,
    isAIThinking,
    lastMove,
  };
};
