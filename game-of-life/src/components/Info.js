import React from "react";
import "../App.css";

const Info = () => {
  return (
    <div className="infoPage">
      <p>Rules:</p>
      <ol style={{ textAlign: "left" }}>
        <li> Any live cell with two or three live neighbours survives.</li>
        <li> Any dead cell with three live neighbours becomes a live cell.</li>
        <li>
          All other live cells die in the next generation. Similarly, all other
          dead cells stay dead.
        </li>
      </ol>

      <p>About the Algorithm:</p>
      <p>
        Initial seed is either randomized or toggled and the first generation is
        created by applying the above rules simultaneously to every cell in the
        seed; births and deaths occur simultaneously, and the discrete moment at
        which this happens is sometimes called a tick. Each generation is a pure
        function of the preceding one. The rules continue to be applied
        repeatedly to create further generations until death.
      </p>
      <p>
        A square from the grid is a cell. If that cell is alive it is
        represented with the color white or 1. However, if that cell is dead it
        is represented with the color black or 0. That cell will die if the
        surrounding neighbor count is one or less, due to under population.
        Similarly if the surrounding cells are four or more then the cell will
        die, due to over population.
      </p>
    </div>
  );
};

export default Info;
