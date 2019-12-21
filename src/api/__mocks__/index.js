export const mockFetchFooValue = jest.fn();

const mock = jest.fn().mockImplementation(() => ({
  fetchFooValue: mockFetchFooValue
}));

export default mock;
