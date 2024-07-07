import React, { useState, useEffect } from 'react';
import { getDifficulties } from '../services/api';
import '../styles/styles.css';

const DifficultySelector = ({ onSelectDifficulty }) => {
  const [difficulties, setDifficulties] = useState([]);

  useEffect(() => {
    const fetchDifficulties = async () => {
      const data = await getDifficulties();
      setDifficulties(data);
    };

    fetchDifficulties();
  }, []);

  return (
    <div>
      <h1>UNQuestions</h1>
      <h2>Select Difficulty</h2>
      {difficulties.map(difficulty => (
        <button key={difficulty} onClick={() => onSelectDifficulty(difficulty)}>
          {difficulty}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
