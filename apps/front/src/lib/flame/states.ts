import { values } from "@mesulive/shared";
import { pipe } from "fp-ts/function";
import { atom, selector } from "recoil";
import { Flame } from "~/lib/flame/index";
import { PrimaryStat } from "~/lib/maple/types";
import { ProfileState } from "~/lib/profile/states";

export namespace FlameState {
  export const equipTypeAtom = atom<Flame.EquipType>({
    key: "flame/equipTypeAtom",
    default: "NON_WEAPON",
  });

  export const equipLevelAtom = atom<number | undefined>({
    key: "flame/equipLevelAtom",
    default: undefined,
  });

  export const equipLevelErrorSelector = selector<string>({
    key: "flame/equipLevelInvalidSelector",
    get: ({ get }) => {
      const equipLevel = get(equipLevelAtom);

      if (!equipLevel) return "";
      if (equipLevel < 100 || equipLevel > 250)
        return "100 이상 250 이하의 수치를 입력해주세요.";

      return "";
    },
  });

  export const bossDropAtom = atom<boolean>({
    key: "flame/bossDrop",
    default: false,
  });

  export const aimStatAtom = atom<number | undefined>({
    key: "flame/aimStatAtom",
    default: undefined,
  });

  export const aimStatHelperTextSelector = selector<string>({
    key: "flame/aimStatHelperTextAtom",
    get: ({ get }) => {
      if (get(equipTypeAtom) === "WEAPON" && get(weaponGradeAtom) > 0) {
        return "무기 추옵에 대한 환산 스탯은 제외됩니다.";
      }

      return "";
    },
  });

  export const aimStatErrorSelector = selector<string>({
    key: "flame/aimStatInvalidSelector",
    get: ({ get }) => {
      const aimStat = get(aimStatAtom);

      if (!aimStat) return "";
      if (aimStat < 1) return "1 이상의 수치를 입력해주세요.";

      return "";
    },
  });

  export const weaponGradeAtom = atom<number>({
    key: "flame/weaponGradeAtom",
    default: 0,
  });

  // TODO 임시 state. ProfileButton 표시하게 되면 삭제
  export const statEfficiencyUnfilledSelector = selector<boolean>({
    key: "flame/statEfficiencyUnfilledSelector",
    get: ({ get }) =>
      pipe(get(ProfileState.profileAtoms("")), (v) =>
        values(PrimaryStat.enum).every((stat) => v[stat] === undefined)
      ),
  });
}
