import { useState } from 'react';
import { fetchPokemonByGeneration } from '../utils/api';
import React from 'react';

const GenerationButtons = ({ onGenerationButtonClick }) => {
  const [selectedGeneration, setSelectedGeneration] = useState(null);

  const handleGenerationButtonClick = async (generation) => {
    try {
      if (selectedGeneration === generation) {
        setSelectedGeneration(null);
        clearGenResults();
      } else {
        setSelectedGeneration(generation);
        const data = await fetchPokemonByGeneration(generation);
        onGenerationButtonClick(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const clearGenResults = () => {
    setSelectedGeneration(null);
    onGenerationButtonClick([]);
  };

  return (
    <div className="p-4 flex justify-center flex-wrap">
      {[1, 2, 3, 4, 5, 6].map((generation) => (
        <div key={`gen${generation}Button`}>
          <button
            id={`gen${generation}Button`}
            type="button"
            className={`genButton ${selectedGeneration === generation ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold mt-1 mx-1 py-2 px-4 rounded-full`}
            onClick={() => handleGenerationButtonClick(generation)}
          >
            Gen {generation}
          </button>
        </div>
      ))}
    </div>
  );
};

export default React.memo(GenerationButtons);