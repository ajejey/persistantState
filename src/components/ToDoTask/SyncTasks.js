import React, { useEffect } from 'react';
import useDbState from '../../hooks/useDbState';

const SyncTasks = () => {
  const [tasks] = useDbState('tasks');

  useEffect(() => {
    const syncWithServer = async () => {
      if (navigator.onLine && tasks) {
        try {
          // Assume we have an API endpoint to sync tasks
          await fetch('/api/sync-tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(tasks),
          });
          console.log('Tasks synchronized with server.');
        } catch (error) {
          console.error('Error syncing tasks with server:', error);
        }
      }
    };

    window.addEventListener('online', syncWithServer);

    return () => {
      window.removeEventListener('online', syncWithServer);
    };
  }, [tasks]);

  return null;
};

export default SyncTasks;
