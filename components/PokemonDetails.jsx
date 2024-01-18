/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { fetchFavoritesData, addToFavorites, removeFromFavorites } from '@/utils/api';
import { fetchCollectionData, addToCollection, removeFromCollection } from '@/utils/api';

const PokemonDetails = ({ pokemonDetails, currentPokemonId, onPreviousClick, onNextClick, onCloseDetails }) => {
  if (!pokemonDetails || !pokemonDetails.name) {
    return null;
  }
 
  const [isFavorite, setIsFavorite] = useState(false);

  const favoriteButtonText = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';

  const [isCollection, setIsCollection] = useState(false);

  const collectionButtonText = isCollection ? 'Remove from Collection' : 'Add to Collection';
  
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const favoritesData = await fetchFavoritesData();
        setIsFavorite(favoritesData.some((favorite) => favorite.pokemon_id === pokemonDetails.id));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkFavoriteStatus();
  }, [pokemonDetails.id]);

  const handleToggleFavorite = useCallback(async (isPokemonFavorite, pokemonDetails) => {
    try {
      if (isPokemonFavorite) {
        await removeFromFavorites(pokemonDetails.id);
      } else {
        await addToFavorites(pokemonDetails.id);
      }
      setIsFavorite(!isPokemonFavorite);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [setIsFavorite]);

  useEffect(() => {
    const checkCollectionStatus = async () => {
      try {
        const collectionData = await fetchCollectionData();
        setIsCollection(collectionData.some((collection) => collection.pokemon_id === pokemonDetails.id));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkCollectionStatus();
  }, [pokemonDetails.id]);

  const handleToggleCollection = useCallback(async (isPokemonCollection, pokemonDetails) => {
    try {
      if (isPokemonCollection) {
        await removeFromCollection(pokemonDetails.id);
      } else {
        await addToCollection(pokemonDetails.id);
      }
      setIsCollection(!isPokemonCollection);
    } catch (error) {
      console.error('Error:', error);
    }
  }, [setIsCollection]);

  return (
    <div className="bg-gray-100 p-4 mt-4 rounded framed">
      <button className="absolute top-2 right-2 text-gray-500" onClick={onCloseDetails}>
        <AiOutlineClose />
      </button>
      <h3 className="text-lg font-bold mb-2">{pokemonDetails.name}</h3>
      <img
        src={`https://img.pokemondb.net/sprites/home/normal/1x/${pokemonDetails.icon_name}.png`}
        alt={`${pokemonDetails.name} image`}
        className="w-20 h-20 mx-auto pokemon-image"
      />
      <p>ID: {pokemonDetails.id}</p>
      <p>Generation Introduced: {pokemonDetails.generation}</p>
      <p>Type 1: {pokemonDetails.type_1}</p>
      <p>Type 2: {pokemonDetails.type_2}</p>
      <p>Total Base Stats: {pokemonDetails.total}</p>
      <p>Base HP: {pokemonDetails.hp}</p>
      <p>Base Attack: {pokemonDetails.attack}</p>
      <p>Base Defense: {pokemonDetails.defense}</p>
      <p>Base Speed: {pokemonDetails.speed}</p>
      <p>Base Special Attack: {pokemonDetails.sp_atk}</p>
      <p>Base Special Defense: {pokemonDetails.sp_def}</p>
      {currentPokemonId > 1 && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 mr-2"
          onClick={onPreviousClick}
        >
          Previous
        </button>
      )}
      {currentPokemonId < 721 && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          onClick={onNextClick}
        >
          Next
        </button>
      )}
      <div>
      <button
        className={`bg-${isFavorite ? 'red' : 'blue'}-500 text-white py-2 px-4 rounded mt-4 mr-2`}
        onClick={() => handleToggleFavorite(isFavorite, pokemonDetails)}
      >
        {favoriteButtonText}
      </button>
      <button
        className={`bg-${isCollection ? 'red' : 'blue'}-500 text-white py-2 px-4 rounded mt-4 mr-2`}
        onClick={() => handleToggleCollection(isCollection, pokemonDetails)}
      >
        {collectionButtonText}
      </button>
      </div>
    </div>
  );
};

export default React.memo(PokemonDetails);