import { EMPTY_TEXT } from "@mesulive/shared";
import { NumberTextField } from "@mesulive/ui";
import { useSelector } from "@xstate/react";
import { useContext, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FlowContext } from "~/lib/flow/context";
import { FlameState } from "~/lib/flame/states";
import { FlowMachineState } from "~/lib/flow/machine";
import { flow } from "fp-ts/function";
import { floorNullableNumber } from "@mesulive/shared/src/number";

export const EquipLevelInput = () => {
  const [equipLevel, setEquipLevel] = useRecoilState(FlameState.equipLevelAtom);
  const equipLevelError = useRecoilValue(FlameState.equipLevelErrorSelector);

  const inputUnfilledState = useSelector(
    useContext(FlowContext).service,
    (state) => state.matches(FlowMachineState.enum.inputUnfilled)
  );

  const inputUnfilled = useMemo(
    () => inputUnfilledState && equipLevel === undefined,
    [equipLevel, inputUnfilledState]
  );

  return (
    <NumberTextField
      label="장비 레벨"
      value={equipLevel}
      onNumberChange={flow(floorNullableNumber, setEquipLevel)}
      error={!!equipLevelError || inputUnfilled}
      helperText={
        equipLevelError ||
        (inputUnfilled && "장비 레벨을 입력해주세요") ||
        EMPTY_TEXT
      }
    />
  );
};
