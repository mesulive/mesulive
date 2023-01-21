import { floorNullableNumber } from "@mesulive/shared/src/number";
import { NumberTextField } from "@mesulive/ui";
import { flow } from "fp-ts/function";
import { useRecoilState, useRecoilValue } from "recoil";
import { BonusStatState } from "~/lib/bonus-stat/state";

export const EquipLevelInput = () => {
  const [equipLevel, setEquipLevel] = useRecoilState(
    BonusStatState.equipLevelAtom
  );
  const equipLevelError = useRecoilValue(
    BonusStatState.equipLevelErrorSelector
  );

  return (
    <NumberTextField
      label="장비 레벨"
      value={equipLevel}
      onNumberChange={flow(floorNullableNumber, setEquipLevel)}
      error={!!equipLevelError}
      helperText={equipLevelError}
      max={999}
    />
  );
};
