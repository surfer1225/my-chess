import React, { useEffect, useMemo, useState } from "react";
import { Chess } from "chess.js";
import type { Square, Move, PieceSymbol, Color } from "chess.js";

// Import chess piece images
import wP from './assets/pieces/wP.svg';
import wR from './assets/pieces/wR.svg';
import wN from './assets/pieces/wN.svg';
import wB from './assets/pieces/wB.svg';
import wQ from './assets/pieces/wQ.svg';
import wK from './assets/pieces/wK.svg';
import bP from './assets/pieces/bP.svg';
import bR from './assets/pieces/bR.svg';
import bN from './assets/pieces/bN.svg';
import bB from './assets/pieces/bB.svg';
import bQ from './assets/pieces/bQ.svg';
import bK from './assets/pieces/bK.svg';

interface ChessPiece {
  type: PieceSymbol;
  color: Color;
}

type PieceMapKey = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K';

const files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks: string[] = ["8", "7", "6", "5", "4", "3", "2", "1"];

const pieceImages: Record<PieceMapKey, string> = {
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

const getPieceImage = (p: ChessPiece | null): string | null => {
  if (!p) return null;
  const key = (p.color === "w" ? p.type.toUpperCase() : p.type) as PieceMapKey;
  return pieceImages[key] || null;
};

export default function ChessApp() {
  const [game] = useState<Chess>(() => new Chess());
  const [board, setBoard] = useState<(ChessPiece | null)[][]>(game.board());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [history, setHistory] = useState<Move[]>([]);
  const [flip, setFlip] = useState<boolean>(false);
  const [promotionDialog, setPromotionDialog] = useState<{ from: Square; to: Square } | null>(null);

  useEffect(() => {
    setBoard(game.board());
    setHistory(game.history({ verbose: true }));
  }, [game]);

  const squareName = (rankIdx: number, fileIdx: number): Square => {
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
        const isPromotion = movingPiece?.type === "p" &&
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

  const renderSquare = (rankIdx: number, fileIdx: number): React.JSX.Element => {
    const sq = squareName(rankIdx, fileIdx);
    const row = board[rankIdx];
    const piece = row[fileIdx];
    const isDark = (rankIdx + fileIdx) % 2 === 1;
    const isSelected = selectedSquare === sq;
    const isLegal = legalMoves.includes(sq);
    const pieceImage = getPieceImage(piece);

    return (
      <button
        key={sq}
        onClick={() => onSquareClick(rankIdx, fileIdx)}
        style={{
          width: '64px',
          height: '64px',
          backgroundColor: isDark ? '#b58863' : '#f0d9b5',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: isSelected ? 'inset 0 0 0 4px #fbbf24' : 'none',
          padding: '4px',
        }}
        aria-label={sq}
      >
        {pieceImage && (
          <img
            src={pieceImage}
            alt={piece ? `${piece.color} ${piece.type}` : ''}
            style={{
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          />
        )}
        {isLegal && !piece && (
          <div style={{
            position: 'absolute',
            width: '16px',
            height: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '50%'
          }}></div>
        )}
        {isLegal && piece && (
          <div style={{
            position: 'absolute',
            inset: '4px',
            border: '4px solid rgba(0, 0, 0, 0.3)',
            borderRadius: '50%'
          }}></div>
        )}
      </button>
    );
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
  }, [board, sideToMove]);

  const handleCopyPGN = (): void => {
    const pgn = exportPGN();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pgn);
      alert("PGN copied to clipboard");
    } else {
      alert(`PGN: ${pgn}`);
    }
  };

  const handleLoadFEN = (): void => {
    const fen = prompt("Paste FEN to load:");
    if (fen) importFEN(fen);
  };

  const handlePromotion = (piece: "q" | "r" | "b" | "n"): void => {
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

  const displayFiles = flip ? [...files].reverse() : files;
  const displayRanks = flip ? [...ranks].reverse() : ranks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="bg-slate-700/50 p-6 rounded-lg shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Chess</h1>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-md transition-colors text-sm font-medium"
                onClick={() => setFlip((f) => !f)}
              >
                Flip
              </button>
              <button
                className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-md transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-600"
                onClick={undo}
                disabled={history.length === 0}
              >
                Undo
              </button>
              <button
                className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-md transition-colors text-sm font-medium"
                onClick={reset}
              >
                New Game
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {/* Rank numbers - absolutely positioned */}
              <div style={{
                position: 'absolute',
                left: '-28px',
                top: '4px',
                display: 'flex',
                flexDirection: 'column'
              }} className="text-slate-400 text-sm font-medium">
                {displayRanks.map((rank) => (
                  <div key={rank} style={{
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    width: '20px'
                  }}>
                    {rank}
                  </div>
                ))}
              </div>

              {/* Chess Board */}
              <div style={{
                border: '4px solid #1e293b',
                boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 64px)', gridTemplateRows: 'repeat(8, 64px)' }}>
                  {board.map((row, rankIdx) =>
                    row.map((_, fileIdx) => {
                      const rIdx = flip ? 7 - rankIdx : rankIdx;
                      const fIdx = flip ? 7 - fileIdx : fileIdx;
                      return renderSquare(rIdx, fIdx);
                    })
                  )}
                </div>
              </div>
            </div>

            {/* File letters - positioned below board */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '8px'
            }} className="text-slate-400 text-sm font-medium">
              {displayFiles.map((file) => (
                <div key={file} style={{ width: '64px', textAlign: 'center' }}>
                  {file}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-slate-600/50 px-6 py-3 rounded-lg">
              <div className="text-slate-300 text-sm mb-1">Status</div>
              <div className="text-white font-semibold text-lg">{status}</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-700/50 p-6 rounded-lg shadow-2xl backdrop-blur-sm lg:w-80">
          <h2 className="text-xl font-bold text-white mb-4">Move History</h2>

          <div className="bg-slate-800/50 rounded-lg p-4 h-96 overflow-y-auto mb-4">
            {history.length === 0 ? (
              <div className="text-slate-400 text-center py-8">No moves yet</div>
            ) : (
              <div className="space-y-2">
                {history.reduce((acc: Move[][], move, i) => {
                  if (i % 2 === 0) {
                    acc.push([move]);
                  } else {
                    acc[acc.length - 1].push(move);
                  }
                  return acc;
                }, []).map((movePair, i) => (
                  <div key={i} className="flex gap-3 text-slate-200">
                    <span className="text-slate-400 w-8">{i + 1}.</span>
                    <span className="flex-1 font-mono">{movePair[0].san}</span>
                    {movePair[1] && (
                      <span className="flex-1 font-mono">{movePair[1].san}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <button
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors font-medium"
              onClick={handleCopyPGN}
            >
              Copy PGN
            </button>
            <button
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md transition-colors font-medium"
              onClick={handleLoadFEN}
            >
              Load FEN
            </button>
          </div>
        </div>
      </div>

      {promotionDialog && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-700 rounded-xl p-8 shadow-2xl border-2 border-slate-600">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Choose Promotion Piece
            </h3>
            <div className="flex gap-4">
              {[
                { piece: "q", whiteImg: wQ, blackImg: bQ, name: "Queen" },
                { piece: "r", whiteImg: wR, blackImg: bR, name: "Rook" },
                { piece: "b", whiteImg: wB, blackImg: bB, name: "Bishop" },
                { piece: "n", whiteImg: wN, blackImg: bN, name: "Knight" },
              ].map(({ piece, whiteImg, blackImg, name }) => (
                <button
                  key={piece}
                  onClick={() => handlePromotion(piece as "q" | "r" | "b" | "n")}
                  className="w-20 h-20 bg-slate-600 hover:bg-slate-500 border-2 border-slate-500 rounded-lg transition-colors flex items-center justify-center p-2"
                  title={name}
                >
                  <img
                    src={game.turn() === "w" ? whiteImg : blackImg}
                    alt={name}
                    style={{ width: '100%', height: '100%' }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
