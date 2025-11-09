import React from "react";
import type { Chess } from "chess.js";
import type { PromotionPiece } from "../../types/chess.types";
import { wQ, wR, wB, wN, bQ, bR, bB, bN } from "../../utils/pieceImages";

interface PromotionDialogProps {
  game: Chess;
  onPromote: (piece: PromotionPiece) => void;
}

const promotionPieces = [
  { piece: "q" as PromotionPiece, whiteImg: wQ, blackImg: bQ, name: "Queen" },
  { piece: "r" as PromotionPiece, whiteImg: wR, blackImg: bR, name: "Rook" },
  { piece: "b" as PromotionPiece, whiteImg: wB, blackImg: bB, name: "Bishop" },
  { piece: "n" as PromotionPiece, whiteImg: wN, blackImg: bN, name: "Knight" },
];

export const PromotionDialog: React.FC<PromotionDialogProps> = ({
  game,
  onPromote,
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-700 rounded-xl p-8 shadow-2xl border-2 border-slate-600">
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          Choose Promotion Piece
        </h3>
        <div className="flex gap-4">
          {promotionPieces.map(({ piece, whiteImg, blackImg, name }) => (
            <button
              key={piece}
              onClick={() => onPromote(piece)}
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
  );
};
