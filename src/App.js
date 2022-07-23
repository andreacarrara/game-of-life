import React, { useState, useRef, useCallback } from "react";
import { produce } from "immer"; // Used to update grid
import Toolbar from "./Toolbar/Toolbar";
import Grid from "./Grid/Grid";
import Modal from "./Modal/Modal";

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

const resolution = 33;
const toolbarHeight = 99;

const numRows = Math.floor((windowHeight - toolbarHeight) / resolution);
const numCols = Math.floor(windowWidth / resolution);

const neighbours = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const getEmptyGrid = () => {
  return Array.from({ length: numRows }).map(() =>
    Array.from({ length: numCols }).fill(0)
  );
};

function App() {
  const [grid, setGrid] = useState(getEmptyGrid);

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const [generation, setGeneration] = useState(0);

  const [modal, setModal] = useState(true);

  const countNeighbours = (grid, i, j) => {
    let numNeighbours = 0;
    neighbours.forEach(([x, y]) => {
      // Check bounds
      const k = i + x;
      const l = j + y;
      if (k >= 0 && k < numRows && l >= 0 && l < numCols)
        numNeighbours += grid[k][l] ? 1 : 0;
    });

    return numNeighbours;
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    // Update grid
    setGrid((grid) => {
      return produce(grid, (gridCopy) =>
        grid.forEach((row, i) =>
          row.forEach((cell, j) => {
            if (cell > 0)
              // Increment cell iteration
              gridCopy[i][j] += 1;

            // Check rules
            const numNeighbours = countNeighbours(grid, i, j);
            if (numNeighbours < 2 || numNeighbours > 3) gridCopy[i][j] = 0;
            else if (cell === 0 && numNeighbours === 3) gridCopy[i][j] = 1;
          })
        )
      );
    });

    // Increment generation
    setGeneration((generation) => {
      return generation + 1;
    });

    setTimeout(runSimulation, 200); // Recursive
  }, []); // Always memoize

  const onRun = () => {
    // Toggle running
    setRunning(!running);

    if (!running) {
      // Run simulation
      runningRef.current = true; // Prevent race condition
      runSimulation();
    }
  };

  const onClear = () => {
    // Clear grid
    setGrid(getEmptyGrid);
    // Stop simulation
    setRunning(false);
    // Reset generation
    setGeneration(0);
  };

  const onCell = (event, i, j) => {
    if (event.buttons === 1)
      // Primary button pressed
      // Toggle cell status
      setGrid(
        produce(grid, (gridCopy) => {
          gridCopy[i][j] = grid[i][j] ? 0 : 1;
        })
      );
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return windowWidth > 1024 ? (
    <>
      <Toolbar
        onRun={onRun}
        running={running}
        onClear={onClear}
        generation={generation}
        onInfo={toggleModal}
      />
      <Grid numCols={numCols} grid={grid} onCell={onCell} />
      <Modal showing={modal} onClose={toggleModal} />
    </>
  ) : (
    // Mobile warning
    <p>Mobile is not yet supported, sorry!</p>
  );
}

export default App;
