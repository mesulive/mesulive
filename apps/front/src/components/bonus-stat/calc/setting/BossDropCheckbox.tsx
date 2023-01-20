import { Checkbox, FormControlLabel } from "@mui/material";
import { useRecoilState } from "recoil";
import { BonusStatState } from "~/lib/bonus-stat/states";

export const BossDropCheckbox = () => {
  const [bossDrop, setBossDrop] = useRecoilState(BonusStatState.bossDropAtom);

  return (
    <FormControlLabel
      sx={{ justifyContent: "center", userSelect: "none" }}
      control={
        <Checkbox
          checked={bossDrop}
          onChange={({ target: { checked } }) => setBossDrop(checked)}
        />
      }
      label="보스 드랍"
    />
  );
};
