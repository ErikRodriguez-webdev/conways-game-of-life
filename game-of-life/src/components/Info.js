import React from "react";
import "../App.css";

const Info = () => {
  return (
    <div className="infoPage">
      <p>Rules:</p>
      <p>Alive is 1 or white</p>
      <p>Dead is 0 or black</p>

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
    </div>
  );
};

export default Info;
