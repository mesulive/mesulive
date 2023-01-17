import { option } from "fp-ts";
import { pipe } from "fp-ts/function";

export const putUnit = (n: number) => {
  if (n === 0) {
    return "0";
  }

  let i;
  const isMinus = n < 0;
  const inputNumber = n < 0 ? -n : n;
  const unsafe = n > Number.MAX_SAFE_INTEGER;
  const unitWords = ["", "만 ", "억 ", "조 ", "경 ", "해 ", "자 "];
  const splitUnit = 10000;
  const splitCount = unitWords.length;
  const resultArray = [];
  let resultString = "";

  for (i = 0; i < splitCount; i++) {
    let unitResult = (inputNumber % splitUnit ** (i + 1)) / splitUnit ** i;
    unitResult = Math.floor(unitResult);
    resultArray[i] = unitResult;
  }

  let largestUnitIndex = 0;
  for (i = resultArray.length - 1; i >= 0; i--) {
    if (resultArray[i] === 0 || (unsafe && i <= largestUnitIndex - 2)) continue;
    if (!largestUnitIndex) {
      largestUnitIndex = i;
    }
    resultString += String(resultArray[i]) + unitWords[i];
  }

  if (resultString.slice(-1)[0] === " ") {
    resultString = resultString.slice(0, -1);
  }

  return `${unsafe ? "약 " : ""}${isMinus ? "-" : ""}${resultString}`;
};

export const floorNullableNumber = (num: number | undefined) =>
  pipe(num, option.fromNullable, option.map(Math.floor), option.toUndefined);
