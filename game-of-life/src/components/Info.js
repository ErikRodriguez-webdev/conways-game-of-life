import React from "react";
import "../App.css";

const Info = () => {
  return (
    <div className="infoPage">
      <h1>The Game of Life</h1>
      <p>
        The universe of the Game of Life is an infinite, two-dimensional
        orthogonal grid of square cells, each of which is in one of two possible
        states, live or dead, (or populated and unpopulated, respectively).
        Every cell interacts with its eight neighbours, which are the cells that
        are horizontally, vertically, or diagonally adjacent. At each step in
        time, the following transitions occur:
      </p>

      <ul>
        <li>
          Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
        </li>
        <li>
          Any live cell with two or three live neighbours lives on to the next
          generation.
        </li>
        <li>
          Any live cell with more than three live neighbours dies, as if by
          overpopulation.
        </li>
        <li>
          Any dead cell with exactly three live neighbours becomes a live cell,
          as if by reproduction.
        </li>
      </ul>

      <p>
        These rules, which compare the behavior of the automaton to real life,
        can be condensed into the following:
      </p>

      <li>Any live cell with two or three live neighbours survives.</li>
      <li>Any dead cell with three live neighbours becomes a live cell.</li>
      <li>
        All other live cells die in the next generation. Similarly, all other
        dead cells stay dead.
      </li>

      <p>
        The initial pattern constitutes the seed of the system. The first
        generation is created by applying the above rules simultaneously to
        every cell in the seed; births and deaths occur simultaneously, and the
        discrete moment at which this happens is sometimes called a tick. Each
        generation is a pure function of the preceding one. The rules continue
        to be applied repeatedly to create further generations.
      </p>
    </div>
  );
};

export default Info;
