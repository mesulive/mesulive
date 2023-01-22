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
    if (!bossDrop && weaponGrade >= 6) {
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
            console.log(value);
            if (value >= 0 && value <= 7) {
              setWeaponGrade(value);
              return;
            }
          }
        }}
      >
        {[
          0,
          ...new Array(5)
            .fill(0)
            .map((_, i) => i + 1 + (bossDrop ? 2 : 0))
            .reverse(),
        ].map((grade) => (
          <MenuItem key={grade} value={grade}>
            {grade ? `${8 - grade}추` : "선택안함"}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
