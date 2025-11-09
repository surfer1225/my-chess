# Chess App Architecture

## Project Structure

```
src/
├── components/
│   ├── ChessApp.tsx           # Main app container component
│   └── chess/                 # Chess-specific components
│       ├── ChessBoard.tsx     # Board grid with coordinates
│       ├── Square.tsx         # Individual square component
│       ├── GameControls.tsx   # Flip, Undo, New Game buttons
│       ├── GameStatus.tsx     # Status display
│       ├── MoveHistory.tsx    # Move history panel with PGN/FEN
│       └── PromotionDialog.tsx # Pawn promotion modal
├── hooks/
│   └── useChessGame.ts        # Custom hook for game logic
├── types/
│   └── chess.types.ts         # Shared TypeScript types
├── utils/
│   └── pieceImages.ts         # Piece image imports and utilities
└── assets/
    └── pieces/                # SVG chess piece images
```

## Component Hierarchy

```
ChessApp (container)
├── GameControls
├── ChessBoard
│   └── Square (64 instances)
├── GameStatus
├── MoveHistory
└── PromotionDialog (conditional)
```

## Design Patterns

### 1. **Custom Hook Pattern**
- `useChessGame` encapsulates all game state and logic
- Provides clean API for components
- Single source of truth for game state

### 2. **Component Composition**
- Small, focused components with single responsibilities
- Props-based communication
- Reusable and testable

### 3. **Separation of Concerns**
- **Components**: UI rendering only
- **Hooks**: Business logic and state management
- **Types**: Type safety across the app
- **Utils**: Shared utilities and helpers

## Component Responsibilities

### ChessApp
- Main container
- Orchestrates all child components
- Handles PGN/FEN import/export UI logic

### ChessBoard
- Renders 8x8 grid
- Displays rank/file coordinates
- Delegates square rendering to Square component

### Square
- Renders individual square
- Displays piece image
- Shows legal move indicators
- Handles click events

### GameControls
- Flip board button
- Undo button (disabled when no moves)
- New Game button

### GameStatus
- Displays current game status
- Shows whose turn it is
- Indicates check, checkmate, stalemate, etc.

### MoveHistory
- Shows move history in standard notation
- Copy PGN button
- Load FEN button

### PromotionDialog
- Modal dialog for pawn promotion
- Shows available promotion pieces
- Handles piece selection

## State Management

All game state is managed in `useChessGame` hook:

- `board`: Current board position
- `selectedSquare`: Currently selected square
- `legalMoves`: Legal moves for selected piece
- `history`: Move history
- `flip`: Board flip state
- `promotionDialog`: Promotion dialog state
- `status`: Current game status

## Type Safety

All components use TypeScript interfaces:

- `ChessPiece`: Piece type and color
- `Square`: Chess square notation (e.g., "e4")
- `Move`: Chess move with metadata
- `PromotionPiece`: Promotion piece type

## Best Practices Implemented

✅ **Separation of Concerns**: Logic separated from UI
✅ **Type Safety**: Full TypeScript support
✅ **Component Reusability**: Small, focused components
✅ **Custom Hooks**: Clean state management
✅ **Prop Drilling Avoided**: Minimal prop passing
✅ **Code Organization**: Logical folder structure
✅ **Performance**: Memoization where needed

## Future Enhancements

- [ ] Add AI opponent
- [ ] Implement move validation on server
- [ ] Add multiplayer support
- [ ] Include chess clock/timer
- [ ] Add game analysis features
- [ ] Support for chess variants
