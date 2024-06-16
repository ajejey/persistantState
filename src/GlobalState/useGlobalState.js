// globalState.js

import createPersistentState from "../createPersistantState";

const useGlobalState = createPersistentState('globalDb', 'globalStore');

export default useGlobalState;
