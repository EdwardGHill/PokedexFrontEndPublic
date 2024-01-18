import React, { useState } from 'react';
import { fetchPokemonByType } from '../utils/api';
import TypeButton from './TypeButton';

const TypeButtons = ({ onTypeButtonClick }) => {
  const [selectedType, setSelectedType] = useState('');

  const clearTypeList = () => {
    setSelectedType('');
    onTypeButtonClick([]);
  };

  const typeColors = {
    Normal: { normal: 'bg-gray-300 hover:bg-gray-400 text-gray-800', dark: 'bg-gray-500' },
    Fire: { normal: 'bg-orange-300 hover:bg-orange-400 text-gray-800', dark: 'bg-orange-700' },
    Water: { normal: 'bg-blue-300 hover:bg-blue-400 text-gray-800', dark: 'bg-blue-700' },
    Grass: { normal: 'bg-green-300 hover:bg-green-400 text-gray-800', dark: 'bg-green-700' },
    Electric: { normal: 'bg-yellow-300 hover:bg-yellow-400 text-gray-800', dark: 'bg-yellow-700' },
    Ice: { normal: 'bg-cyan-300 hover:bg-cyan-400 text-gray-800', dark: 'bg-cyan-700' },
    Fighting: { normal: 'bg-red-300 hover:bg-red-400 text-gray-800', dark: 'bg-red-700' },
    Poison: { normal: 'bg-purple-300 hover:bg-purple-400 text-gray-800', dark: 'bg-purple-700' },
    Ground: { normal: 'bg-yellow-700 hover:bg-yellow-800 text-white', dark: 'bg-yellow-900' },
    Flying: { normal: 'bg-indigo-300 hover:bg-indigo-400 text-gray-800', dark: 'bg-indigo-700' },
    Psychic: { normal: 'bg-pink-300 hover:bg-pink-400 text-gray-800', dark: 'bg-pink-700' },
    Bug: { normal: 'bg-lime-300 hover:bg-lime-400 text-gray-800', dark: 'bg-lime-700' },
    Rock: { normal: 'bg-gray-400 hover:bg-gray-500 text-gray-800', dark: 'bg-gray-700' },
    Ghost: { normal: 'bg-indigo-900 hover:bg-indigo-800 text-white', dark: 'bg-indigo-950', whiteText: 'text-white' },
    Dark: { normal: 'bg-gray-800 hover:bg-gray-900 text-white', dark: 'bg-gray-950', whiteText: 'text-white' },
    Dragon: { normal: 'bg-indigo-500 hover:bg-indigo-600 text-white', dark: 'bg-indigo-800' },
    Steel: { normal: 'bg-gray-400 hover:bg-gray-500 text-gray-800', dark: 'bg-gray-700' },
    Fairy: { normal: 'bg-pink-100 hover:bg-pink-200 text-gray-800', dark: 'bg-pink-300' },
  };

  const types = Object.keys(typeColors);

  return (
    <div id="TypeButtonContainer" className="px-4 mb-2 flex justify-center content-evenly space-x-2 flex-wrap md:w-3/4 mx-auto gap-1 items-stretch">
      {types.map((type) => (
        <TypeButton
          key={type}
          type={type}
          selected={selectedType === type}
          onClick={() => {
            if (selectedType === type) {
              setSelectedType('');
              onTypeButtonClick([]);
            } else {
              setSelectedType(type);
              fetchPokemonByType(type).then((data) => onTypeButtonClick(data));
            }
          }}
          typeColors={typeColors}
        />
      ))}
      <button
        id="typeClearButton"
        type="button"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 pr-3 border-solid border-2 border-black"
        onClick={clearTypeList}
      >
        X
      </button>
    </div>
  );
};

export default React.memo(TypeButtons);