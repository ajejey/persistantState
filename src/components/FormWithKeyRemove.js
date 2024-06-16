import useDbKeyRemover from "../useDbKeyRemover";
import useDbState from "../usePersistentState";


const FormWithKeyRemove = () => {
  const [myValue, setMyValue] = useDbState('myValue', '', 'myDb', 'myStore');
  const removeMyKey = useDbKeyRemover('myDb', 'myStore');

  const sendFormDataToBackend = async (data) => {
    console.log('Form data:', data);
    // Mock server response with setTimeout
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleFormSubmit = async () => {
    // Send form data to backend
    await sendFormDataToBackend(myValue);

    setMyValue('');

    // Remove the key from IndexedDB
    await removeMyKey('myValue');
  };

  return (
    <div>
      {/* Add modern css styling to the form */}
      <style>
        {`
          form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 300px;
          }
          input {
            margin-bottom: 10px;
          }
          button {
            margin-top: 10px;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          button:hover {
            background-color: #45a049;
          }
        `}
      </style>

      <form>
        <input type="text" value={myValue} onChange={(e) => setMyValue(e.target.value)} />
        <button style={{ marginLeft: '10px' }} onClick={handleFormSubmit}>Submit</button>
        <button style={{ marginLeft: '10px' }} onClick={() => removeMyKey('myValue')}>Remove key</button>
      </form>
    </div>
  );
};

export default FormWithKeyRemove;