export const putUnit = (n: number) => {
  if (n === 0) {
    return "0";
  }

  let i;
  const isMinus = n < 0;
  const inputNumber = n < 0 ? -n : n;
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

  for (i = 0; i < resultArray.length; i++) {
    if (resultArray[i] === 0) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }

  return `${isMinus ? "-" : ""}${resultString}`;
};
