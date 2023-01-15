import { AtomEffect } from "recoil";

export const localStorageEffect: <T>(
  localStorageKey: string
) => AtomEffect<T> =
  (localStorageKey) =>
  ({ setSelf, onSet }) => {
    if (typeof window !== undefined) {
      const savedValue = localStorage.getItem(localStorageKey);

      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        if (isReset) {
          localStorage.removeItem(localStorageKey);
        }

        localStorage.setItem(localStorageKey, JSON.stringify(newValue));
      });
    }
  };
