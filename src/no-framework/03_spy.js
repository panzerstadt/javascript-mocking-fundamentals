const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

function fn(implementation = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    return implementation(...args);
  };
  mockFn.mock = { calls: [] };
  mockFn.mockImplementation = newImpl => (implementation = newImpl);
  return mockFn;
}

function spyOn(obj, prop) {
  const originalValue = obj[prop];
  obj[prop] = fn();
  obj[prop].mockRestore = () => (obj[prop] = originalValue);
}

spyOn(utils, "getWinner");
utils.getWinner.mockImplementation((p1, p2) => p1);

// test
const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
assert.strictEqual(winner, "Kent C. Dodds");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ["Kent C. Dodds", "Ken Wheeler"],
  ["Kent C. Dodds", "Ken Wheeler"]
]);

// cleanup
utils.getWinner.mockRestore();
