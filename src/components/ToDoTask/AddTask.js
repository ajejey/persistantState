import React, { useState } from 'react';
import useDbState from '../../hooks/useDbState';

const AddTask = () => {
  const [tasks, setTasks] = useDbState('tasks', []);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTask('');
  };

  return (
    <div>
      <input 
        type="text" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
      />
      <button onClick={addTask}>Add Task</button>
      <div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddTask;

