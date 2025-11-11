import React from "react";
import { ChessBoard } from "./chess/ChessBoard";
import { GameStatus } from "./chess/GameStatus";
import { MoveHistory } from "./chess/MoveHistory";
import { useChessGame } from "../hooks/useChessGame";
import { useResponsiveSquareSize } from "../hooks/useResponsiveSquareSize";
import type { GameMode, DifficultyLevel } from "../types/chess.types";
import { PromotionDialog } from "./chess/PromotionDialog";

export default function ChessApp() {
  // Always play against bot (removed game mode selection)
  const gameMode: GameMode = "human-vs-bot";
  const [difficulty, setDifficulty] = React.useState<DifficultyLevel>("hard");

  const handleDifficultyChange = (diff: DifficultyLevel) => {
    setDifficulty(diff);
  };

  const {
    game,
    board,
    selectedSquare,
    legalMoves,
    history,
    flip,
    promotionDialog,
    status,
    squareName,
    onSquareClick,
    reset,
    undo,
    setFlip,
    handlePromotion,
    lastMove,
  } = useChessGame({ gameMode, difficulty });

  // Use custom hook for responsive sizing
  const { squareSize, isMobile } = useResponsiveSquareSize();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: `
          linear-gradient(90deg,
            rgba(101, 67, 33, 0.8) 0%,
            rgba(139, 90, 43, 0.8) 25%,
            rgba(160, 102, 50, 0.8) 50%,
            rgba(139, 90, 43, 0.8) 75%,
            rgba(101, 67, 33, 0.8) 100%
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 4px
          ),
          linear-gradient(
            180deg,
            #8B5A2B 0%,
            #A0662F 20%,
            #8B5A2B 40%,
            #6B4423 60%,
            #8B5A2B 80%,
            #A0662F 100%
          )
        `,
        backgroundSize: '100% 100%, 3px 100%, 100% 100%',
        boxShadow: 'inset 0 0 200px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '20px 10px' : '40px 20px',
        gap: isMobile ? '20px' : '40px',
        boxSizing: 'border-box',
        overflow: 'auto',
      }}
    >
      {/* Main Game Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <GameStatus status={status} />
        <ChessBoard
          board={board}
          squareSize={squareSize}
          selectedSquare={selectedSquare}
          legalMoves={legalMoves}
          flip={flip}
          onSquareClick={onSquareClick}
          squareName={squareName}
          lastMove={lastMove}
        />
      </div>

      {/* Right Panel: Difficulty + Move History */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {isMobile && (
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={reset} style={{
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#ffffff',
              background: 'rgba(239, 68, 68, 0.9)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}>
              New Game
            </button>
            <button onClick={undo} disabled={history.length === 0} style={{
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 500,
              color: history.length > 0 ? '#ffffff' : '#94a3b8',
              background: history.length > 0 ? 'rgba(59, 130, 246, 0.9)' : 'rgba(71, 85, 105, 0.5)',
              border: 'none',
              borderRadius: '8px',
              cursor: history.length > 0 ? 'pointer' : 'not-allowed',
            }}>
              Undo
            </button>
            <button onClick={() => setFlip(!flip)} style={{
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#ffffff',
              background: 'rgba(71, 85, 105, 0.9)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}>
              Flip Board
            </button>
          </div>
        )}

        <div style={{ maxHeight: isMobile ? 'auto' : `${squareSize * 8 + 80}px` }}>
          {/* Difficulty Selector */}
          <div style={{
            padding: squareSize < 70 ? '10px 12px' : '12px 16px',
            background: 'rgba(51, 65, 85, 0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            marginBottom: '16px',
          }}>
            <h3 style={{
              margin: '0 0 10px 0',
              fontSize: squareSize < 70 ? '14px' : '15px',
              fontWeight: 600,
              color: '#ffffff',
            }}>
              Difficulty
            </h3>
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => handleDifficultyChange(level)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: squareSize < 70 ? '12px' : '13px',
                    fontWeight: 500,
                    color: difficulty === level ? '#ffffff' : '#94a3b8',
                    background: difficulty === level
                      ? (level === 'easy' ? '#22c55e' : level === 'medium' ? '#f59e0b' : '#ef4444')
                      : 'rgba(71, 85, 105, 0.3)',
                    border: difficulty === level ? 'none' : '1px solid rgba(148, 163, 184, 0.3)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textTransform: 'capitalize',
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <MoveHistory
            gameMode={gameMode}
            history={history}
            squareSize={squareSize}
            onFlip={() => setFlip(!flip)}
            onUndo={undo}
            onReset={reset}
            canUndo={history.length > 0}
          />
        </div>
      </div>

      {promotionDialog && (
        <PromotionDialog
          game={game}
          onPromote={handlePromotion}
        />
      )}
    </div>
  );
}
