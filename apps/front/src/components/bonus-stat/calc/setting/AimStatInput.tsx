import { NumberTextField } from "@mesulive/ui";
import { useRecoilState, useRecoilValue } from "recoil";
import { BonusStatState } from "~/lib/bonus-stat/state";

export const AimStatInput = () => {
  const [aimStat, setAimStat] = useRecoilState(BonusStatState.aimStatAtom);
  const aimStatHelperText = useRecoilValue(
    BonusStatState.aimStatHelperTextSelector
  );
  const aimStatError = useRecoilValue(BonusStatState.aimStatErrorSelector);

  return (
    <NumberTextField
      value={aimStat}
      onNumberChange={setAimStat}
      label="목표 추가옵션 값"
      error={!!aimStatError}
      helperText={aimStatError || aimStatHelperText}
    />
  );
};
