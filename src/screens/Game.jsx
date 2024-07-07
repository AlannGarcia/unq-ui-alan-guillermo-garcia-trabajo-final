import React, { useState, useEffect } from 'react';
import DifficultySelector from '../components/DifficultySelector';
import Question from '../components/Question';
import { getQuestions } from '../services/api';
import '../styles/styles.css';

const Game = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (difficulty) {
      const fetchQuestions = async () => {
        const data = await getQuestions(difficulty);
        setQuestions(data);
      };

      fetchQuestions();
    }
  }, [difficulty]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handleRestart = () => {
    setDifficulty(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleContinue = () => {
    setDifficulty(null);
    setCurrentQuestionIndex(0);
   
  };

  if (!difficulty) {
    return <DifficultySelector onSelectDifficulty={setDifficulty} />;
  }

  if (questions.length === 0) {
    return (
      <div>
        <h2>Loading questions...</h2>
      </div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="container">
        <div className="game-over-wrapper">
          <h2>Game Over</h2>
          <p>Your score: {score}</p>
          <button onClick={handleRestart}>Restart Game</button>
          <button onClick={handleContinue}>Continue Playing</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="wrapper">
        <Question question={questions[currentQuestionIndex]} onAnswer={handleAnswer} />
      </div>
    </div>
  );
};

export default Game;
