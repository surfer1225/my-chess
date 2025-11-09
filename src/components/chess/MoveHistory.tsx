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
    <div 
      className="bg-gradient-to-br from-slate-700/60 to-slate-800/60 p-6 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-600/20" 
      style={{ width: '400px', height: 'fit-content' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-600/30">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Move History</h2>
        </div>
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 px-4 py-1.5 rounded-full">
          <span className="text-indigo-200 text-sm font-semibold">
            {Math.ceil(history.length / 2)} {Math.ceil(history.length / 2) === 1 ? 'move' : 'moves'}
          </span>
        </div>
      </div>

      {/* Moves List */}
      <div 
        className="bg-slate-900/40 rounded-xl p-4 mb-5 border border-slate-700/50 shadow-inner" 
        style={{ 
          height: '520px', 
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#475569 #1e293b'
        }}
      >
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <div className="bg-slate-800/50 p-4 rounded-full mb-4">
              <svg className="w-16 h-16 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-base font-medium mb-1">No moves yet</span>
            <span className="text-sm text-slate-500">Start playing to see your moves here</span>
          </div>
        ) : (
          <div className="space-y-2">
            {movePairs.map((movePair, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-700/40 transition-all duration-200 group border border-transparent hover:border-slate-600/30"
              >
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/40 px-3 py-1 rounded-md shadow-sm min-w-[42px] text-center">
                  <span className="text-slate-300 font-bold text-sm">
                    {i + 1}
                  </span>
                </div>
                <div className="flex-1 flex gap-2">
                  <div className="flex-1 bg-gradient-to-br from-slate-700/60 to-slate-800/60 hover:from-slate-600/60 hover:to-slate-700/60 transition-all duration-200 px-4 py-2 rounded-lg border border-slate-600/30 shadow-sm">
                    <span className="text-white font-mono text-base font-semibold tracking-wide">
                      {movePair[0].san}
                    </span>
                  </div>
                  {movePair[1] ? (
                    <div className="flex-1 bg-gradient-to-br from-slate-700/60 to-slate-800/60 hover:from-slate-600/60 hover:to-slate-700/60 transition-all duration-200 px-4 py-2 rounded-lg border border-slate-600/30 shadow-sm">
                      <span className="text-white font-mono text-base font-semibold tracking-wide">
                        {movePair[1].san}
                      </span>
                    </div>
                  ) : (
                    <div className="flex-1 bg-slate-800/20 rounded-lg border border-slate-700/20"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          className="w-full px-5 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:via-blue-600 hover:to-indigo-600 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg shadow-blue-900/40 hover:shadow-blue-800/50 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={onCopyPGN}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy PGN</span>
        </button>
        <button
          className="w-full px-5 py-3 bg-gradient-to-r from-emerald-600 via-green-700 to-teal-700 hover:from-emerald-500 hover:via-green-600 hover:to-teal-600 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg shadow-emerald-900/40 hover:shadow-emerald-800/50 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={onLoadFEN}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span>Load FEN</span>
        </button>
      </div>
    </div>
  );
};
