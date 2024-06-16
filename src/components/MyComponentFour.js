import React from 'react'
import useDbState from '../hooks/useDbState';

const MyComponentTwoFour = () => {
    const [value2, setValue2] = useDbState('key2');

    console.log("MyComponentFour")
    
  return (
    <div>
        <h4>MyComponentTwo</h4>
      <p>Value: {value2}</p>
    </div>
  )
}

export default MyComponentTwoFour