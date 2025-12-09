import useAuth from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { checkUserEmail, compareStrings } from '../utils/shared';
import { useState } from 'react';

function SignUp() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError('');

    // const email = e.target.elements.email.value;
    try {
      await checkUserEmail('alic@example.com');
      const passwordsMatch = compareStrings('a', 'n');
      if (!passwordsMatch) {
        console.log('I am here');
        setError('Passwords do not match');
        return;
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
    // console.log('check user Email:', userData);

    // have function to register - POST request
    // once signed up,
    // call the login function and login directly?
    // OR redirect to the login page?
    // save to local storage
    // set the auth
    // redirect to homepage

    // try {
    //   const email = e.target.elements.email.value;
    //   const password = e.target.elements.password.value;
    //   if (!email || !password) {
    //     throw new Error('Missing credentials');
    //   }
    //   const userData = await login(email, password);
    //   console.log('Logged in:', userData);
    //   localStorage.setItem('access_token', userData.token);
    //   setAuth(userData.token);
    console.log('Button was clicked');
    console.log('Error state', error);
    // navigate('/');
    // } catch (error) {
    //   console.log('Login failed', error);
    // }
  };

  return (
    <div>
      <h1 className="text-center text-4xl">Sign Un</h1>
      {auth ? (
        <div className="flex flex-col gap-8 items-center m-4 p-4">
          <div>
            <p className="font-normal text-lg">You are already logged in.</p>
          </div>
          <button className="btn bg-neutral-content p-4" onClick={() => navigate('/')}>
            Go to homepage
          </button>
        </div>
      ) : (
        <form className="flex flex-col gap-8 items-center m-4 p-4">
          <input
            id="email"
            email="email"
            type="text"
            placeholder="Email"
            className="p-2 border"
            // required
          ></input>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="p-2 border"
            // required
          ></input>
          <input
            id="confirmation"
            name="confirmation"
            type="password"
            placeholder="Confirm password"
            className="p-2 border"
            // required
          ></input>
          <button onClick={handleRegistration} className="btn bg-neutral-content p-4" type="submit">
            Register user
          </button>
        </form>
      )}
    </div>
  );
}

export default SignUp;
