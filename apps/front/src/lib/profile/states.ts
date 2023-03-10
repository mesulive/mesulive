import { getRandomPastelColor } from "@mesulive/shared";
import { values } from "lodash";
import { atom, atomFamily, DefaultValue, selectorFamily } from "recoil";
import { PrimaryStat } from "~/lib/maple/types";
import { localStorageEffect } from "~/lib/recoil/effect";

export namespace ProfileState {
  export const currentUsernameAtom = atom<string | undefined>({
    key: "profile/currentUsernameAtom",
    default: "",
  });

  export const profileAtoms = atomFamily<
    Record<PrimaryStat, number | undefined> & { profileColor: string },
    string | undefined
  >({
    key: "profile/profileAtoms",
    default: () => ({
      ...values(PrimaryStat.enum).reduce(
        (acc, stat) => ({
          ...acc,
          [stat]: undefined,
        }),
        {} as Record<PrimaryStat, number>
      ),
      profileColor: getRandomPastelColor(50),
    }),
    effects: (username) => [
      localStorageEffect(`profile/profileAtoms/${username}`),
    ],
  });

  export const statEfficiencySelectors = selectorFamily<
    number | undefined,
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
          [key]: newValue instanceof DefaultValue ? undefined : newValue,
        }));
      },
  });

  export const statValuableSelectors = selectorFamily<boolean, PrimaryStat>({
    key: "profile/statValuableSelector",
    get:
      (stat) =>
      ({ get }) =>
        !!get(profileAtoms(get(currentUsernameAtom)))[stat],
  });
}
