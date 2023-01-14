import { EMPTY_TEXT } from "@mesulive/shared";
import { floorNullableNumber } from "@mesulive/shared/src/number";
import { NumberTextField } from "@mesulive/ui";
import { useSelector } from "@xstate/react";
import { flow } from "fp-ts/function";
import { useContext, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { FlameState } from "~/lib/flame/states";
import { FlowContext } from "~/lib/flow/flowProvider";
import { FlowMachineState } from "~/lib/flow/machine";

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
