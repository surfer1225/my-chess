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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="flex flex-col xl:flex-row gap-8 items-start justify-center">
        {/* Left Side - Chess Board */}
        <div className="bg-slate-700/50 p-6 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Chess</h1>
            <GameControls
              onFlip={() => setFlip((f) => !f)}
              onUndo={undo}
              onReset={reset}
              canUndo={history.length > 0}
            />
          </div>

          <ChessBoard
            board={board}
            selectedSquare={selectedSquare}
            legalMoves={legalMoves}
            flip={flip}
            squareName={squareName}
            onSquareClick={onSquareClick}
          />

          <GameStatus status={status} />
        </div>

        {/* Right Side - Move History */}
        <MoveHistory
          history={history}
          onCopyPGN={handleCopyPGN}
          onLoadFEN={handleLoadFEN}
        />
      </div>

      {promotionDialog && (
        <PromotionDialog game={game} onPromote={handlePromotion} />
      )}
    </div>
  );
}
