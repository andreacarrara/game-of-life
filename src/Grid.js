import React from 'react';

const cellSize = 20; // In pixels

function Grid(props) {
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
              // Set color based on cell status
              backgroundColor: cell ? 'black' : 'white',
              userSelect: "none" // Prevent dragging
            }}
          />
        )
      )}
    </div>
  );
}

export default Grid;
