import { styled, Typography } from "@mui/material";
import { COLORS } from "~ui/lib/color";

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  color: COLORS.GRAY_1,
  fontWeight: 700,
  fontSize: 14,

  [theme.breakpoints.up("laptop")]: {
    fontSize: 16,
  },
}));
