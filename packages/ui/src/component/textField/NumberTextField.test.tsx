import { useState } from "react";
import { NumberTextField } from "./NumberTextField";
import { cleanup, fireEvent, render } from "@testing-library/react";

const MAX = 999;

const NumberTextFieldContainer = () => {
  const [num, setNum] = useState<number | undefined>(undefined);

  return (
    <NumberTextField
      value={num}
      onNumberChange={setNum}
      inputProps={{
        role: "input",
      }}
      max={MAX}
    />
  );
};

afterEach(cleanup);

describe("NumberTextField", () => {
  let input: HTMLInputElement;

  beforeEach(() => {
    const { getByRole } = render(<NumberTextFieldContainer />);
    input = getByRole("input") as HTMLInputElement;
  });

  test("empty string", () => {
    fireEvent.change(input, { target: { value: "1" } });
    expect(input.value).toBe("1");
  });

  test("10", () => {
    fireEvent.change(input, { target: { value: "10" } });
    expect(input.value).toBe("10");
  });

  test("max exceeded", () => {
    fireEvent.change(input, { target: { value: "10" } });
    fireEvent.change(input, { target: { value: `${MAX + 1}` } });
    expect(input.value).toBe("10");
  });
});
