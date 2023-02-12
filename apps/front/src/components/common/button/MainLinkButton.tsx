import {
  MainLinkButtonBase,
  MainLinkButtonBaseProps,
  mergeStyles,
} from "@mesulive/ui";
import Link from "next/link";
import { ComponentProps, useCallback } from "react";

export interface MainLinkButtonProps extends MainLinkButtonBaseProps {
  external?: boolean;
  link?: string;
  target?: ComponentProps<"a">["target"];
}

export const MainLinkButton = ({
  link = "/",
  external,
  sx: sxProp,
  target = "_blank",
  ...baseProps
}: MainLinkButtonProps) => {
  const UI = useCallback(() => {
    return (
      <MainLinkButtonBase
        sx={mergeStyles({ width: "100%" }, sxProp)}
        {...baseProps}
      />
    );
  }, [baseProps, sxProp]);

  if (baseProps.disabled) {
    return <UI />;
  }

  if (external) {
    return (
      <a href={link} target={target}>
        <UI />
      </a>
    );
  }

  return (
    <Link href={link}>
      <UI />
    </Link>
  );
};
