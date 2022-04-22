import React from 'react';

const cellSize = 20; // In pixels
const cellColors = ['ffffff', '7ed957', '38b6ff', '5271ff', '8c52ff', 'cb6ce6', 'ff66c4', 'ff914d', 'ff5757', '000000']; // In hexadecimal

function Grid(props) {

  const getCellColor = (cell) => {
    if (cell > 9)
      cell = 9;
    return `#${cellColors[cell]}`;
  };

  return (
    <div style={{
      backgroundColor: 'black',
      border: '1px solid black',
      display: 'inline-grid',
      gridTemplateColumns: `repeat(${props.numCols}, ${cellSize}px)`,
      gridGap: 1
    }}>
      {props.grid.map((row, i) =>
        row.map((cell, j) =>
          <div
            key={`${i}-${j}`}
            onMouseDown={(event) =>
              props.onCell(event, i, j)
            }
            onMouseOver={(event) =>
              props.onCell(event, i, j)
            }
            style={{
              width: cellSize,
              height: cellSize,
              // Set color based on cell iteration
              backgroundColor: getCellColor(cell),
              userSelect: "none" // Prevent dragging
            }}
          />
        )
      )}
    </div>
  );
}

export default Grid;
