import React, { useState } from 'react';
import produce from 'immer';

const numRows = 20;
const numCols = 20;

function App() {
  const [grid, setGrid] = useState(() => {
    // Initialize grid
    const rows = [];
    for (let i = 0; i < numRows; i++)
      rows[i] = new Array(numCols).fill(0);

    return rows;
  });

  return (
    <div style={{
      backgroundColor: 'black',
      border: '1px solid black',
      display: 'inline-grid',
      gridTemplateColumns: `repeat(${numCols}, 20px)`,
      gridGap: 1
    }}>
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            // Toggle status
            onClick={() => {
              // Update grid
              setGrid(produce(grid, gridCopy => {
                gridCopy[i][j] = grid[i][j]? 0 : 1;
              }));
            }}
            style={{
              width: 20,
              height: 20,
              // Set color based on status
              backgroundColor: cell ? 'black' : 'white'
            }}
          />
        ))
      )}
    </div>
  );
}

export default App;
