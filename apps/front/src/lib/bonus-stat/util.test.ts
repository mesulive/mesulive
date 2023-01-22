import { option } from "fp-ts";
import { pipe } from "fp-ts/function";
import { values } from "lodash";
import {
  getMethodProbMap,
  getOptionValues,
  getOptionValuesMap,
} from "~/lib/bonus-stat/util";
import { PrimaryStat } from "~/lib/maple/types";

const statEfficiencyMap = {
  ...values(PrimaryStat.enum).reduce(
    (acc, stat) => ({
      ...acc,
      [stat]: 0,
    }),
    {} as Record<PrimaryStat, number>
  ),
  STR: 1,
  "ALL %": 10,
  ATTACK: 4,
};

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
    expect(
      pipe(
        getOptionValuesMap({
          level: 150,
          statEfficiencyMap,
          equipType: "WEAPON",
          bossDrop: true,
        })
        // rent.io(log)
      )
    ).toBeTruthy();
  });

  test("방어구일 때 보공, 뎀지는 0", () => {
    expect(
      pipe(
        getOptionValuesMap({
          level: 150,
          equipType: "NON_WEAPON",
          statEfficiencyMap,
        }),
        option.fromNullable,
        option.map((map) => [map.BOSS_DAMAGE_OR_SPEED, map.DAMAGE_OR_JUMP]),
        option.filter((arr) =>
          arr.every((tuple) => tuple.every((value) => value === 0))
        ),
        option.match(
          () => false,
          () => true
        )
      )
    ).toBeTruthy();
  });
});

describe("getProbPerMethodArray", () => {
  test("일반 input", () => {
    expect(
      pipe(
        getMethodProbMap({
          level: 200,
          statEfficiencyMap,
          equipType: "NON_WEAPON",
          bossDrop: true,
          aimStat: 1,
        })
      )
    ).toBeTruthy();
  });

  test("무기일 때 목표가 정해지지 않았으면 undefined", () => {
    expect(
      pipe(
        getMethodProbMap({
          level: 200,
          statEfficiencyMap,
          equipType: "WEAPON",
          bossDrop: true,
          aimStat: 0,
          weaponGrade: 0,
        }),
        values,
        (arr) => arr.every((item) => item === undefined)
      )
    ).toBe(true);
  });

  test("무기일 때, 강환불에서 7등급 공격력은 나올 수 없음", () => {
    expect(
      pipe(
        getMethodProbMap({
          level: 200,
          statEfficiencyMap,
          equipType: "WEAPON",
          bossDrop: true,
          aimStat: 0,
          weaponGrade: 7,
        }),
        values,
        option.some,
        option.filter((arr) => arr[0] === 0),
        option.filter((arr) => arr[1] !== 0),
        option.match(
          () => false,
          () => true
        )
      )
    ).toBe(true);
  });

  test("무기는 공추옵만 정해도 계산 가능", () => {
    expect(
      pipe(
        getMethodProbMap({
          level: 200,
          statEfficiencyMap,
          equipType: "WEAPON",
          bossDrop: true,
          aimStat: 0,
          weaponGrade: 6,
        }),
        values,
        option.some,
        option.filter((arr) => !arr.every((item) => item === undefined)),
        option.match(
          () => false,
          () => true
        )
      )
    ).toBe(true);
  });

  test("무기일 때 환산스탯이 제대로 계산돼야 됨", () => {
    expect(
      pipe(
        option.Do,
        option.bind("first", () =>
          pipe(
            getMethodProbMap({
              level: 200,
              statEfficiencyMap,
              equipType: "WEAPON",
              bossDrop: true,
              aimStat: 0,
              weaponGrade: 6,
            }),
            values,
            option.some
          )
        ),
        option.bind("second", () =>
          pipe(
            getMethodProbMap({
              level: 200,
              statEfficiencyMap,
              equipType: "WEAPON",
              bossDrop: true,
              aimStat: 10,
              weaponGrade: 6,
            }),
            values,
            option.some
          )
        ),
        option.filter(({ first, second }) => first[0] !== second[0]),
        option.match(
          () => false,
          () => true
        )
      )
    ).toBeTruthy();
  });
});
