import React from "react";
import type { Move } from "../../types/chess.types";

interface MoveHistoryProps {
  history: Move[];
  onCopyPGN: () => void;
  onLoadFEN: () => void;
  squareSize: number;
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({
  history,
  onCopyPGN,
  onLoadFEN,
  squareSize,
}) => {
  const movePairs = history.reduce((acc: Move[][], move, i) => {
    if (i % 2 === 0) {
      acc.push([move]);
    } else {
      acc[acc.length - 1].push(move);
    }
    return acc;
  }, []);

  // Responsive sizing based on square size
  const panelWidth = Math.max(300, squareSize * 4);
  const historyHeight = Math.max(400, squareSize * 7.1);

  return (
    <div
      className="bg-slate-800/80 rounded-xl shadow-2xl backdrop-blur-sm border border-slate-700/50"
      style={{ width: `${panelWidth}px`, height: 'fit-content', maxWidth: '100%', padding: squareSize < 70 ? '12px' : '16px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-600/50" style={{ marginBottom: '12px' }}>
        <h2 className={`font-bold text-white ${squareSize < 70 ? 'text-base' : 'text-lg'}`}>Moves</h2>
      </div>

      {/* Moves Table */}
      <div
        style={{
          height: `${historyHeight}px`,
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#475569 #1e293b',
          marginBottom: '12px'
        }}
      >
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <span className="text-sm">No moves yet</span>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{
                backgroundColor: 'rgba(51, 65, 85, 0.5)',
                borderBottom: '1px solid rgba(148, 163, 184, 0.2)'
              }}>
                <th style={{
                  padding: '8px 4px',
                  textAlign: 'center',
                  color: '#cbd5e1',
                  fontWeight: '600',
                  fontSize: '13px',
                  width: '50px'
                }}>#</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  color: '#cbd5e1',
                  fontWeight: '600',
                  fontSize: '13px'
                }}>White</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  color: '#cbd5e1',
                  fontWeight: '600',
                  fontSize: '13px'
                }}>Black</th>
              </tr>
            </thead>
            <tbody>
              {movePairs.map((movePair, i) => (
                <tr
                  key={i}
                  style={{
                    backgroundColor: i % 2 === 0 ? 'rgba(51, 65, 85, 0.3)' : 'transparent',
                    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                  }}
                  className="hover:bg-slate-700/40 transition-colors"
                >
                  <td style={{
                    padding: '8px 4px',
                    textAlign: 'center',
                    color: '#94a3b8',
                    fontWeight: '600',
                    fontSize: '13px'
                  }}>
                    {i + 1}
                  </td>
                  <td style={{
                    padding: '8px 12px',
                    color: '#f1f5f9',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {movePair[0].san}
                  </td>
                  <td style={{
                    padding: '8px 12px',
                    color: '#f1f5f9',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {movePair[1] ? movePair[1].san : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium text-sm"
          onClick={onCopyPGN}
        >
          Copy PGN
        </button>
        <button
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors font-medium text-sm"
          onClick={onLoadFEN}
        >
          Load FEN
        </button>
      </div>
    </div>
  );
};
