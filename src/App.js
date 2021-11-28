import "./App.css";

const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const renderSquare = (i) => {
  return <button className="square">{squares[i]}</button>;
};
const Board = () => {
  return (
    <div>
      <div className="status">STATUS</div>
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
      <button className="restart">Restart</button>
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
      <div class="parent">
        <div class="center">
          <Game />
        </div>
      </div>
    </>
  );
}

export default App;
