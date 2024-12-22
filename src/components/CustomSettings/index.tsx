import {
  CustomControls,
  InputGroup,
  Label,
  Input,
  Button,
} from '@/components/CustomSettings/style';
import { useCustomSettings } from '@/hooks/useCustomSettings';

export const CustomSettings = () => {
  const { customSettings, handleCustomChange, applySettings } =
    useCustomSettings();

  return (
    <CustomControls>
      <InputGroup>
        <Label>가로:</Label>
        <Input
          type='number'
          value={customSettings.rows}
          onChange={(e) => handleCustomChange('rows', Number(e.target.value))}
          min='1'
          max='100'
        />
      </InputGroup>
      <InputGroup>
        <Label>세로:</Label>
        <Input
          type='number'
          value={customSettings.cols}
          onChange={(e) => handleCustomChange('cols', Number(e.target.value))}
          min='1'
          max='100'
        />
      </InputGroup>
      <InputGroup>
        <Label>지뢰 수:</Label>
        <Input
          type='number'
          value={customSettings.mines}
          onChange={(e) => handleCustomChange('mines', Number(e.target.value))}
          min='1'
          max={Math.floor((customSettings.rows * customSettings.cols) / 3)}
        />
      </InputGroup>
      <Button onClick={applySettings}>적용</Button>
    </CustomControls>
  );
};
