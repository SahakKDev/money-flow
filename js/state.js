const initialState = {
  currentAccount: null,
  sortMovements: false,
  timer: 10 * 60, // seconds
  timerId: null,
};

let state = {
  ...initialState,
};

export default state;

export function setStateTimer() {
  clearInterval(state.timerId);
  Object.assign(state, { timer: initialState.timer });
}

export function resetState() {
  clearTimeout(state.timerId);
  Object.assign(state, initialState);
}
