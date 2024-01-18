import { useState, useEffect, useRef } from 'react';
import { fetchFavoritesData, fetchPokemonDetailsById } from '../utils/api';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Favorites = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoritePokemon, setFavoritePokemon] = useState([]);
  const favoritesListRef = useRef(null);

  useEffect(() => {
    if (showFavorites) {
      fetchFavorites();
    }
  }, [showFavorites]);

  const fetchFavorites = async () => {
    try {
      const favorites = await fetchFavoritesData();

      if (favorites.length === 0) {
        setFavoritePokemon(['No favorite Pokémon found.']);
        return;
      }

      const pokemonIds = favorites.map(favorite => favorite.pokemon_id);
      const fetchPokemonDetails = pokemonIds.map(pokemonId =>
        fetchPokemonDetailsById(pokemonId)
          .then(pokemon => pokemon.name)
      );

      const pokemonNames = await Promise.all(fetchPokemonDetails);
      setFavoritePokemon(pokemonNames);
    } catch (error) {
      console.error('Error:', error);
      setFavoritePokemon(['An error occurred while fetching the favorite Pokémon data.']);
    }
  };

  const toggleShowFavorites = () => {
    setShowFavorites(prevShowFavorites => !prevShowFavorites);
  };

  useEffect(() => {
    if (showFavorites && favoritesListRef.current) {
      favoritesListRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [showFavorites]);

  return (
    <div className="mx-4">
      {showFavorites && (
        <div
        className="bg-gray-100 p-4 mt-4 rounded text-lg font-bold flex justify-center framed"
        ref={favoritesListRef}
      >
        <button className="absolute top-2 right-2 text-gray-500" onClick={toggleShowFavorites}>
        <AiOutlineClose />
        </button>
        {favoritePokemon.length === 0 ? (
          <p>{favoritePokemon[0]}</p>
        ) : (
          <ul className="">
            {favoritePokemon.map((pokemonName) => (
              <li key={pokemonName} className="flex items-center justify-center mb-2">
                <img src="/heart2.svg" alt="Heart" className="w-2 sm:w-4 h-4 mr-2" />
                <img src="/heart1.svg" alt="Heart" className="w-2 sm:w-4 h-4 mr-2" />
                <img src="/heart.svg" alt="Heart" className="w-4 h-4 mr-2" />
                <span>{pokemonName}</span>
                <img src="/heart.svg" alt="Heart" className="w-4 h-4 ml-2 mr-2" />
                <img src="/heart1.svg" alt="Heart" className="w-2 sm:w-4 h-4 mr-2" />
                <img src="/heart2.svg" alt="Heart" className="w-2 sm:w-4 h-4" />
              </li>
            ))}
          </ul>
        )}
      </div>
      )}
      <div className="flex justify-center">
        <button
          type="button"
          className={`${
            showFavorites ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 mt-4 mb-4 rounded`}
          onClick={toggleShowFavorites}
        >
          {showFavorites ? 'Stop Showing Favorites' : 'Show Favorites'}
        </button>
      </div>
    </div>
  );
};

export default React.memo(Favorites);