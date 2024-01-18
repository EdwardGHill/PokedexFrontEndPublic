import React, { useState } from 'react';
import Link from 'next/link';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  // Helper function to check if the username meets the requirements
  const isUsernameValid = () => {
    return username.length >= 3 && username.length <= 15 && /^[a-zA-Z0-9]+$/.test(username);
  };

  // Helper function to check if the email meets the requirements
  const isEmailValid = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Helper function to check if the password meets the requirements
  const isPasswordValid = () => {
    return (
      password.length >= 8 &&
      password.length <= 20 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[@$!%*?&.,]/.test(password)
    );
  };

  
const handleFocus = (field) => {
  if (field === 'username') {
    setUsernameFocused(true);
    setRegistrationError('');
  } else if (field === 'email') {
    setEmailFocused(true);
    setRegistrationError('');
  } else if (field === 'password') {
    setPasswordFocused(true);
    setRegistrationError('');
  }
};

  const handleBlur = (field) => {
    if (field === 'username') setUsernameFocused(false);
    else if (field === 'email') setEmailFocused(false);
    else if (field === 'password') setPasswordFocused(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch('https://pokedextest.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        if (responseBody.detail === 'DUPLICATE_USER_EMAIL') {
          setRegistrationError('That username or email address already belongs to a registered user.');
        } else {
          throw new Error('Registration failed');
        }
      } else {
        // If registration is successful, update the UI state
        setRegistrationSuccess(true);
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      // Handle other errors, e.g., show a generic error message to the user
      setRegistrationError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-container bg-gray-100 p-4 mt-4 rounded framed w-3/4 mx-auto">
      <div className="registration-form">
        {registrationSuccess ? (
          <div>
            <p>
              Registration Successful! Click <Link href="/" className='font-bold'>Here</Link> to Login.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold mb-2">Registration</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => handleFocus('username')}
                  onBlur={() => handleBlur('username')}
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                />
              </label>
              <br />
              <button
                type="submit"
                disabled={!isUsernameValid() || !isEmailValid() || !isPasswordValid()}
              >
                Register
              </button>
            </form>
            <Link href="/" className='button'>Back</Link>
          </div>
        )}
      </div>
      <div className="validation-messages framed no-hd text-xs">
        {usernameFocused && (
          <span
            style={{
              color: isUsernameValid() ? 'green' : 'red',
            }}
          >
            {isUsernameValid()
              ? 'Username format is valid.'
              : 'Must be between 3 and 15 characters, and contain no special characters.'}
          </span>
        )}
        {emailFocused && (
          <span
            style={{
              color: isEmailValid() ? 'green' : 'red',
            }}
          >
            {isEmailValid() ? 'Email format is valid.' : 'Must be a valid email format.'}
          </span>
        )}
        {passwordFocused && (
          <span
            style={{
              color: isPasswordValid() ? 'green' : 'red',
            }}
          >
            {isPasswordValid()
              ? 'Password format is valid.'
              : 'Must be between 8 and 20 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'}
          </span>
        )}
        {registrationError && (
          <div style={{ color: 'red' }}>
            <p>{registrationError}</p>
          </div>
        )}
      </div>

      <style jsx>{`
  .registration-container {
    display: flex;
    flex-direction: column; /* Change for mobile */
    justify-content: space-between; /* Add justify-content to space the children */
    align-items: flex-start; /* Align items to flex-start to ensure the form and messages are at the top */
    width: 100%; /* Take full width */
    max-width: 800px; /* Set a maximum width for better responsiveness */
    margin: auto; /* Center the container horizontally */
  }

  .registration-form {
    flex-grow: 1; /* Allow the form to take remaining space */
    max-width: 400px; /* Set a maximum width for the form */
    margin-right: 10px; /* Add some space between the form and messages */
  }

  .validation-messages {
    max-width: 400px; /* Set a maximum width for the messages */
    display: ${registrationError || usernameFocused || emailFocused || passwordFocused ? 'block' : 'none'};
    padding: 10px;
    height: auto; /* Set height to auto for dynamic height */
    margin-top: 4px;
    margin-bottom: auto;
    
  }

  label, input {
    display: flex;
    flex-direction: column;
    margin-bottom: -4px;
  }

  input {
    margin-top: 6px;
    width: 100%;
  }

  @media (min-width: 600px) {
    .registration-container {
      flex-direction: row; /* Change back to row for larger screens */
    }

    .validation-messages {
      width: 40%;
      margin-top: auto;
    }

`}</style>
    </div>
  );
};

export default Register;