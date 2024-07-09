import React, { useState, useEffect } from 'react';
import { getDifficulties } from '../services/api';
import '../styles/styles.css';

const Difficulty = ({ onSelectDifficulty }) => {
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
      <img src="./logo.png" alt="UNQuestions Logo" className="logo" />
      <h2 className='tittle'>Select Difficulty</h2>
      {difficulties.map(difficulty => (
        <button key={difficulty} onClick={() => onSelectDifficulty(difficulty)}>
          {difficulty}
        </button>
      ))}
    </div>
  );
};

export default Difficulty;
