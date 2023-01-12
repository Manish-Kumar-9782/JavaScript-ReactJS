import React from "react";
import Board from "./Board";
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <h1 className="my-0">Tic Tac Toe</h1>
          <hr style={{ boxShadow: "0px 3px 2px 0px #ccc" }} />
          <Board />
        </div>
        <div className="game-info">
          <div> {/* status */} </div>
          <ol> {/* todo */} </ol>
        </div>
      </div>
    );
  }
}

export default Game;
