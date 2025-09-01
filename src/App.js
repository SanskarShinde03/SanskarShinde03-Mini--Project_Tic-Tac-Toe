import React, { useState } from 'react';
import './App.css';

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function App() {
  const [boxes, setBoxes] = useState(Array(9).fill(''));
  const [turnO, setTurnO] = useState(true); // true for O, false for X
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = (board) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        board[a] !== '' &&
        board[a] === board[b] &&
        board[b] === board[c]
      ) {
        return board[a];
      }
    }
    if (board.every(box => box !== '')) {
      return 'Draw';
    }
    return null;
  };

  const handleClick = (index) => {
    if (gameOver || boxes[index] !== '') return;

    const newBoxes = [...boxes];
    newBoxes[index] = turnO ? 'O' : 'X';
    setBoxes(newBoxes);

    const winner = checkWinner(newBoxes);
    if (winner) {
      if (winner === 'Draw') {
        setMessage("It's a Draw!");
      } else {
        setMessage(`Congratulations, winner is ${winner}!`);
      }
      setGameOver(true);
    } else {
      setTurnO(!turnO);
    }
  };

  const resetGame = () => {
    setBoxes(Array(9).fill(''));
    setTurnO(true);
    setMessage('');
    setGameOver(false);
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe Game</h1>
      <div className="game">
        {boxes.map((box, index) => (
          <button
            key={index}
            className="box"
            onClick={() => handleClick(index)}
            disabled={gameOver || box !== ''}
          >
            {box}
          </button>
        ))}
      </div>
      <div className={`msg-container ${message ? '' : 'hide'}`}>
        <div id="msg">{message}</div>
      </div>
      <button className="reset" onClick={resetGame}>Reset Game</button>
      <button className="new" onClick={resetGame}>New Game</button>
    </div>
  );
}

export default App;
