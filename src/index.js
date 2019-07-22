//@flow strict
export type TObserver<T> = (state: T, prevState: T) => void;

export type TStore<T: {}, PT: $Shape<T>> = {
  getState: () => T,
  setState: (diff: PT) => void,
  subscribe: (observer: TObserver<T>) => void,
  unsubscribe: (observer: TObserver<T>) => void
};

export function createStore<T: {}, PT: $Shape<T>>(
  initialState: T
): TStore<T, PT> {
  let state: T = initialState;
  let observers: TObserver<T>[] = [];
  return {
    setState: (diff: PT) => {
      let prevState: T = state;
      state = Object.assign({}, state, diff);
      for (let i = 0; i < observers.length; i += 1) {
        const observer = observers[i];
        observer(state, prevState);
      }
    },
    getState: (): T => {
      return state;
    },
    subscribe: (observer: TObserver<T>) => {
      observers.push(observer);
    },
    unsubscribe: (observer: TObserver<T>) => {
      observers = observers.filter(x => x !== observer);
    }
  };
}
