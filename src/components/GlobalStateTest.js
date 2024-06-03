import React from 'react'
import useGlobalState from '../GlobalState/useGlobalState'
import AccessGlobalState from './AccessGlobalState'

const GlobalStateTest = () => {
    const [value, setValue] = useGlobalState()
    const [tab, setTab] = React.useState(true);
    
    const handleChange = (e) => {
        setValue(e.target.value)
    }
 
    return (
    <div>
      <h3>GlobalStateTest</h3>
      {tab ? <input type="text" value={value} onChange={handleChange} /> : <AccessGlobalState />}
      <br />
      <br />
      <button onClick={() => setTab(!tab)}>Toggle</button>
      {/* <AccessGlobalState /> */}
    </div>
  )
}

export default GlobalStateTest