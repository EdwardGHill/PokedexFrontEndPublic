import React, { useState } from 'react'
import GenerationButtons from '../components/GenerationButtons';
import PokemonGenerationList from '../components/PokemonGenerationList';

export default function GenerationSection({handlePokemonClick}) {
    const [pokemonGenList, setPokemonGenList] = useState([]);

  return (
    <div>
    <GenerationButtons onGenerationButtonClick={setPokemonGenList} />

    <PokemonGenerationList pokemonGenList={pokemonGenList} handlePokemonClick={handlePokemonClick} />
    </div>
  )
}
