import { BoardState } from '@/types';
import { generateEmptyBoard } from '@/utils/board';

// 게임 규칙 리듀서
export const gameReducer = {
  // 게임 오버 확인
  setGameOver: (state: BoardState) => {
    state.gameOver = true;
    state.board = state.board.map((row) =>
      row.map((cell) => ({
        ...cell,
        isRevealed: cell.isMine ? true : cell.isRevealed,
      }))
    );
    alert('게임 오버! 💣');
  },

  // 게임 승리 확인
  checkWin: (state: BoardState) => {
    const allSafeCellsRevealed = state.board.every((row) =>
      row.every((cell) => cell.isMine || cell.isRevealed)
    );

    if (allSafeCellsRevealed) {
      state.gameOver = true;
      state.board = state.board.map((row) =>
        row.map((cell) => ({
          ...cell,
          isFlagged: cell.isMine ? true : cell.isFlagged,
        }))
      );
      alert('승리! 🚩');
    }
  },

  // 게임 리셋
  resetGame: (state: BoardState) => {
    state.board = generateEmptyBoard(state.rows, state.cols);
    state.firstClick = true;
    state.gameOver = false;
  },
};
