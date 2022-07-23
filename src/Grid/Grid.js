import React from "react";
import "./Grid.css";

const cellSize = 30; // In pixels
const cellColors = [
  "ffffff",
  "7ed957",
  "38b6ff",
  "5271ff",
  "8c52ff",
  "cb6ce6",
  "ff66c4",
  "ff914d",
  "ff5757",
  "000000",
]; // In hexadecimal

function Grid(props) {
  const getCellColor = (cell) => {
    if (cell > 9) cell = 9;
    return `#${cellColors[cell]}`;
  };

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${props.numCols}, ${cellSize}px)`,
      }}
    >
      {props.grid.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            onMouseDown={(event) => props.onCell(event, i, j)}
            onMouseOver={(event) => props.onCell(event, i, j)}
            style={{
              width: cellSize,
              height: cellSize,
              // Set color based on cell iteration
              backgroundColor: getCellColor(cell),
            }}
          />
        ))
      )}
    </div>
  );
}

export default Grid;
