import { getRandomPastelColor, values } from "@mesulive/shared";
import { atom, atomFamily, DefaultValue, selectorFamily } from "recoil";
import { PrimaryStat } from "~/lib/maple/types";

export namespace ProfileState {
  export const currentUsernameAtom = atom<string | undefined>({
    key: "profile/currentUsernameAtom",
    default: undefined,
  });

  export const profileAtoms = atomFamily<
    Record<PrimaryStat, number> & { profileColor: string },
    string | undefined
  >({
    key: "profile/profileAtoms",
    default: () => ({
      ...values(PrimaryStat.enum).reduce(
        (acc, stat) => ({
          ...acc,
          [stat]: 0,
        }),
        {} as Record<PrimaryStat, number>
      ),
      profileColor: getRandomPastelColor(50),
    }),
  });

  export const statEfficiencySelectors = selectorFamily<
    number,
    { username: string; key: PrimaryStat }
  >({
    key: "profile/statEfficiencySelector",
    get:
      ({ username, key }) =>
      ({ get }) =>
        get(profileAtoms(username))[key],
    set:
      ({ username, key }) =>
      ({ set }, newValue) => {
        set(profileAtoms(username), (currVal) => ({
          ...currVal,
          [key]: newValue instanceof DefaultValue ? 0 : newValue,
        }));
      },
  });
}
