import React from "react";

export const MockComponent = jest.fn();

MockComponent.mockReturnValue(<div>Mocked Component</div>);

const mock = jest.fn().mockImplementation(MockComponent);

export default mock;
