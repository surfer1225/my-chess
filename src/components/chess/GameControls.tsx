import React from "react";

interface GameControlsProps {
  onFlip: () => void;
  onUndo: () => void;
  onReset: () => void;
  canUndo: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onFlip,
  onUndo,
  onReset,
  canUndo,
}) => {
  return (
    <div className="flex gap-2">
      <button
        className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-md transition-colors text-sm font-medium"
        onClick={onFlip}
      >
        Flip
      </button>
      <button
        className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-md transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-slate-600"
        onClick={onUndo}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-md transition-colors text-sm font-medium"
        onClick={onReset}
      >
        New Game
      </button>
    </div>
  );
};
