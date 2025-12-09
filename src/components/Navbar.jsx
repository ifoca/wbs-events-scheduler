import { NavLink } from 'react-router-dom';
import useAuth from '../contexts/AuthContext';
import { removeItemFromLocalStorage } from '../utils/shared';

function Navbar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    setAuth(null);
    removeItemFromLocalStorage('access_token');
  };

  return (
    <header className="py-6 border-b border-gray-300 font-serif">
      <nav className="flex navbar navbar-center">
        <div className="px-8 mr-auto text-black text-4xl font-serif">
          <NavLink to={'/'}>Event Scheduler</NavLink>
        </div>
        <div className="flex content-end">
          <div className="btn btn-ghost text-lg">
            <NavLink to={'/'}>Homepage</NavLink>
          </div>
          {auth ? (
            <>
              <div className="btn btn-ghost text-lg">
                <NavLink to={'/create'}>Create event</NavLink>
              </div>
              <div onClick={handleLogout} className="btn btn-ghost text-lg">
                <NavLink to={'/login'}>Logout</NavLink>
              </div>
            </>
          ) : (
            <>
              {' '}
              <div className="btn btn-ghost text-lg">
                <NavLink to={'/login'}>Sign In</NavLink>
              </div>
              <div className="btn btn-ghost text-lg">
                <NavLink to={'/register'}>Sign Up</NavLink>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
