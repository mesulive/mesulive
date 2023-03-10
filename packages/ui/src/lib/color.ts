import { color } from "@mesulive/shared";

export const COLORS = {
  BLACK: color("#241F1C"),
  GRAY_1: color("#3B3B3B"),
  GRAY_2: color("#505050"),
  GRAY_3: color("#757575"),
  GRAY_4: color("#9B9B9B"),
  GRAY_5: color("#C5C5C5"),
  GRAY_6: color("#E0E0E0"),
  GRAY_7: color("#F0F0F0"),
  BACKGROUND: color("#F8FAFB"),

  MAIN_DARK: color("#CC6708"),
  MAIN: color("#FF8009"),
  MAIN_LIGHT: color("#FFA857"),
  MAIN_LIGHTER: color("#FFECDC"),

  SECONDARY_DARK: color("#D99C02"),
  SECONDARY: color("#FFB703"),
  SECONDARY_LIGHT: color("#FFCD4F"),
  SECONDARY_LIGHTER: color("#FFE39C"),

  ERROR: color("#EF5350"),
} as const;
