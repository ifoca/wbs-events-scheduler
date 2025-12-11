import { GeneralContext } from './GeneralContext';
import { useState } from 'react';

function GeneralState({ children }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  return (
    <GeneralContext value={{ error, setError, loading, setLoading }}>{children}</GeneralContext>
  );
}

export default GeneralState;
