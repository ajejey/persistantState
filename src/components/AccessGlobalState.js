import React from 'react'
import useGlobalState from '../GlobalState/useGlobalState'

const AccessGlobalState = () => {
    const [value] = useGlobalState()
  return (
    <div>Global state: {value}</div>
  )
}

export default AccessGlobalState