import { COLORS, Flex } from "@mesulive/ui";
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
          transition: `margin-left ${NAVIGATION_TOGGLE_DURATION}ms cubic-bezier(0, 0, 0.2, 1) 0ms`, // Drawer transition strategy

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
      >
        {children}
      </Flex>
    </>
  );
};

export default Layout;
