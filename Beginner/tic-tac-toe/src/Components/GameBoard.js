import { useState } from "react";
import GameButton from "./GameButton";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const gameInit = ["", "", "", "", "", "", "", "", ""];

const GameBoard = () => {
  const [states, setStates] = useState(gameInit);
  const [winner, setWinner] = useState(null);
  const [playerTurn, setTurn] = useState("X");

  function click(e) {
    let newState = Array(...states);
    newState[e.target.id] = playerTurn;

    setStates(newState);

    setTurn(playerTurn === "X" ? "O" : "X");
    let winner = calculateWinner(newState);
    // this will not show the real time effect.
    if (winner != null) {
      console.log("winner is " + winner);
      setWinner(`::Winner is :${winner}`);
    }
  }

  return (
    <div>
      <p>
        <b>Player: </b>
        {playerTurn}
        <span>{winner}</span>
      </p>

      <div className="game-board">
        {gameInit.map((item, index) => {
          return (
            <GameButton
              key={index}
              id={index}
              value={states[index]}
              onClick={click}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
