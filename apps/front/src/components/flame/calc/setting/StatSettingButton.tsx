import { COLORS, Flex, ScreenType } from "@mesulive/ui";
import { Button, Typography } from "@mui/material";
import { useSelector } from "@xstate/react";
import Color from "color";
import { throttle } from "lodash";
import { useContext, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  ModalActionContext,
  withPopoverProvider,
} from "~/components/common/context/ModalProvider";
import {
  StatSettingDialog,
  StatSettingPopover,
} from "~/components/flame/calc/setting/StatSettingModal";
import { FlameState } from "~/lib/flame/states";
import { FlowContext } from "~/lib/flow/flowProvider";
import { FlowMachineState } from "~/lib/flow/machine";
import { useRefCallback } from "~/lib/hooks/ref";
import { useScreenType } from "~/lib/hooks/window";

export const StatSettingButton = withPopoverProvider(() => {
  const { openModal } = useContext(ModalActionContext);
  const isInputUnfilledState = useSelector(
    useContext(FlowContext).service,
    (state) => state.matches(FlowMachineState.enum.inputUnfilled)
  );
  const statEfficiencyUnfilled = useRecoilValue(
    FlameState.statEfficiencyUnfilledSelector
  );
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [buttonRef, setButtonRef] = useRefCallback<HTMLButtonElement>();

  const screenType = useScreenType();

  const inputUnfilled = useMemo(
    () => isInputUnfilledState && statEfficiencyUnfilled,
    [isInputUnfilledState, statEfficiencyUnfilled]
  );

  const backgroundColor = useMemo(
    () => (inputUnfilled ? COLORS.ERROR : COLORS.MAIN_LIGHT),
    [inputUnfilled]
  );

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
      {inputUnfilled && (
        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: 11,
            fontWeight: 700,
            color: COLORS.ERROR,
            mt: 2,
          }}
        >
          스탯 효율을 입력해주세요.
        </Typography>
      )}
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
