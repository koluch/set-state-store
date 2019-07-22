//@flow strict
import { createStore } from "./index.js";

test("initial state propertly initialize store", () => {
  let store = createStore({ a: 42 });
  expect(store.getState()).toEqual({ a: 42 });
});

test("setState should properly save value", () => {
  let store = createStore({ a: 666 });
  store.setState({ a: 42 });
  expect(store.getState()).toEqual({ a: 42 });
});

test("setState merges passed diff", () => {
  let store = createStore({ a: 42, b: 0 });
  store.setState({ b: 666 });
  expect(store.getState()).toEqual({ a: 42, b: 666 });
});

test("observed called after setState with new and old state", () => {
  let store = createStore({ a: 42, b: 0 });
  store.subscribe((newState, oldState) => {
    expect(newState).toEqual({ a: 42, b: 666 });
    expect(oldState).toEqual({ a: 42, b: 0 });
  });
  store.setState({ b: 666 });
});

test("observer properly unsubscribes from store", () => {
  let store = createStore({});
  let observer = () => {};
  store.subscribe(observer);
  store.unsubscribe(observer);
});
