import {
  EmotionJSX,
  WithConditionalCSSProp,
} from "@emotion/react/types/jsx-namespace";
import { SVGProps as ReactSVGProps } from "react";

export const of =
  <T>() =>
  (p: T) =>
    p;

export type WithEmotionProps<P> = EmotionJSX.IntrinsicAttributes &
  WithConditionalCSSProp<P> &
  P;

export type SVGProps = WithEmotionProps<ReactSVGProps<SVGSVGElement>>;

export type SetterOrUpdater<T> = (
  valOrUpdater: ((currVal: T) => T) | T
) => void;
