// UserForm.js
import React from 'react';
import MyForm from './components/MyForm';
import FormTwo from './components/FormTwo';
import FormWithKeyRemove from './components/FormWithKeyRemove';
import GlobalStateTest from './components/GlobalStateTest';
import AccessGlobalState from './components/AccessGlobalState';
import MyComponent from './components/MyComponent';
import MyComponentTwo from './components/MyComponentTwo';
import MyComponentThree from './components/MyComponentThree';
import MyComponentTwoFour from './components/MyComponentFour';
import MyComponentFive from './components/MyComponentFive';
import MyComponentSix from './components/MyComponentSix';



const App = () => {
  const [tab, setTab] = React.useState(true);


  return (

    <div style={{ padding: 20 }}>
      <h3>App</h3>
      {/* <MyForm /> */}
      {/* <FormTwo /> */}
      {/* <FormWithKeyRemove /> */}
      {/* {tab ? <GlobalStateTest /> : <AccessGlobalState />} */}
      {/* <GlobalStateTest /> */}
      {/* <GlobalStateTest />
      <AccessGlobalState /> */}
      <MyComponent />
      <MyComponentTwo />
      <br />
      <hr />
      <br />
      <MyComponentThree />
      <MyComponentTwoFour />
      <br />
      <hr />
      <br />
      <MyComponentFive />
      <MyComponentSix />
    </div>
  );
};

export default App;