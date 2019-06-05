export function createStore(initialState) {
  let state = initialState;
  let observers = [];
  return {
    setState: diff => {
      let prevState = state;
      state = Object.assign({}, state, diff);
      for (let i = 0; i < observers.length; i += 1) {
        const observer = observers[i];
        observer(state, prevState);
      }
    },
    getState: () => {
      return state;
    },
    subscribe: observer => {
      observers.push(observer);
    },
    unsubscribe: observer => {
      observers = observers.filter(function(x) {
        return x !== observer;
      });
    }
  };
}
