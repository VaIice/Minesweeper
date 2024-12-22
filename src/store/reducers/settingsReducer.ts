import { PayloadAction } from '@reduxjs/toolkit';
import { BoardState } from '@/types';
import { generateEmptyBoard } from '@/utils/board';
import { difficulties } from '@/utils/settings';

// 초기 보드 상태
const initializeBoard = (
  state: BoardState,
  rows: number,
  cols: number,
  mines: number
) => {
  state.rows = rows;
  state.cols = cols;
  state.mines = mines;
  state.board = generateEmptyBoard(rows, cols);
  state.firstClick = true;
  state.gameOver = false;
};

// 난이도 관련 세팅 리듀서
export const settingsReducer = {
  // 난이도 변경 시 상태 초기화
  changeDifficulty: (
    state: BoardState,
    action: PayloadAction<keyof typeof difficulties>
  ) => {
    const { rows, cols, mines } = difficulties[action.payload];
    initializeBoard(state, rows, cols, mines);
    state.showCustom = false;
  },

  // 커스텀 설정 표시 여부 토글
  toggleCustom: (state: BoardState) => {
    state.showCustom = !state.showCustom;
  },

  // 커스텀 설정 값 업데이트
  updateCustomSetting: (
    state: BoardState,
    action: PayloadAction<{
      field: 'rows' | 'cols' | 'mines';
      value: number;
    }>
  ) => {
    const { field, value } = action.payload;
    state.customSettings[field] = value;
  },

  // 커스텀 설정 적용
  applyCustomSettings: (state: BoardState) => {
    const { rows, cols, mines } = state.customSettings;
    if (rows > 100 || cols > 100 || mines > Math.floor((rows * cols) / 3)) {
      alert(
        '설정 가능한 가로, 세로는 최대 100 x 100이며, 지뢰수는 격자칸 수의 1/3 이하로 설정 가능합니다.'
      );
      return;
    }

    initializeBoard(state, rows, cols, mines);
  },
};
