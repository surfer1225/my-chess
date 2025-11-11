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
  squareSize: number;
  isLastMoveSquare: boolean;
}

export const Square: React.FC<SquareProps> = ({
  square,
  piece,
  isDark,
  isSelected,
  isLegal,
  onClick,
  squareSize,
  isLastMoveSquare,
}) => {
  const pieceImage = getPieceImage(piece);

  const getBackgroundColor = () => {
    if (isLastMoveSquare) {
      return isDark ? '#baca44' : '#cdd26a';
    }
    return isDark ? '#b58863' : '#f0d9b5';
  };

  return (
    <button
      onClick={onClick}
      style={{
        width: `${squareSize}px`,
        height: `${squareSize}px`,
        backgroundColor: getBackgroundColor(),
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: isSelected ? `inset 0 0 0 ${Math.max(3, squareSize * 0.04)}px #fbbf24` : 'none',
        padding: `${squareSize * 0.07}px`,
        transition: 'background-color 0.2s ease-in-out',
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
            animation: isLastMoveSquare && piece ? 'pieceMove 0.3s ease-out' : 'none',
          }}
        />
      )}
      {isLegal && !piece && (
        <div
          style={{
            position: 'absolute',
            width: '22px',
            height: '22px',
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
