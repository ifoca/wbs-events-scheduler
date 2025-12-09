import { login } from '../utils/shared';
import useAuth from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignIn = () => {
  const [error, setError] = useState('');
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      if (email === '' || password === '') {
        throw new Error('Credential fields cannot be empty.');
      }
      const userData = await login(email, password);
      console.log('Logged in:', userData);
      setAuth(userData.token);
      navigate('/');
    } catch (err) {
      console.log('Login failed', err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-center text-4xl">Sign In</h1>
      {error ? (
        <div className="m-auto w-2/3">
          <p className="text-center text-red-400 text-lg p-2 mt-4 border border-red-200">
            There was an error: {error}
          </p>
        </div>
      ) : (
        <div className="w-2/3 items-center m-auto">
          <p className="text-center text-lg p-2 mt-4">Log in to manage events creation.</p>
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
        <form onSubmit={handleLogin} className="flex flex-col gap-8 items-center m-4 p-4">
          <input
            id="email"
            email="email"
            type="text"
            placeholder="Email"
            className="p-2 border"
            required
          ></input>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="p-2 border"
            id="password"
            required
          ></input>
          <button className="btn p-4" type="submit">
            Log in
          </button>
        </form>
      )}
    </div>
  );
};

export default SignIn;
