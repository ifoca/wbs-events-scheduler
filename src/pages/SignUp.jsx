import useAuth from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { compareStrings, register, login } from '../utils/shared';
import { useState } from 'react';

function SignUp() {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const { auth, setAuth } = useAuth();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError('');
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirmation = e.target.elements.confirmation.value;

    try {
      if (email === '' || password === '' || confirmation === '') {
        throw new Error('Credential fields cannot be empty.');
      }
      const passwordsMatch = compareStrings(password, confirmation);
      if (!passwordsMatch) {
        setError('Passwords do not match');
        return;
      }
      await register(email, password);
      const userData = await login(email, password);
      setAuth(userData.token);
      navigate('/');
    } catch (err) {
      console.log('I got this error', err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-center text-4xl">Sign Un</h1>

      {error && (
        <div className="m-auto w-2/3">
          <p className="text-center text-red-400 text-lg p-2 mt-4 border border-red-200">
            There was an error: {error}
          </p>
        </div>
      )}

      {auth ? (
        <div className="flex flex-col gap-8 items-center m-4 p-4">
          <div>
            <p className="font-normal text-lg">You are already logged in.</p>
          </div>
          <button className="btn p-4" onClick={() => navigate('/')}>
            Go to homepage
          </button>
        </div>
      ) : (
        <form onSubmit={handleRegistration} className="flex flex-col gap-8 items-center m-4 p-4">
          <input
            id="email"
            email="email"
            type="text"
            placeholder="Email"
            className="p-2 border"
            required
          ></input>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="p-2 border"
            required
          ></input>
          <input
            id="confirmation"
            name="confirmation"
            type="password"
            placeholder="Confirm password"
            className="p-2 border"
            required
          ></input>
          <button className="btn p-4" type="submit">
            Register user
          </button>
        </form>
      )}
    </div>
  );
}

export default SignUp;
