import React from 'react'
import usePersistentState from '../usePersistentState'

const useGlobalState = () => {
    const [value, setValue] = usePersistentState('value', '', 'globalDb', 'globalStore');
  return [value, setValue]
}

export default useGlobalState