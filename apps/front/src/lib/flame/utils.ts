import { option as O } from "fp-ts";
import { pipe } from "fp-ts/function";
import { values } from "lodash";
import { z } from "zod";
import {
  AdditionalOptionValues,
  isAdditionalOptionValues,
  Option,
} from "~/lib/flame/types";

export const getOptionValues =
  (level: number, condition?: { bossDrop?: boolean }) =>
  (option: Option): AdditionalOptionValues =>
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

            return [0, 0, 0, 0, 0];
          })
      ),
      O.filter(isAdditionalOptionValues),
      O.getOrElse(() => [0, 0, 0, 0, 0])
    );

export const AdditionalOptionValuesMap = z.map(Option, AdditionalOptionValues);

export type AdditionalOptionValuesMap = z.infer<
  typeof AdditionalOptionValuesMap
>;

export const getOptionValuesMap = (
  level: number,
  condition?: { bossDrop?: boolean }
): AdditionalOptionValuesMap | undefined =>
  pipe(
    values(Option.enum).reduce(
      (acc, option) => ({
        ...acc,
        [option]: getOptionValues(level, condition)(option),
      }),
      {}
    ),
    Object.entries,
    (entries) => new Map(entries),
    O.fromPredicate((map) => AdditionalOptionValuesMap.safeParse(map).success),
    O.map(AdditionalOptionValuesMap.parse),
    O.getOrElseW(() => undefined)
  );
