import React from "react";
import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      GameOver: false,
      playAble: true,
      winner: null,
      status: "Next Player: X",
    };
  }

  componentDidUpdate() {
    console.log("Component is updated: ");
    console.log("this state:", this.state)
    if (!this.state.GameOver) {
      this.isGameOver();
    }

  }

  isGameOver() {
    const result = calculateWinner(this.state.squares);

    if (result) {
      this.setState({
        winner: result ? true : false,
        playAble: false,
        GameOver: true,
        status: "Game Over:: Winner: " + result,
      });
    }

    return result;
  }

  handleClick(i) {
    // if Game is not Over

    if (!this.isGameOver()) {
      // making a copy of the current status
      const squares = this.state.squares.slice();

      // Setting to currently selected

      squares[i] = this.state.xIsNext ? "X" : "O";
      // now we will will update the state.
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        status: "Next Player: " + (!this.state.xIsNext ? "X" : "O"),
      });

      //   document.dispatchEvent(this.gameOverEvent);
      this.isGameOver();
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    // Now first we will calculate the winner first then we will go ahead

    return (
      <div>
        <div className="status">{this.state.status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

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

export default Board;
