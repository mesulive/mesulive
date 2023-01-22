import { keys } from "@mesulive/shared";
import { either, option as O } from "fp-ts";
import { pipe } from "fp-ts/function";
import { values } from "lodash";
import { MethodProbTable } from "~/lib/bonus-stat/constant";
import { BonusStat } from "~/lib/bonus-stat/index";
import {
  AdditionalOptionValues,
  AdditionalOptionValuesMap,
  EquipType,
  isAdditionalOptionValues,
  isAdditionalOptionValuesMap,
  isOptionAvailableAtWeapon,
  Method,
  Option,
} from "~/lib/bonus-stat/types";
import { PrimaryStat } from "~/lib/maple/types";
import { getCombinations, getRepeatPermutations } from "~/lib/math/util";

export const getOptionValues =
  (level: number, condition?: { bossDrop?: boolean }) =>
  (option: Option): AdditionalOptionValues | undefined =>
    pipe(
      O.some({}),
      O.filter(() => level >= 100 && level <= 250),
      O.bind("weight", () => O.some(condition?.bossDrop ? 2 : 0)),
      O.map(({ weight }) =>
        Array.from({ length: 5 })
          .map((_, i) => i + 1)
          .map((i) => {
            if (
              [
                Option.enum["STR"],
                Option.enum["DEX"],
                Option.enum["INT"],
                Option.enum["LUK"],
              ].some((o) => o === option)
            ) {
              return (
                (level < 250 ? Math.floor(level / 20) + 1 : 12) * (i + weight)
              );
            }

            if (
              [
                Option.enum["STR+DEX"],
                Option.enum["STR+INT"],
                Option.enum["STR+LUK"],
                Option.enum["DEX+INT"],
                Option.enum["DEX+LUK"],
                Option.enum["INT+LUK"],
              ].some((o) => o === option)
            ) {
              return (Math.floor(level / 40) + 1) * (i + weight);
            }

            if (
              [
                Option.enum["ALL %"],
                Option.enum["ATTACK"],
                Option.enum["MAGIC_ATTACK"],
                Option.enum["DAMAGE_OR_JUMP"],
              ].some((o) => o === option)
            ) {
              return i + weight;
            }

            if (
              [Option.enum["BOSS_DAMAGE_OR_SPEED"]].some((o) => o === option)
            ) {
              return (i + weight) * 2;
            }

            if ([Option.enum["HP"]].some((o) => o === option)) {
              return (
                (level < 250 ? Math.floor(level / 10) * 10 * 3 : 700) *
                (i + weight)
              );
            }

            return 0;
          })
      ),
      O.filter(isAdditionalOptionValues),
      O.getOrElseW(() => undefined)
    );

interface CommonCondition {
  level?: number;
  equipType: EquipType;
  statEfficiencyMap: Record<PrimaryStat, number | undefined>;
  bossDrop?: boolean;
}

export const getOptionValuesMap = ({
  level: rawLevel,
  equipType,
  statEfficiencyMap,
  bossDrop,
}: CommonCondition): AdditionalOptionValuesMap | undefined =>
  pipe(
    O.Do,
    O.bind("level", () => O.fromNullable(rawLevel)),
    O.map(({ level }) =>
      values(Option.enum).reduce(
        (acc, option) => ({
          ...acc,
          [option]: getOptionValues(level, { bossDrop })(option),
        }),
        {} as AdditionalOptionValuesMap
      )
    ),
    O.filter(isAdditionalOptionValuesMap),
    O.map((map) =>
      keys(map)
        .map((key) => {
          const efficiency = BonusStat.OptionStatMap[key].reduce(
            (acc, stat) => acc + (statEfficiencyMap[stat] ?? 0),
            0
          );

          return [
            key,
            map[key].map((value) =>
              pipe(
                value,
                either.fromPredicate(
                  () => !(equipType === "WEAPON" && key === "ATTACK"),
                  () => value
                ),
                either.filterOrElse(
                  () =>
                    !(equipType !== "WEAPON" && isOptionAvailableAtWeapon(key)),
                  () => 0
                ),
                either.map(() => value * efficiency),
                either.getOrElse((v) => v)
              )
            ),
          ] as const;
        })
        .reduce(
          (acc, [key, value]) => ({ ...acc, [key]: value }),
          {} as AdditionalOptionValuesMap
        )
    ),
    O.filter(isAdditionalOptionValuesMap),
    O.getOrElseW(() => undefined)
  );

