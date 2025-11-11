import type { Square, Move, PieceSymbol, Color } from "chess.js";

export interface ChessPiece {
  type: PieceSymbol;
  color: Color;
}

export type PieceMapKey = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K';

export interface PromotionDialogState {
  from: Square;
  to: Square;
}

export type PromotionPiece = "q" | "r" | "b" | "n";

export type GameMode = "human-vs-human" | "human-vs-bot";

export type DifficultyLevel = "easy" | "medium" | "hard";

export type { Square, Move, PieceSymbol, Color };
