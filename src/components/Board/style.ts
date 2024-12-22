import styled from 'styled-components';

export const MinesweeperTable = styled.table`
  margin: 20px auto;
  border-collapse: collapse;
  border-spacing: 0;
`;

export const MinesweeperCell = styled.td`
  width: 50px;
  height: 45px;
  border: 1px solid #000;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  font-size: 18px;
  background-color: #ddd;
  padding: 0;

  &.revealed {
    background-color: #fff;
    cursor: default;

    &:hover {
      background-color: #fff;
    }
  }

  &:hover {
    background-color: #eaeaea;
  }
`;
