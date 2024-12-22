import { PayloadAction } from '@reduxjs/toolkit';
import { BoardState } from '@/types';
import {
  countFlaggedNeighbors,
  generateEmptyBoard,
  getNeighborPositions,
  isInBounds,
  placeMines,
  revealEmptyCells,
} from '@/utils/board';
import { gameReducer } from '@/store/reducers/gameReducer';

// 보드 리듀서
export const boardReducer = {
  // 셀 왼쪽 클릭 시
  handleCellClick: (
    state: BoardState,
    action: PayloadAction<{ row: number; col: number }>
  ) => {
    const { row, col } = action.payload;

    // 게임 오버 또는 셀에 깃발이 꽂혀있는 경우 return
    if (state.gameOver || state.board[row][col].isFlagged) return;

    // 첫번째 클릭 시 지뢰 배치
    if (state.firstClick) {
      const newBoard = generateEmptyBoard(state.rows, state.cols);
      state.board = placeMines(
        newBoard,
        state.rows,
        state.cols,
        state.mines,
        row,
        col
      );
      state.firstClick = false;
    }

    // 클릭한 셀이 지뢰일 경우 게임 오버
    if (state.board[row][col].isMine) {
      gameReducer.setGameOver(state);
      return;
    }

    // 클릭한 셀과 인접한 지뢰가 없다면 인접한 빈 셀 표시
    if (state.board[row][col].nearbyMines === 0) {
      state.board = revealEmptyCells(
        state.board,
        row,
        col,
        state.rows,
        state.cols
      );
    } else {
      state.board[row][col].isRevealed = true;
    }

    gameReducer.checkWin(state);
  },

  // 셀 우 클릭 시
  handleRightClick: (
    state: BoardState,
    action: PayloadAction<{ row: number; col: number }>
  ) => {
    const { row, col } = action.payload;
    // 셀이 드러나지 않은 경우
    if (!state.board[row][col].isRevealed) {
      state.board[row][col].isFlagged = !state.board[row][col].isFlagged;
    }
  },

  // 셀 양쪽 클릭 시
  handleBothClick: (
    state: BoardState,
    action: PayloadAction<{ row: number; col: number }>
  ) => {
    const { row, col } = action.payload;
    const cell = state.board[row][col];

    // 클릭한 셀이 드러나지 않거나, 빈 셀이라면 return
    if (!cell.isRevealed || cell.nearbyMines === 0) return;

    // 인접 깃발 세기
    const flagCount = countFlaggedNeighbors(row, col, state);

    // 인접 깃발 수와 지뢰 수가 같다면
    if (flagCount === cell.nearbyMines) {
      for (const [newRow, newCol] of getNeighborPositions(row, col)) {
        if (!isInBounds(newRow, newCol, state)) continue;

        const neighborCell = state.board[newRow][newCol];
        // 깃발이 없고, 드러나지 않았으면
        if (!neighborCell.isFlagged && !neighborCell.isRevealed) {
          // 지뢰인 경우 게임 오버
          if (neighborCell.isMine) {
            gameReducer.setGameOver(state);
            return;
          }
          // 해당 셀 드러내기
          state.board[newRow][newCol].isRevealed = true;
        }
      }
    }
  },
};
