// src/hooks/useDbState.js
import { useEffect, useState, useRef } from 'react';
import { getDbInstance } from '../utils/indexedDB';
import { subscribe, unsubscribe, notify } from '../utils/subscriptions';

const getDbValue = async (dbName, storeName, key) => {
  try {
    const db = await getDbInstance(dbName, storeName);
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error(`Database ${dbName} not found`));
        return;
      }
      const transaction = db.transaction([storeName], 'readonly');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.get(key);

      request.onsuccess = (event) => {
        resolve(event.target.result ? event.target.result.value : undefined);
      };

      request.onerror = (event) => {
        reject(new Error(`Error fetching value for key ${key}: ${event.target.error}`));
      };
    });
  } catch (error) {
    console.error('Error getting database instance:', error);
    throw error;
  }
};

const setDbValue = async (dbName, storeName, key, value) => {
  try {
    const db = await getDbInstance(dbName, storeName);
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error(`Database ${dbName} not found`));
        return;
      }
      const transaction = db.transaction([storeName], 'readwrite');
      const objectStore = transaction.objectStore(storeName);
      const request = objectStore.put({ id: key, value });

      request.onsuccess = () => {
        notify(key, value);
        resolve();
      };

      request.onerror = (event) => {
        reject(new Error(`Error setting value for key ${key}: ${event.target.error}`));
      };
    });
  } catch (error) {
    console.error('Error setting database instance:', error);
    throw error;
  }
};

const useDbState = (key, defaultValue, dbName = 'userDatabase', storeName = 'userData') => {
  const [value, setValue] = useState(defaultValue);
  const didInit = useRef(false);

  useEffect(() => {
    if (!didInit.current) {
      getDbValue(dbName, storeName, key)
        .then((storedValue) => {
          if (storedValue !== undefined) {
            setValue(storedValue);
          }
          didInit.current = true;
        })
        .catch((error) => {
          console.error('Error fetching value from IndexedDB:', error);
        });

      subscribe(key, setValue);
    }

    return () => {
      unsubscribe(key, setValue);
    };
  }, [dbName, storeName, key]);

  useEffect(() => {
    if (didInit.current) {
      setDbValue(dbName, storeName, key, value).catch((error) => {
        console.error('Error setting value in IndexedDB:', error);
      });
    }
  }, [dbName, storeName, key, value]);

  return [value, setValue];
};

export default useDbState;






// // src/hooks/useDbState.js
// import { useEffect, useState, useRef } from 'react';
// import { getDbInstance } from '../utils/indexedDB';
// import { subscribe, unsubscribe, notify } from '../utils/subscriptions';

// const getDbValue = async (dbName, storeName, key) => {
//   const db = await getDbInstance(dbName, storeName);
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction([storeName], 'readonly');
//     const objectStore = transaction.objectStore(storeName);
//     const request = objectStore.get(key);

//     request.onsuccess = (event) => {
//       resolve(event.target.result ? event.target.result.value : undefined);
//     };

//     request.onerror = (event) => {
//       reject(event.target.error);
//     };
//   });
// };

// const setDbValue = async (dbName, storeName, key, value) => {
//   const db = await getDbInstance(dbName, storeName);
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction([storeName], 'readwrite');
//     const objectStore = transaction.objectStore(storeName);
//     const request = objectStore.put({ id: key, value });

//     request.onsuccess = () => {
//       notify(key, value);
//       resolve();
//     };

//     request.onerror = (event) => {
//       reject(event.target.error);
//     };
//   });
// };

// const useDbState = (key, defaultValue, dbName = 'userDatabase', storeName = 'userData') => {
//   const [value, setValue] = useState(defaultValue);
//   const didInit = useRef(false);

//   useEffect(() => {
//     if (!didInit.current) {
//       getDbValue(dbName, storeName, key).then((storedValue) => {
//         if (storedValue !== undefined) {
//           setValue(storedValue);
//         }
//         didInit.current = true;
//       }).catch((error) => {
//         console.error('Error fetching value from IndexedDB:', error);
//       });

//       subscribe(key, setValue);
//     }

//     return () => {
//       unsubscribe(key, setValue);
//     };
//   }, [dbName, storeName, key]);

//   useEffect(() => {
//     if (didInit.current) {
//       setDbValue(dbName, storeName, key, value).catch((error) => {
//         console.error('Error setting value in IndexedDB:', error);
//       });
//     }
//   }, [dbName, storeName, key, value]);

//   return [value, setValue];
// };

// export default useDbState;








// // src/hooks/useDbState.js
// import { useEffect, useState, useRef } from 'react';
// import { getDbInstance } from '../utils/indexedDB';
// import { subscribe, notify } from '../utils/subscriptions';

// const getDbValue = async (dbName, storeName, key) => {
//   const db = await getDbInstance(dbName, storeName);
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction([storeName], 'readonly');
//     const objectStore = transaction.objectStore(storeName);
//     const request = objectStore.get(key);

//     request.onsuccess = (event) => {
//       resolve(event.target.result ? event.target.result.value : undefined);
//     };

//     request.onerror = (event) => {
//       reject(event.target.error);
//     };
//   });
// };

// const setDbValue = async (dbName, storeName, key, value) => {
//   const db = await getDbInstance(dbName, storeName);
//   return new Promise((resolve, reject) => {
//     const transaction = db.transaction([storeName], 'readwrite');
//     const objectStore = transaction.objectStore(storeName);
//     const request = objectStore.put({ id: key, value });

//     request.onsuccess = () => {
//       notify(key, value);
//       resolve();
//     };

//     request.onerror = (event) => {
//       reject(event.target.error);
//     };
//   });
// };

// const useDbState = (key, defaultValue, dbName = 'userDatabase', storeName = 'userData') => {
//   const [value, setValue] = useState(defaultValue);
//   const didInit = useRef(false);

//   useEffect(() => {
//     if (!didInit.current) {
//       getDbValue(dbName, storeName, key).then((storedValue) => {
//         if (storedValue !== undefined) {
//           setValue(storedValue);
//         }
//         didInit.current = true;
//       }).catch((error) => {
//         console.error('Error fetching value from IndexedDB:', error);
//       });

//       subscribe(key, setValue);
//     }
//   }, [dbName, storeName, key]);

//   useEffect(() => {
//     if (didInit.current) {
//       setDbValue(dbName, storeName, key, value).catch((error) => {
//         console.error('Error setting value in IndexedDB:', error);
//       });
//     }
//   }, [dbName, storeName, key, value]);

//   return [value, setValue];
// };

// export default useDbState;
