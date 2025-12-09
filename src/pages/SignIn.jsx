import { login } from '../utils/shared';
import useAuth from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      if (!email || !password) {
        throw new Error('Missing credentials');
      }
      const userData = await login(email, password);
      console.log('Logged in:', userData);
      localStorage.setItem('access_token', userData.token);
      setAuth(userData.token);
      navigate('/');
    } catch (error) {
      console.log('Login failed', error);
    }
  };

  return (
    <div>
      {auth ? (
        <div className="flex flex-col gap-8 items-center m-4 p-4">
          <div>
            <p className="font-normal text-lg">You are already logged in</p>
          </div>
          <button className="btn bg-primary p-2" onClick={() => navigate('/')}>
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
          <button className="btn bg-primary" type="submit">
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default SignIn;
