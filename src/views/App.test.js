import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { MockComponent } from "./Component";
import App from "./App";

jest.mock("./Component");

const renderComponent = function(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
};

test("Default route", () => {
  expect(renderComponent("/")).toMatchSnapshot();
  expect(MockComponent.mock.calls).toEqual([[{}, {}]]);
});

test("Some route with params", () => {
  expect(renderComponent("/foo/22")).toMatchSnapshot();
  expect(MockComponent.mock.calls).toEqual([[{ routeId: "22" }, {}]]);
});
