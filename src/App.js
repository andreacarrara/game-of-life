import React, { useState, useRef, useCallback } from 'react';
import produce from 'immer';

const numRows = 20;
const numCols = 20;

const neighbours = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

const getEmptyGrid = () => {
  const rows = [];
    for (let i = 0; i < numRows; i++)
      rows[i] = new Array(numCols).fill(0);

  return rows;
};

function App() {
  const [grid, setGrid] = useState(() => {
    // Initialize grid
    return getEmptyGrid();
   });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const [generation, setGeneration] = useState(0);

  const runSimulation = useCallback(() => {
    if (!runningRef.current)
      return;

    // Update grid
    setGrid(grid => {
      return produce(grid, gridCopy => {
        for (let i = 0; i < numRows; i++)
          for (let j = 0; j < numCols; j++) {
            // Count neighbours
            let numNeighbours = 0;
            neighbours.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols)
                numNeighbours += grid[newI][newJ];
            });

            // Check rules
            if (numNeighbours < 2 || numNeighbours > 3)
              gridCopy[i][j] = 0;
            else if (grid[i][j] === 0 && numNeighbours === 3)
              gridCopy[i][j] = 1;
          }
      });
    });

    // Update generation
    setGeneration(generation => {
      return generation + 1;
    });

    setTimeout(runSimulation, 200);
  }, []); // Always memoize

  return (
    <>
      <button
        onClick={() => {
          // Run simulation
          setRunning(!running);
          runningRef.current = true; // Prevent race condition
          runSimulation();
        }}
      >
        {running ? 'Stop' : 'Start'}
      </button>
      <button
        onClick={() => {
          // Reset grid
          setGrid(getEmptyGrid);
          // Reset generation
          setGeneration(0);
        }}
      >
        Reset
      </button>
      <p>
        Generation: {generation}
      </p>
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
              onClick={() => {
                // Toggle status
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
    </>
  );
}

export default App;
