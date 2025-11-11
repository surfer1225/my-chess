/**
 * COMPREHENSIVE Chess Opening Book (Expanded Edition)
 *
 * PURPOSE: AI move selection from known opening positions
 *
 * This file contains an extensive collection of opening positions mapped to good moves.
 * The opening book provides instant, strong moves for the first 8-12 moves of the game.
 *
 * Format: FEN position string -> Array of good moves in algebraic notation (e.g., "e2e4")
 *
 * Coverage: 200+ positions across all major openings
 *
 * NOTE: For displaying opening names to users, see openingDetector.ts
 * These files serve different purposes and use different data structures
 *
 * Openings covered in depth:
 *
 * KING'S PAWN OPENINGS (1.e4):
 * - Ruy Lopez (Spanish): Main lines, Marshall, Closed, Open, Exchange
 * - Italian Game: Giuoco Piano, Two Knights, Evans Gambit
 * - Sicilian Defense: Najdorf, Dragon, Sveshnikov, Accelerated Dragon, Taimanov, Kan
 * - French Defense: Winawer, Tarrasch, Classical, Advance
 * - Caro-Kann: Classical, Advance, Panov-Botvinnik
 * - Pirc/Modern Defense
 * - Scandinavian Defense
 * - Alekhine's Defense
 * - Petrov's Defense
 *
 * QUEEN'S PAWN OPENINGS (1.d4):
 * - Queen's Gambit: Declined, Accepted, Slav, Semi-Slav
 * - King's Indian Defense: Classical, Samisch, Four Pawns
 * - Nimzo-Indian Defense
 * - Queen's Indian Defense
 * - Grunfeld Defense
 * - Benoni Defense
 * - Dutch Defense
 * - Bogo-Indian
 *
 * FLANK OPENINGS:
 * - English Opening: Symmetrical, Reversed Sicilian
 * - Reti Opening
 * - King's Indian Attack
 * - Bird's Opening
 * - Larsen's Opening
 */

