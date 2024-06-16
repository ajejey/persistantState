import React from 'react';
import { useGlobalState } from '../context/context';

const GlobalStateTest = () => {
  const { globalValue, setGlobalValue } = useGlobalState();

  return (
    <div>
      <h2>Component A</h2>
      <input
        type="text"
        value={globalValue}
        onChange={(e) => setGlobalValue(e.target.value)}
      />
    </div>
  );
};

export default GlobalStateTest;
