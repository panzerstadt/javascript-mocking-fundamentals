function fn(implementation = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    return implementation(...args);
  };
  mockFn.mock = { calls: [] };
  mockFn.mockImplementation = newImpl => (implementation = newImpl);
  return mockFn;
}

// since this is manual, we preload the function that you want to test
// overwriting non-deterministic behaviour here before the test is run
// in jest, just write jext.mock() anywhere
const utilsPath = require.resolve("../utils.js");
require.cache[utilsPath] = {
  id: utilsPath,
  filename: utilsPath,
  loaded: true,
  exports: {
    getWinner: fn((p1, p2) => p1)
  }
};

const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

// test
const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
assert.strictEqual(winner, "Kent C. Dodds");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ["Kent C. Dodds", "Ken Wheeler"],
  ["Kent C. Dodds", "Ken Wheeler"]
]);

console.log("complete!");

// cleanup
delete require.cache[utilsPath];
