// App.js
import { useState, useEffect } from 'react';
import './App.css';

const choices = ['rock', 'paper', 'scissors'];

const HandButton = ({ type, onClick, isWinner }) => {
  return (
    <button 
      className={`hand-button ${type} ${isWinner ? 'winner' : ''}`}
      onClick={onClick}
      disabled={!!isWinner}
    >
      <div className="hand-icon">
        <img 
          src={`/${type}.png`} 
          alt={type} 
          className="hand-image" 
        />
      </div>
    </button>
  );
};

const Result = ({ result }) => {
  return (
    <div className={`result ${result}`}>
      {result === 'win' && 'Победа!'}
      {result === 'lose' && 'Поражение!'}
      {result === 'draw' && 'Ничья!'}
    </div>
  );
};

const Game = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const determineWinner = (player, computer) => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'scissors' && computer === 'paper') ||
      (player === 'paper' && computer === 'rock')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const handlePlay = (choice) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult(null);

    setTimeout(() => {
      const computer = choices[Math.floor(Math.random() * 3)];
      setComputerChoice(computer);
      const gameResult = determineWinner(choice, computer);
      setResult(gameResult);
      if (gameResult === 'win') setScore(s => s + 1);
      if (gameResult === 'lose') setScore(s => Math.max(0, s - 1));
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <div className="game-container">
      <div className="score-board">
        <div className="score">Счёт: {score}</div>
      </div>

      <div className="hands-container">
        <div className="player-hand">
          {playerChoice && (
            <HandButton 
              type={playerChoice} 
              isWinner={result === 'win'}
            />
          )}
        </div>
        
        <div className="computer-hand">
          {computerChoice && (
            <HandButton 
              type={computerChoice} 
              isWinner={result === 'lose'}
            />
          )}
        </div>
      </div>

      {result && <Result result={result} />}

      <div className="controls">
        {choices.map((choice) => (
          <HandButton
            key={choice}
            type={choice}
            onClick={() => handlePlay(choice)}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;