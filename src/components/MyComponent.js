// src/components/MyComponent.js
import React from 'react';
import useDbState from '../hooks/useDbState';

const MyComponent = () => {
  const [value, setValue] = useDbState('myKey', 'defaultValue');
  console.log("MyComponentOne")
  return (
    <div>
      <p>Value: {value}</p>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export default MyComponent;
