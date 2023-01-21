import { values } from "@mesulive/shared";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRecoilState } from "recoil";
import { BonusStat } from "~/lib/bonus-stat";
import { BonusStatState } from "~/lib/bonus-stat/state";

const LABEL = "장비 종류";

export const EquipTypeSelect = () => {
  const [equipType, setEquipType] = useRecoilState(
    BonusStatState.equipTypeAtom
  );

  return (
    <FormControl>
      <InputLabel>{LABEL}</InputLabel>
      <Select
        label={LABEL}
        value={equipType}
        onChange={({ target: { value } }) => {
          if (BonusStat.isEquipType(value)) {
            setEquipType(value);
          }
        }}
      >
        {values(BonusStat.EquipType.enum).map((equipType) => (
          <MenuItem value={equipType} key={equipType}>
            {BonusStat.EquipTypeInfoMap[equipType].text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
