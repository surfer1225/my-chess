import React from "react";
import { Square } from "./Square";
import type { Square as SquareType, ChessPiece } from "../../types/chess.types";

interface ChessBoardProps {
  board: (ChessPiece | null)[][];
  selectedSquare: SquareType | null;
  legalMoves: SquareType[];
  flip: boolean;
  squareName: (rankIdx: number, fileIdx: number) => SquareType;
  onSquareClick: (rankIdx: number, fileIdx: number) => void;
  squareSize: number;
  lastMove: { from: SquareType; to: SquareType } | null;
}

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const ChessBoard: React.FC<ChessBoardProps> = ({
  board,
  selectedSquare,
  legalMoves,
  flip,
  squareName,
  onSquareClick,
  squareSize,
  lastMove,
}) => {
  const displayFiles = flip ? [...files].reverse() : files;
  const displayRanks = flip ? [...ranks].reverse() : ranks;
  const fontSize = Math.max(14, squareSize * 0.18);
  const coordOffset = squareSize * 0.4;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Rank numbers */}
        <div
          style={{
            position: 'absolute',
            left: `-${coordOffset}px`,
            top: '4px',
            display: 'flex',
            flexDirection: 'column',
            fontSize: `${fontSize}px`,
            fontWeight: 'bold',
            color: '#cbd5e1',
          }}
        >
          {displayRanks.map((rank) => (
            <div
              key={rank}
              style={{
                height: `${squareSize}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: `${coordOffset * 0.7}px`,
              }}
            >
              {rank}
            </div>
          ))}
        </div>

        {/* Chess Board Grid */}
        <div
          style={{
            border: '4px solid #1e293b',
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(8, ${squareSize}px)`,
              gridTemplateRows: `repeat(8, ${squareSize}px)`,
            }}
          >
            {board.map((row, rankIdx) =>
              row.map((piece, fileIdx) => {
                const rIdx = flip ? 7 - rankIdx : rankIdx;
                const fIdx = flip ? 7 - fileIdx : fileIdx;
                const sq = squareName(rIdx, fIdx);
                const isDark = (rIdx + fIdx) % 2 === 1;
                const isSelected = selectedSquare === sq;
                const isLegal = legalMoves.includes(sq);
                const isLastMoveSquare = !!(lastMove && (lastMove.from === sq || lastMove.to === sq));

                return (
                  <Square
                    key={sq}
                    square={sq}
                    piece={piece}
                    isDark={isDark}
                    isSelected={isSelected}
                    isLegal={isLegal}
                    onClick={() => onSquareClick(rIdx, fIdx)}
                    squareSize={squareSize}
                    isLastMoveSquare={isLastMoveSquare}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* File letters */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '10px',
          fontSize: `${fontSize}px`,
          fontWeight: 'bold',
          color: '#cbd5e1',
        }}
      >
        {displayFiles.map((file) => (
          <div key={file} style={{ width: `${squareSize}px`, textAlign: 'center' }}>
            {file}
          </div>
        ))}
      </div>
    </div>
  );
};
