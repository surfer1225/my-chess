import React from "react";
import type { GameMode, DifficultyLevel } from "../../types/chess.types";

interface GameModeSelectorProps {
  gameMode: GameMode;
  difficulty: DifficultyLevel;
  onGameModeChange: (mode: GameMode) => void;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
  squareSize: number;
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({
  gameMode,
  difficulty,
  onGameModeChange,
  onDifficultyChange,
  squareSize,
}) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        borderRadius: "12px",
        padding: squareSize < 70 ? "10px 12px" : "12px 16px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(71, 85, 105, 0.3)",
      }}
    >
      <h3
        style={{
          color: "#ffffff",
          fontSize: squareSize < 70 ? "13px" : "15px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Game Mode
      </h3>

      <div style={{ display: "flex", gap: "6px", marginBottom: gameMode === "human-vs-bot" ? "10px" : "0" }}>
        <button
          onClick={() => onGameModeChange("human-vs-human")}
          style={{
            flex: 1,
            padding: "10px 16px",
            backgroundColor:
              gameMode === "human-vs-human"
                ? "rgba(59, 130, 246, 0.7)"
                : "rgba(51, 65, 85, 0.5)",
            border: "1px solid rgba(71, 85, 105, 0.5)",
            borderRadius: "8px",
            color: "#ffffff",
            fontWeight: gameMode === "human-vs-human" ? "600" : "500",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          className="hover:bg-slate-600/60"
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Human vs Human</span>
          </div>
        </button>

        <button
          onClick={() => onGameModeChange("human-vs-bot")}
          style={{
            flex: 1,
            padding: "10px 16px",
            backgroundColor:
              gameMode === "human-vs-bot"
                ? "rgba(59, 130, 246, 0.7)"
                : "rgba(51, 65, 85, 0.5)",
            border: "1px solid rgba(71, 85, 105, 0.5)",
            borderRadius: "8px",
            color: "#ffffff",
            fontWeight: gameMode === "human-vs-bot" ? "600" : "500",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          className="hover:bg-slate-600/60"
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span>Human vs Bot</span>
          </div>
        </button>
      </div>

      {gameMode === "human-vs-bot" && (
        <div>
          <h4
            style={{
              color: "#ffffff",
              fontSize: squareSize < 70 ? "12px" : "14px",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Difficulty Level
          </h4>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => onDifficultyChange("easy")}
              style={{
                flex: 1,
                padding: "8px 12px",
                backgroundColor:
                  difficulty === "easy"
                    ? "rgba(34, 197, 94, 0.7)"
                    : "rgba(51, 65, 85, 0.5)",
                border: "1px solid rgba(71, 85, 105, 0.5)",
                borderRadius: "6px",
                color: "#ffffff",
                fontWeight: difficulty === "easy" ? "600" : "500",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              className="hover:bg-slate-600/60"
            >
              Easy
            </button>
            <button
              onClick={() => onDifficultyChange("medium")}
              style={{
                flex: 1,
                padding: "8px 12px",
                backgroundColor:
                  difficulty === "medium"
                    ? "rgba(234, 179, 8, 0.7)"
                    : "rgba(51, 65, 85, 0.5)",
                border: "1px solid rgba(71, 85, 105, 0.5)",
                borderRadius: "6px",
                color: "#ffffff",
                fontWeight: difficulty === "medium" ? "600" : "500",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              className="hover:bg-slate-600/60"
            >
              Medium
            </button>
            <button
              onClick={() => onDifficultyChange("hard")}
              style={{
                flex: 1,
                padding: "8px 12px",
                backgroundColor:
                  difficulty === "hard"
                    ? "rgba(239, 68, 68, 0.7)"
                    : "rgba(51, 65, 85, 0.5)",
                border: "1px solid rgba(71, 85, 105, 0.5)",
                borderRadius: "6px",
                color: "#ffffff",
                fontWeight: difficulty === "hard" ? "600" : "500",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              className="hover:bg-slate-600/60"
            >
              Hard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