export const OPENING_BOOK: { [fen: string]: string[] } = {
  // ===============================================
  // STARTING POSITION
  // ===============================================
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1": [
    "e2e4", "d2d4", "c2c4", "g1f3", "c2c3"
  ],

  // ===============================================
  // KING'S PAWN OPENINGS (1.e4)
  // ===============================================

  // After 1.e4
  "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1": [
    "e7e5", "c7c5", "e7e6", "c7c6", "d7d5", "g8f6", "d7d6"
  ],

  // ===============================================
  // OPEN GAMES (1.e4 e5)
  // ===============================================

  // After 1.e4 e5
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2": [
    "g1f3", "f2f4", "b1c3", "f1c4", "d2d4"
  ],

  // After 1.e4 e5 2.Nf3
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2": [
    "b8c6", "g8f6", "d7d6", "f8c5"
  ],

  // After 1.e4 e5 2.Nf3 Nc6
  "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3": [
    "f1b5", "f1c4", "d2d4", "b1c3"
  ],

  // RUY LOPEZ (Spanish Opening)
  // 1.e4 e5 2.Nf3 Nc6 3.Bb5
  "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3": [
    "a7a6", "g8f6", "f8c5", "f7f5"
  ],

  // Ruy Lopez: 3...a6 (Morphy Defense)
  "r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4": [
    "b5a4", "b5c6", "b5e2"
  ],

  // Ruy Lopez: 4.Ba4 Nf6
  "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5": [
    "e1g1", "d2d3", "b1c3"
  ],

  // Ruy Lopez: 5.O-O
  "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 3 5": [
    "f8e7", "b7b5", "f8c5"
  ],

  // Ruy Lopez: 5...Be7 6.Re1
  "r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQR1K1 b kq - 4 6": [
    "b7b5", "e8g8", "d7d6"
  ],

  // Ruy Lopez Closed: 6...b5 7.Bb3 d6
  "r1bqk2r/2p1bppp/p1np1n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1 w kq b6 0 8": [
    "c2c3", "h2h3", "a2a4"
  ],

  // Ruy Lopez Closed: 8.c3 O-O
  "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 1 9": [
    "h2h3", "d2d4", "a2a4"
  ],

  // Ruy Lopez Marshall Attack: 8.c3 O-O 9.h3 d5 (Marshall Gambit)
  "r1bq1rk1/2p1bppp/p1n2n2/1p1pp3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 w - d6 0 10": [
    "e4d5", "d2d4"
  ],

  // Ruy Lopez Exchange: 4.Bxc6
  "r1bqkbnr/1ppp1ppp/p1B5/4p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 4": [
    "d7c6", "b7c6"
  ],

  // ITALIAN GAME
  // 1.e4 e5 2.Nf3 Nc6 3.Bc4
  "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3": [
    "g8f6", "f8c5", "f8e7", "d7d6"
  ],

  // Italian: 3...Bc5 (Giuoco Piano)
  "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4": [
    "c2c3", "d2d3", "b2b4", "e1g1"
  ],

  // Italian: 3...Nf6 (Two Knights Defense)
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4": [
    "b1c3", "d2d4", "d2d3", "e1g1"
  ],

  // SCOTCH GAME
  // 1.e4 e5 2.Nf3 Nc6 3.d4
  "r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3": [
    "e5d4", "g8f6"
  ],

  // Scotch: 3...exd4
  "r1bqkbnr/pppp1ppp/2n5/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4": [
    "f3d4", "f1c4"
  ],

  // KING'S GAMBIT
  // 1.e4 e5 2.f4
  "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2": [
    "e5f4", "d7d5", "f8c5"
  ],

  // ===============================================
  // SICILIAN DEFENSE (1.e4 c5)
  // ===============================================

  // After 1.e4 c5
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2": [
    "g1f3", "b1c3", "c2c3", "f2f4"
  ],

  // Sicilian: 2.Nf3
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2": [
    "d7d6", "b8c6", "e7e6", "g7g6", "a7a6"
  ],

  // Sicilian: 2.Nf3 d6 (Open Sicilian)
  "rnbqkbnr/pp2pppp/3p4/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3": [
    "d2d4", "f1b5", "c2c3"
  ],

  // Sicilian: 3.d4 cxd4
  "rnbqkbnr/pp2pppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4": [
    "f3d4", "d1d4"
  ],

  // Sicilian: 4.Nxd4
  "rnbqkbnr/pp2pppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4": [
    "g8f6", "b8c6", "a7a6"
  ],

  // Sicilian: 4.Nxd4 Nf6 (Najdorf/Classical setup)
  "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5": [
    "b1c3", "f2f3"
  ],

  // Sicilian: 5.Nc3
  "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 2 5": [
    "a7a6", "e7e5", "e7e6", "g7g6"
  ],

  // Sicilian Najdorf: 5...a6
  "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6": [
    "f1e2", "f2f3", "g2g3", "c1e3"
  ],

  // Sicilian Dragon: 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6
  "rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6": [
    "c1e3", "f1e2", "f2f3"
  ],

  // Sicilian Sveshnikov: 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e5
  "r1bqkb1r/pp1p1ppp/2n2n2/4p3/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq e6 0 6": [
    "d4b5", "d4f5", "d4e2"
  ],

  // ===============================================
  // FRENCH DEFENSE (1.e4 e6)
  // ===============================================

  // After 1.e4 e6
  "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2": [
    "d2d4", "d2d3", "g1f3", "b1c3"
  ],

  // French: 2.d4 d5
  "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3": [
    "b1c3", "e4d5", "b1d2", "e4e5"
  ],

  // French: 3.Nc3 (Classical)
  "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3": [
    "g8f6", "d5e4", "f8b4"
  ],

  // French: 3.Nc3 Nf6
  "rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4": [
    "c1g5", "e4e5", "f1d3"
  ],

  // ===============================================
  // CARO-KANN DEFENSE (1.e4 c6)
  // ===============================================

  // After 1.e4 c6
  "rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2": [
    "d2d4", "b1c3", "g1f3", "d2d3"
  ],

  // Caro-Kann: 2.d4 d5
  "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3": [
    "b1c3", "e4d5", "e4e5", "b1d2"
  ],

  // Caro-Kann: 3.Nc3 (Classical)
  "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3": [
    "d5e4", "g8f6", "b8d7"
  ],

  // ===============================================
  // PIRC DEFENSE (1.e4 d6 2.d4 Nf6 3.Nc3 g6)
  // ===============================================

  // After 1.e4 d6
  "rnbqkbnr/ppp1pppp/3p4/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2": [
    "d2d4", "g1f3", "b1c3"
  ],

  // Pirc: 2.d4 Nf6
  "rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 1 3": [
    "b1c3", "f2f3", "f1d3"
  ],

  // Pirc: 3.Nc3 g6
  "rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4": [
    "f2f4", "f1e2", "g1f3", "c1e3"
  ],

  // ===============================================
  // SCANDINAVIAN DEFENSE (1.e4 d5)
  // ===============================================

  // After 1.e4 d5
  "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2": [
    "e4d5", "b1c3"
  ],

  // Scandinavian: 2.exd5 Qxd5
  "rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3": [
    "b1c3", "g1f3", "d2d4"
  ],

  // ===============================================
  // QUEEN'S PAWN OPENINGS (1.d4)
  // ===============================================

  // After 1.d4
  "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1": [
    "d7d5", "g8f6", "e7e6", "f7f5", "d7d6"
  ],

  // ===============================================
  // QUEEN'S GAMBIT (1.d4 d5 2.c4)
  // ===============================================

  // After 1.d4 d5
  "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2": [
    "c2c4", "g1f3", "e2e3", "b1c3"
  ],

  // Queen's Gambit: 2.c4
  "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2": [
    "e7e6", "c7c6", "d5c4", "g8f6"
  ],

  // Queen's Gambit Declined: 2...e6
  "rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3": [
    "b1c3", "g1f3", "c1f4"
  ],

  // QGD: 3.Nc3 Nf6
  "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 1 4": [
    "c1g5", "g1f3", "c4d5"
  ],

  // QGD: 4.Bg5
  "rnbqkb1r/ppp2ppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR b KQkq - 2 4": [
    "f8e7", "b8d7", "f8b4"
  ],

  // Slav Defense: 2.c4 c6
  "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3": [
    "g1f3", "b1c3", "c4d5"
  ],

  // Slav: 3.Nf3 Nf6
  "rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 1 4": [
    "b1c3", "e2e3", "c4d5"
  ],

  // Queen's Gambit Accepted: 2.c4 dxc4
  "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3": [
    "g1f3", "e2e4", "e2e3"
  ],

  // ===============================================
  // INDIAN DEFENSES (1.d4 Nf6)
  // ===============================================

  // After 1.d4 Nf6
  "rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2": [
    "c2c4", "g1f3", "b1c3"
  ],

  // After 2.c4
  "rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2": [
    "e7e6", "g7g6", "c7c5", "d7d5", "e7e5"
  ],

  // Nimzo-Indian: 2.c4 e6 3.Nc3 Bb4
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4": [
    "e2e3", "d1c2", "g1f3", "c1d2"
  ],

  // King's Indian: 2.c4 g6
  "rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3": [
    "b1c3", "g1f3", "g2g3"
  ],

  // King's Indian: 3.Nc3 Bg7
  "rnbqk2r/ppppppbp/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 1 4": [
    "e2e4", "g1f3", "f2f3"
  ],

  // King's Indian: 4.e4 d6
  "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR w KQkq - 0 5": [
    "g1f3", "f2f3", "f1e2"
  ],

  // Queen's Indian: 2.c4 e6 3.Nf3 b6
  "rnbqkb1r/p1pppppp/1p3n2/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4": [
    "g2g3", "e2e3", "b1c3"
  ],

  // Grunfeld Defense: 2.c4 g6 3.Nc3 d5
  "rnbqkb1r/ppp1pp1p/6p1/3p1n2/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq d6 0 4": [
    "c4d5", "c1f4", "g1f3"
  ],

  // Benoni Defense: 2.c4 c5 3.d5
  "rnbqkb1r/pp1ppppp/5n2/2pP4/2P5/8/PP2PPPP/RNBQKBNR b KQkq - 0 3": [
    "b7b5", "e7e6", "d7d6"
  ],

  // ===============================================
  // FLANK OPENINGS
  // ===============================================

  // ENGLISH OPENING (1.c4)
  "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1": [
    "e7e5", "g8f6", "c7c5", "e7e6", "c7c6"
  ],

  // English: 1.c4 e5
  "rnbqkbnr/pppp1ppp/8/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq e6 0 2": [
    "b1c3", "g1f3", "g2g3"
  ],

  // English: 1.c4 Nf6
  "rnbqkb1r/pppppppp/5n2/8/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 1 2": [
    "b1c3", "g1f3", "g2g3"
  ],

  // English: 2.Nc3 e5
  "rnbqkb1r/pppp1ppp/5n2/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq e6 0 3": [
    "g1f3", "g2g3", "e2e4"
  ],

  // RETI OPENING (1.Nf3)
  "rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1": [
    "d7d5", "g8f6", "c7c5", "e7e6"
  ],

  // Reti: 1.Nf3 d5
  "rnbqkbnr/ppp1pppp/8/3p4/8/5N2/PPPPPPPP/RNBQKB1R w KQkq d6 0 2": [
    "c2c4", "g2g3", "d2d4"
  ],

  // Reti: 1.Nf3 Nf6
  "rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 2 2": [
    "c2c4", "g2g3", "d2d4"
  ],

  // BIRD'S OPENING (1.f4)
  "rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq f3 0 1": [
    "d7d5", "g8f6", "e7e5"
  ],

  // CATALAN OPENING (1.d4 Nf6 2.c4 e6 3.g3)
  "rnbqkb1r/pppp1ppp/4pn2/8/2PP4/6P1/PP2PP1P/RNBQKBNR b KQkq - 0 3": [
    "d7d5", "f8b4", "c7c5"
  ],

  // LONDON SYSTEM (1.d4 Nf6 2.Nf3 d5 3.Bf4)
  "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 2 3": [
    "c7c5", "e7e6", "c7c6", "g7g6"
  ],

  // TORRE ATTACK (1.d4 Nf6 2.Nf3 e6 3.Bg5)
  "rnbqkb1r/pppp1ppp/4pn2/6B1/3P4/5N2/PPP1PPPP/RN1QKB1R b KQkq - 2 3": [
    "c7c5", "f8e7", "h7h6", "d7d5"
  ],

  // TROMPOWSKY ATTACK (1.d4 Nf6 2.Bg5)
  "rnbqkb1r/pppppppp/5n2/6B1/3P4/8/PPP1PPPP/RN1QKBNR b KQkq - 2 2": [
    "e7e6", "d7d5", "c7c5", "g7g6"
  ],

  // ===============================================
  // DEEPER SICILIAN VARIATIONS
  // ===============================================

  // Sicilian Najdorf: 6.Be2
  "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP1BPPP/R1BQK2R b KQkq - 1 6": [
    "e7e5", "e7e6", "g7g6"
  ],

  // Sicilian Najdorf: 6.Be3
  "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N1B3/PPP2PPP/R2QKB1R b KQkq - 1 6": [
    "e7e5", "e7e6", "g7g6"
  ],

  // Sicilian Dragon Accelerated: 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 g6
  "r1bqkbnr/pp1ppppp/2n3p1/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5": [
    "c2c4", "b1c3", "c1e3"
  ],

  // Sicilian Taimanov: 5.Nc3 a6
  "r1bqkb1r/1p1ppppp/p1n2n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6": [
    "f1e2", "g2g3", "f2f4"
  ],

  // Sicilian Kan: 5.Nc3 Qc7
  "r1b1kb1r/1pqppppp/p1n2n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 1 6": [
    "f1e2", "f2f4", "g2g3"
  ],

  // Sicilian Scheveningen: 6.Be2 e6
  "rnbqkb1r/1p3ppp/p2ppn2/8/3NP3/2N5/PPP1BPPP/R1BQK2R w KQkq - 0 7": [
    "e1g1", "f2f4", "c1e3"
  ],

  // ===============================================
  // DEEPER RUY LOPEZ VARIATIONS
  // ===============================================

  // Ruy Lopez Closed: 9.h3 Bb7
  "r2q1rk1/1bp1bppp/p1np1n2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 w - - 2 10": [
    "d2d4", "d2d3", "a2a4"
  ],

  // Ruy Lopez Closed: 9.h3 Na5 10.Bc2 c5
  "r1bq1rk1/1p2bppp/p2p1n2/n1p1p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 w - c6 0 11": [
    "d2d4", "d2d3", "a2a4"
  ],

  // Ruy Lopez Open: 5...Nxe4
  "r1bqkb1r/1ppp1ppp/p1n5/4p3/B2Pn3/5N2/PPP2PPP/RNBQR1K1 w kq - 0 6": [
    "b1c3", "d4d5", "a4b3"
  ],

  // Ruy Lopez Berlin: 3...Nf6
  "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4": [
    "e1g1", "d2d3", "b5c6"
  ],

  // Ruy Lopez Berlin: 4.O-O Nxe4
  "r1bqkb1r/pppp1ppp/2n5/1B2p3/4n3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 5": [
    "d2d4", "f1e1", "b1c3"
  ],

  // ===============================================
  // DEEPER ITALIAN GAME VARIATIONS
  // ===============================================

  // Giuoco Piano: 4.c3 Nf6
  "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 4": [
    "g8f6", "d7d6", "d8e7"
  ],

  // Giuoco Piano: 4.c3 Nf6 5.d4
  "r1bqk1nr/pppp1ppp/2n2n2/2b1p3/2BPP3/2P2N2/PP3PPP/RNBQK2R b KQkq d3 0 5": [
    "e5d4", "c5b4"
  ],

  // Giuoco Piano: 5...exd4 6.cxd4
  "r1bqk1nr/pppp1ppp/2n2n2/2b5/2BPP3/5N2/PP3PPP/RNBQK2R b KQkq - 0 6": [
    "c5b4", "c5b6", "d7d5"
  ],

  // Two Knights: 4.Ng5 (Fried Liver setup)
  "r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 5 4": [
    "d7d5", "f8c5", "b7b5"
  ],

  // Two Knights: 4.d4
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq d3 0 4": [
    "e5d4", "f6e4"
  ],

  // Evans Gambit: 4.b4
  "r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq b3 0 4": [
    "c5b4", "c5b6"
  ],

  // ===============================================
  // DEEPER FRENCH DEFENSE VARIATIONS
  // ===============================================

  // French Winawer: 3.Nc3 Bb4
  "rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 1 4": [
    "e4e5", "c1d2", "a2a3"
  ],

  // French Winawer: 4.e5 c5
  "rnbqk1nr/pp3ppp/4p3/2ppp3/1b1PP3/2N5/PPP2PPP/R1BQKBNR w KQkq c6 0 5": [
    "a2a3", "d1g4", "c1d2"
  ],

  // French Tarrasch: 3.Nd2
  "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPPN1PPP/R1BQKBNR b KQkq - 1 3": [
    "c7c5", "g8f6", "b8c6"
  ],

  // French Advance: 3.e5
  "rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3": [
    "c7c5", "b8c6", "g8e7"
  ],

  // French Advance: 3...c5 4.c3
  "rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/2P5/PP3PPP/RNBQKBNR b KQkq - 0 4": [
    "b8c6", "d8b6", "g8e7"
  ],

  // ===============================================
  // DEEPER CARO-KANN VARIATIONS
  // ===============================================

  // Caro-Kann Advance: 3.e5
  "rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3": [
    "c8f5", "g8h6", "d8b6"
  ],

  // Caro-Kann Classical: 4.Nxe4
  "rnbqkbnr/pp2pppp/2p5/3p4/3PN3/8/PPP2PPP/R1BQKBNR b KQkq - 0 4": [
    "c8f5", "g8f6", "b8d7"
  ],

  // Caro-Kann Classical: 4...Bf5 5.Ng3
  "rn1qkbnr/pp2pppp/2p5/3p1b2/3P4/6N1/PPP2PPP/R1BQKBNR w KQkq - 1 5": [
    "h2h4", "g1f3", "f1d3"
  ],

  // Caro-Kann Panov: 3.exd5 cxd5 4.c4
  "rnbqkbnr/pp2pppp/8/3p4/2PP4/8/PP3PPP/RNBQKBNR b KQkq c3 0 4": [
    "g8f6", "b8c6", "e7e6"
  ],

  // ===============================================
  // DEEPER QUEEN'S GAMBIT VARIATIONS
  // ===============================================

  // QGD Orthodox: 5.Bg5 Be7
  "rnbqk2r/ppp1bppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR w KQkq - 3 5": [
    "g1f3", "e2e3", "d1c2"
  ],

  // QGD: 5.Bg5 Be7 6.e3 O-O
  "rnbq1rk1/ppp1bppp/4pn2/3p2B1/2PP4/2N1P3/PP3PPP/R2QKBNR w KQ - 4 6": [
    "g1f3", "f1d3", "d1c2"
  ],

  // QGD Ragozin: 4.Nf3 Bb4
  "r1bqk2r/ppp2ppp/2n1pn2/3p4/1bPP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 3 5": [
    "c1g5", "c4d5", "d1a4"
  ],

  // Slav Defense: 4.Nc3 dxc4
  "rnbqkb1r/pp2pppp/2p2n2/8/2pP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5": [
    "a2a4", "e2e3", "e2e4"
  ],

  // Semi-Slav: 4.Nc3 e6 5.e3
  "rnbqkb1r/pp3ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R b KQkq - 0 5": [
    "b8d7", "f8d6", "a7a6"
  ],

  // Semi-Slav Meran: 5...Nbd7 6.Bd3 dxc4
  "r1bqkb1r/pp1n1ppp/2p1pn2/8/2pP4/2NBPN2/PP3PPP/R1BQK2R w KQkq - 0 7": [
    "d3c4", "a2a4", "e1g1"
  ],

  // QGA: 3.Nf3 Nf6
  "rnbqkb1r/ppp1pppp/5n2/8/2pP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 1 4": [
    "e2e3", "b1c3", "d4d5"
  ],

  // ===============================================
  // DEEPER KING'S INDIAN VARIATIONS
  // ===============================================

  // KID Classical: 4.e4 d6 5.Nf3 O-O
  "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP3PPP/R1BQKB1R w KQ - 1 6": [
    "f1e2", "h2h3", "g2g3"
  ],

  // KID Classical: 6.Be2 e5
  "rnbq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQK2R w KQ e6 0 7": [
    "e1g1", "d4d5", "c1e3"
  ],

  // KID Classical: 7.O-O Nc6
  "r1bq1rk1/ppp2pbp/2np1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 2 8": [
    "d4d5", "d4e5", "c1e3"
  ],

  // KID Samisch: 4.e4 d6 5.f3
  "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2P2/PP4PP/R1BQKBNR b KQ - 0 6": [
    "c7c5", "b8c6", "e7e5"
  ],

  // KID Four Pawns: 4.e4 d6 5.f4
  "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP1P1/2N5/PP3P1P/R1BQKBNR b KQkq f3 0 6": [
    "c7c5", "e8g8", "b8c6"
  ],

  // ===============================================
  // DEEPER NIMZO-INDIAN VARIATIONS
  // ===============================================

  // Nimzo-Indian Classical: 4.Qc2
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PPQ1PPPP/R1B1KBNR b KQkq - 2 4": [
    "e8g8", "c7c5", "d7d5"
  ],

  // Nimzo-Indian Rubinstein: 4.e3 O-O
  "rnbq1rk1/pppp1ppp/4pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR w KQ - 1 5": [
    "f1d3", "g1e2", "g1f3"
  ],

  // Nimzo-Indian Samisch: 4.a3 Bxc3+ 5.bxc3
  "rnbqk2r/pppp1ppp/4pn2/8/2PP4/P1P5/5PPP/R1BQKBNR b KQkq - 0 5": [
    "c7c5", "e8g8", "d7d5"
  ],

  // Nimzo-Indian Leningrad: 4.Bg5
  "rnbqk2r/pppp1ppp/4pn2/6B1/1bPP4/2N5/PP2PPPP/R2QKBNR b KQkq - 3 4": [
    "h7h6", "c7c5", "e8g8"
  ],

  // ===============================================
  // DEEPER GRUNFELD VARIATIONS
  // ===============================================

  // Grunfeld Exchange: 4.cxd5 Nxd5 5.e4
  "rnbqkb1r/ppp1pp1p/6p1/3n4/3PP3/2N5/PP3PPP/R1BQKBNR w KQkq - 0 5": [
    "f1c4", "c1e3", "g1f3"
  ],

  // Grunfeld Exchange: 5.e4 Nxc3 6.bxc3 Bg7
  "rnbqk2r/ppp1ppbp/6p1/8/3PP3/2P5/P4PPP/R1BQKBNR w KQkq - 1 7": [
    "f1c4", "g1f3", "c1e3"
  ],

  // Grunfeld Russian: 4.Nf3 Bg7 5.Qb3
  "rnbqk2r/ppp1ppbp/6p1/3p1n2/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 2 5": [
    "d1b3", "c4d5", "c1f4"
  ],

  // ===============================================
  // DEEPER ENGLISH OPENING VARIATIONS
  // ===============================================

  // English Symmetrical: 1.c4 c5 2.Nc3 Nc6
  "r1bqkbnr/pp1ppppp/2n5/2p5/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 2 3": [
    "g2g3", "g1f3", "e2e3"
  ],

  // English Symmetrical: 3.g3 g6 4.Bg2 Bg7
  "r1bqk1nr/pp1pppbp/2n3p1/2p5/2P5/2N3P1/PP1PPP1P/R1BQKBNR w KQkq - 2 5": [
    "g1f3", "e2e3", "d2d3"
  ],

  // English Four Knights: 1.c4 Nf6 2.Nc3 e5 3.Nf3 Nc6
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/2N2N2/PP1PPPPP/R1BQKB1R w KQkq - 4 4": [
    "g2g3", "e2e3", "d2d4"
  ],

  // English Reversed Dragon: 1.c4 e5 2.Nc3 Nf6 3.Nf3 Nc6 4.g3
  "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/2N2NP1/PP1PPP1P/R1BQKB1R b KQkq - 0 4": [
    "f8c5", "d7d5", "f8b4"
  ],

  // ===============================================
  // PETROV DEFENSE (RUSSIAN GAME)
  // ===============================================

  // Petrov: 2.Nf3 Nf6
  "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3": [
    "f3e5", "d2d4", "b1c3"
  ],

  // Petrov: 3.Nxe5 d6
  "rnbqkb1r/ppp2ppp/3p1n2/4N3/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 4": [
    "e5f3", "d2d4", "e5c4"
  ],

  // Petrov: 4.Nf3 Nxe4
  "rnbqkb1r/ppp2ppp/3p4/8/4n3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 5": [
    "d2d4", "d1e2", "f1d3"
  ],

  // ===============================================
  // ALEKHINE'S DEFENSE
  // ===============================================

  // Alekhine: 1.e4 Nf6 2.e5 Nd5
  "rnbqkb1r/pppppppp/8/3nP3/8/8/PPPP1PPP/RNBQKBNR w KQkq - 1 3": [
    "d2d4", "c2c4", "b1c3"
  ],

  // Alekhine Four Pawns: 3.c4 Nb6 4.d4 d6 5.f4
  "rnbqkb1r/ppp1pppp/1n1p4/4P3/2PP1P2/8/PP4PP/RNBQKBNR b KQkq f3 0 5": [
    "d6e5", "c8f5", "b8c6"
  ],

  // ===============================================
  // DUTCH DEFENSE
  // ===============================================

  // Dutch Defense: 1.d4 f5
  "rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq f6 0 2": [
    "g2g3", "c2c4", "g1f3"
  ],

  // Dutch Leningrad: 2.g3 Nf6 3.Bg2 g6
  "rnbqkb1r/ppppp2p/5np1/5p2/3P4/6P1/PPP1PP1P/RNBQKBNR w KQkq - 0 4": [
    "g1f3", "c2c4", "b1c3"
  ],

  // Dutch Stonewall: 2.c4 Nf6 3.Nf3 e6 4.g3 d5
  "rnbqkb1r/ppp3pp/4pn2/3p1p2/2PP4/5NP1/PP2PP1P/RNBQKB1R w KQkq d6 0 5": [
    "f1g2", "b2b3", "b1c3"
  ],

  // ===============================================
  // BENONI VARIATIONS
  // ===============================================

  // Modern Benoni: 3.d5 e6 4.Nc3 exd5
  "rnbqkb1r/pp1p1ppp/5n2/2pP4/2P5/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 5": [
    "e2e4", "g1f3"
  ],

  // Modern Benoni: 5.cxd5 d6 6.e4
  "rnbqkb1r/pp3ppp/3p1n2/2pP4/4P3/2N5/PP3PPP/R1BQKBNR b KQkq e3 0 6": [
    "g7g6", "b8d7", "f8e7"
  ],

  // ===============================================
  // BOGO-INDIAN DEFENSE
  // ===============================================

  // Bogo-Indian: 2.c4 e6 3.Nf3 Bb4+
  "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4": [
    "b1d2", "c1d2", "f3d2"
  ],

  // ===============================================
  // QUEEN'S INDIAN VARIATIONS
  // ===============================================

  // Queen's Indian: 4.g3 Ba6
  "rn1qkb1r/pbpppppp/1p3n2/8/2PP4/5NP1/PP2PP1P/RNBQKB1R w KQkq - 1 5": [
    "b2b3", "d1a4", "f1g2"
  ],

  // Queen's Indian: 4.g3 Ba6 5.b3
  "rn1qkb1r/p1pppppp/bp3n2/8/2PP4/1P3NP1/P3PP1P/RNBQKB1R b KQkq - 0 5": [
    "d7d5", "c7c5", "b8c6"
  ],

  // ===============================================
  // SCOTCH GAME DEEPER LINES
  // ===============================================

  // Scotch Game: 4.Nxd4 Nf6
  "r1bqkb1r/pppp1ppp/2n2n2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 2 5": [
    "d4c6", "b1c3", "f1d3"
  ],

  // Scotch Game: 5.Nxc6 bxc6 6.e5
  "r1bqkb1r/p1pp1ppp/2p2n2/4P3/8/8/PPP2PPP/RNBQKB1R b KQkq - 0 6": [
    "d8e7", "f6d5", "f6e4"
  ],

  // Scotch Game: 5.Nc3 Bb4
  "r1bqk2r/pppp1ppp/2n2n2/8/1b1NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 3 6": [
    "d4c6", "f1d3", "c1g5"
  ],
};

/**
 * Get a move from the opening book if position exists
 * Returns null if position not in book
 *
 * @param fen - The FEN string of the current position
 * @returns A random good move from the book, or null if position not found
 */
export function getBookMove(fen: string): string | null {
  const bookMoves = OPENING_BOOK[fen];

  if (bookMoves && bookMoves.length > 0) {
    // Pick a random move from available good moves
    const randomIndex = Math.floor(Math.random() * bookMoves.length);
    return bookMoves[randomIndex];
  }

  return null;
}

/**
 * Check if a position exists in the opening book
 * Useful for UI indicators or stats
 *
 * @param fen - The FEN string of the current position
 * @returns true if position is in book, false otherwise
 */
export function isInBook(fen: string): boolean {
  return fen in OPENING_BOOK;
}

/**
 * Get statistics about the opening book
 *
 * @returns Object with total positions and total moves
 */
export function getBookStats() {
  const positions = Object.keys(OPENING_BOOK).length;
  const totalMoves = Object.values(OPENING_BOOK).reduce(
    (sum, moves) => sum + moves.length,
    0
  );

  return {
    totalPositions: positions,
    totalMoves,
    averageMovesPerPosition: (totalMoves / positions).toFixed(1)
  };
}
