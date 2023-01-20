import { NumberTextField } from "@mesulive/ui";
import { useRecoilState, useRecoilValue } from "recoil";
import { BonusStatState } from "~/lib/bonus-stat/states";

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
      label="목표 환산 스탯"
      error={!!aimStatError}
      helperText={aimStatError || aimStatHelperText}
    />
  );
};
