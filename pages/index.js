import Head from 'next/head';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { fetchPokemonDetailsById, fetchPokemonDetailsByName, } from '../utils/api';

import Favorites from '../components/Favorites';
import PokemonDetails from '../components/PokemonDetails';
import TeamTypes from '@/components/TeamTypes';
import Search from '@/components/Search';
import GenerationSection from '@/components/GenerationSection';
import TypeSection from '@/components/TypeSection';

import Login from '@/components/Login';

import Link from 'next/link';

import LoadingAnimation from '../components/LoadingAnimation';

const HomePage = () => {
  const [pokemonDetails, setPokemonDetails] = useState({}); // Used to get the pokemon details for the box
  const [currentPokemonId, setCurrentPokemonId] = useState(0); // Used to track the current ID of selected pokemon for the Next/Previous function
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('access_token');
      const storedUsername = localStorage.getItem('username');
  
      if (token) {
        // Decode the JWT to get the expiration time
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  
        if (Date.now() < expirationTime) {
          // Token is not expired
          setAuthenticated(true);
          setUsername(storedUsername);
        } else {
          // Token is expired, clear storage and redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('username');
          setAuthenticated(false);
          setPokemonDetails({});
          setCurrentPokemonId(0);
        }
      }
  
      setLoading(false);
    };
  
    checkTokenExpiration();
  }, []);

  const handleLogin = (token, username) => {
    setAuthenticated(true);
    setUsername(username);
    
    // Store the username in localStorage
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    setAuthenticated(false);
    setPokemonDetails({});
    setCurrentPokemonId(0);
  };
      
  const detailsContainerRef = useRef(null);

  const handlePokemonClick = (name) => {
    getPokemonDetails(name);
    detailsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const getPokemonDetails = useCallback(async (pokemon) => {
    try {
      let data;
      if (typeof pokemon === 'string') {
        data = await fetchPokemonDetailsByName(pokemon);
      } else if (typeof pokemon === 'number') {
        data = await fetchPokemonDetailsById(pokemon);
      }

      if (data) {
        setPokemonDetails(data);
        setCurrentPokemonId(data.id);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

 if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="bg-gradient-to-br from-red-100 to-gray-50 min-h-screen">
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/Poke.ico" />
      </Head>

      {authenticated ? (
        // Render the main content when authenticated
        <main>

        <img src={"/dex.png"} alt="Pokedex Logo" className="w-3/4 mx-auto" />
        <TeamTypes getPokemonDetails={getPokemonDetails} />

        <div
          id="pokemonDetailsContainer"
          ref={detailsContainerRef}
          className="bg-gray-100 mt-4 mx-4 rounded text-lg font-bold text-center"
        >
          <PokemonDetails
            pokemonDetails={pokemonDetails}
            currentPokemonId={currentPokemonId}
            onPreviousClick={() => getPokemonDetails(currentPokemonId - 1)}
            onNextClick={() => getPokemonDetails(currentPokemonId + 1)}
            onCloseDetails={() => {
              setPokemonDetails({});
              window.scrollTo(0, 0);
            }}
          />
        </div>

        <div className="text-center mx-auto mt-4">
        <span className=""><Link href="/collection" className="button">View Collection Page</Link></span>
        </div>

        <Search handlePokemonClick={handlePokemonClick} />

        <GenerationSection handlePokemonClick={handlePokemonClick} />

        <div>
          <TypeSection handlePokemonClick={handlePokemonClick} />
        </div>

        <div>
          <Favorites />
        </div>
        <div className="text-center text-gray-600 mt-2">
            Current User: {username}            
        <button onClick={handleLogout} className='ml-2'>Logout</button>
        </div>
      </main>
      ) : (
        // Render the login page when not authenticated
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default HomePage;