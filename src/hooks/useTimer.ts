import { RootState } from '@/store/store';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useTimer = () => {
  const [time, setTime] = useState(0);
  const { firstClick, gameOver } = useSelector(
    (state: RootState) => state.board
  );

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    // 타이머 시작
    if (!firstClick && !gameOver) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    // 언마운트 시 종료
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [firstClick, gameOver]);

  const resetTimer = () => setTime(0);

  // 타이머를 MM:SS으로 표시
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    time,
    resetTimer,
    formattedTime: formatTime(time),
  };
};
