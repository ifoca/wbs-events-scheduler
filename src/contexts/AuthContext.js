import { createContext, use } from 'react';

export const AuthContext = createContext();

const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error('useAuth context does not exist in this component');
  }
  return context;
};

export default useAuth;
