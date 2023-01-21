import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BonusStatState } from "~/lib/bonus-stat/state";

const LABEL = "무기 추옵 등급";

export const WeaponGradeSelect = () => {
  const equipType = useRecoilValue(BonusStatState.equipTypeAtom);
  const [weaponGrade, setWeaponGrade] = useRecoilState(
    BonusStatState.weaponGradeAtom
  );
  const bossDrop = useRecoilValue(BonusStatState.bossDropAtom);

  useEffect(() => {
    if (bossDrop && weaponGrade >= 6) {
      setWeaponGrade(0);
    }
  }, [bossDrop, setWeaponGrade, weaponGrade]);

  return (
    <FormControl disabled={equipType !== "WEAPON"}>
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
        {[...new Array(bossDrop ? 6 : 8).fill(0).map((_, i) => i)].map(
          (grade) => (
            <MenuItem key={grade} value={grade}>
              {grade ? `${grade}추` : "선택안함"}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};
