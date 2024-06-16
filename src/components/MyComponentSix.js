import React from 'react';
import useDbState from '../hooks/useDbState';

const MyComponentSix = () => {
  const [value, setValue] = useDbState('key5', undefined, 'db5', 'store5');

  console.log("MyComponentSix")

  return (
    <div>
      <h4>MyComponentSix</h4>
      <p>Value: {value}</p>
    </div>
  );
};

export default MyComponentSix;
