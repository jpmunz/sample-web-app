import { createAction, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import API from "src/api";
import { put, call, takeLatest } from "redux-saga/effects";

/*
  REDUCERS
*/

const asyncRequestsSlice = createSlice({
  name: "async",
  initialState: {},
  reducers: {
    start(state, action) {
      state[action.payload.id] = { inProgress: true };
    },
    error(state, action) {
      state[action.payload.id] = {
        inProgress: false,
        error: action.payload.error
      };
    },
    success(state, action) {
      state[action.payload.id] = {
        success: true,
        response: action.payload.response
      };
    }
  }
});

const fooSlice = createSlice({
  name: "foo",
  initialState: {},
  reducers: {
    setFooValue(state, action) {
      state.value = action.payload.value;
    },
    loaded(state, action) {
      state.serverValue = action.payload.response.value;
    }
  }
});

export const { setFooValue } = fooSlice.actions;

export const rootReducer = combineReducers({
  foo: fooSlice.reducer,
  async: asyncRequestsSlice.reducer
});

/*
  SELECTORS
*/

export function getFooServerValue(state) {
  return state.foo.serverValue || "unset";
}

export function getFooValue(state) {
  return state.foo.value || "unset";
}

export function getAsync(state, id) {
  return state.async[id] || {};
}

/*
 * ASYNC OPERATIONS
 */

const api = new API();

const asyncRequest = function*(id, responseAction, apiMethod, ...apiArgs) {
  try {
    yield put(asyncRequestsSlice.actions.start({ id }));
    const response = yield call([api, apiMethod], ...apiArgs);
    yield put(responseAction({ response }));
    yield put(asyncRequestsSlice.actions.success({ id, response }));
  } catch (error) {
    yield put(
      asyncRequestsSlice.actions.error({ id, error: error.toString() })
    );
  }
};

const fetchFooServerValue = function*(action) {
  yield asyncRequest("foo", fooSlice.actions.loaded, "fetchFooValue");
};

export const fetchFooServerValueRequest = createAction(
  "fetchFooServerValueRequest"
);

export const rootSaga = function*() {
  yield takeLatest(fetchFooServerValueRequest.type, fetchFooServerValue);
};
