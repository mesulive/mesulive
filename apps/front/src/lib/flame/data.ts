import { values } from "lodash";
import { z } from "zod";
import { Method } from "~/lib/flame/types";
import { PrimaryStat } from "~/lib/maple/types";

export const MethodProbTable: Record<
  Method,
  [number, number, number, number, number]
> = {
  POWERFUL: [0.2, 0.3, 0.36, 0.14, 0],
  ETERNAL: [0, 0.29, 0.45, 0.25, 0.01],
  DROP: [0.25, 0.3, 0.3, 0.14, 0.01],
  CRAFT_MASTER: [0.15, 0.3, 0.4, 0.14, 0.01],
  CRAFT_MEISTER: [0, 0.19, 0.5, 0.3, 0.01],
  FUSE_MASTER: [0, 0.4, 0.45, 0.14, 0.01],
  FUSE_MEISTER: [0, 0.3, 0.5, 0.19, 0.01],
};

export const OptionAvailableAtWeapon = z.enum([
  "BOSS_DAMAGE_OR_SPEED",
  "DAMAGE_OR_JUMP",
]);

export type OptionAvailableAtWeapon = z.infer<typeof OptionAvailableAtWeapon>;

export const Option = z.enum([
  "STR",
  "DEX",
  "INT",
  "LUK",
  "STR+DEX",
  "STR+INT",
  "STR+LUK",
  "DEX+INT",
  "DEX+LUK",
  "INT+LUK",
  "HP",
  "MP",
  "LEVEL",
  "DEFENSE",
  "ATTACK",
  "MAGIC_ATTACK",
  "ALL %",
  ...values(OptionAvailableAtWeapon.enum),
]);

export type Option = z.infer<typeof Option>;

export const OptionStatMap: Record<Option, PrimaryStat[]> = {
  STR: ["STR"],
  DEX: ["DEX"],
  INT: ["INT"],
  LUK: ["LUK"],
  "STR+DEX": ["STR", "DEX"],
  "STR+INT": ["STR", "INT"],
  "STR+LUK": ["STR", "LUK"],
  "DEX+INT": ["DEX", "INT"],
  "DEX+LUK": ["DEX", "LUK"],
  "INT+LUK": ["INT", "LUK"],
  HP: ["HP"],
  MP: [],
  LEVEL: [],
  DEFENSE: [],
  ATTACK: ["ATTACK"],
  MAGIC_ATTACK: ["MAGIC_ATTACK"],
  BOSS_DAMAGE_OR_SPEED: ["BOSS_DAMAGE"],
  DAMAGE_OR_JUMP: ["DAMAGE"],
  "ALL %": ["ALL %"],
};

export const getOptionValue = (level: number) => (option: Option) => {
  if (level < 100 || level > 250) return undefined;

  if (level < 250) {
    const flattenLevel = Math.floor(level / 10) * 10;

    if (["STR", "DEX", "INT", "LUK", "DEFENSE"].includes(option)) {
      return flattenLevel % 20;
    }
  }
};
