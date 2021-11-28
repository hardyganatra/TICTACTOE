import "./App.css";
import React from "react";

const Board = () => {
  const [squares, setSquares] = React.useState(() => Array(9).fill(null));
  const calcNextValue = (squares) => {
    return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
  };
  const calcWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[c];
      }
    }
    return null;
  };
  const calcStatus = (winner, squares, nextValue) => {
    if (winner) {
      return `Winner is ${winner}`;
    } else if (squares.every(Boolean)) {
      return "Its a Draw";
    } else {
      return `Next Player ${nextValue}`;
    }
  };
  const nextValue = calcNextValue(squares);
  const winner = calcWinner(squares);
  const status = calcStatus(winner, squares, nextValue);

  const selectSquare = (squareIndex) => {
    if (winner) {
      return;
    } else {
      const squaresCopy = [...squares];
      squaresCopy[squareIndex] = nextValue;
      setSquares(squaresCopy);
    }
  };

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  };
  return (
    <div>
      <div className="status">{status}</div>
      <div className="container">
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
      <button
        className="restart"
        onClick={() => {
          setSquares(Array(9).fill(null));
        }}
      >
        Restart
      </button>
    </div>
  );
};

const Game = () => {
  return (
    <div>
      <div className="game">
        <Board />
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Game />
    </>
  );
}

export default App;
