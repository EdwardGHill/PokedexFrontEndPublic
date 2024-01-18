import { useCallback, useState } from 'react'
import { fetchPokemonSearch } from '@/utils/api';
import SearchContainer from '../components/SearchContainer';
import ResultsContainer from '../components/ResultsContainer';

export default function Search({handlePokemonClick}) {

    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonName, setPokemonName] = useState('');

    const handleSearch = useCallback(async () => {
        console.log('Search Name Received:', pokemonName);
        try {
          console.log('Search Name:', pokemonName);
    
          const data = await fetchPokemonSearch(pokemonName);
    
          data.sort((a, b) => a.id - b.id);
    
          setPokemonList(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }, [pokemonName]);

      const handleClearResults = () => {
        setPokemonList([]);
      };  
  
  
    return (
    <div>
    <SearchContainer onSearch={handleSearch} pokemonName={pokemonName} setPokemonName={setPokemonName} onClearResults={handleClearResults} />

    <ResultsContainer pokemonList={pokemonList} handlePokemonClick={handlePokemonClick} />
    </div>
  )
}
