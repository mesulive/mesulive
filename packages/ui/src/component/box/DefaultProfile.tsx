import { mergeStyles, Sx } from "../../lib";
import { Person } from "@mui/icons-material";
import Color from "color";

export interface DefaultProfileProps extends Sx {
  color: string;
}

export const DefaultProfile = ({ color, sx: sxProp }: DefaultProfileProps) => (
  <Person
    sx={mergeStyles(
      {
        width: 32,
        height: 32,
        backgroundColor: Color(color).lighten(0.2).toString(),
        color,
      },
      sxProp
    )}
  />
);
