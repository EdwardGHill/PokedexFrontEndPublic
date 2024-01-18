import React, { useState } from 'react'
import TypeButtons from '../components/TypeButtons';
import PokemonTypeList from '../components/PokemonTypeList';

export default function TypeSection({handlePokemonClick}) {
    const [pokemonTypeList, setPokemonTypeList] = useState([]);

  return (
    <div>
        <TypeButtons onTypeButtonClick={setPokemonTypeList} />
        <PokemonTypeList pokemonList={pokemonTypeList} handlePokemonClick={handlePokemonClick} />
    </div>
  )
}
