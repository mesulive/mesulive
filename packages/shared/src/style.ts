import { Properties, Property } from "csstype";
import { of } from "~shared/type";

export const cssObject = of<Properties>;

export const color = of<Property.Color>;

export const pxArray = (...arr: number[]): Property.Padding =>
  arr
    .slice(0, 4)
    .map((px) => `${px}px`)
    .join(" ");
