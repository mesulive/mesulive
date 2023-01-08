import { Properties, Property } from "csstype";
import { of } from "./type";
import Color from "color";

export const cssObject = of<Properties>;

export const color = of<Property.Color>;

export const pxArray = (...arr: number[]): Property.Padding =>
  arr
    .slice(0, 4)
    .map((px) => `${px}px`)
    .join(" ");

export const PASTEL_SATURATION = 75;
export const PASTEL_LIGHTNESS = 80;

export const getRandomPastelColor = (range?: number) =>
  Color.hsl([Math.ceil(Math.random() * (range ?? 360)), 75, 80]).toString();
