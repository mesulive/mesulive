import { values } from "lodash";
import { BonusStat } from "~/lib/bonus-stat/index";
import { Option } from "~/lib/bonus-stat/types";

describe("isAdditionalOptionValues", () => {
  test("array도 parsing 가능?", () => {
    expect(BonusStat.isAdditionalOptionValues([1, 2, 3, 4, 5])).toBe(true);
    expect(BonusStat.isAdditionalOptionValues([1, 2, 3, 4, 5, 6])).toBe(false);
  });
});

describe("Option", () => {
  test("옵션 개수는 19개", () => {
    expect(values(Option.enum).length).toBe(19);
  });
});
