import { pxArray } from "@mesulive/shared";
import { COLORS, ScreenType, Sx } from "@mesulive/ui";
import {
  Box,
  Drawer,
  DrawerProps,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { forwardRef, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Cube from "~/assets/cube.svg";
import Flame from "~/assets/flame.svg";
import Star from "~/assets/star.svg";
import { HEADER_HEIGHT } from "~/components/common/header/constant";
import {
  NAVIGATION_TOGGLE_DURATION,
  NAVIGATION_WIDTH,
} from "~/components/common/navigation/constant";
import { HoverBox } from "~/components/common/navigation/HoverBox";
import { NavLink } from "~/components/common/navigation/NavLink";
import { useRefCallback } from "~/lib/hooks/ref";
import { useScreenType } from "~/lib/hooks/window";
import { navigationStates } from "~/lib/navigation/store";

const GroupTypography = styled(Typography)({
  fontSize: 14,
  fontWeight: "bold",
});

interface NavigationDrawerProps extends Sx {
  variant: DrawerProps["variant"];
  open?: DrawerProps["open"];
}

const NavigationDrawer = forwardRef<HTMLDivElement, NavigationDrawerProps>(
  ({ sx: sxProp, variant, open }, ref) => {
    const theme = useTheme();
    const setOpen = useSetRecoilState(navigationStates.openAtom);

    return (
      <Drawer
        ref={ref}
        open={open}
        variant={variant}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            p: pxArray(32, 16),
            zIndex: 20,
            borderRightColor: COLORS.GRAY_7,
            width: NAVIGATION_WIDTH,

            [theme.breakpoints.up("tablet")]: {
              height: `calc(100% - ${HEADER_HEIGHT}px)`,
              top: HEADER_HEIGHT,
            },
          },
        }}
        transitionDuration={NAVIGATION_TOGGLE_DURATION}
        sx={sxProp}
      >
        <Box component="nav">
          <GroupTypography>기댓값 계산기</GroupTypography>
          <NavLink
            href="/calc/bonus-stat"
            icon={Flame}
            sx={{ mt: 16 }}
            label="NEW"
          >
            추가옵션
          </NavLink>
          <NavLink
            href="/calc/cube"
            externalLink="https://cubemesu.co"
            label="큐브매수통"
            icon={Cube}
            sx={{ mt: 16 }}
          >
            큐브
          </NavLink>
          <GroupTypography sx={{ mt: 32 }}>시뮬레이터</GroupTypography>
          <NavLink
            href="/sim/starforce"
            externalLink="https://mesu.live/sim/starforce"
            icon={Star}
            sx={{ mt: 16 }}
            label="구버전"
            target="_self"
          >
            스타포스
          </NavLink>
          {/*<NavLink href="/sim/cube" disabled icon={Cube} sx={{ mt: 16 }}>*/}
          {/*  큐브*/}
          {/*</NavLink>*/}
          <HoverBox />
        </Box>
      </Drawer>
    );
  }
);

export const Navigation = () => {
  const screenType = useScreenType();
  const [firstDrawerRef, setFirstDrawerRef] = useRefCallback<HTMLDivElement>();

  const open = useRecoilValue(navigationStates.openAtom);

  useEffect(() => {
    setTimeout(() => {
      firstDrawerRef.current?.remove();
    }, NAVIGATION_TOGGLE_DURATION);
  }, [firstDrawerRef]);

  return (
    <>
      <NavigationDrawer
        ref={setFirstDrawerRef}
        open
        variant="permanent"
        sx={(theme) => ({
          [theme.breakpoints.down("desktop")]: {
            display: "none",
          },
        })}
      />
      {screenType >= ScreenType.tablet && (
        <NavigationDrawer
          variant="persistent"
          open={screenType >= ScreenType.desktop || open}
        />
      )}
      {screenType < ScreenType.tablet && (
        <NavigationDrawer variant="temporary" open={open} />
      )}
    </>
  );
};
