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

## UI/UX Features

### Board Design
- **Square Size**: 80×80px for better visibility
- **Colors**: Professional chess.com/Lichess style
  - Light squares: `#f0d9b5`
  - Dark squares: `#b58863`
- **Coordinates**: Larger, bolder rank/file labels (text-base, font-semibold)
- **Selection Indicator**: 4px yellow inset shadow
- **Legal Move Indicators**: 
  - Empty squares: 20px circle
  - Capture moves: 4px border around piece

### Move History Panel (Right Side)
- **Modern Design**: 400px width with gradient background and glassmorphism effect
- **Elegant Header**: 
  - Gradient icon badge (indigo to purple)
  - Clear typography with tracking
  - Live move counter with gradient background and border
- **Move Display**:
  - 520px scrollable height with custom scrollbar styling
  - Individual move cards with gradient backgrounds
  - Numbered badges with gradient styling
  - Each move in separate card with hover effects
  - Semi-transparent placeholder for incomplete pairs
- **Empty State**: 
  - Large centered icon with background circle
  - Encouraging message for new games
- **Interactive Elements**:
  - Smooth hover transitions (200ms duration)
  - Hover effects on move cards with border animation
  - Scale transforms on button interactions
- **Action Buttons**:
  - Vibrant gradient buttons (blue→indigo, emerald→teal)
  - Icon + text layout
  - Hover scale effects (scale-[1.02])
  - Active press effects (scale-[0.98])
  - Enhanced shadows with color matching
- **Visual Polish**:
  - Rounded corners (2xl/xl for depth)
  - Border accents with transparency
  - Backdrop blur for modern glassmorphism
  - Consistent spacing and padding

## Best Practices Implemented

✅ **Separation of Concerns**: Logic separated from UI
✅ **Type Safety**: Full TypeScript support
✅ **Component Reusability**: Small, focused components
✅ **Custom Hooks**: Clean state management
✅ **Prop Drilling Avoided**: Minimal prop passing
✅ **Code Organization**: Logical folder structure
✅ **Performance**: Memoization where needed
✅ **Professional UI/UX**: Modern, polished interface with attention to detail

## Future Enhancements

- [ ] Add AI opponent
- [ ] Implement move validation on server
- [ ] Add multiplayer support
- [ ] Include chess clock/timer
- [ ] Add game analysis features
- [ ] Support for chess variants
