import { pxArray } from "@mesulive/shared";
import { COLORS, Flex } from "@mesulive/ui";
import { Button, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";
import { Header } from "~/components/common/header";
import { HEADER_HEIGHT } from "~/components/common/header/constant";
import { LAYOUT_PADDING } from "~/components/common/layout/constant";
import { Navigation } from "~/components/common/navigation";
import {
  NAVIGATION_TOGGLE_DURATION,
  NAVIGATION_WIDTH,
} from "~/components/common/navigation/constant";
import { navigationStates } from "~/lib/navigation/store";

const Layout = ({ children }: PropsWithChildren) => {
  const navigationOpen = useRecoilValue(navigationStates.openAtom);

  return (
    <>
      <Header />
      <Navigation />
      <Flex
        sx={(theme) => ({
          backgroundColor: COLORS.BACKGROUND,
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          p: LAYOUT_PADDING,
          mt: HEADER_HEIGHT,
          transition: `margin-left ${NAVIGATION_TOGGLE_DURATION}ms cubic-bezier(${
            navigationOpen ? "0, 0, 0.2, 1" : "0.4, 0, 0.6, 1"
          }) 0ms`, // Drawer transition strategy

          [theme.breakpoints.up("desktop")]: {
            ml: NAVIGATION_WIDTH,
          },

          [theme.breakpoints.between("tablet", "desktop")]: {
            ...(navigationOpen && {
              ml: NAVIGATION_WIDTH,
            }),
          },
        })}
        align="center"
        gap={60}
      >
        {children}
        <Flex component="footer" align="center">
          <a
            href="https://toss.me/vetan2"
            style={{ marginBottom: "12px" }}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              sx={{
                minWidth: 200,
                fontFamily: "Jua",
                fontSize: 18,
                fontWeight: 500,
                padding: pxArray(12, 16, 8),
              }}
              variant="contained"
            >
              제작자에게 커피 사주기
            </Button>
          </a>
          <Typography
            sx={{
              color: COLORS.GRAY_4,
              fontSize: 14,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Copyright 2022~ mesulive All rights reserved.
            <br />
            mesulive is not associated with NEXON Korea.
            <br />
            Contact: help@mesu.live
          </Typography>
        </Flex>
      </Flex>
    </>
  );
};

export default Layout;
