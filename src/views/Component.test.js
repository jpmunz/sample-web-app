import React from "react";
import { Component } from "./Component";
import { render, fireEvent } from "@testing-library/react";

const setFooValueMock = jest.fn();
const fetchFooServerValueRequestMock = jest.fn();

const renderComponent = function({
  fooValue = "foo value",
  routeId = null,
  fooServerValue = "foo server value",
  request = {}
}) {
  return render(
    <Component
      routeId={routeId}
      fooValue={fooValue}
      fooServerValue={fooServerValue}
      setFooValue={setFooValueMock}
      fetchFooServerValueRequest={fetchFooServerValueRequestMock}
      request={request}
    />
  );
};

const renderTest = options =>
  expect(renderComponent(options).asFragment()).toMatchSnapshot();

test("Request in progress", () =>
  renderTest({ request: { inProgress: true } }));
test("Request failed", () => renderTest({ request: { error: "failed" } }));
test("With a route id", () => renderTest({ routeId: "22" }));

test("Fetches are made on mount", () => {
  renderComponent({});
  expect(fetchFooServerValueRequestMock.mock.calls).toEqual([[{}]]);
});

test("Updating foo value", () => {
  const component = renderComponent({});

  fireEvent.change(component.getByLabelText("Foo value"), {
    target: { value: "bar" }
  });
  fireEvent.click(component.getByText("Update Foo Value"));

  expect(setFooValueMock.mock.calls).toEqual([[{ value: "bar" }]]);
});
