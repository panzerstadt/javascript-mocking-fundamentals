const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

// this is shared modules, meaning the implementation of
// getWinner lives in __mocks__ which just over
jest.mock("../utils.js");

test("returns winner", () => {
  // test
  const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
  expect(winner).toBe("Kent C. Dodds");

  // these only work when you have mocked the function (with jest.fn)
  expect(utils.getWinner).toHaveBeenCalledTimes(2); // because thumbWar's win limit is 2
  expect(utils.getWinner).toHaveBeenCalledWith("Kent C. Dodds", "Ken Wheeler"); // to check if both parameters go in
  // below makes sure both calls to getWinner are with the same parameters
  expect(utils.getWinner).toHaveBeenNthCalledWith(
    1,
    "Kent C. Dodds",
    "Ken Wheeler"
  );
  expect(utils.getWinner).toHaveBeenNthCalledWith(
    2,
    "Kent C. Dodds",
    "Ken Wheeler"
  );

  // and this is the way that uses jest's properties
  expect(utils.getWinner.mock.calls).toEqual([
    ["Kent C. Dodds", "Ken Wheeler"],
    ["Kent C. Dodds", "Ken Wheeler"]
  ]);

  // cleanup
  utils.getWinner.mockReset();
});
