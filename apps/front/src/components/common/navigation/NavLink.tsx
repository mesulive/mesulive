import { pxArray } from "@mesulive/shared";
import { COLORS, Flex, mergeStyles, ScreenType, sx, Sx } from "@mesulive/ui";
import { Box, Typography } from "@mui/material";
import { LinkProps } from "next/dist/client/link";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ComponentProps,
  FC,
  ReactNode,
  SVGProps,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSetRecoilState } from "recoil";
import {
  NAVIGATION_LINK_HOVER_BOX_ANIMATION_DURATION,
  NAVIGATION_LINK_HOVER_BOX_CLASSNAME,
  NAVIGATION_LINK_INFO_BOX_CLASSNAME,
  NAVIGATION_LINK_SELECTED_CLASSNAME,
  NavigationUtil,
} from "~/components/common/navigation/constant";
import { useRefCallback } from "~/lib/hooks/ref";
import { useScreenType } from "~/lib/hooks/window";
import { navigationStates } from "~/lib/navigation/store";

interface Props extends Sx, Pick<LinkProps, "href"> {
  children?: ReactNode;
  disabled?: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
  externalLink?: string;
  label?: string;
  target?: ComponentProps<"a">["target"];
}

export const NavLink = ({
  sx: sxProp,
  href,
  children,
  disabled,
  icon: Icon,
  externalLink,
  label,
  target = "_blank",
}: Props) => {
  const { pathname, route } = useRouter();
  const screenType = useScreenType();

  const [ref, setRef] = useRefCallback<HTMLAnchorElement>();
  const [top, setTop] = useState<number | undefined>(undefined);
  const setHoverBoxTop = useSetRecoilState(navigationStates.hoverBoxTopAtom);
  const setHoverBoxMoveAnimated = useSetRecoilState(
    navigationStates.hoverBoxMoveAnimatedAtom
  );
  const setNavigationOpen = useSetRecoilState(navigationStates.openAtom);

  useEffect(() => {
    const offsetTop = ref.current?.offsetTop ?? 0;
    setTop(offsetTop);
    if (pathname === href) {
      setHoverBoxTop(offsetTop);
    }
  }, [href, pathname, ref, setHoverBoxTop, top]);

  const UI = useCallback(
    () => (
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        sx={mergeStyles(
          {
            boxSizing: "border-box",
            width: 232,
            height: 40,
            p: pxArray(10, 16),
            color: COLORS.GRAY_2,
            fill: COLORS.GRAY_2,
            [`.${NAVIGATION_LINK_INFO_BOX_CLASSNAME}`]: {
              backgroundColor: COLORS.GRAY_2,
              transitionDuration: "0.3s",
              transitionTimingFunction: "ease-in-out",
              transitionProperty: "background-color",
            },
            transitionDuration: "0.3s",
            transitionTimingFunction: "ease-in-out",
            transitionProperty: "color, fill",

            ...(pathname === href && {
              color: COLORS.MAIN,
              fill: COLORS.MAIN,
              [`.${NAVIGATION_LINK_INFO_BOX_CLASSNAME}`]: {
                backgroundColor: COLORS.MAIN,
              },
            }),

            ...(disabled && {
              color: COLORS.GRAY_5,
              fill: COLORS.GRAY_5,
              [`.${NAVIGATION_LINK_INFO_BOX_CLASSNAME}`]: {
                backgroundColor: COLORS.GRAY_5,
              },
            }),

            "&:hover": {
              color: COLORS.MAIN,
              fill: COLORS.MAIN,
              [`.${NAVIGATION_LINK_INFO_BOX_CLASSNAME}`]: {
                backgroundColor: COLORS.MAIN,
              },
            },
          },
          sxProp
        )}
        onMouseEnter={(e) => {
          if (["/", "/_error"].includes(route)) {
            setHoverBoxTop(e.currentTarget.offsetTop);
          }
          setHoverBoxMoveAnimated(true);
          NavigationUtil.clearTimeout();
        }}
        onMouseLeave={() => {
          NavigationUtil.startTimeout(() => {
            setHoverBoxMoveAnimated(false);
          }, NAVIGATION_LINK_HOVER_BOX_ANIMATION_DURATION);
        }}
        onClick={() => {
          if (screenType <= ScreenType.mobile) {
            setNavigationOpen(false);
          }
        }}
      >
        <Flex direction="row" align="center">
          {Icon && <Icon css={{ width: 20, height: 20, marginRight: 8 }} />}
          <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
            {children}
          </Typography>
        </Flex>
        {(label || disabled || externalLink) && (
          <Flex
            align="center"
            justify="center"
            sx={{
              p: pxArray(0, 4),
              height: 20,
              borderRadius: "4px",
            }}
            className={NAVIGATION_LINK_INFO_BOX_CLASSNAME}
          >
            <Typography sx={{ color: "white", fontSize: 12, fontWeight: 700 }}>
              {label
                ? label
                : disabled
                ? "?????? ???"
                : externalLink && "?????? ??????"}
            </Typography>
          </Flex>
        )}
      </Flex>
    ),
    [
      pathname,
      href,
      disabled,
      sxProp,
      Icon,
      children,
      label,
      externalLink,
      route,
      setHoverBoxMoveAnimated,
      setHoverBoxTop,
      screenType,
      setNavigationOpen,
    ]
  );

  if (externalLink !== undefined) {
    return (
      <Box sx={mergeStyles(styles.link(top, disabled), sxProp)}>
        <a href={externalLink} ref={setRef} target={target} rel="noreferrer">
          <UI />
        </a>
      </Box>
    );
  }

  return (
    <Box
      sx={mergeStyles(styles.link(top, disabled), sxProp)}
      className={
        pathname === href ? NAVIGATION_LINK_SELECTED_CLASSNAME : undefined
      }
    >
      <Link href={href} ref={setRef} prefetch={false}>
        <UI />
      </Link>
    </Box>
  );
};

const styles = {
  link: (top: number | undefined, disabled: boolean | undefined) =>
    sx({
      textDecoration: "none",

      "&:hover": {
        [`& ~ .${NAVIGATION_LINK_HOVER_BOX_CLASSNAME}`]: {
          opacity: 1,
          top,
        },
      },

      [`&.${NAVIGATION_LINK_SELECTED_CLASSNAME}`]: {
        [`& ~ .${NAVIGATION_LINK_HOVER_BOX_CLASSNAME}`]: {
          opacity: 1,
          top,
        },
      },

      ...(disabled && {
        pointerEvents: "none",
      }),
    }),
};
