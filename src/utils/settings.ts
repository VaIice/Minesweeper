import { Difficulties } from '@/types';

// 난이도에 따른 보드 크기와 지뢰 개수
export const difficulties = {
  Beginner: { rows: 8, cols: 8, mines: 10 },
  Intermediate: { rows: 16, cols: 16, mines: 40 },
  Expert: { rows: 16, cols: 32, mines: 100 },
};

// 로컬 스토리지에서 난이도 불러오기
export const loadDifficulty = (): keyof Difficulties => {
  const savedDifficulty = localStorage.getItem('difficulty');
  return (savedDifficulty as keyof Difficulties) || 'Beginner';
};

// 현재 선택된 난이도를 로컬 스토리지에 저장
export const saveDifficulty = (difficulty: keyof Difficulties) => {
  localStorage.setItem('difficulty', difficulty);
};
