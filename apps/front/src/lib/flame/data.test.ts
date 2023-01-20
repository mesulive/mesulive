import { values } from "lodash";
import { Flame } from "~/lib/flame/index";

describe("MethodProbTable", () => {
  test("확률의 합은 1", () => {
    values(Flame.Method.enum).forEach((method) =>
      expect(
        Flame.Data.MethodProbTable[method].reduce((acc, cur) => acc + cur, 0)
      ).toBe(1)
    );
  });
});

describe("Option", () => {
  test("옵션 개수는 19개", () => {
    expect(values(Flame.Data.Option.enum).length).toBe(19);
  });
});
