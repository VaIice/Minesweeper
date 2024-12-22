import { useDispatch, useSelector } from 'react-redux';
import {
  checkWin,
  handleCellClick,
  handleRightClick,
  handleBothClick,
} from '@/store/boardSlice';
import { RootState } from '@/store/store';
import { MouseEvent } from 'react';

export const useBoard = () => {
  const dispatch = useDispatch();
  const { board } = useSelector((state: RootState) => state.board);

  // 좌 클릭 시
  const click = (row: number, col: number) => {
    dispatch(handleCellClick({ row, col }));
    dispatch(checkWin());
  };

  // 우 클릭 시
  const rightClick = (e: MouseEvent, row: number, col: number) => {
    e.preventDefault();
    dispatch(handleRightClick({ row, col }));
  };

  const bothClick = (e: MouseEvent, row: number, col: number) => {
    // 양쪽 클릭 시
    if (e.buttons === 3) {
      dispatch(handleBothClick({ row, col }));
      dispatch(checkWin());
    }
  };

  return {
    board,
    click,
    rightClick,
    bothClick,
  };
};
