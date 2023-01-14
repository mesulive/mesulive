import { openAtom } from "~/lib/navigation/store/states";
import { useRecoilCallback } from "~/lib/recoil/hook";

export const useNavigation = () => {
  const toggleNavigation = useRecoilCallback(
    ({ set }) =>
      () =>
        set(openAtom, (currVal) => !currVal),
    []
  );

  return {
    toggleNavigation,
  };
};
