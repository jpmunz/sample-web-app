import {
  fetchFooServerValueRequest,
  rootReducer,
  rootSaga,
  getFooServerValue,
  getAsync
} from "./index";
import SagaTester from "redux-saga-tester";
import { mockFetchFooValue } from "src/api";

jest.mock("src/api");

const startTest = (action, initialState) => {
  const sagaTester = new SagaTester({
    initialState,
    reducers: rootReducer
  });

  sagaTester.start(rootSaga);
  sagaTester.dispatch(action);

  return sagaTester;
};

test("fetchFooValue success", async () => {
  mockFetchFooValue.mockResolvedValue({ value: "server value" });

  const sagaTest = startTest(fetchFooServerValueRequest({}));
  expect(getAsync(sagaTest.getState(), "foo")).toEqual({
    inProgress: true
  });

  await sagaTest.waitFor("async/success");

  expect(getFooServerValue(sagaTest.getState())).toBe("server value");
});

test("fetchFooValue error", async () => {
  mockFetchFooValue.mockRejectedValue("failed");

  const sagaTest = startTest(fetchFooServerValueRequest({}));
  expect(getAsync(sagaTest.getState(), "foo")).toEqual({
    inProgress: true
  });

  await sagaTest.waitFor("async/error");

  expect(getAsync(sagaTest.getState(), "foo")).toEqual({
    error: "failed",
    inProgress: false
  });
});
