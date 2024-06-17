import { useEffect, useState, useRef } from 'react';
import { getDbInstance } from '../utils/indexedDB';
import { subscribe, notify } from '../utils/subscriptions';

const getDbValue = async (dbName, storeName, key) => {
  const db = await getDbInstance(dbName, storeName);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get(key);

    request.onsuccess = (event) => {
      resolve(event.target.result ? event.target.result.value : undefined);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const setDbValue = async (dbName, storeName, key, value) => {
  const db = await getDbInstance(dbName, storeName);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.put({ id: key, value });

    request.onsuccess = () => {
      notify(key, value);
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

const useDbState = (key, defaultValue, dbName = 'userDatabase', storeName = 'userData') => {
  const [value, setValue] = useState(defaultValue);
  const didInit = useRef(false);

  useEffect(() => {
    console.log(`Fetching value from IndexedDB for key: ${key}`);
    if (!didInit.current) {
      getDbValue(dbName, storeName, key).then((storedValue) => {
        console.log('Value fetched from IndexedDB:', storedValue);
        if (storedValue !== undefined) {
          setValue(storedValue);
        }
        didInit.current = true;
      }).catch((error) => {
        console.error('Error fetching value from IndexedDB:', error);
      });

      subscribe(key, setValue);
    }
  }, [dbName, storeName, key]);

  useEffect(() => {
    if (didInit.current) {
      console.log(`Setting value in IndexedDB for key: ${key}`, value);
      setDbValue(dbName, storeName, key, value).catch((error) => {
        console.error('Error setting value in IndexedDB:', error);
      });
    }
  }, [dbName, storeName, key, JSON.stringify(value)]); // Ensure the effect only triggers on deep value changes

  console.log(`Returning useDbState result for key: ${key}`, [value, setValue]);
  return [value, setValue];
};

export default useDbState;







// // src/hooks/useDbState.js
// import { useEffect, useState, useRef } from 'react';
// import { getDbInstance } from '../utils/indexedDB';
// import { subscribe, notify } from '../utils/subscriptions';

// const getDbValue = async (dbName, storeName, key) => {
//   try {
//     const db = await getDbInstance(dbName, storeName);
//     return new Promise((resolve, reject) => {
//       const transaction = db.transaction([storeName], 'readonly');
//       const objectStore = transaction.objectStore(storeName);
//       const request = objectStore.get(key);

//       request.onsuccess = (event) => {
//         const result = event.target.result ? event.target.result.value : undefined;
//         try {
//           resolve(result !== undefined ? JSON.parse(result) : undefined);
//         } catch (error) {
//           console.error('Error parsing value from IndexedDB:', error);
//           resolve(undefined);
//         }
//       };

//       request.onerror = (event) => {
//         reject(event.target.error);
//       };
//     });
//   } catch (error) {
//     console.error('Error getting value from IndexedDB:', error);
//     return undefined;
//   }
// };

// const setDbValue = async (dbName, storeName, key, value) => {
//   try {
//     const db = await getDbInstance(dbName, storeName);
//     return new Promise((resolve, reject) => {
//       const transaction = db.transaction([storeName], 'readwrite');
//       const objectStore = transaction.objectStore(storeName);
//       const request = objectStore.put({ id: key, value: JSON.stringify(value) });

//       request.onsuccess = () => {
//         notify(key, value);
//         resolve();
//       };

//       request.onerror = (event) => {
//         reject(event.target.error);
//       };
//     });
//   } catch (error) {
//     console.error('Error setting value in IndexedDB:', error);
//   }
// };

// const useDbState = (key, defaultValue, dbName = 'userDatabase', storeName = 'userData') => {
//   const [value, setValue] = useState(defaultValue);
//   const didInit = useRef(false);
//   const previousValue = useRef(defaultValue);

//   useEffect(() => {
//     console.log('Fetching value from IndexedDB...');
//     getDbValue(dbName, storeName, key).then((storedValue) => {
//       console.log('Value fetched from IndexedDB:', storedValue);
//       if (storedValue !== undefined && JSON.stringify(storedValue) !== JSON.stringify(previousValue.current)) {
//         setValue(storedValue);
//         previousValue.current = storedValue;
//       }
//       didInit.current = true;
//     }).catch((error) => {
//       console.error('Error fetching value from IndexedDB:', error);
//     });

//     subscribe(key, setValue);
//   }, [dbName, storeName, key]);

//   useEffect(() => {
//     if (didInit.current && JSON.stringify(value) !== JSON.stringify(previousValue.current)) {
//       console.log('Setting value in IndexedDB...', value);
//       setDbValue(dbName, storeName, key, value).catch((error) => {
//         console.error('Error setting value in IndexedDB:', error);
//       });
//       previousValue.current = value;
//     }
//   }, [dbName, storeName, key, value]);

//   return [value, setValue];
// };

// export default useDbState;







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
