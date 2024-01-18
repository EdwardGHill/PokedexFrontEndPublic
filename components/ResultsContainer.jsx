import React, { useState, useEffect } from 'react';

const ResultsContainer = ({ pokemonList, handlePokemonClick }) => {
  const [numColumns, setNumColumns] = useState(7);

  useEffect(() => {
    const updateColumnCount = () => {
      if (window.innerWidth < 768) {
        setNumColumns(Math.min(pokemonList.length, 3));
      } else if (window.innerWidth < 1024) {
        setNumColumns(Math.min(pokemonList.length, 5));
      } else {
        setNumColumns(Math.min(pokemonList.length, 7));
      }
    };

    updateColumnCount();

    window.addEventListener('resize', updateColumnCount);

    return () => {
      window.removeEventListener('resize', updateColumnCount);
    };
  }, [pokemonList]);

  const gridTemplateColumns = `repeat(${numColumns}, minmax(0, 1fr))`;

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: gridTemplateColumns,
    maxWidth: 'calc(100%)',
    gap: '4px',
  };

  return (
    <div id="ResultsContainer" className="text-center px-4">
      <div className="grid" style={gridContainerStyle}>
        {pokemonList.sort((a, b) => a.id - b.id).map((pokemon) => (
          <div
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ResultsContainer);