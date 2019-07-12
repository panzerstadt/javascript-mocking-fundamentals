// shared mock functions for 05_shared-modules.js

function fn(implementation = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    return implementation(...args);
  };
  mockFn.mock = { calls: [] };
  mockFn.mockImplementation = newImpl => (implementation = newImpl);
  return mockFn;
}

// this is now shared throughout the entire app
module.exports = {
  getWinner: fn((p1, p2) => p1)
};
