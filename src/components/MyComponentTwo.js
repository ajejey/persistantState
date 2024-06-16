import React from 'react'
import useDbState from '../hooks/useDbState';

const MyComponentTwo = () => {
    const [value, setValue] = useDbState('myKey');
    console.log("MyComponentTwo")
  return (
    <div>
        <h4>MyComponentTwo</h4>
      <p>Value: {value}</p>
    </div>
  )
}

export default MyComponentTwo