import wP from '../assets/pieces/wP.svg';
import wR from '../assets/pieces/wR.svg';
import wN from '../assets/pieces/wN.svg';
import wB from '../assets/pieces/wB.svg';
import wQ from '../assets/pieces/wQ.svg';
import wK from '../assets/pieces/wK.svg';
import bP from '../assets/pieces/bP.svg';
import bR from '../assets/pieces/bR.svg';
import bN from '../assets/pieces/bN.svg';
import bB from '../assets/pieces/bB.svg';
import bQ from '../assets/pieces/bQ.svg';
import bK from '../assets/pieces/bK.svg';

import type { ChessPiece, PieceMapKey } from '../types/chess.types';

export const pieceImages: Record<PieceMapKey, string> = {
  p: bP,
  r: bR,
  n: bN,
  b: bB,
  q: bQ,
  k: bK,
  P: wP,
  R: wR,
  N: wN,
  B: wB,
  Q: wQ,
  K: wK,
};

export const getPieceImage = (piece: ChessPiece | null): string | null => {
  if (!piece) return null;
  const key = (piece.color === "w" ? piece.type.toUpperCase() : piece.type) as PieceMapKey;
  return pieceImages[key] || null;
};

export { wP, wR, wN, wB, wQ, wK, bP, bR, bN, bB, bQ, bK };
