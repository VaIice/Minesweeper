import { useDispatch } from 'react-redux';
import { resetGame, changeDifficulty, toggleCustom } from '@/store/boardSlice';
import { useTimer } from '@/hooks/useTimer';
import { Difficulties } from '@/types';
import { saveDifficulty } from '@/utils/settings';

export const useControls = () => {
  const dispatch = useDispatch();
  const { formattedTime, resetTimer } = useTimer();

  // 게임 및 타이머 리셋
  const reset = () => {
    dispatch(resetGame());
    resetTimer();
  };

  // 게임 난이도 변경
  const changeGameDifficulty = (difficulty: keyof Difficulties) => {
    dispatch(changeDifficulty(difficulty));
    resetTimer();
    saveDifficulty(difficulty);
  };

  // 커스텀 설정 토글
  const toggleCustomDifficulty = () => {
    dispatch(toggleCustom());
  };

  return {
    formattedTime,
    reset,
    changeGameDifficulty,
    toggleCustomDifficulty,
  };
};
