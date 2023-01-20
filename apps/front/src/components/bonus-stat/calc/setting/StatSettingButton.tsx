import { COLORS, Flex, ScreenType } from "@mesulive/ui";
import { Button } from "@mui/material";
import Color from "color";
import { throttle } from "lodash";
import { useContext, useEffect, useState } from "react";
import {
  StatSettingDialog,
  StatSettingPopover,
} from "~/components/bonus-stat/calc/setting/StatSettingModal";
import {
  ModalActionContext,
  withPopoverProvider,
} from "~/components/common/context/ModalProvider";
import { useRefCallback } from "~/lib/hooks/ref";
import { useScreenType } from "~/lib/hooks/window";

export const StatSettingButton = withPopoverProvider(() => {
  const { openModal } = useContext(ModalActionContext);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [buttonRef, setButtonRef] = useRefCallback<HTMLButtonElement>();

  const screenType = useScreenType();

  const backgroundColor = COLORS.MAIN_LIGHT;

  useEffect(() => {
    const event = throttle(() => {
      setWidth(buttonRef.current?.offsetWidth);
    }, 100);

    event();
    addEventListener("resize", event);

    return () => {
      removeEventListener("resize", event);
    };
  }, [buttonRef]);

  return (
    <Flex sx={{ position: "relative" }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor,
          "&:hover, &:active": {
            backgroundColor: Color(backgroundColor).darken(0.3).toString(),
          },
          p: 8,
          flex: 1,
        }}
        onClick={({ currentTarget }) => {
          openModal(currentTarget);
        }}
        ref={setButtonRef}
      >
        스탯 효율 입력
      </Button>
      {screenType >= ScreenType.laptop ? (
        <StatSettingPopover
          disablePortal
          PaperProps={{
            style: {
              width,
              transition: "width 0.1s ease-in-out",
              transitionProperty: "width, transform-origin",
            },
          }}
        />
      ) : (
        <StatSettingDialog />
      )}
    </Flex>
  );
});
