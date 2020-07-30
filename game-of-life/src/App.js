import React, { useState, useCallback, useRef } from "react";
import "./App.css";

function App() {
  const numRows = 50;
  const numCols = 50;

  const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];

  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  };

  return <div className="App">hello</div>;
}

export default App;
