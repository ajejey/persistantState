// // usePersistentState.js
// import { useState, useEffect, useRef } from 'react';
// import { getGlobalState, setGlobalState } from './sharedState';

// const usePersistentState = (key, defaultValue, dbName, storeName) => {
//   dbName = dbName || 'userDatabase';
//   storeName = storeName || 'userData';

//   const [value, setValue] = useState(() => {
//     const initial = getGlobalState().getValue() || defaultValue;
//     return initial;
//   });
//   const didInit = useRef(false);

//   useEffect(() => {
//     if (!didInit.current) {
//       const request = indexedDB.open(dbName, 1);

//       request.onupgradeneeded = (event) => {
//         const db = event.target.result;
//         db.createObjectStore(storeName, { keyPath: 'id' });
//       };

//       request.onsuccess = (event) => {
//         const db = event.target.result;
//         const transaction = db.transaction([storeName], 'readonly');
//         const objectStore = transaction.objectStore(storeName);
//         const storedValue = objectStore.get(key);

//         storedValue.onsuccess = (e) => {
//           const result = e.target.result;
//           if (result) {
//             setGlobalState(result.value);
//             setValue(result.value);
//           }
//         };
//       };

//       request.onerror = (event) => {
//         console.error('Error opening IndexedDB:', event.target.error);
//       };

//       didInit.current = true;
//     }
//   }, [dbName, storeName, key]);

//   useEffect(() => {
//     if (didInit.current) {
//       const request = indexedDB.open(dbName, 1);

//       request.onsuccess = (event) => {
//         const db = event.target.result;
//         const transaction = db.transaction([storeName], 'readwrite');
//         const objectStore = transaction.objectStore(storeName);

//         objectStore.put({ id: key, value });
//         setGlobalState(value);
//       };

//       request.onerror = (event) => {
//         console.error('Error opening IndexedDB:', event.target.error);
//       };
//     }
//   }, [dbName, storeName, key, value]);

//   useEffect(() => {
//     const handleGlobalStateChange = (newValue) => {
//       setValue(newValue);
//     };

//     getGlobalState().subscribe(handleGlobalStateChange);
//     return () => {
//       getGlobalState().unsubscribe(handleGlobalStateChange);
//     };
//   }, []);

//   return [value, setValue];
// };

// export default usePersistentState;









// usePersistentState.js
import { useState, useEffect, useRef } from 'react';

/**
 * Returns a stateful value and a function to update it, with the value persisted in IndexedDB.
 *
 * @param {string} key - The key used to store the value in IndexedDB.
 * @param {any} defaultValue - The default value to use if no value is found in IndexedDB.
 * @param {string} [dbName='userDatabase'] - The name of the IndexedDB database.
 * @param {string} [storeName='userData'] - The name of the object store in the IndexedDB database.
 * @return {[any, React.Dispatch<React.SetStateAction<any>>]} - An array containing the stateful value and a function to update it.
 */
const usePersistentState = (key, defaultValue, dbName, storeName ) => {
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
        const transaction = db.transaction([storeName], 'readwrite');
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

  console.log('value:', value);

  return [value, setValue];
};

export default usePersistentState;














// // usePersistentState.js
// import { useState, useEffect } from 'react';

// const usePersistentState = (key, defaultValue, dbName, storeName ) => {
//   dbName = dbName || 'userDatabase';
//   storeName = storeName || 'userData';
  
//   const [value, setValue] = useState(defaultValue);

//   useEffect(() => {
//     const request = indexedDB.open(dbName, 1);

//     request.onupgradeneeded = (event) => {
//       const db = event.target.result;
//       db.createObjectStore(storeName, { keyPath: 'id' });
//     };

//     request.onsuccess = (event) => {
//       const db = event.target.result;
//       const transaction = db.transaction([storeName], 'readwrite');
//       const objectStore = transaction.objectStore(storeName);

//       const storedValue = objectStore.get(key);
//       storedValue.onsuccess = (e) => {
//         const result = e.target.result;
//         if (result) {
//           setValue(result.value);
//         }
//       };
//     };

//     request.onerror = (event) => {
//       console.error('Error opening IndexedDB:', event.target.error);
//     };
//   }, [dbName, storeName, key]);

//   useEffect(() => {
//     const request = indexedDB.open(dbName, 1);

//     request.onsuccess = (event) => {
//       const db = event.target.result;
//       const transaction = db.transaction([storeName], 'readwrite');
//       const objectStore = transaction.objectStore(storeName);

//       objectStore.put({ id: key, value });
//     };

//     request.onerror = (event) => {
//       console.error('Error opening IndexedDB:', event.target.error);
//     };
//   }, [dbName, storeName, key, value]);

//   console.log('value:', value);

//   return [value, setValue];
// };

// export default usePersistentState;
























// import { useState, useEffect } from 'react';

// const usePersistentState = (dbName = 'userDatabase', storeName = 'userData', key, defaultValue) => {
//   const [value, setValue] = useState(defaultValue);

//   useEffect(() => {
//     const request = indexedDB.open(dbName, 1);

//     request.onupgradeneeded = (event) => {
//       const db = event.target.result;
//       db.createObjectStore(storeName, { keyPath: 'id' });
//     };

//     request.onsuccess = (event) => {
//       const db = event.target.result;
//       const transaction = db.transaction([storeName], 'readwrite');
//       const objectStore = transaction.objectStore(storeName);

//       const storedValue = objectStore.get(key);
//       storedValue.onsuccess = (e) => {
//         const result = e.target.result;
//         if (result) {
//           setValue(result.value);
//         }
//       };
//     };

//     request.onerror = (event) => {
//       console.error('Error opening IndexedDB:', event.target.error);
//     };
//   }, [dbName, storeName, key]);

//   useEffect(() => {
//     const request = indexedDB.open(dbName, 1);

//     request.onsuccess = (event) => {
//       const db = event.target.result;
//       const transaction = db.transaction([storeName], 'readwrite');
//       const objectStore = transaction.objectStore(storeName);

//       objectStore.put({ id: key, value });
//     };

//     request.onerror = (event) => {
//       console.error('Error opening IndexedDB:', event.target.error);
//     };
//   }, [dbName, storeName, key, value]);

//   console.log('value:', value);
//   // console.log('setValue:', setValue);

//   return [value, setValue];
// };

// export default usePersistentState;