import React from 'react';
import { useGlobalState } from '../context/context';

const AccessGlobalState = () => {
  const { globalValue } = useGlobalState();

  return (
    <div>
      <h2>Component B</h2>
      <p>Global Value: {globalValue}</p>
    </div>
  );
};

export default AccessGlobalState;
