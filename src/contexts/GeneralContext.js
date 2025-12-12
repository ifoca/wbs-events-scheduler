import { createContext, use } from 'react';

export const GeneralContext = createContext();

const useGeneralStates = () => {
  const context = use(GeneralContext);
  if (!context) {
    throw new Error('useGeneralStates context does not exist in this component');
  }
  return context;
};

export default useGeneralStates;
