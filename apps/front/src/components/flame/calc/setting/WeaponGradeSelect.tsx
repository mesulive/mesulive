import { Sx } from "@mesulive/ui";
import { useRecoilState, useRecoilValue } from "recoil";
import { FlameState } from "~/lib/flame/states";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props extends Sx {}

const LABEL = "무기 추옵 등급";

export const WeaponGradeSelect = ({ sx: sxProp }: Props) => {
  const equipType = useRecoilValue(FlameState.equipTypeAtom);
  const [weaponGrade, setWeaponGrade] = useRecoilState(
    FlameState.weaponGradeAtom
  );

  return (
    <FormControl sx={sxProp} disabled={equipType !== "WEAPON"}>
      <InputLabel>{LABEL}</InputLabel>
      <Select
        label={LABEL}
        value={weaponGrade}
        onChange={({ target: { value } }) => {
          if (typeof value === "number") {
            if (value >= 0 && value <= 7) {
              setWeaponGrade(value);
              return;
            }
          }
        }}
      >
        {[...new Array(8).fill(0).map((_, i) => i)].map((grade) => (
          <MenuItem key={grade} value={grade}>
            {grade ? `${grade}추` : "선택안함"}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
