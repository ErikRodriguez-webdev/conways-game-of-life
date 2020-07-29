import React, { useState } from "react";

const Grid = () => {
  function createGrid(num) {
    const gridCol = [];

    for (let i = 0; i < gridCol.length; i++) {
      gridCol[i] = new Array(gridRows);
    }

    return gridCol;
  }

  // initialize use state with a 25 by 25 grid
  const [grid, setGrid] = useState(true);

  return <div>Hello test</div>;
};

export default Grid;
