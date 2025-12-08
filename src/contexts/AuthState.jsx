import { AuthContext } from './AuthContext';
import { useState } from 'react';

function AuthState({ children }) {
  const [auth, setAuth] = useState(localStorage.getItem('access_token'));
  console.log(auth);
  return <AuthContext value={{ auth, setAuth }}>{children}</AuthContext>;
}

export default AuthState;
