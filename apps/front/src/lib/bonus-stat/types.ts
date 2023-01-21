import { values } from "lodash";
import { z } from "zod";
import { PrimaryStat } from "~/lib/maple/types";

export const EquipType = z.enum(["NON_WEAPON", "WEAPON"]);
export type EquipType = z.infer<typeof EquipType>;

export const isEquipType = (value: unknown): value is EquipType =>
  EquipType.safeParse(value).success;

export const EquipTypeInfoMap: Record<EquipType, { text: string }> = {
  NON_WEAPON: { text: "방어구" },
  WEAPON: { text: "무기" },
};

export const Method = z.enum([
  "POWERFUL",
  "ETERNAL",
  "DROP",
  "CRAFT_MASTER",
  "CRAFT_MEISTER",
  "FUSE_MASTER",
  "FUSE_MEISTER",
]);
export type Method = z.infer<typeof Method>;

export const isMethod = (value: unknown): value is Method =>
  Method.safeParse(value).success;

export const MethodInfoMap: Record<Method, { text: string }> = {
  POWERFUL: { text: "강력한 환생의 불꽃" },
  ETERNAL: { text: "영원한 환생의 불꽃" },
  DROP: { text: "몬스터 드랍" },
  CRAFT_MASTER: { text: "장인 제작" },
  CRAFT_MEISTER: { text: "명장 제작" },
  FUSE_MASTER: { text: "장인 합성" },
  FUSE_MEISTER: { text: "명장 합성" },
};

export const AdditionalOptionValues = z.tuple([
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
]);

export type AdditionalOptionValues = z.infer<typeof AdditionalOptionValues>;

export const isAdditionalOptionValues = (
  target: unknown
): target is AdditionalOptionValues =>
  AdditionalOptionValues.safeParse(target).success;

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
export const AdditionalOptionValuesMap = z.map(Option, AdditionalOptionValues);

export type AdditionalOptionValuesMap = z.infer<
  typeof AdditionalOptionValuesMap
>;
