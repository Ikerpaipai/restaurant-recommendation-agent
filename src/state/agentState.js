let state = {
  intent: null,
  city: null,
  cuisine: null,
  budget: null,
  preferences: []
};


export function getState() {
  return state;
}


export function updateState(newState) {

  state = {
    ...state,
    ...newState
  };

}


export function resetState() {

  state = {
    intent: null,
    city: null,
    cuisine: null,
    budget: null,
    preferences: []
  };

}