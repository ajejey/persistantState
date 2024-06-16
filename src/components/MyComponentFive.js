import React from 'react'
import useDbState from '../hooks/useDbState';

const MyComponentFive = () => {
    const [value, setValue] = useDbState('key5', '', 'db5', 'store5');
    console.log("MyComponentFive")
  return (
    <div>
        <h4>MyComponentFive</h4>
        <p>Value: {value}</p>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

export default MyComponentFive