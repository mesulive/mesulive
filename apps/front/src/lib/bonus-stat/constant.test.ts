import { values } from "lodash";
import { MethodProbTable } from "~/lib/bonus-stat/constant";
import { Method } from "~/lib/bonus-stat/types";

describe("MethodProbTable", () => {
  test("확률의 합은 1", () => {
    values(Method.enum).forEach((method) =>
      expect(MethodProbTable[method].reduce((acc, cur) => acc + cur, 0)).toBe(1)
    );
  });
});
