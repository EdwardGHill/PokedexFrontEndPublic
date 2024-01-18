import React, { useState, useEffect } from 'react';

const ITEMS_PER_PAGE = 21;

const PokemonTypeList = ({ pokemonList, handlePokemonClick }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemonList]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(pokemonList.length / ITEMS_PER_PAGE);

  // Update the displayed list of Pokémon based on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, pokemonList.length);
  const displayedPokemon = pokemonList.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div id="TypeContainer" className="text-center px-4">
      <ul id="typeList" className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-1">
        {displayedPokemon.sort((a, b) => a.id - b.id).map((pokemon) => (
          <li
            key={pokemon.name}
            className="text-blue-500 cursor-pointer flex flex-col items-center framed no-hd text-xs md:text-sm"
            onClick={() => handlePokemonClick(pokemon.name)}
          >
            <img
              src={`https://img.pokemondb.net/sprites/sword-shield/icon/${pokemon.icon_name}.png`}
              alt={`${pokemon.name} icon`}
              className="pokemon-icon"
            />
            <span>{`${pokemon.id}`}</span>
            <span>{`${pokemon.name}`}</span>
          </li>
        ))}
      </ul>
      {displayedPokemon.length > 0 && (
        <div className="flex justify-center mt-4">
          {currentPage > 1 ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
              onClick={handlePrevPage}
            >
              {/* Previous arrow SVG icon */}
              <img src="/backArrow.svg" alt="Previous" className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-12 bg-blue-500 rounded-l" /> // Placeholder element for the hidden button
          )}
          <span className="bg-blue-500 text-white font-bold py-2 px-4 text-s">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
              onClick={handleNextPage}
            >
              {/* Next arrow SVG icon */}
              <img src="/nextArrow.svg" alt="Next" className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-12 bg-blue-500 rounded-r" /> // Placeholder element for the hidden button
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(PokemonTypeList);