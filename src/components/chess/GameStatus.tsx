import React from "react";

interface GameStatusProps {
  status: string;
}

export const GameStatus: React.FC<GameStatusProps> = ({ status }) => {
  return (
    <div style={{ marginBottom: '8px', textAlign: 'center' }}>
      <div className="inline-block bg-slate-600/50 px-4 py-2 rounded-lg">
        <div className="text-white font-semibold text-sm">{status}</div>
      </div>
    </div>
  );
};
