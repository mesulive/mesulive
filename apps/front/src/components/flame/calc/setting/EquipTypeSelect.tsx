import { EMPTY_TEXT, values } from "@mesulive/shared";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { Flame } from "~/lib/flame";
import { FlameState } from "~/lib/flame/states";

const LABEL = "장비 종류";

export const EquipTypeSelect = () => {
  const [equipType, setEquipType] = useRecoilState(FlameState.equipTypeAtom);

  return (
    <FormControl>
      <InputLabel>{LABEL}</InputLabel>
      <Select
        label={LABEL}
        value={equipType}
        onChange={({ target: { value } }) => {
          if (Flame.isEquipType(value)) {
            setEquipType(value);
          }
        }}
      >
        {values(Flame.EquipType.enum).map((equipType) => (
          <MenuItem value={equipType} key={equipType}>
            {Flame.EquipTypeInfoMap[equipType].text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{EMPTY_TEXT}</FormHelperText>
    </FormControl>
  );
};
