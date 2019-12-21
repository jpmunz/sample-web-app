import { rootReducer, setFooValue, getFooValue } from "./index.js";
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

test("setFooValue", () => {
  const updatedState = rootReducer(
    initialState,
    setFooValue({ value: "updated" })
  );
  expect(getFooValue(updatedState)).toBe("updated");
});
