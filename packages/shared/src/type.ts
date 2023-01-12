import {
  EmotionJSX,
  WithConditionalCSSProp,
} from "@emotion/react/types/jsx-namespace";

export const of = <T>(p: T) => p;

export type WithEmotionProps<P> = EmotionJSX.IntrinsicAttributes &
  WithConditionalCSSProp<P> &
  P;

export type SetterOrUpdater<T> = (
  valOrUpdater: ((currVal: T) => T) | T
) => void;
