import React, { useState } from 'react';
import debounce from 'lodash.debounce';

const SearchContainer = ({ onSearch, pokemonName, setPokemonName, onClearResults }) => {
  // Debounce the handleSearch function
  const debouncedSearch = debounce(onSearch, 500); // Adjust the debounce delay as needed

  const handleSearch = async () => {
    await debouncedSearch(pokemonName);
  };

  return (
    <div id="SearchContainer" className="flex justify-center p-4 space-x-4 flex-wrap">
      <input
        type="text"
        id="pokemonNameInput"
        placeholder="Enter Pokémon Name"
        className="p-2 pl-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        autoComplete="off"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <button
        type="button"
        id="searchButton"
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handleSearch}
      >
        Search Pokémon
      </button>
      <button
        type="button"
        id="clearButton"
        className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
        onClick={onClearResults}
      >
        Clear Results
      </button>
    </div>
  );
};

export default React.memo(SearchContainer);