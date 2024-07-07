import React, { useState } from 'react';
import { postAnswer } from '../services/api';
import '../styles/styles.css';

const Question = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSubmit = async () => {
    try {
      const result = await postAnswer(question.id, selectedOption);
      setIsCorrect(result.answer);
      setTimeout(() => {
        onAnswer(result.answer, selectedOption);
        setIsCorrect(null);
      }, 1000); 
    } catch (error) {
      setIsCorrect(false);
      setTimeout(() => {
        onAnswer(false, selectedOption);
        setIsCorrect(null);
      }, 1000);
    }
  };

  if (!question || !question.option1) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`question-wrapper ${isCorrect !== null ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
      <h2>{question.question}</h2>
      {[question.option1, question.option2, question.option3, question.option4].map((option, index) => (
        <label
          key={index}
          className={`option-label ${selectedOption === `option${index + 1}` ? 'selected' : ''}`}
        >
          <input
            type="radio"
            value={`option${index + 1}`}
            checked={selectedOption === `option${index + 1}`}
            onChange={() => setSelectedOption(`option${index + 1}`)}
            style={{ display: 'none' }}
          />
          {option}
        </label>
      ))}
      <button onClick={handleSubmit}>Submit Answer</button>
    </div>
  );
};

export default Question;
