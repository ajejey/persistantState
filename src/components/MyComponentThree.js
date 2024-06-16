// src/components/MyComponent.js
import React from 'react';
import useDbState from '../hooks/useDbState';

const MyComponentThree = () => {
  const [value2, setValue2] = useDbState('key2', 'defaultValue');

  console.log("MyComponentThree")

  return (
    <div>
      <p>Value: {value2}</p>
      <input type="text" value={value2} onChange={(e) => setValue2(e.target.value)} />
    </div>
  );
};

export default MyComponentThree;
