// sharedState.js
class SharedState {
    constructor(initialValue) {
      this.value = initialValue;
      this.listeners = [];
    }
  
    setValue(newValue) {
      this.value = newValue;
      this.notifyListeners();
    }
  
    getValue() {
      return this.value;
    }
  
    subscribe(listener) {
      this.listeners.push(listener);
    }
  
    unsubscribe(listener) {
      this.listeners = this.listeners.filter((l) => l !== listener);
    }
  
    notifyListeners() {
      this.listeners.forEach((listener) => listener(this.value));
    }
  }
  
  const globalState = new SharedState('');
  
  export const getGlobalState = () => globalState;
  
  export const setGlobalState = (value) => {
    globalState.setValue(value);
  };
  