import useAuth from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { compareStrings, register, login } from '../utils/shared';
import LoadingMessage from '../components/LoadingMessage';
import ErrorMessage from '../components/ErrorMessage';
import useGeneralStates from '../contexts/GeneralContext';

function SignUp() {
  const navigate = useNavigate();

  const { error, setError, loading, setLoading } = useGeneralStates();
  const { auth, setAuth } = useAuth();

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingMessage />;
  }

  return (
    <div>
      <h1 className="text-center text-4xl">Sign Un</h1>

      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <div className="w-2/3 items-center m-auto">
          <p className="text-center text-lg p-2 mt-4">Create an account to add new events.</p>
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
