/**
 * Chess Utility Functions
 *
 * Common helpers for chess board operations, square conversions, and color logic
 */

import type { Square } from "../types/chess.types";
import { FILES, COLORS } from "./constants";

/**
 * Convert chess square notation to board array indices
 *
 * @param square - Square in chess notation (e.g., "e4")
 * @returns [rank, file] indices for 2D board array (0-indexed)
 *
 * @example
 * squareToIndices("e4") // Returns [4, 4]
 * squareToIndices("a1") // Returns [7, 0]
 */
export function squareToIndices(square: Square): [number, number] {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0); // 'a' = 0, 'b' = 1, etc.
  const rank = 8 - parseInt(square[1]); // '8' = 0, '7' = 1, etc. (array is top-down)
  return [rank, file];
}

/**
 * Convert board array indices to chess square notation
 *
 * @param rank - Rank index (0-7, where 0 is rank 8)
 * @param file - File index (0-7, where 0 is 'a')
 * @returns Square in chess notation
 *
 * @example
 * indicesToSquare(4, 4) // Returns "e4"
 * indicesToSquare(7, 0) // Returns "a1"
 */
export function indicesToSquare(rank: number, file: number): Square {
  const fileChar = FILES[file];
  const rankNum = 8 - rank;
  return `${fileChar}${rankNum}` as Square;
}

/**
 * Determine if a square is dark or light
 *
 * @param rank - Rank index (0-7)
 * @param file - File index (0-7)
 * @returns true if square is dark, false if light
 *
 * @example
 * isDarkSquare(0, 0) // Returns true (a8 is dark)
 * isDarkSquare(7, 7) // Returns true (h1 is dark)
 * isDarkSquare(0, 1) // Returns false (b8 is light)
 */
export function isDarkSquare(rank: number, file: number): boolean {
  return (rank + file) % 2 !== 0;
}

/**
 * Get background color for a chess square based on its state
 *
 * @param isDark - Whether the square is dark
 * @param isLastMove - Whether this square was part of the last move
 * @param isSelected - Whether this square is currently selected
 * @param isLegalMove - Whether this square is a legal move destination
 * @returns CSS color string
 *
 * @example
 * getSquareColor(true, false, false, false) // Returns dark square color
 * getSquareColor(false, true, false, false) // Returns light square last move color
 */
export function getSquareColor(
  isDark: boolean,
  isLastMove: boolean,
  isSelected: boolean,
  isLegalMove: boolean
): string {
  // Priority order: last move > selected > legal move > default
  if (isLastMove) {
    return isDark ? COLORS.LAST_MOVE_DARK : COLORS.LAST_MOVE_LIGHT;
  }
  if (isSelected) {
    return COLORS.SELECTED;
  }
  if (isLegalMove) {
    return COLORS.LEGAL_MOVE;
  }
  return isDark ? COLORS.DARK_SQUARE : COLORS.LIGHT_SQUARE;
}

/**
 * Check if a square notation is valid
 *
 * @param square - Square string to validate
 * @returns true if valid chess square notation
 *
 * @example
 * isValidSquare("e4") // Returns true
 * isValidSquare("z9") // Returns false
 * isValidSquare("e") // Returns false
 */
export function isValidSquare(square: string): square is Square {
  if (square.length !== 2) return false;

  const file = square[0];
  const rank = square[1];

  return (
    file >= 'a' && file <= 'h' &&
    rank >= '1' && rank <= '8'
  );
}

/**
 * Get the opposite color
 *
 * @param color - Current color ('w' or 'b')
 * @returns Opposite color
 *
 * @example
 * getOppositeColor('w') // Returns 'b'
 * getOppositeColor('b') // Returns 'w'
 */
export function getOppositeColor(color: 'w' | 'b'): 'w' | 'b' {
  return color === 'w' ? 'b' : 'w';
}

/**
 * Get human-readable color name
 *
 * @param color - Color code ('w' or 'b')
 * @returns Color name ("White" or "Black")
 *
 * @example
 * getColorName('w') // Returns "White"
 * getColorName('b') // Returns "Black"
 */
export function getColorName(color: 'w' | 'b'): string {
  return color === 'w' ? 'White' : 'Black';
}

/**
 * Check if a position is a promotion rank
 *
 * @param square - Square to check
 * @param color - Color of the piece
 * @returns true if the square is a promotion rank for that color
 *
 * @example
 * isPromotionRank("e8", "w") // Returns true
 * isPromotionRank("e1", "b") // Returns true
 * isPromotionRank("e4", "w") // Returns false
 */
export function isPromotionRank(square: Square, color: 'w' | 'b'): boolean {
  const rank = square[1];
  return (color === 'w' && rank === '8') || (color === 'b' && rank === '1');
}

/**
 * Parse FEN string to extract specific components
 *
 * @param fen - FEN string
 * @returns Parsed FEN components
 *
 * @example
 * parseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
 * // Returns: { position: "...", turn: "w", castling: "KQkq", ... }
 */
export function parseFEN(fen: string) {
  const parts = fen.split(' ');
  return {
    position: parts[0],
    turn: parts[1] as 'w' | 'b',
    castling: parts[2],
    enPassant: parts[3],
    halfMoves: parseInt(parts[4] || '0'),
    fullMoves: parseInt(parts[5] || '1'),
  };
}
