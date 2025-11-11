import React from "react";
import type { Move } from "../../types/chess.types";

import type { GameMode } from "../../types/chess.types";

interface MoveHistoryProps {
  history: Move[];
  squareSize: number;
  onFlip: () => void;
  onUndo: () => void;
  onReset: () => void;
  canUndo: boolean;
  gameMode: GameMode;
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({
  history,
  squareSize,
  onFlip,
  onUndo,
  onReset,
  canUndo,
  gameMode,
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
  
  // Adjust height based on game mode (difficulty shown = less space for moves)
  const baseMoveHistoryHeight = gameMode === "human-vs-bot" 
    ? Math.max(320, squareSize * 5.5) 
    : Math.max(400, squareSize * 6.8);
  
  const historyHeight = baseMoveHistoryHeight;

  return (
    <div
      style={{
        width: `${panelWidth}px`,
        height: 'fit-content',
        maxWidth: '100%',
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(71, 85, 105, 0.3)',
        padding: squareSize < 70 ? '12px' : '16px'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-600/50" style={{ marginBottom: '12px' }}>
        <h2 style={{ fontWeight: 'bold', color: '#ffffff', fontSize: squareSize < 70 ? '16px' : '18px' }}>Moves</h2>
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <span style={{ fontSize: '14px', color: '#ffffff' }}>No moves yet</span>
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
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '13px',
                  width: '50px'
                }}>#</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '13px'
                }}>White</th>
                <th style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  color: '#ffffff',
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
                    color: '#ffffff',
                    fontWeight: '600',
                    fontSize: '13px'
                  }}>
                    {i + 1}
                  </td>
                  <td style={{
                    padding: '8px 12px',
                    color: '#ffffff',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {movePair[0].san}
                  </td>
                  <td style={{
                    padding: '8px 12px',
                    color: '#ffffff',
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

      {/* Game Controls - Icon Button Group */}
      <div style={{
        display: 'flex',
        gap: '0',
        justifyContent: 'center',
        backgroundColor: 'rgba(51, 65, 85, 0.5)',
        borderRadius: '8px',
        padding: '4px',
        border: '1px solid rgba(71, 85, 105, 0.5)'
      }}>
        <button
          style={{
            padding: '10px 16px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="hover:bg-slate-600/60"
          onClick={onFlip}
          title="Flip Board"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
        </button>

        <button
          style={{
            padding: '10px 16px',
            backgroundColor: 'transparent',
            border: 'none',
            color: canUndo ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
            cursor: canUndo ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className={canUndo ? 'hover:bg-slate-600/60' : ''}
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo Move"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7v6h6"></path>
            <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path>
          </svg>
        </button>

        <button
          style={{
            padding: '10px 16px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="hover:bg-slate-600/60"
          onClick={onReset}
          title="New Game"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        </button>
      </div>

    </div>
  );
};
