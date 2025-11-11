/**
 * Opening Detection Utility
 *
 * PURPOSE: Display opening names to users in the UI
 *
 * Detects chess openings and variations based on move sequences.
 * Uses SAN notation for easy pattern matching.
 *
 * NOTE: For AI move selection from positions, see openingBook.ts
 * These files serve different purposes and use different data structures.
 */

import type { Move } from "../types/chess.types";

interface OpeningDefinition {
  name: string;
  moves: string[];
  eco?: string; // Encyclopedia of Chess Openings code
}

/**
 * Comprehensive opening database
 * Organized by opening families for easy maintenance
 */
const OPENING_DATABASE: OpeningDefinition[] = [
  // King's Pawn Openings (1.e4)
  { name: "Ruy Lopez", moves: ["e4", "e5", "Nf3", "Nc6", "Bb5"] },
  { name: "Ruy Lopez: Berlin Defense", moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6"] },
  { name: "Ruy Lopez: Morphy Defense", moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6"] },
  { name: "Ruy Lopez: Exchange Variation", moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Bxc6"] },
  { name: "Ruy Lopez: Closed", moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7"] },
  { name: "Ruy Lopez: Marshall Attack", moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "O-O", "c3", "d5"] },

  { name: "Italian Game", moves: ["e4", "e5", "Nf3", "Nc6", "Bc4"] },
  { name: "Giuoco Piano", moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5"] },
  { name: "Italian Game: Two Knights Defense", moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6"] },
  { name: "Fried Liver Attack", moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "d5", "exd5", "Nxd5", "Nxf7"] },
  { name: "Evans Gambit", moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "b4"] },

  { name: "Scotch Game", moves: ["e4", "e5", "Nf3", "Nc6", "d4"] },
  { name: "Scotch Game", moves: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4"] },

  { name: "Petrov's Defense", moves: ["e4", "e5", "Nf3", "Nf6"] },
  { name: "King's Gambit", moves: ["e4", "e5", "f4"] },
  { name: "King's Gambit Accepted", moves: ["e4", "e5", "f4", "exf4"] },
  { name: "King's Gambit Declined", moves: ["e4", "e5", "f4", "Bc5"] },

  { name: "Sicilian Defense", moves: ["e4", "c5"] },
  { name: "Sicilian: Open", moves: ["e4", "c5", "Nf3", "d6", "d4"] },
  { name: "Sicilian: Najdorf", moves: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "a6"] },
  { name: "Sicilian: Dragon", moves: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "g6"] },
  { name: "Sicilian: Sveshnikov", moves: ["e4", "c5", "Nf3", "Nc6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "e5"] },
  { name: "Sicilian: Accelerated Dragon", moves: ["e4", "c5", "Nf3", "Nc6", "d4", "cxd4", "Nxd4", "g6"] },
  { name: "Sicilian: Closed", moves: ["e4", "c5", "Nc3"] },
  { name: "Sicilian: Alapin", moves: ["e4", "c5", "c3"] },

  { name: "French Defense", moves: ["e4", "e6"] },
  { name: "French Defense", moves: ["e4", "e6", "d4", "d5"] },
  { name: "French: Winawer", moves: ["e4", "e6", "d4", "d5", "Nc3", "Bb4"] },
  { name: "French: Tarrasch", moves: ["e4", "e6", "d4", "d5", "Nd2"] },
  { name: "French: Advance", moves: ["e4", "e6", "d4", "d5", "e5"] },

  { name: "Caro-Kann Defense", moves: ["e4", "c6"] },
  { name: "Caro-Kann", moves: ["e4", "c6", "d4", "d5"] },
  { name: "Caro-Kann: Classical", moves: ["e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4"] },
  { name: "Caro-Kann: Advance", moves: ["e4", "c6", "d4", "d5", "e5"] },
  { name: "Caro-Kann: Panov Attack", moves: ["e4", "c6", "d4", "d5", "exd5", "cxd5", "c4"] },

  { name: "Pirc Defense", moves: ["e4", "d6"] },
  { name: "Pirc Defense", moves: ["e4", "d6", "d4", "Nf6", "Nc3", "g6"] },
  { name: "Modern Defense", moves: ["e4", "g6"] },
  { name: "Scandinavian Defense", moves: ["e4", "d5"] },
  { name: "Alekhine's Defense", moves: ["e4", "Nf6"] },

  // Queen's Pawn Openings (1.d4)
  { name: "Queen's Gambit", moves: ["d4", "d5", "c4"] },
  { name: "Queen's Gambit Declined", moves: ["d4", "d5", "c4", "e6"] },
  { name: "Queen's Gambit Accepted", moves: ["d4", "d5", "c4", "dxc4"] },
  { name: "Slav Defense", moves: ["d4", "d5", "c4", "c6"] },
  { name: "Semi-Slav Defense", moves: ["d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3", "e6"] },

  { name: "King's Indian Defense", moves: ["d4", "Nf6", "c4", "g6"] },
  { name: "King's Indian", moves: ["d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6"] },
  { name: "Grunfeld Defense", moves: ["d4", "Nf6", "c4", "g6", "Nc3", "d5"] },

  { name: "Nimzo-Indian Defense", moves: ["d4", "Nf6", "c4", "e6", "Nc3", "Bb4"] },
  { name: "Queen's Indian Defense", moves: ["d4", "Nf6", "c4", "e6", "Nf3", "b6"] },
  { name: "Bogo-Indian Defense", moves: ["d4", "Nf6", "c4", "e6", "Nf3", "Bb4+"] },

  { name: "Benoni Defense", moves: ["d4", "Nf6", "c4", "c5"] },
  { name: "Modern Benoni", moves: ["d4", "Nf6", "c4", "c5", "d5"] },
  { name: "Dutch Defense", moves: ["d4", "f5"] },

  { name: "London System", moves: ["d4", "Nf6", "Nf3", "d5", "Bf4"] },
  { name: "Torre Attack", moves: ["d4", "Nf6", "Nf3", "e6", "Bg5"] },
  { name: "Trompowsky Attack", moves: ["d4", "Nf6", "Bg5"] },
  { name: "Catalan Opening", moves: ["d4", "Nf6", "c4", "e6", "g3"] },

  // Flank Openings
  { name: "English Opening", moves: ["c4"] },
  { name: "English: Symmetrical", moves: ["c4", "c5"] },
  { name: "English: Reversed Sicilian", moves: ["c4", "e5"] },

  { name: "Reti Opening", moves: ["Nf3"] },
  { name: "Reti: King's Indian Attack", moves: ["Nf3", "d5", "g3"] },

  { name: "Bird's Opening", moves: ["f4"] },
  { name: "Polish Opening", moves: ["b4"] },
  { name: "Hungarian Opening", moves: ["g3"] },

  // Other
  { name: "Vienna Game", moves: ["e4", "e5", "Nc3"] },
  { name: "Four Knights Game", moves: ["e4", "e5", "Nf3", "Nc6", "Nc3", "Nf6"] },
  { name: "Philidor Defense", moves: ["e4", "e5", "Nf3", "d6"] },
  { name: "Elephant Gambit", moves: ["e4", "e5", "Nf3", "d5"] },
  { name: "Latvian Gambit", moves: ["e4", "e5", "Nf3", "f5"] },
];

/**
 * Detect the opening/gambit based on the move history
 * Returns the most specific opening name that matches
 *
 * @param history - Array of moves in SAN notation
 * @returns Opening name or "Starting Position" if no moves
 */
export function detectOpening(history: Move[]): string {
  if (history.length === 0) {
    return "Starting Position";
  }

  // Extract just the SAN notation from moves
  const moves = history.map(m => m.san);

  // Find all matching openings
  const matches = OPENING_DATABASE.filter(opening => {
    // Check if the opening moves match the beginning of the game
    if (opening.moves.length > moves.length) {
      return false;
    }

    for (let i = 0; i < opening.moves.length; i++) {
      if (opening.moves[i] !== moves[i]) {
        return false;
      }
    }

    return true;
  });

  // Return the most specific (longest) match
  if (matches.length > 0) {
    const bestMatch = matches.reduce((longest, current) =>
      current.moves.length > longest.moves.length ? current : longest
    );
    return bestMatch.name;
  }

  // Generic fallback names based on first move
  if (moves.length === 1) {
    if (moves[0] === "e4") return "King's Pawn Opening";
    if (moves[0] === "d4") return "Queen's Pawn Opening";
    if (moves[0] === "c4") return "English Opening";
    if (moves[0] === "Nf3") return "Reti Opening";
    return "Uncommon Opening";
  }

  // For 2+ moves, give generic category
  if (moves[0] === "e4") {
    if (moves[1] === "e5") return "King's Pawn Game";
    return "King's Pawn Opening";
  }
  if (moves[0] === "d4") {
    return "Queen's Pawn Opening";
  }

  return "Custom Opening";
}

/**
 * Get a shorter display name for the opening
 * Useful for limited space scenarios
 */
export function getShortOpeningName(history: Move[]): string {
  const fullName = detectOpening(history);

  // Remove common suffixes for shorter display
  return fullName
    .replace(": Classical", "")
    .replace(": Main Line", "")
    .replace(" Opening", "")
    .replace(" Game", "")
    .replace(" Defense", "")
    .replace(" Variation", "");
}
