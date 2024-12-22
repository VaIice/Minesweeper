// 셀 타입 정의
interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  nearbyMines: number;
}

// 셀들의 이중 배열 타입 정의
export type Board = Cell[][];

// 보드 타입 정의
export interface BoardState {
  board: Board;
  rows: number;
  cols: number;
  mines: number;
  firstClick: boolean;
  gameOver: boolean;
  showCustom: boolean;
  customSettings: {
    rows: number;
    cols: number;
    mines: number;
  };
}

// 난이도 타입 정의
export interface Difficulty {
  rows: number;
  cols: number;
  mines: number;
}

// 난이도별 타입 정의
export interface Difficulties {
  Beginner: Difficulty;
  Intermediate: Difficulty;
  Expert: Difficulty;
}
