import React from "react";

interface GameStatusProps {
  status: string;
}

export const GameStatus: React.FC<GameStatusProps> = ({ status }) => {
  return (
    <div className="mt-12 text-center">
      <div className="inline-block bg-slate-600/50 px-6 py-3 rounded-lg">
        <div className="text-slate-300 text-sm mb-1">Status</div>
        <div className="text-white font-semibold text-lg">{status}</div>
      </div>
    </div>
  );
};
