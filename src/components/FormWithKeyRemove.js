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
      <input type="text" value={myValue} onChange={(e) => setMyValue(e.target.value)} />
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
};

export default FormWithKeyRemove;