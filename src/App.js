import "./App.css";
import React from "react";
import Particles from "react-tsparticles";

const Board = ({ setWinner }) => {
  const [squares, setSquares] = React.useState(() =>
    localStorage.getItem("squares")
      ? JSON.parse(localStorage.getItem("squares"))
      : Array(9).fill(null)
  );

  const calcNextValue = (squares) => {
    return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
  };
  React.useEffect(() => {
    localStorage.setItem("squares", JSON.stringify(squares));
  }, [squares]);
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
        setWinner(true);
        return squares[c];
      }
      setWinner(false);
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
    if (winner || squares[squareIndex]) {
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

const Game = ({ setWinner }) => {
  return (
    <div>
      <div className="game">
        <Board setWinner={setWinner} />
      </div>
    </div>
  );
};

function App() {
  const [winner, setWinner] = React.useState(null);

  return (
    <>
      {winner && (
        <Particles
          className="particles"
          id="tsparticles"
          options={{
            fullScreen: {
              enable: true,
            },
            detectRetina: true,
            background: {
              color: "rgba(158, 116, 175, 0.692)",
            },
            fpsLimit: 60,
            emitters: {
              direction: "top",
              life: {
                count: 0,
                duration: 0.1,
                delay: 0.1,
              },
              rate: {
                delay: 0.5,
                quantity: 1,
              },
              size: {
                width: 100,
                height: 0,
              },
              position: {
                y: 100,
                x: 50,
              },
            },
            particles: {
              number: {
                value: 0,
              },
              destroy: {
                mode: "split",
                split: {
                  count: 1,
                  factor: { value: 1 / 3 },
                  rate: {
                    value: 100,
                  },
                  particles: {
                    stroke: {
                      color: {
                        value: [
                          "#5bc0eb",
                          "#fde74c",
                          "#9bc53d",
                          "#e55934",
                          "#fa7921",
                        ],
                      },
                      width: 1,
                    },
                    number: {
                      value: 0,
                    },
                    collisions: {
                      enable: false,
                    },
                    opacity: {
                      value: 1,
                      animation: {
                        enable: true,
                        speed: 0.6,
                        minimumValue: 0.1,
                        sync: false,
                        startValue: "max",
                        destroy: "min",
                      },
                    },
                    shape: {
                      type: "circle",
                    },
                    size: {
                      value: 1,
                      animation: {
                        enable: false,
                      },
                    },
                    life: {
                      count: 1,
                      duration: {
                        value: {
                          min: 1,
                          max: 2,
                        },
                      },
                    },
                    move: {
                      enable: true,
                      gravity: {
                        enable: false,
                      },
                      speed: 2,
                      direction: "none",
                      random: true,
                      straight: false,
                      outMode: "destroy",
                    },
                  },
                },
              },
              life: {
                count: 1,
              },
              shape: {
                type: "line",
              },
              size: {
                value: { min: 0.1, max: 50 },
                animation: {
                  enable: true,
                  sync: true,
                  speed: 150,
                  startValue: "max",
                  destroy: "min",
                },
              },
              stroke: {
                color: {
                  value: "#ffffff",
                },
                width: 1,
              },
              rotate: {
                path: true,
              },
              move: {
                enable: true,
                gravity: {
                  acceleration: 15,
                  enable: true,
                  inverse: true,
                  maxSpeed: 100,
                },
                speed: { min: 10, max: 20 },
                outModes: {
                  default: "destroy",
                  top: "none",
                },
                trail: {
                  enable: true,
                  length: 10,
                },
              },
            },
          }}
        />
      )}
      <div className="main-container">
        <div className="game-container">
          <div className="title">Awesome Tic Tac Toe</div>
          <Game setWinner={setWinner} />
        </div>
      </div>
    </>
  );
}

export default App;
