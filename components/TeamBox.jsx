import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const TeamBox = ({ teamData, onCloseTeamBox, getPokemonDetails, teamType }) => {
  return (
    <div id="teamDataContainer" className="bg-gray-100 px-10 mt-4 mx-4 py-8 rounded framed">
      <button className="absolute top-2 right-2 text-gray-500" onClick={onCloseTeamBox}>
        <AiOutlineClose />
      </button>
      <h3 className="text-lg font-bold mb-4">{teamType.charAt(0).toUpperCase() + teamType.slice(1)} Team</h3>
      <div className="flex items-center justify-center space-x-10 flex-wrap">
        {teamData.map((pokemon) => (
          <div key={pokemon.name} className="flex flex-col items-center cursor-pointer mb-4" onClick={() => getPokemonDetails(pokemon.name)}>
            <img
              src={`https://img.pokemondb.net/sprites/home/normal/1x/${pokemon.icon_name}.png`}
              alt={`${pokemon.name} icon`}
              className="w-24 h-24 mb-2"
            />
            <span className="">{pokemon.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(TeamBox);