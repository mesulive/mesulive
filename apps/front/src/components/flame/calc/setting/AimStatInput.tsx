import { NumberTextField } from "@mesulive/ui";
import { useSelector } from "@xstate/react";
import { useContext, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FlowContext } from "~/lib/flow/context";
import { FlameState } from "~/lib/flame/states";
import { FlowMachineState } from "~/lib/flow/machine";

export const AimStatInput = () => {
  const [aimStat, setAimStat] = useRecoilState(FlameState.aimStatAtom);
  const aimStatHelperText = useRecoilValue(
    FlameState.aimStatHelperTextSelector
  );
  const aimStatError = useRecoilValue(FlameState.aimStatErrorSelector);

  const inputUnfilledState = useSelector(
    useContext(FlowContext).service,
    (state) => state.matches(FlowMachineState.enum.inputUnfilled)
  );

  const inputUnfilled = useMemo(
    () => inputUnfilledState && aimStat === undefined,
    [aimStat, inputUnfilledState]
  );

  return (
    <NumberTextField
      value={aimStat}
      onNumberChange={setAimStat}
      label="목표 환산 스탯"
      error={!!aimStatError || inputUnfilled}
      helperText={
        aimStatError ||
        (inputUnfilled && "목표 환산 스탯을 입력해주세요") ||
        aimStatHelperText
      }
    />
  );
};
