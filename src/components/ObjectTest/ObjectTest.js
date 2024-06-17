import React from 'react';
import useDbState from "../../hooks/useDbState";

const ObjectTest = () => {
    const [value, setValue] = useDbState('objectKey', { name: 'Alice', age: 25 });
  
    return (
      <div>
        <p>Name: {value.name}</p>
        <p>Age: {value.age}</p>
        <button onClick={() => setValue({ ...value, age: value.age + 1 })}>Increment Age</button>
        <br />
        <hr />
        <br />
      </div>
    );
  };

  export default ObjectTest;
  