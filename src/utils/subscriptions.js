const subscriptions = new Map();

export const subscribe = (key, callback) => {
  if (!subscriptions.has(key)) {
    subscriptions.set(key, []);
  }
  subscriptions.get(key).push(callback);
};

export const notify = (key, value) => {
  if (subscriptions.has(key)) {
    for (const callback of subscriptions.get(key)) {
      callback(value);
    }
  }
};








// // src/utils/subscriptions.js
// const subscribers = new Map();

// export const subscribe = (key, callback) => {
//   if (!subscribers.has(key)) {
//     subscribers.set(key, []);
//   }
//   subscribers.get(key).push(callback);
// };

// export const unsubscribe = (key, callback) => {
//   if (subscribers.has(key)) {
//     const subs = subscribers.get(key).filter(cb => cb !== callback);
//     if (subs.length > 0) {
//       subscribers.set(key, subs);
//     } else {
//       subscribers.delete(key);
//     }
//   }
// };

// export const notify = (key, value) => {
//   if (subscribers.has(key)) {
//     subscribers.get(key).forEach(callback => callback(value));
//   }
// };



// // src/utils/subscriptions.js
// const subscribers = {};

// export const subscribe = (key, callback) => {
//   if (!subscribers[key]) {
//     subscribers[key] = [];
//   }
//   subscribers[key].push(callback);
// };

// export const notify = (key, value) => {
//   if (subscribers[key]) {
//     subscribers[key].forEach(callback => callback(value));
//   }
// };
