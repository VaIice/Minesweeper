import { createSlice } from '@reduxjs/toolkit';
import { BoardState } from '@/types';
import { generateEmptyBoard } from '@/utils/board';
import { boardReducer } from '@/store/reducers/boardReducer';
import { gameReducer } from '@/store/reducers/gameReducer';
import { settingsReducer } from '@/store/reducers/settingsReducer';
import { difficulties, loadDifficulty } from '@/utils/settings';

// 난이도에 맞는 초기 상태 설정
const initialState: BoardState = {
  board: generateEmptyBoard(
    difficulties[loadDifficulty()].rows,
    difficulties[loadDifficulty()].cols
  ),
  rows: difficulties[loadDifficulty()].rows,
  cols: difficulties[loadDifficulty()].cols,
  mines: difficulties[loadDifficulty()].mines,
  firstClick: true,
  gameOver: false,
  showCustom: false,
  customSettings: {
    rows: difficulties[loadDifficulty()].rows,
    cols: difficulties[loadDifficulty()].cols,
    mines: difficulties[loadDifficulty()].mines,
  },
};

// 보드 상태와 액션들을 관리하는 슬라이스 생성
const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    ...boardReducer,
    ...gameReducer,
    ...settingsReducer,
  },
});

export const {
  handleCellClick,
  handleRightClick,
  handleBothClick,
  setGameOver,
  checkWin,
  resetGame,
  changeDifficulty,
  toggleCustom,
  updateCustomSetting,
  applyCustomSettings,
} = boardSlice.actions;

export default boardSlice.reducer;
