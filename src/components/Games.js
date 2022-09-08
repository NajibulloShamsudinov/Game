import { useState } from "react";
import "./Games.css";
import Square from "./Suare";
import Calculator from "./Calculator";

function Restart({ onClick }) {
  return (
    <button className="restart" onClick={onClick}>
      Play again
    </button>
  );
}

function boardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
}
function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const nextSymbol = isXNext ? "X" : "O";
  const winner = Calculator(squares);

  const getStatus = () => {
    if (winner) {
      return "Winner: " + winner;
    } else if (boardFull(squares)) {
      return "Draw!";
    } else {
      return "Next player: " + nextSymbol;
    }
  };

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          if (squares[i] != null || winner != null) {
            return;
          }
          const nextSquares = squares.slice();
          nextSquares[i] = nextSymbol;
          setSquares(nextSquares);

          setIsXNext(!isXNext);
        }}
      />
    );
  };

  const renderRestartButton = () => {
    <Restart
      onClick={() => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
      }}
    />;
  };

  return (
    <div className="container">
      <div className="game">
        <div className="game-board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="game-info">{getStatus()}</div>
        <div className="restart-button">{renderRestartButton()}</div>
      </div>
    </div>
  );
}
export default Game;
