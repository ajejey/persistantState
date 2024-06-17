import React from 'react';
import useDbState from '../../hooks/useDbState';

const TaskList = () => {
  const [tasks] = useDbState('tasks');

  return (
    <ul>
      {tasks && tasks.map((task, index) => (
        <li key={index}>{task}</li>
      ))}
    </ul>
  );
};

export default TaskList;
