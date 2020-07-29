import React, { useState, useEffect } from "react";
import "../App.css";

const Grid = () => {
  function createEmptyGrid(num) {
    // create columns array that holds all other arrays
    const gridCol = [];

    for (let i = 0; i < num; i++) {
      // create rows with num length and push into gridCol
      const gridRows = [];

      for (let j = 0; j < num; j++) {
        // generate a number being 0 or 1
        gridRows.push(0);
      }

      // each row is added once filled
      gridCol.push(gridRows);
    }

    return gridCol;
  }

  function createGridRandom(num) {
    // create columns array that holds all other arrays
    const gridCol = [];

    for (let i = 0; i < num; i++) {
      // create rows with num length and push into gridCol
      const gridRows = [];

      for (let j = 0; j < num; j++) {
        // generate a number being 0 or 1
        gridRows.push(Math.round(Math.random()));
      }

      // each row is added once filled
      gridCol.push(gridRows);
    }

    return gridCol;
  }

  function toggleCell(iValue, jValue) {
    console.log(iValue, jValue, grid[iValue][jValue]);
    // if grid value is equal to dead(0), then create copy of grid and update grid value to alive(1)
    if (grid[iValue][jValue] === 0) {
      setGrid([...grid]);
      grid[iValue][jValue] = 1;
      // else, then create copy of grid and update grid value to dead(0)
    } else {
      setGrid([...grid]);
      grid[iValue][jValue] = 0;
    }
  }

  // initialize state with a square grid of integer passed
  const [grid, setGrid] = useState(createEmptyGrid(20));

  // keep track of generations with count of new grid
  const [generations, setGenerations] = useState(0);
  // console.log(generations);

  // useEffect(() => {}, [toggleCell]);

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: `repeat(${grid.length}, ${grid.length}px)`,
        margin: "auto",
      }}
    >
      {/* 2 map loops to traverse through all cells in grid */}
      {grid.map((rows, i) =>
        rows.map((col, j) => (
          <div
            key={`${i}-${j}`}
            onClick={() => toggleCell(i, j)}
            style={{
              width: grid.length,
              height: grid.length,
              border: "0.5px solid silver",
              background: grid[i][j] === 1 ? "white" : "black",
            }}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
