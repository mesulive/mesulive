import { pxArray } from "@mesulive/shared";
import { COLORS, Flex } from "@mesulive/ui";
import { MenuRounded } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import Link from "next/link";
import Logo from "~/assets/images/logo.svg";
import { useNavigation } from "~/lib/navigation/store";

export const Header = () => {
  const theme = useTheme();

  const { toggleNavigation } = useNavigation();

  return (
    <Flex
      direction="row"
      component="header"
      align="center"
      sx={{
        p: 16,
        height: 32,
        borderBottom: `solid 1px ${COLORS.GRAY_7}`,
        boxSizing: "content-box",
        backgroundColor: "white",
        position: "fixed",
        inset: 0,
        zIndex: 50,

        [theme.breakpoints.up("desktop")]: {
          p: pxArray(16, 32),
        },
      }}
    >
      <IconButton
        sx={{
          color: COLORS.MAIN,
          mr: 8,

          [theme.breakpoints.up("desktop")]: {
            display: "none",
          },
        }}
        onClick={toggleNavigation}
      >
        <MenuRounded />
      </IconButton>
      <Link href="/" css={{ height: 32 }}>
        <Logo css={{ height: 32 }} />
      </Link>
    </Flex>
  );
};
