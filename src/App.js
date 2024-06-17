// UserForm.js
import React from 'react';
// import MyForm from './components/MyForm';
// import FormTwo from './components/FormTwo';
// import FormWithKeyRemove from './components/FormWithKeyRemove';
// import GlobalStateTest from './components/GlobalStateTest';
// import AccessGlobalState from './components/AccessGlobalState';
import MyComponent from './components/MyComponent';
import MyComponentTwo from './components/MyComponentTwo';
import MyComponentThree from './components/MyComponentThree';
import MyComponentTwoFour from './components/MyComponentFour';
import MyComponentFive from './components/MyComponentFive';
import MyComponentSix from './components/MyComponentSix';
import AddTask from './components/ToDoTask/AddTask';
import TaskList from './components/ToDoTask/TaskList';
// import SyncTasks from './components/ToDoTask/SyncTasks';
import MyComponentObject from './components/MyComponentObject';
import ImageUpload from './components/ImageComponent/ImageUpload';
import DisplayImage from './components/ImageComponent/DisplayImage';
import BooleanExample from './components/BooleanComponent/BooleanExample';
import DateExample from './components/DateExample/DateExample';
import ObjectTest from './components/ObjectTest/ObjectTest';
import NestedObjectTest from './components/ObjectTest/NestedObjectTest';



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
      {/* <MyComponent />
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
      <br />
      <hr />
      <br /> */}
      <div>
        <h1>Task Manager</h1>
        <AddTask />
         <TaskList />
       {/* <SyncTasks /> */}
      </div>
      <br />
      <hr />
      <br />
      <MyComponentObject />
      <br />
      <hr />
      <br />
      <h1>Image Upload and Display</h1>
      <ImageUpload />
      <DisplayImage />
      <br />
      <hr />
      <br />
      <BooleanExample />
      <DateExample />
      <ObjectTest />
      <NestedObjectTest />
    </div>
  );
};

export default App;