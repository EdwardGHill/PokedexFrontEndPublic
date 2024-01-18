import Head from 'next/head';
import ProtectedRoute from '../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { fetchCollectionData } from '../utils/api';
import { fetchPokemonDetailsById } from '../utils/api';
import LoadingAnimation from '../components/LoadingAnimation';
import Link from 'next/link';

const CollectionPage = () => {
  const [collection, setCollection] = useState([]);
  const [detailedCollection, setDetailedCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCollection = async () => {
      try {
        // Fetch the user's collection
        const collectionData = await fetchCollectionData();
        setCollection(collectionData);

        // Fetch detailed information for each Pokemon in the collection
        const detailedDataPromises = collectionData.map(async (pokemon) => {
          const detailedPokemonData = await fetchPokemonDetailsById(pokemon.pokemon_id);
          return detailedPokemonData;
        });

        const detailedPokemonData = await Promise.all(detailedDataPromises);

        // Sort the detailed collection by Pokemon ID
        const sortedDetailedCollection = detailedPokemonData.sort((a, b) => a.id - b.id);
        setDetailedCollection(sortedDetailedCollection);
      } catch (error) {
        console.error('Error fetching user collection:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCollection();
  }, []);

  if (loading) {
    return (
      <LoadingAnimation />
    );
  }

  // Group the sorted collection by generation
  const groupedCollection = detailedCollection.reduce((acc, pokemon) => {
    const generation = pokemon.generation;
    if (!acc[generation]) {
      acc[generation] = [];
    }
    acc[generation].push(pokemon);
    return acc;
  }, {});

  return (
    <ProtectedRoute>
      <div className="bg-gradient-to-br from-red-100 to-gray-50 min-h-screen">
        <Head>
          <title>My Collection</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <img src={"/dex.png"} alt="Pokedex Logo" className="w-3/4 mx-auto" />

          <div className="mx-auto text-center px-4">
            <h1 className='mx-auto mt-4 mb-4 font-bold text-xl framed'>My Collection</h1>
          </div>

          {/* Render the grouped and sorted collection */}
          {Object.keys(groupedCollection).map((generation) => {
            const generationCount = groupedCollection[generation].length;
            const generationTotal = getGenerationTotal(generation);

            return (
              <div key={generation} className="text-center mb-4 px-4">
                <h2 className='mt-2 font-bold'>{`Generation ${generation}`}</h2>
                <h3 className='mt-2'>{`${generationCount} of ${generationTotal}`}</h3>
                <ul className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-1">
                  {groupedCollection[generation].map((pokemon) => (
                    <li key={pokemon.id} className="text--500 flex flex-col items-center framed no-hd text-xs md:text-sm">
                      <img
                        src={`https://img.pokemondb.net/sprites/home/normal/1x/${pokemon.icon_name}.png`}
                        alt={`${pokemon.name} icon`}
                        className="pokemon-icon w-24 h-24 mb-2"
                      />
                      <span>{`${pokemon.id}`}</span>
                      <span>{`${pokemon.name}`}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </main>
        <Link href="/" className="buttn fixed bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Back
        </Link>
      </div>
    </ProtectedRoute>
  );
};

// Helper function to get the total for each generation
const getGenerationTotal = (generation) => {
  const generationTotals = {
    1: 151,
    2: 100,
    3: 135,
    4: 107,
    5: 156,
    6: 72,
  };

  return generationTotals[generation] || 0;
};

export default CollectionPage;