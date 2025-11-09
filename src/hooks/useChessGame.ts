import { useState, useEffect, useMemo } from "react";
import { Chess } from "chess.js";
import type { Square, Move, ChessPiece, PromotionDialogState, PromotionPiece } from "../types/chess.types";

export const useChessGame = () => {
  const [game] = useState<Chess>(() => new Chess());
  const [board, setBoard] = useState<(ChessPiece | null)[][]>(game.board());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [history, setHistory] = useState<Move[]>([]);
  const [flip, setFlip] = useState<boolean>(false);
  const [promotionDialog, setPromotionDialog] = useState<PromotionDialogState | null>(null);

  useEffect(() => {
    setBoard(game.board());
    setHistory(game.history({ verbose: true }));
  }, [game]);

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
          setBoard(game.board());
          setHistory(game.history({ verbose: true }));
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
    setBoard(game.board());
    setHistory([]);
    setSelectedSquare(null);
    setLegalMoves([]);
  };

  const undo = (): void => {
    game.undo();
    setBoard(game.board());
    setHistory(game.history({ verbose: true }));
    setSelectedSquare(null);
    setLegalMoves([]);
  };

  const handlePromotion = (piece: PromotionPiece): void => {
    if (!promotionDialog) return;

    try {
      game.move({ from: promotionDialog.from, to: promotionDialog.to, promotion: piece });
      setBoard(game.board());
      setHistory(game.history({ verbose: true }));
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

  const sideToMove = game.turn() === "w" ? "White" : "Black";

  const status = useMemo(() => {
    if (game.isCheckmate()) {
      return `Checkmate — ${game.turn() === "w" ? "Black" : "White"} wins!`;
    }
    if (game.isDraw()) return "Draw";
    if (game.isStalemate()) return "Stalemate";
    if (game.isThreefoldRepetition()) return "Draw by threefold repetition";
    if (game.isInsufficientMaterial()) return "Draw by insufficient material";
    if (game.inCheck()) return `${sideToMove} in check`;
    return `${sideToMove} to move`;
  }, [board, sideToMove, game]);

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
  };
};
