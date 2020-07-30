import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";

function App() {
  // square graph rows and cols
  const numRows = 25;
  const numCols = 25;

  // set timeout ms count used for speed
  const slow = 1250;
  const medium = 500;
  const fast = 0;

  let [gameSpeed, setGameSpeed] = useState(medium);

  // used to traverse around and count neighbors
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

  const createEmptyGrid = () => {
    // create row main array
    const rows = [];
    // for loop through num of rows
    for (let i = 0; i < numRows; i++) {
      // push in an empty array that holds num or col of zeroes
      rows.push(Array.from(Array(numCols), () => 0));
    }
    // return rows grid structure
    return rows;
  };

  const [grid, setGrid] = useState(() => {
    return createEmptyGrid();
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const [generation, setGeneration] = useState(0);

  const genRef = useRef(generation);
  genRef.current = generation;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGeneration(genRef.current + 1);

    setGrid((lastGen) => {
      return produce(lastGen, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let countNeighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                countNeighbors += lastGen[newI][newJ];
              }
            });

            if (countNeighbors < 2 || countNeighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (lastGen[i][j] === 0 && countNeighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    }, []);
    setTimeout(runSimulation, gameSpeed);
  }, []);

  return (
    <div className="game">
      <h1 style={{ fontSize: 50, width: 150 }}>The Game of Life</h1>
      <div className="gameButtons">
        <div style={{ fontSize: 18 }}>{`Generation: ${generation}`}</div>
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "Stop Game" : "Start Game"}
        </button>
        <button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }

            setGrid(rows);
          }}
        >
          Randomize Grid
        </button>
        <button
          onClick={() => {
            setGrid(createEmptyGrid());
            setGeneration(0);
          }}
        >
          Clear Grid
        </button>
        <div className="gameSpeed">
          <div>{`Game Speed: ${gameSpeed} ms`}</div>
          <button onClick={() => setGameSpeed(slow)}>slow</button>
          <button onClick={() => setGameSpeed(medium)}>medium</button>
          <button onClick={() => setGameSpeed(fast)}>fast</button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 23px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "white" : "black",
                border: "solid 1px silver",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
