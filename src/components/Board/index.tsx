import { MinesweeperTable, MinesweeperCell } from '@/components/Board/style';
import { useBoard } from '@/hooks/useBoard';

export const Board = () => {
  const { board, click, rightClick, bothClick } = useBoard();

  return (
    <MinesweeperTable>
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <MinesweeperCell
                key={colIndex}
                onClick={() => click(rowIndex, colIndex)}
                onContextMenu={(e) => rightClick(e, rowIndex, colIndex)}
                onMouseDown={(e) => bothClick(e, rowIndex, colIndex)}
                className={cell.isRevealed ? 'revealed' : ''}
                data-mines={cell.nearbyMines}
              >
                {cell.isRevealed
                  ? cell.isMine
                    ? '💣'
                    : cell.nearbyMines || ''
                  : cell.isFlagged
                    ? '🚩'
                    : ''}
              </MinesweeperCell>
            ))}
          </tr>
        ))}
      </tbody>
    </MinesweeperTable>
  );
};
