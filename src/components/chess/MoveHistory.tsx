import React from "react";
import type { Move } from "../../types/chess.types";

interface MoveHistoryProps {
  history: Move[];
  onCopyPGN: () => void;
  onLoadFEN: () => void;
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({
  history,
  onCopyPGN,
  onLoadFEN,
}) => {
  const movePairs = history.reduce((acc: Move[][], move, i) => {
    if (i % 2 === 0) {
      acc.push([move]);
    } else {
      acc[acc.length - 1].push(move);
    }
    return acc;
  }, []);

  return (
    <div className="bg-slate-700/50 p-6 rounded-lg shadow-2xl backdrop-blur-sm lg:w-80">
      <h2 className="text-xl font-bold text-white mb-4">Move History</h2>

      <div className="bg-slate-800/50 rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {history.length === 0 ? (
          <div className="text-slate-400 text-center py-8">No moves yet</div>
        ) : (
          <div className="space-y-2">
            {movePairs.map((movePair, i) => (
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
          onClick={onCopyPGN}
        >
          Copy PGN
        </button>
        <button
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md transition-colors font-medium"
          onClick={onLoadFEN}
        >
          Load FEN
        </button>
      </div>
    </div>
  );
};
