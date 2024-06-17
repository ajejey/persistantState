import React from 'react'
import useDbState from '../hooks/useDbState';

const MyComponentObject = () => {
  const [myValue, setMyValue] = useDbState('objectKey1', {});

    const handleChange = (e) => {
      setMyValue({...myValue, [e.target.name]: e.target.value});
    }

    return (
    <div>
        <h4>MyComponentObject</h4>
        <div>
            <input type="text"placeholder='firstName' name='firstName' value={myValue?.firstName} onChange={handleChange} />
            <input type="text" placeholder='lastName' name='lastName' value={myValue?.lastName} onChange={handleChange} />
        </div>
    </div>
  )
}

export default MyComponentObject