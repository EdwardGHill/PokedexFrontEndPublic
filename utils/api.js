export function fetchTeamData(targetContainer, endpoint) {
    return fetch(`https://pokedextest.onrender.com/pokemon/${endpoint}`)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
      });
  }

export const fetchPokemonSearch = async (pokemonName) => {
    const response = await fetch(`https://pokedextest.onrender.com/pokemon/search/${pokemonName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch search results.');
    }
    return response.json();
  };

  // Fetch Pokemon details by ID
export function fetchPokemonDetailsById(pokemonId) {
    return fetch(`https://pokedextest.onrender.com/pokemon/id/${pokemonId}`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        throw new Error('An error occurred while fetching Pokemon details by ID.');
      });
  }
  
  // Fetch Pokemon details by name
export function fetchPokemonDetailsByName(pokemonName) {
    return fetch(`https://pokedextest.onrender.com/pokemon/name/${pokemonName}`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        throw new Error('An error occurred while fetching Pokemon details by name.');
      });
  }
 
  const getAccessToken = () => localStorage.getItem('access_token');

  export function addToFavorites(pokemonId) {
    const authToken = getAccessToken();
    return fetch("https://pokedextest.onrender.com/favorites/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        pokemon_id: pokemonId,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error("This Pokemon is already in favorites.");
        } else if (response.status === 404) {
          throw new Error("Pokemon not found.");
        } else {
          throw new Error("An error occurred while adding Pokemon to favorites.");
        }
      })
      .catch(error => {
        console.error(error);
        throw new Error('An error occurred while adding Pokemon to favorites.');
      });
  }
  
  export function removeFromFavorites(pokemonId) {
    const authToken = getAccessToken();
    return fetch(`https://pokedextest.onrender.com/favorites/${pokemonId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${authToken}`,
      },
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          return response.json().then(data => {
            throw new Error(data.message || "An error occurred while removing Pokemon from favorites.");
          });
        }
      })
      .catch(error => {
        console.error(error);
        throw new Error('An error occurred while removing Pokemon from favorites.');
      });
  }
  
  export const fetchFavoritesData = async () => {
    const authToken = getAccessToken();
    try {
      const response = await fetch('https://pokedextest.onrender.com/favorites/', {
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      }); 
      if (!response.ok) {
        throw new Error('Failed to fetch favorites data.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export function addToCollection(pokemonId) {
    const authToken = getAccessToken();
    return fetch("https://pokedextest.onrender.com/collection/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        pokemon_id: pokemonId,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error("This Pokemon is already in collection.");
        } else if (response.status === 404) {
          throw new Error("Pokemon not found.");
        } else {
          throw new Error("An error occurred while adding Pokemon to collection.");
        }
      })
      .catch(error => {
        console.error(error);
        throw new Error('An error occurred while adding Pokemon to collection.');
      });
  }
  
  export function removeFromCollection(pokemonId) {
    const authToken = getAccessToken();
    return fetch(`https://pokedextest.onrender.com/collection/${pokemonId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${authToken}`,
      },
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          return response.json().then(data => {
            throw new Error(data.message || "An error occurred while removing Pokemon from collection.");
          });
        }
      })
      .catch(error => {
        console.error(error);
        throw new Error('An error occurred while removing Pokemon from collection.');
      });
  }
  
  export const fetchCollectionData = async () => {
    const authToken = getAccessToken();
    try {
      const response = await fetch('https://pokedextest.onrender.com/collection/', {
        headers: {
          "Authorization": `Bearer ${authToken}`,
        },
      }); 
      if (!response.ok) {
        throw new Error('Failed to fetch collection data.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  
export async function fetchPokemonByGeneration(generation) {
  try {
    const response = await fetch(`https://pokedextest.onrender.com/pokemon/generation/${generation}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon by generation.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function fetchPokemonByType(type) {
  try {
    const response = await fetch(`https://pokedextest.onrender.com/pokemon/type/${type}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon by type.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}