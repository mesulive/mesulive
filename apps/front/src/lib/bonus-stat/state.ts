import { values } from "lodash";
import { atom, atomFamily, selector, selectorFamily } from "recoil";
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
    default: true,
  });

  export const aimStatAtom = atom<number | undefined>({
    key: "bonus-stat/aimStatAtom",
    default: undefined,
  });

  export const aimStatHelperTextSelector = selector<string>({
    key: "bonus-stat/aimStatHelperTextAtom",
    get: ({ get }) => {
      if (get(equipTypeAtom) === "WEAPON") {
        return "무기 공격력/마력 추옵에 대한 환산 스탯은 제외됩니다.";
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

  export const actualStatFigureAtoms = atomFamily<
    number | undefined,
    PrimaryStat
  >({
    key: "bonus-stat/actualStatFigureAtoms",
    default: undefined,
  });

  export const calculatedStatFigureSelector = selector<number>({
    key: "bonus-stat/calculatedStatFigureSelector",
    get: ({ get }) => {
      const profile = get(
        ProfileState.profileAtoms(get(ProfileState.currentUsernameAtom))
      );

      return values(PrimaryStat.enum).reduce(
        (acc, stat) =>
          acc + (get(actualStatFigureAtoms(stat)) ?? 0) * (profile[stat] ?? 0),
        0
      );
    },
  });

  export const inputsSelector = selector<
    Parameters<BonusStat.GetProbPerMethod>[0]
  >({
    key: "bonus-stat/inputsSelector",
    get: ({ get }) => ({
      level: get(equipLevelAtom),
      equipType: get(equipTypeAtom),
      bossDrop: get(bossDropAtom),
      // TODO ProfileButton 표시하게 되면 제대로 된 username 사용
      statEfficiencyMap: get(ProfileState.profileAtoms("")),
      aimStat: get(aimStatAtom),
      weaponGrade: get(weaponGradeAtom),
    }),
  });

  export const calcResultAtom = atom<
    Record<BonusStat.Method, number | undefined>
  >({
    key: "bonus-stat/calcResultAtom",
    default: values(BonusStat.Method.enum).reduce(
      (acc, method) => ({ ...acc, [method]: undefined }),
      {} as Record<BonusStat.Method, number | undefined>
    ),
  });

  export const calcResultSelector = selectorFamily<
    number | undefined,
    BonusStat.Method
  >({
    key: "bonus-stat/calcResultSelector",
    get:
      (method) =>
      ({ get }) =>
        get(calcResultAtom)[method],
  });
}
