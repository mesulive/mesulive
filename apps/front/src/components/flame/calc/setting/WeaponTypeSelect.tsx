import { values } from "@mesulive/shared";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { FlameState } from "~/lib/flame/states";
import { isWeaponType, WeaponType } from "~/lib/maple/types";

const LABEL = "무기 종류";

export const WeaponTypeSelect = () => {
  const [weaponType, setWeaponType] = useRecoilState(FlameState.weaponTypeAtom);
  const equipType = useRecoilValue(FlameState.equipTypeAtom);

  return (
    <FormControl disabled={equipType !== "WEAPON"}>
      <InputLabel>{LABEL}</InputLabel>
      <Select
        label={LABEL}
        value={weaponType}
        onChange={({ target: { value } }) => {
          if (isWeaponType(value)) {
            setWeaponType(value);
          }
        }}
      >
        {values(WeaponType.enum).map((weaponType) => (
          <MenuItem value={weaponType} key={weaponType}>
            {weaponType}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