export type GetProbPerMethod = (
  param: {
    aimStat?: number;
    weaponGrade?: number;
  } & CommonCondition
) => Record<Method, number | undefined>;
export const getMethodProbMap: GetProbPerMethod = ({
  level,
  equipType,
  statEfficiencyMap,
  bossDrop,
  aimStat: rawAimStat,
  weaponGrade,
}) =>
  pipe(
    O.Do,
    O.bind("aimStat", () =>
      pipe(
        rawAimStat ?? 0,
        O.fromPredicate((v) => v > 0 || equipType === "WEAPON")
      )
    ),
    O.filter(({ aimStat }) => !(equipType !== "WEAPON" && aimStat <= 0)),
    O.filter(
      ({ aimStat }) => !(equipType === "WEAPON" && !weaponGrade && aimStat <= 0)
    ),
    O.bind("optionValuesMap", () =>
      pipe(
        {
          level,
          equipType,
          statEfficiencyMap,
          bossDrop,
        },
        getOptionValuesMap,
        O.fromNullable
      )
    ),
    O.bind("selectCountArray", () => O.some(bossDrop ? [4] : [1, 2, 3, 4])),
    O.bind("methodProbMap", () => O.some(MethodProbTable)),
    O.bind("methodArray", ({ methodProbMap }) => O.some(keys(methodProbMap))),
    O.bind(
      "methodProbArray",
      ({
        optionValuesMap,
        selectCountArray,
        methodProbMap,
        methodArray,
        aimStat,
      }) =>
        pipe(
          selectCountArray.map((count) => {
            const optionsArray = getCombinations(values(Option.enum), count);
            const valueGrades = getRepeatPermutations([0, 1, 2, 3, 4], count);

            // methodProbArray[i]: method[i]에서 성공할 확률
            return pipe(
              optionsArray.map((options) =>
                pipe(
                  valueGrades.filter((grades) =>
                    pipe(
                      O.Do,
                      O.bind("attackOptionIndex", () =>
                        O.some(options.findIndex((o) => o === "ATTACK"))
                      ),
                      O.bind("attackGrade", ({ attackOptionIndex }) =>
                        pipe(
                          attackOptionIndex,
                          O.fromPredicate((i) => i >= 0),
                          O.map((i) => optionValuesMap["ATTACK"][grades[i]]),
                          O.alt(() => O.some(0))
                        )
                      ),
                      O.filter(
                        ({ attackGrade }) =>
                          equipType !== "WEAPON" ||
                          !weaponGrade ||
                          attackGrade >= weaponGrade
                      ),
                      O.map(({ attackOptionIndex, ...rest }) => ({
                        ...rest,
                        attackOptionIndex,
                        ...pipe(
                          { boundedOptions: options, boundedGrades: grades },
                          O.fromPredicate(
                            () =>
                              equipType !== "WEAPON" || attackOptionIndex < 0
                          ),
                          O.getOrElse(() => ({
                            boundedGrades: grades.filter(
                              (_, i) => i !== attackOptionIndex
                            ),
                            boundedOptions: options.filter(
                              (_, i) => i !== attackOptionIndex
                            ),
                          }))
                        ),
                      })),
                      either.fromOption(() => false),
                      either.filterOrElse(
                        ({ boundedOptions }) =>
                          boundedOptions.reduce(
                            (acc, option) => acc + optionValuesMap[option][0],
                            0
                          ) < aimStat,
                        () => true
                      ),
                      either.filterOrElse(
                        ({ boundedOptions, boundedGrades }) =>
                          boundedOptions.reduce(
                            (acc, option, index) =>
                              acc +
                              optionValuesMap[option][boundedGrades[index]],
                            0
                          ) >= aimStat,
                        () => false
                      ),
                      either.match(
                        (v) => v,
                        () => true
                      )
                    )
                  ),
                  (accomplishedValuesGrades) =>
                    methodArray.map((method) =>
                      pipe(accomplishedValuesGrades, (gradesArr) =>
                        gradesArr.length < 5 ** count
                          ? gradesArr
                              .map((grades) =>
                                grades.reduce(
                                  (acc, grade) =>
                                    acc * methodProbMap[method][grade],
                                  1
                                )
                              )
                              .reduce((acc, prob) => acc + prob, 0)
                          : 1
                      )
                    )
                )
              ),
              (methodProbArray) =>
                methodProbArray
                  .filter((probArray) => probArray.some((prob) => prob > 0))
                  .reduce(
                    (acc, cur) => acc.map((v, i) => v + cur[i]),
                    new Array(methodArray.length).fill(0) as number[]
                  )
                  .map((prob) => prob / optionsArray.length)
            );
          }),
          O.some
        )
    ),
    O.map(({ methodProbArray, methodArray }) =>
      methodProbArray
        .reduce(
          (acc, cur) => acc.map((v, i) => v + cur[i]),
          new Array(methodArray.length).fill(0) as number[]
        )
        .map((prob) => prob / methodProbArray.length)
        .reduce(
          (acc, prob, i) => ({ ...acc, [methodArray[i]]: prob }),
          {} as Record<Method, number>
        )
    ),
    O.getOrElseW(() =>
      values(Method.enum).reduce(
        (acc, method) => ({
          ...acc,
          [method]: undefined,
        }),
        {} as Record<Method, undefined>
      )
    )
  );
