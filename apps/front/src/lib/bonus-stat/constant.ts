import { AdditionalOptionValues, Method, Option } from "~/lib/bonus-stat/types";
import { PrimaryStat } from "~/lib/maple/types";

export const PAGE_KEY = "calc/bonus-stat";

export const MethodProbTable: Record<Method, AdditionalOptionValues> = {
  POWERFUL: [0.2, 0.3, 0.36, 0.14, 0],
  ETERNAL: [0, 0.29, 0.45, 0.25, 0.01],
  DROP: [0.25, 0.3, 0.3, 0.14, 0.01],
  CRAFT_MASTER: [0.15, 0.3, 0.4, 0.14, 0.01],
  CRAFT_MEISTER: [0, 0.19, 0.5, 0.3, 0.01],
  FUSE_MASTER: [0, 0.4, 0.45, 0.14, 0.01],
  FUSE_MEISTER: [0, 0.3, 0.5, 0.19, 0.01],
};

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
