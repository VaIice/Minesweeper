import { Board, BoardState } from '@/types';

// 보드판 형성
export const generateEmptyBoard = (rows: number, cols: number): Board => {
  return Array(rows)
    .fill(null)
    .map(() =>
      Array(cols)
        .fill(null)
        .map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          nearbyMines: 0,
        }))
    );
};

// 인접 지뢰의 수 계산 후 각 셀에 저장
export const calculateNearbyMines = (
  board: Board,
  rows: number,
  cols: number
): Board => {
  const newBoard = [...board];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (newBoard[row][col].isMine) continue;

      let count = 0;
      for (const [nr, nc] of getNeighborPositions(row, col)) {
        if (
          isInBounds(nr, nc, { rows, cols } as BoardState) &&
          newBoard[nr][nc].isMine
        ) {
          count++;
        }
      }
      newBoard[row][col].nearbyMines = count;
    }
  }

  return newBoard;
};

// 지뢰 배치
export const placeMines = (
  board: Board,
  rows: number,
  cols: number,
  mines: number,
  excludeRow: number,
  excludeCol: number
): Board => {
  const newBoard = [...board];
  let minesPlaced = 0;

  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (
      !newBoard[row][col].isMine &&
      !(row === excludeRow && col === excludeCol)
    ) {
      newBoard[row][col].isMine = true;
      minesPlaced++;
    }
  }

  return calculateNearbyMines(newBoard, rows, cols);
};

// 빈 셀 및 인접 빈 셀 표시
export const revealEmptyCells = (
  board: Board,
  row: number,
  col: number,
  rows: number,
  cols: number
): Board => {
  if (
    row < 0 ||
    row >= rows ||
    col < 0 ||
    col >= cols ||
    board[row][col].isRevealed ||
    board[row][col].isFlagged
  ) {
    return board;
  }

  board[row][col].isRevealed = true;

  if (!board[row][col].isMine && board[row][col].nearbyMines === 0) {
    for (const [newRow, newCol] of getNeighborPositions(row, col)) {
      revealEmptyCells(board, newRow, newCol, rows, cols);
    }
  }

  return board;
};

// rows, cols 범위 안에 있는지 확인
export const isInBounds = (
  row: number,
  col: number,
  state: BoardState
): boolean => {
  return row >= 0 && row < state.rows && col >= 0 && col < state.cols;
};

// 8방향 위치 반환
export const getNeighborPositions = (
  row: number,
  col: number
): [number, number][] => {
  const positions: [number, number][] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      positions.push([row + dr, col + dc]);
    }
  }
  return positions;
};

// 8방향의 깃발 개수 계산
export const countFlaggedNeighbors = (
  row: number,
  col: number,
  state: BoardState
): number => {
  return getNeighborPositions(row, col).filter(
    ([r, c]) => isInBounds(r, c, state) && state.board[r][c].isFlagged
  ).length;
};
