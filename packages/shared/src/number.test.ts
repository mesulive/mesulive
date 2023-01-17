import { putUnit } from "./number";

describe("putUnit()", () => {
  test("number", () => {
    expect(putUnit(0)).toBe("0");
    expect(putUnit(12345678)).toBe("1234만 5678");
    expect(putUnit(12340678)).toBe("1234만 678");
    expect(putUnit(100001234)).toBe("1억 1234");
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    expect(putUnit(12345678876543210123)).toBe("약 1234경 5678조");
  });
});
