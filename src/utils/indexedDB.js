export const getDbInstance = (dbName, storeName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};



// // src/utils/indexedDb.js
// export const getDbInstance = (() => {
//     let dbInstance = null;
  
//     return async (dbName = 'userDatabase', storeName = 'userData') => {
//       if (dbInstance) return dbInstance;
  
//       return new Promise((resolve, reject) => {
//         const request = indexedDB.open(dbName, 1);
  
//         request.onupgradeneeded = (event) => {
//           const db = event.target.result;
//           if (!db.objectStoreNames.contains(storeName)) {
//             db.createObjectStore(storeName, { keyPath: 'id' });
//           }
//         };
  
//         request.onsuccess = (event) => {
//           dbInstance = event.target.result;
//           resolve(dbInstance);
//         };
  
//         request.onerror = (event) => {
//           reject(event.target.error);
//         };
//       });
//     };
//   })();
  