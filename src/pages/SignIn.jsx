import { useNavigate } from 'react-router-dom';
import { login } from '../utils/shared';
import useAuth from '../contexts/AuthContext';
import useGeneralStates from '../contexts/GeneralContext';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';

const SignIn = () => {
  const { auth, setAuth } = useAuth();
  const { error, setError, loading, setLoading } = useGeneralStates();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      if (email === '' || password === '') {
        throw new Error('Credential fields cannot be empty.');
      }
      const userData = await login(email, password);
      setAuth(userData.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (auth) {
    return (
      <>
        <div className="flex flex-col gap-8 items-center m-4 p-4">
          <ErrorMessage error={'You are already logged in'} />
          <button className="btn p-4" onClick={() => navigate('/')}>
            Go to Homepage
          </button>
        </div>
      </>
    );
  }

  if (loading) {
    return <LoadingMessage />;
  }

  return (
    <div>
      <h1 className="text-center text-4xl">Sign In</h1>
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <div className="w-2/3 items-center m-auto">
          <p className="text-center text-lg p-2 mt-4">Log in to manage events creation.</p>
        </div>
      )}
      {!auth && (
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
