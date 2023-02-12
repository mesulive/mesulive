import { pxArray } from "@mesulive/shared";
import { COLORS, Flex } from "@mesulive/ui";
import { MenuRounded } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import Link from "next/link";
import Logo from "~/assets/logo.svg";
import { useNavigation } from "~/lib/navigation/store";

export const Header = () => {
  const theme = useTheme();

  const { toggleNavigation } = useNavigation();

  return (
    <Flex
      direction="row"
      component="header"
      align="center"
      justify="space-between"
      sx={{
        p: 16,
        height: 24,
        borderBottom: `solid 1px ${COLORS.GRAY_7}`,
        boxSizing: "content-box",
        backgroundColor: "white",
        position: "fixed",
        inset: 0,
        zIndex: 50,

        [theme.breakpoints.up("tablet")]: {
          height: 32,
        },

        [theme.breakpoints.up("desktop")]: {
          p: pxArray(16, 32),
        },
      }}
    >
      <Flex direction="row" align="center">
        <IconButton
          sx={{
            color: COLORS.MAIN,
            mr: 8,
            p: 4,

            [theme.breakpoints.up("desktop")]: {
              display: "none",
            },
          }}
          onClick={toggleNavigation}
        >
          <MenuRounded />
        </IconButton>
        <Link
          href="/"
          css={{
            height: 24,
            [theme.breakpoints.up("tablet")]: {
              height: 32,
            },
          }}
        >
          <Logo
            css={{
              height: "inherit",
            }}
          />
        </Link>
      </Flex>
      {/* TODO 프로필 버튼 추가*/}
      {/*<ProfileButton />*/}
    </Flex>
  );
};
