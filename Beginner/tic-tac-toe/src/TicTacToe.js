import GameBoard from "./Components/GameBoard";
import "./TicTacToe.css";

/*
 * * *
 * * *
 * * *
 */

const TicTacToe = () => {
  return (
    <div className="game">
      {/* In this we will put Tic Tac Toe game board.*/}
      <GameBoard />
    </div>
  );
};

export default TicTacToe;
