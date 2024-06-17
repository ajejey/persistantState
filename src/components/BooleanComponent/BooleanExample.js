import useDbState from "../../hooks/useDbState";

const BooleanExample = () => {
    const [value, setValue] = useDbState('booleanKey', true);
  
    return (
      <div>
        <h2>Boolean Example</h2>
        <label>
          <input type="checkbox" checked={value} onChange={(e) => setValue(e.target.checked)} />
          {value ? 'True' : 'False'}
        </label>
        <br />
        <hr />
        <br />
      </div>
    );
  };
  
  export default BooleanExample;
  