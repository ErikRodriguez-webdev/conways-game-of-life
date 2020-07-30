import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";

function App() {
  // square graph rows and cols
  const numRows = 10;
  const numCols = 10;

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

  // const createBlinker = () => {
  //   // create row main array
  //   const rows = [];
  //   // for loop through num of rows
  //   for (let i = 0; i < numRows; i++) {
  //     // push in an empty array that holds num or col of zeroes
  //     rows.push(Array.from(Array(numCols), () => 0));
  //   }
  //   //set blinker cells
  //   rows[11][12] = 1;
  //   rows[11][13] = 1;
  //   rows[11][14] = 1;
  //   // return rows grid structure
  //   return rows;
  // };

  // grid starting state is an empty grid
  const [grid, setGrid] = useState(createEmptyGrid());

  // const [selected, setSelected] = useState(0);
  // console.log(selected);

  // const patternHandler = () => {
  //   const patternSelected = document.querySelector("#patterns");
  //   return setSelected(patternSelected.value);
  // };

  // // initial patterns
  // const patternSubmit = () => {
  //   // event.preventDefault();
  //   let type = selected;

  //   if (type === 0) {
  //     return createEmptyGrid();
  //     //Blinker pattern
  //   } else if (type === 1) {
  //     return createBlinker();
  //   }
  // };

  // running variable to act as kill switch
  const [running, setRunning] = useState(false);

  // running ref made to use and track inside of useCallback fn
  const runningRef = useRef(running);
  runningRef.current = running;

  // generation variable to count num of generations
  const [generation, setGeneration] = useState(0);

  // generation ref made to track count inside of useCallback fn
  const genRef = useRef(generation);
  genRef.current = generation;

  // run main game simulation to continue creating new generations of grids
  const runSimulation = useCallback(() => {
    // check if kill switch is false
    if (!runningRef.current) {
      // then return
      return;
    }

    // add one to generation count
    setGeneration(genRef.current + 1);

    // set new grid by keeping last generation grid and returning next generation grid
    setGrid((lastGen) => {
      return produce(lastGen, (gridCopy) => {
        // traverse through all cells with nested for loops
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            // start neighbor count at zero
            let countNeighbors = 0;

            // run through cell surrounding neighbors
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              // find all neighbors and add to count
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                // then dead neighbors are worth 0 and alive neighbors are worth 1
                countNeighbors += lastGen[newI][newJ];
              }
            });

            // check if neighbor count is less than 2 or greater than 3
            if (countNeighbors < 2 || countNeighbors > 3) {
              // then cell should be dead by under pop or over pop in next generation
              gridCopy[i][j] = 0;
              // check if last generation cell is equal to 0 and neighbor count is 3
            } else if (lastGen[i][j] === 0 && countNeighbors === 3) {
              // then cell is born out of reproduction in next generation
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    }, []);

    setTimeout(() => {
      // recurse to continue generating new grids
      runSimulation();
    }, 100);
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
      </div>
      {/* grid traverse and styling here */}
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
                console.log(i, j, grid[i][j]);
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
