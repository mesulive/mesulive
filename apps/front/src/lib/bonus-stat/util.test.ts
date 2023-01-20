import { getOptionValues } from "~/lib/bonus-stat/utils";

describe("getOptionValues", () => {
  test("valid input", () => {
    expect(getOptionValues(100, { bossDrop: true })("STR")).toEqual([
      18, 24, 30, 36, 42,
    ]);
    expect(getOptionValues(250, { bossDrop: true })("STR")).toEqual([
      36, 48, 60, 72, 84,
    ]);
    expect(getOptionValues(150, { bossDrop: true })("STR+DEX")).toEqual([
      12, 16, 20, 24, 28,
    ]);
    expect(getOptionValues(250, { bossDrop: true })("HP")).toEqual([
      2100, 2800, 3500, 4200, 4900,
    ]);
  });
});

describe("getOptionValuesMap", () => {
  test("너무 많아서 log 찍어서 확인", () => {
    // expect(
    //   pipe(getOptionValuesMap(250, { bossDrop: true }), rent.io(log))
    // ).toBeTruthy();
  });
});
