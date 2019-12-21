import { getFooServerValue, getFooValue, getAsync } from "./index.js";
import { produce } from "immer";

const initialState = produce({}, () => ({
  foo: {
    value: "bar",
    serverValue: "baz"
  },
  async: {
    r1: {
      inProgress: true
    }
  }
}));

test("getFooServerValue", () => {
  expect(getFooServerValue(initialState)).toBe("baz");
});

test("getFooServerValue unset", () => {
  const state = produce(initialState, draft => {
    draft.foo.serverValue = null;
  });

  expect(getFooServerValue(state)).toBe("unset");
});

test("getFooValue", () => {
  expect(getFooValue(initialState)).toBe("bar");
});

test("getFooValue unset", () => {
  const state = produce(initialState, draft => {
    draft.foo.value = null;
  });

  expect(getFooValue(state)).toBe("unset");
});

test("getAsync", () => {
  expect(getAsync(initialState, "r1")).toEqual({ inProgress: true });
  expect(getAsync(initialState, "r33")).toEqual({});
});
