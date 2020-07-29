import React from "react";
import "../App.css";

const Grid = () => {
  function createGrid(num) {
    // create columns array that holds all other arrays
    const gridCol = [];

    for (let i = 0; i < num; i++) {
      // create rows with num length and push into gridCol
      const gridRows = [];

      for (let j = 0; j < num; j++) {
        gridRows.push(0);
      }

      // each row is added once filled
      gridCol.push(gridRows);
    }

    return gridCol;
  }

  // initialize state with a 25 by 25 grid
  const grid = createGrid(10);

  return <div className="theGrid">
    {/* box design for cells to create grid look */}{
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] == 1) {
        return <div className='gridCell' style={{background: "red"}}/>
      }
      <div className='gridCell'/>
    }
  }}
  </div>;
};

export default Grid;
