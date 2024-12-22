import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { CustomSettings } from '@/components/CustomSettings';
import { Board } from '@/components/Board';
import { Container, Title } from '@/components/Minesweeper/style';
import { Controls } from '@/components/Controls';

const Minesweeper = () => {
  const { showCustom } = useSelector((state: RootState) => state.board);

  return (
    <Container>
      <Title>🚩 지뢰찾기 💣</Title>
      <Controls />
      {showCustom && <CustomSettings />}
      <Board />
    </Container>
  );
};

export default Minesweeper;
