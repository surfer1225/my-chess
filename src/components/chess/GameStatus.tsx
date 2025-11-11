import React from "react";

interface GameStatusProps {
  status: string;
}

export const GameStatus: React.FC<GameStatusProps> = ({ status }) => {
  return (
    <div style={{ marginBottom: '12px', textAlign: 'center' }}>
      <div style={{
        display: 'inline-block',
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        padding: '12px 24px',
        borderRadius: '10px',
        border: '2px solid rgba(71, 85, 105, 0.5)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(8px)'
      }}>
        <div style={{
          color: '#ffffff',
          fontWeight: '700',
          fontSize: '16px',
          letterSpacing: '0.5px'
        }}>
          {status}
        </div>
      </div>
    </div>
  );
};
