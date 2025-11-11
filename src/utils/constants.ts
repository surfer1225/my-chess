/**
 * Chess Application Constants
 *
 * Centralized configuration for layout, colors, timing, and other magic numbers
 * Makes the codebase easier to maintain and theme
 */

/**
 * Layout and sizing constants
 */
export const LAYOUT = {
  /** Breakpoint for mobile vs desktop UI (in pixels) */
  MOBILE_BREAKPOINT: 70,

  /** Maximum square size on desktop (in pixels) */
  MAX_SQUARE_SIZE: 110,

  /** Delay before AI makes move (in milliseconds) - for UX */
  AI_DELAY_MS: 300,

  /** Height multipliers for move history based on game mode */
  HEIGHT_MULTIPLIER: {
    VS_BOT: 5.5,
    VS_HUMAN: 6.8,
  },

  /** Minimum heights for move history panel */
  MIN_HEIGHT: {
    VS_BOT: 320,
    VS_HUMAN: 400,
  },

  /** Desktop layout space reservations */
  DESKTOP: {
    /** Space reserved for move history and margins */
    SIDE_PANEL_WIDTH: 500,
    /** Space reserved for top/bottom margins */
    VERTICAL_MARGIN: 180,
  },

  /** Mobile layout */
  MOBILE: {
    /** Horizontal padding on mobile */
    HORIZONTAL_PADDING: 60,
    /** Space reserved for UI elements above/below board */
    VERTICAL_SPACE: 250,
  },

  /** Panel padding based on size */
  PADDING: {
    SMALL: 8,
    MEDIUM: 12,
    LARGE: 16,
  },
} as const;

/**
 * Chess board colors
 */
export const COLORS = {
  /** Light square default color */
  LIGHT_SQUARE: '#f0d9b5',

  /** Dark square default color */
  DARK_SQUARE: '#b58863',

  /** Light square when it's part of last move */
  LAST_MOVE_LIGHT: '#cdd26a',

  /** Dark square when it's part of last move */
  LAST_MOVE_DARK: '#baca44',

  /** Selected square highlight */
  SELECTED: 'rgba(255, 255, 0, 0.4)',

  /** Legal move indicator dot color */
  LEGAL_MOVE: 'rgba(0, 255, 0, 0.3)',

  /** UI background colors */
  UI: {
    PANEL_BG: 'rgba(51, 65, 85, 0.5)', // slate-700/50
    BORDER: 'rgba(71, 85, 105, 0.5)',  // slate-600/50
  },
} as const;

/**
 * Animation and timing constants
 */
export const ANIMATION = {
  /** Piece move animation duration */
  PIECE_MOVE_DURATION: '0.3s',

  /** Background color transition duration */
  BG_TRANSITION_DURATION: '0.2s',

  /** Easing function for animations */
  EASING: 'ease-out',

  /** Easing for background transitions */
  BG_EASING: 'ease-in-out',
} as const;

/**
 * Chess piece values for AI evaluation
 */
export const PIECE_VALUES = {
  p: 100,   // Pawn
  n: 320,   // Knight
  b: 330,   // Bishop
  r: 500,   // Rook
  q: 900,   // Queen
  k: 20000, // King
} as const;

/**
 * AI search constants
 */
export const AI_CONFIG = {
  /** Search depths by difficulty */
  DEPTH: {
    EASY: 1,
    MEDIUM: 2,
    HARD: 3,
  },

  /** Maximum depth for quiescence search */
  MAX_QUIESCENCE_DEPTH: 3,

  /** Checkmate score */
  CHECKMATE_SCORE: 999999,
} as const;

/**
 * File letters for chess board notation
 */
export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;

/**
 * Type-safe helper to check if running in mobile mode
 */
export function isMobileSize(squareSize: number): boolean {
  return squareSize < LAYOUT.MOBILE_BREAKPOINT;
}

/**
 * Get padding based on square size
 */
export function getPadding(squareSize: number): number {
  if (isMobileSize(squareSize)) {
    return LAYOUT.PADDING.SMALL;
  }
  return LAYOUT.PADDING.MEDIUM;
}
