import React, { createContext, useContext } from 'react';
import useDbState from '../usePersistentState';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [globalValue, setGlobalValue] = useDbState('globalValue', 'default', 'testDb', 'testStore');

  return (
    <GlobalStateContext.Provider value={{ globalValue, setGlobalValue }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
