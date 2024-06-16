// persistentState.js
import { useState, useEffect, useRef } from 'react';

const createPersistentState = (dbName, storeName) => {
  return (key, defaultValue) => {
    dbName = dbName || 'userDatabase';
    storeName = storeName || 'userData';

    const [value, setValue] = useState(defaultValue);
    const didInit = useRef(false);

    useEffect(() => {
      if (!didInit.current) {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          db.createObjectStore(storeName, { keyPath: 'id' });
        };

        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction([storeName], 'readonly');
          const objectStore = transaction.objectStore(storeName);
          const storedValue = objectStore.get(key);

          storedValue.onsuccess = (e) => {
            const result = e.target.result;
            if (result) {
              setValue(result.value);
            }
          };
        };

        request.onerror = (event) => {
          console.error('Error opening IndexedDB:', event.target.error);
        };

        didInit.current = true;
      }
    }, [dbName, storeName, key]);

    useEffect(() => {
      if (didInit.current) {
        const request = indexedDB.open(dbName, 1);

        request.onsuccess = (event) => {
          const db = event.target.result;
          const transaction = db.transaction([storeName], 'readwrite');
          const objectStore = transaction.objectStore(storeName);

          objectStore.put({ id: key, value });
        };

        request.onerror = (event) => {
          console.error('Error opening IndexedDB:', event.target.error);
        };
      }
    }, [dbName, storeName, key, value]);

    return [value, setValue];
  };
};

export default createPersistentState;
