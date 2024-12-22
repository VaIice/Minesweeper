import styled from 'styled-components';

export const Control = styled.div`
  margin: 20px auto;
  text-align: center;
`;

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

  &: hover {
    background-color: #eee;
  }
`;

export const Timer = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 20px 0px;
`;
