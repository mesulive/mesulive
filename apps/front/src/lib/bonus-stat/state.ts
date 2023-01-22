import { pipe } from "fp-ts/function";
import { values } from "lodash";
import { atom, selector } from "recoil";
import { BonusStat } from "~/lib/bonus-stat/index";
import { PrimaryStat } from "~/lib/maple/types";
import { ProfileState } from "~/lib/profile/states";

export namespace BonusStatState {
  export const equipTypeAtom = atom<BonusStat.EquipType>({
    key: "bonus-stat/equipTypeAtom",
    default: "NON_WEAPON",
  });

  export const equipLevelAtom = atom<number | undefined>({
    key: "bonus-stat/equipLevelAtom",
    default: undefined,
  });

  export const equipLevelErrorSelector = selector<string>({
    key: "bonus-stat/equipLevelInvalidSelector",
    get: ({ get }) => {
      const equipLevel = get(equipLevelAtom);

      if (!equipLevel) return "";
      if (equipLevel < 100 || equipLevel > 250)
        return "100 이상 250 이하의 수치를 입력해주세요.";

      return "";
    },
  });

  export const bossDropAtom = atom<boolean>({
    key: "bonus-stat/bossDrop",
    default: false,
  });

  export const aimStatAtom = atom<number | undefined>({
    key: "bonus-stat/aimStatAtom",
    default: undefined,
  });

  export const aimStatHelperTextSelector = selector<string>({
    key: "bonus-stat/aimStatHelperTextAtom",
    get: ({ get }) => {
      if (get(equipTypeAtom) === "WEAPON") {
        return "무기 추옵에 대한 환산 스탯은 제외됩니다.";
      }

      return "";
    },
  });

  export const aimStatErrorSelector = selector<string>({
    key: "bonus-stat/aimStatInvalidSelector",
    get: ({ get }) => {
      const aimStat = get(aimStatAtom);

      if (!aimStat) return "";
      if (aimStat < 1) return "1 이상의 수치를 입력해주세요.";

      return "";
    },
  });

  export const weaponGradeAtom = atom<number>({
    key: "bonus-stat/weaponGradeAtom",
    default: 0,
  });

  // TODO 임시 state. ProfileButton 표시하게 되면 삭제
  export const statEfficiencyUnfilledSelector = selector<boolean>({
    key: "bonus-stat/statEfficiencyUnfilledSelector",
    get: ({ get }) =>
      pipe(get(ProfileState.profileAtoms("")), (v) =>
        values(PrimaryStat.enum).every((stat) => v[stat] === undefined)
      ),
  });

  export const inputsSelector = selector({
    key: "bonus-stat/inputsSelector",
    get: ({ get }) => ({
      level: get(equipLevelAtom),
      equipType: get(equipTypeAtom),
      bossDrop: get(bossDropAtom),
      statEfficiencyMap: get(ProfileState.profileAtoms("")),
      aimStat: get(aimStatAtom),
      weaponGrade: get(weaponGradeAtom),
    }),
  });
}
