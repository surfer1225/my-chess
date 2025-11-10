import React from "react";
import { useChessGame } from "../hooks/useChessGame";
import { ChessBoard } from "./chess/ChessBoard";
import { GameControls } from "./chess/GameControls";
import { GameStatus } from "./chess/GameStatus";
import { MoveHistory } from "./chess/MoveHistory";
import { PromotionDialog } from "./chess/PromotionDialog";

export default function ChessApp() {
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
    exportPGN,
    importFEN,
  } = useChessGame();

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

  // Calculate responsive square size - maximize board size
  const calculateSquareSize = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Base calculation on viewport - maximize space usage
    if (viewportWidth < 768) {
      // Mobile: use most of width
      return Math.min(Math.floor((viewportWidth - 60) / 8), Math.floor((viewportHeight - 250) / 8));
    } else {
      // Desktop: calculate based on available space
      // Reserve space for move history (~400px) and margins (~100px)
      const availableWidth = viewportWidth - 500;
      const availableHeight = viewportHeight - 180;

      const maxSquareFromWidth = Math.floor(availableWidth / 8);
      const maxSquareFromHeight = Math.floor(availableHeight / 8);
      return Math.min(maxSquareFromWidth, maxSquareFromHeight, 110);
    }
  };

  const [squareSize, setSquareSize] = React.useState(calculateSquareSize());

  React.useEffect(() => {
    const handleResize = () => {
      setSquareSize(calculateSquareSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = squareSize < 70;

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
          />

          {/* Controls at Bottom */}
          <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
            <GameControls
              onFlip={() => setFlip((f) => !f)}
              onUndo={undo}
              onReset={reset}
              canUndo={history.length > 0}
            />
          </div>
        </div>

        {/* Right Side - Move History */}
        <MoveHistory
          history={history}
          onCopyPGN={handleCopyPGN}
          onLoadFEN={handleLoadFEN}
          squareSize={squareSize}
        />
      </div>

      {promotionDialog && (
        <PromotionDialog game={game} onPromote={handlePromotion} />
      )}
    </div>
  );
}
