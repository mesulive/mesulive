import { values } from "lodash";
import { Flame } from "~/lib/flame/index";
import { Option } from "~/lib/flame/types";

describe("isAdditionalOptionValues", () => {
  test("array도 parsing 가능?", () => {
    expect(Flame.isAdditionalOptionValues([1, 2, 3, 4, 5])).toBe(true);
    expect(Flame.isAdditionalOptionValues([1, 2, 3, 4, 5, 6])).toBe(false);
  });
});

describe("Option", () => {
  test("옵션 개수는 19개", () => {
    expect(values(Option.enum).length).toBe(19);
  });
});
