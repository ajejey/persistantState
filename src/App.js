// UserForm.js
import React from 'react';
import MyForm from './components/MyForm';
import FormTwo from './components/FormTwo';
import FormWithKeyRemove from './components/FormWithKeyRemove';
import GlobalStateTest from './components/GlobalStateTest';
import AccessGlobalState from './components/AccessGlobalState';

const App = () => {
  const [tab, setTab] = React.useState(true);


  return (
    <div style={{ padding: 20 }}>
      <h3>App</h3>
      {/* <MyForm /> */}
      {/* <FormTwo /> */}
      {/* <FormWithKeyRemove /> */}
      {/* {tab ? <GlobalStateTest /> : <AccessGlobalState />} */}
      <GlobalStateTest />
      
    </div>
  );
};

export default App;