import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomSetting, applyCustomSettings } from '@/store/boardSlice';
import { RootState } from '@/store/store';

export const useCustomSettings = () => {
  const dispatch = useDispatch();
  const { customSettings } = useSelector((state: RootState) => state.board);

  // 불필요한 재생성 방지 위해 useCallback
  // 커스텀 설정 업데이트
  const handleCustomChange = useCallback(
    (field: 'rows' | 'cols' | 'mines', value: number) => {
      dispatch(updateCustomSetting({ field, value }));
    },
    [dispatch]
  );

  // 커스텀 설정 적용
  const applySettings = useCallback(() => {
    dispatch(applyCustomSettings());
  }, [dispatch]);

  return {
    customSettings,
    handleCustomChange,
    applySettings,
  };
};
