import { useState } from "react";
import GameButton from "./GameButton";

const gameInit = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

const GameBoard = () => {
  const [states, setStates] = useState(gameInit);

  function click(e) {
    console.log(e.target);
    console.log(states);
  }

  return (
    <div className="game-board">
      {gameInit.map((item, index) => {
        return <GameButton value={states[index]} onClick={click} />;
      })}
    </div>
  );
};

export default GameBoard;
