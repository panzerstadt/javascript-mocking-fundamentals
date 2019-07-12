require("../__no-framework-mocks__/utils");
const utilsPath = require.resolve("../utils.js");
const mockUtilsPath = require.resolve("../__no-framework-mocks__/utils.js");
require.cache[utilsPath] = require.cache[mockUtilsPath];

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

// cleanup
delete require.cache[utilsPath];
