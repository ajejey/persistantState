import useDbState from "../../hooks/useDbState";

const DateExample = () => {
    const [value, setValue] = useDbState('dateKey', new Date().toISOString());
  
    return (
      <div>
        <h2>Date Example</h2>
        <input type="datetime-local" value={value} onChange={(e) => setValue(e.target.value)} />
        <p>Value: {new Date(value).toLocaleString()}</p>
        <hr />
        <br />
      </div>
    );
  };

  export default DateExample;
  