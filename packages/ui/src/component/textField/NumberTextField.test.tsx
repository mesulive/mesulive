import { fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import { NumberTextField } from "./NumberTextField";

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
      maxFractionDigits={2}
    />
  );
};

describe("NumberTextField", () => {
  let input: HTMLInputElement;
  let unmount: () => void = () => {
    // do nothing
  };

  beforeEach(() => {
    const { getByRole, unmount: unmountComponent } = render(
      <NumberTextFieldContainer />
    );
    input = getByRole("input") as HTMLInputElement;
    unmount = unmountComponent;
  });

  afterEach(() => {
    unmount();
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

  test("소수점", () => {
    fireEvent.change(input, { target: { value: "10." } });
    expect(input.value).toBe("10.");

    fireEvent.change(input, { target: { value: "10.12" } });
    expect(input.value).toBe("10.12");

    fireEvent.change(input, { target: { value: "10.122" } });
    expect(input.value).toBe("10.12");

    fireEvent.change(input, { target: { value: "10.0" } });
    expect(input.value).toBe("10.0");
  });
});
