/**
 * Custom hook for responsive square sizing
 *
 * Calculates the optimal chess square size based on viewport dimensions
 * Handles both desktop and mobile layouts
 */

import { useState, useEffect, useCallback } from "react";
import { LAYOUT } from "../utils/constants";

export interface ResponsiveSquareSize {
  squareSize: number;
  isMobile: boolean;
}

/**
 * Calculate the optimal square size based on window dimensions
 *
 * @returns Square size in pixels and mobile indicator
 *
 * @example
 * const { squareSize, isMobile } = useResponsiveSquareSize();
 */
export function useResponsiveSquareSize(): ResponsiveSquareSize {
  const calculateSquareSize = useCallback((): ResponsiveSquareSize => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Mobile layout (single column)
    if (windowWidth < 1024) {
      const availableWidth = windowWidth - LAYOUT.MOBILE.HORIZONTAL_PADDING;
      const availableHeight = windowHeight - LAYOUT.MOBILE.VERTICAL_SPACE;
      const size = Math.floor(Math.min(availableWidth, availableHeight) / 8);

      return {
        squareSize: size,
        isMobile: true,
      };
    }

    // Desktop layout (side-by-side)
    const availableWidth = windowWidth - LAYOUT.DESKTOP.SIDE_PANEL_WIDTH;
    const availableHeight = windowHeight - LAYOUT.DESKTOP.VERTICAL_MARGIN;
    const maxDimension = Math.min(availableWidth, availableHeight);
    const size = Math.min(
      Math.floor(maxDimension / 8),
      LAYOUT.MAX_SQUARE_SIZE
    );

    return {
      squareSize: size,
      isMobile: false,
    };
  }, []);

  const [sizeInfo, setSizeInfo] = useState<ResponsiveSquareSize>(calculateSquareSize);

  useEffect(() => {
    const handleResize = () => {
      setSizeInfo(calculateSquareSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateSquareSize]);

  return sizeInfo;
}
