import styled from 'styled-components';

export const Button = styled.button`
  margin: 0 5px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  border: none;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const CustomControls = styled.div`
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: #333;
`;

export const Input = styled.input`
  width: 60px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;
