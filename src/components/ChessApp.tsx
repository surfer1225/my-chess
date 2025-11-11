import React from "react";
import { ChessBoard } from "./chess/ChessBoard";
import { GameStatus } from "./chess/GameStatus";
import { MoveHistory } from "./chess/MoveHistory";
import { useChessGame } from "../hooks/useChessGame";
import { useResponsiveSquareSize } from "../hooks/useResponsiveSquareSize";
import type { GameMode, DifficultyLevel } from "../types/chess.types";
import { GameModeSelector } from "./chess/GameModeSelector";
import { PromotionDialog } from "./chess/PromotionDialog";

export default function ChessApp() {
  const [gameMode, setGameMode] = React.useState<GameMode>("human-vs-bot");
  const [difficulty, setDifficulty] = React.useState<DifficultyLevel>("hard");

  const handleGameModeChange = (mode: GameMode) => {
    setGameMode(mode);
  };

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
        margin: 0,
        padding: isMobile ? '8px' : '16px',
        background: `
          linear-gradient(90deg, rgba(101, 67, 33, 0.1) 0%, transparent 5%, transparent 95%, rgba(101, 67, 33, 0.1) 100%),
          linear-gradient(0deg, rgba(101, 67, 33, 0.05) 0%, transparent 3%, transparent 97%, rgba(101, 67, 33, 0.05) 100%),
          linear-gradient(135deg, #8B5A2B 0%, #654321 25%, #8B5A2B 50%, #654321 75%, #8B5A2B 100%)
        `,
        backgroundSize: '100% 100%, 100% 100%, 200px 200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '8px' : '16px',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
      }}>
        {/* Left Side - Chess Board */}
        <div className="bg-slate-700/50 rounded-xl shadow-2xl backdrop-blur-sm" style={{ padding: isMobile ? '8px' : '12px' }}>
          {/* Status at Top */}
          <GameStatus status={status} />

          {/* Chess Board */}
          <ChessBoard
            board={board}
            selectedSquare={selectedSquare}
            legalMoves={legalMoves}
            flip={flip}
            squareName={squareName}
            onSquareClick={onSquareClick}
            squareSize={squareSize}
            lastMove={lastMove}
          />
        </div>

        {/* Right Side - Game Mode & Move History */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '8px' : '12px',
          maxHeight: isMobile ? 'auto' : `${squareSize * 8 + 80}px`,
        }}>
          <GameModeSelector
            gameMode={gameMode}
            difficulty={difficulty}
            onGameModeChange={handleGameModeChange}
            onDifficultyChange={handleDifficultyChange}
            squareSize={squareSize}
          />
          <MoveHistory
            history={history}
            squareSize={squareSize}
            onFlip={() => setFlip((f) => !f)}
            onUndo={undo}
            onReset={reset}
            canUndo={history.length > 0}
            gameMode={gameMode}
          />
        </div>
      </div>

      {promotionDialog && (
        <PromotionDialog game={game} onPromote={handlePromotion} />
      )}
    </div>
  );
}
