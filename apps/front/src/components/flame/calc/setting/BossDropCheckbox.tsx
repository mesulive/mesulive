import { mergeStyles, Sx } from "@mesulive/ui";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useRecoilState } from "recoil";
import { FlameState } from "~/lib/flame/states";

interface Props extends Sx {}

export const BossDropCheckbox = ({ sx: sxProp }: Props) => {
  const [bossDrop, setBossDrop] = useRecoilState(FlameState.bossDropAtom);

  return (
    <FormControlLabel
      sx={mergeStyles({ justifyContent: "center" }, sxProp)}
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
