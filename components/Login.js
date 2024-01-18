import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch('https://pokedextest.onrender.com/auth/token', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setLoginError('Login details not recognised.');
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      onLogin(data.access_token, data.username); // Pass both token and username
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle error, e.g., show an error message to the user
      setLoginError('Login details not recognised.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      onLogin(token);
    }
  }, [onLogin]);

  return (
    <div className="p-4">
      <img src={"/dex.png"} alt="Pokedex Logo" className="w-3/4 mx-auto mb-4" />
      <div className="login-container bg-gray-100 p-4 mt-4 rounded framed">
        <div className="login-content">
          <h2 className="text-lg font-bold mb-2">Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit" className="mb-4">
              Login
            </button>
          </form>
          <div className=''>
            <p>
              Don't have an account?
              <Link href="/register" className='font-bold'>{' '}
                Register Here
              </Link>
            </p>
          </div>
        </div>
        <div className="validation-messages framed no-hd text-xs">
          {loginError && (
            <div style={{ color: 'red' }}>
              <p>{loginError}</p>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .login-container {
          display: flex;
          flex-direction: column; /* Change for mobile */
          align-items: flex-start; /* Align items to flex-start to ensure the form and messages are at the top */
          width: 100%; /* Take full width */
          max-width: 800px; /* Set a maximum width for better responsiveness */
          margin: auto; /* Center the container horizontally */
        }

        .login-content {
          flex-grow: 1;
          max-width: 400px;
          margin-right: 10px;
        }

        form {
          width: 100%;
        }

        label,
        input {
          display: flex;
          flex-direction: column;
          margin-bottom: -4px;
        }

        input {
          margin-top: 6px;
          width: 100%;
        }

        .validation-messages {
          display: ${loginError ? 'block' : 'none'};
          padding: 10px;
          height: auto; /* Set height to auto for dynamic height */
          margin-top: 4px;
          margin-bottom: auto;
          width: max-content;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 600px) {
          .login-container {
            flex-direction: row;
          }

          .login-content {
            margin-right: 20px;
          }

          .validation-messages {
            margin-top: auto;
            margin-left: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;