import { Control, Button, Timer } from '@/components/Controls/style';
import { useControls } from '@/hooks/useControls';

export const Controls = () => {
  const { formattedTime, reset, changeGameDifficulty, toggleCustomDifficulty } =
    useControls();

  return (
    <Control>
      <Button onClick={() => changeGameDifficulty('Beginner')}>Beginner</Button>
      <Button onClick={() => changeGameDifficulty('Intermediate')}>
        Intermediate
      </Button>
      <Button onClick={() => changeGameDifficulty('Expert')}>Expert</Button>
      <Button onClick={toggleCustomDifficulty}>Custom</Button>
      <Timer>⏱️ {formattedTime}</Timer>
      <Button onClick={reset}>Reset</Button>
    </Control>
  );
};
