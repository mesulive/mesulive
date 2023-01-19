import { NumberTextField } from "@mesulive/ui";
import { useRecoilState, useRecoilValue } from "recoil";
import { FlameState } from "~/lib/flame/states";

export const AimStatInput = () => {
  const [aimStat, setAimStat] = useRecoilState(FlameState.aimStatAtom);
  const aimStatHelperText = useRecoilValue(
    FlameState.aimStatHelperTextSelector
  );
  const aimStatError = useRecoilValue(FlameState.aimStatErrorSelector);

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
