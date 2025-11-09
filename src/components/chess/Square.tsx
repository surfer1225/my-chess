import React from "react";
import type { Square as SquareType, ChessPiece } from "../../types/chess.types";
import { getPieceImage } from "../../utils/pieceImages";

interface SquareProps {
  square: SquareType;
  piece: ChessPiece | null;
  isDark: boolean;
  isSelected: boolean;
  isLegal: boolean;
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({
  square,
  piece,
  isDark,
  isSelected,
  isLegal,
  onClick,
}) => {
  const pieceImage = getPieceImage(piece);

  return (
    <button
      onClick={onClick}
      style={{
        width: '80px',
        height: '80px',
        backgroundColor: isDark ? '#b58863' : '#f0d9b5',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: isSelected ? 'inset 0 0 0 4px #fbbf24' : 'none',
        padding: '6px',
      }}
      aria-label={square}
    >
      {pieceImage && (
        <img
          src={pieceImage}
          alt={piece ? `${piece.color} ${piece.type}` : ''}
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      )}
      {isLegal && !piece && (
        <div
          style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '50%',
          }}
        ></div>
      )}
      {isLegal && piece && (
        <div
          style={{
            position: 'absolute',
            inset: '6px',
            border: '4px solid rgba(0, 0, 0, 0.3)',
            borderRadius: '50%',
          }}
        ></div>
      )}
    </button>
  );
};
